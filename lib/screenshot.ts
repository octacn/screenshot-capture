import {
  ImageType,
  ScreenshotResponse,
  ScreenshotSchema,
} from "@/types/screenshot-type";
import puppeteer from "puppeteer";

export async function screenshot(
  options: ScreenshotSchema
): Promise<ScreenshotResponse> {
  const {
    url,
    width = 1440,
    height = 900,
    imageType = "png",
    theme = "light",
  } = options;

  if (!url) {
    throw new Error("URL is required");
  }

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: height,
      height: width,
      deviceScaleFactor: 2,
    },
  });

  const page = await browser.newPage();

  // const browser = await puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
  // });

  // const page = await browser.newPage();
  // await page.setViewport({ width, height });

  // Set color scheme based on theme
  // await page.emulateMediaFeatures([
  //   { name: "prefers-color-scheme", value: theme },
  // ]);
  // await page.goto(url, { waitUntil: "" });

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  await page.evaluate((currentTheme) => {
    localStorage.setItem("theme", currentTheme);
  }, theme);

  await new Promise((resolve) => setTimeout(resolve, 60000));

  const screenshotBuffer = await page.screenshot({
    type: imageType as Exclude<ImageType, "webp">,
  });

  await browser.close();

  return {
    image: Buffer.from(screenshotBuffer),
  };
}
