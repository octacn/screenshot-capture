"use client";

import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";
import Image from "next/image";

export default function ImagePreviewer() {
  const { screenshot, hasScreenshot } = useScreenshotStorage();

  if (!hasScreenshot) {
    return (
      <div className="flex flex-col font-mono items-center justify-center text-center h-full">
        <p className="text-foreground/80 text-xl">
          No screenshot captured yet.
        </p>
        <p className="text-muted-foreground mt-1">
          Enter a URL above and click Capture to take a screenshot.
        </p>
      </div>
    );
  }

  return (
    <Image
      src={screenshot?.imageData as string}
      alt={screenshot?.url as string}
      width={100}
      height={100}
      className="object-cover w-full"
    />
  );
}
