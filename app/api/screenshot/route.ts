import { screenshot } from "@/lib/screenshot";
import { ImageType, ScreenshotSchema } from "@/types/screenshot-type";
import { NextRequest, NextResponse } from "next/server";

const contentTypeMap: Record<ImageType, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parseResult = ScreenshotSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.issues },
      { status: 400 }
    );
  }

  const { url, width, height, imageType = "png", theme } = parseResult.data;

  try {
    const result = await screenshot({ url, width, height, imageType, theme });

    return new NextResponse(new Uint8Array(result.image), {
      headers: {
        "Content-Type": contentTypeMap[imageType],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
