import { ImageType } from "@/types/screenshot-type";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, theme, imageType, width, height } = body;

  const isProduction = process.env.NODE_ENV === "production";

  const browser = await puppeteer.launch({
    args: isProduction ? chromium.args : puppeteer.defaultArgs(),
    executablePath: isProduction
      ? await chromium.executablePath()
      : process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : process.platform === "linux"
      ? "/usr/bin/google-chrome"
      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
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

    await new Promise((resolve) => setTimeout(resolve, 30000));

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
