import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { url } = body;
  console.log("url", url);

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: body.width || 1440,
      height: body.height || 900,
      deviceScaleFactor: 2,
    },
  });

  try {
    const url = body.url || "https://axisbuddy.com";
    const theme = body.theme || "light";
    const imageType = body.imageType || "png";

    if (!url) {
      throw new Error("URL is required");
    }

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      // timeout: 60000,
    });

    console.log(`- Capturing ${url}...`);

    await page.evaluate((currentTheme) => {
      localStorage.setItem("theme", currentTheme);
    }, theme);

    const screenshotBuffer = await page.screenshot({
      type: imageType as "png" | "jpeg" | "webp",
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
