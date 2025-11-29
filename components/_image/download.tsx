"use client";

import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";
import { BoxButton } from "@/components/box";

export default function DownloadButton() {
  const { downloadScreenshot } = useScreenshotStorage();

  return (
    <BoxButton onClick={() => downloadScreenshot("123")}>Download</BoxButton>
  );
}
