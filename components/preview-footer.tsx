"use client";

import Link from "next/link";
import { Box, BoxButton } from "./box";
import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";

export default function PreviewFooter() {
  const { downloadScreenshot, clearScreenshot, hasScreenshot } = useScreenshotStorage();

  const handleDownload = () => {
    downloadScreenshot();
  };

  const handleCaptureNew = () => {
    clearScreenshot();
  };

  return (
    <Box className="fixed top-0 left-0 right-0 z-30 w-full h-20 bg-surface border-t border-border flex items-center justify-between">
      <Link href={"/"}>
        <BoxButton variant={"secondary"} className="rounded-full" size={"lg"}>
          Back to home
        </BoxButton>
      </Link>
      <BoxButton 
        variant={"secondary"} 
        className="rounded-full" 
        size={"lg"}
        onClick={handleDownload}
        disabled={!hasScreenshot}
      >
        Download
      </BoxButton>
      <Link href={"/"}>
        <BoxButton 
          variant={"secondary"} 
          className="rounded-full" 
          size={"lg"}
          onClick={handleCaptureNew}
        >
          Capture New
        </BoxButton>
      </Link>
    </Box>
  );
}
