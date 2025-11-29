import { ImageType } from "@/types/screenshot-type";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { url, theme, imageType, height, width } = body;

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: width,
      height: height,
      deviceScaleFactor: 2,
    },
  });

  try {
    if (!url) {
      throw new Error("URL is required");
    }

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      // timeout: 60000,
    });

    await page.evaluate((currentTheme) => {
      localStorage.setItem("theme", currentTheme);
    }, theme);

    const screenshotBuffer = await page.screenshot({
      type: imageType as ImageType,
      fullPage: body.fullPage || false,
    });

    await page.close();
    await browser.close();

    return new NextResponse(Buffer.from(screenshotBuffer), {
      status: 200,
      headers: {
        "Content-Type": `image/${imageType}`,
        "Content-Length": screenshotBuffer.length.toString(),
      },
    });
  } catch (error) {
    await browser.close();
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
