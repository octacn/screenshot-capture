"use client";

import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";
import { BoxButton } from "@/components/box";
import Image from "next/image";

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
  return <div>PreviewPage</div>;
}

export { DownloadButton, ResetButton, ImagePreviewHome, ImagePreviewPage };
