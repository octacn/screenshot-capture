"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BoxButton, Box } from "@/components/box";
import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";

function DownloadButton({ name }: { name: string }) {
  const { downloadScreenshot } = useScreenshotStorage();

  const handleDownload = () => {
    const clearName = name
      ? name
          .replace(/(^\w+:|^)\/\//, "")
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase()
      : "screenshot";
    downloadScreenshot(clearName);
  };

  return <BoxButton onClick={handleDownload}>Download</BoxButton>;
}

function ResetButton({
  children,
  ...props
}: React.ComponentProps<typeof BoxButton>) {
  const { clearScreenshot, hasScreenshot } = useScreenshotStorage();

  const handleCaptureNew = () => {
    clearScreenshot();
  };

  return (
    <BoxButton onClick={handleCaptureNew} {...props} disabled={!hasScreenshot}>
      {children}
    </BoxButton>
  );
}

function ImagePreviewHome() {
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

function ImagePreviewPage() {
  const { screenshot, hasScreenshot } = useScreenshotStorage();

  React.useEffect(() => {
    if (!hasScreenshot) {
      redirect("/");
    }
  }, [hasScreenshot]);

  if (!hasScreenshot) {
    return null;
  }
  return (
    <div className="min-h-screen pb-24">
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Screenshot Preview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Captured from: {screenshot?.url}
            </p>
            <p className="text-xs text-muted-foreground">
              {screenshot?.capturedAt &&
                new Date(screenshot.capturedAt).toLocaleString()}
            </p>
          </div>
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <Image
              width={100}
              height={100}
              src={screenshot?.imageData as string}
              alt={screenshot?.url as string}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewHeader() {
  const { downloadScreenshot, clearScreenshot, hasScreenshot } =
    useScreenshotStorage();

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

export { DownloadButton, ResetButton, ImagePreviewHome, ImagePreviewPage };
