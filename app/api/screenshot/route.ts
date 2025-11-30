import { ImageType } from "@/types/screenshot-type";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, theme, imageType, height, width } = body;

  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],

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
    });

    await page.evaluate((currentTheme) => {
      localStorage.setItem("theme", currentTheme);
    }, theme);

    // await new Promise((resolve) => setTimeout(resolve, 30000));

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
