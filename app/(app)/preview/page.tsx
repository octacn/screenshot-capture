"use client";

import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";
import PreviewFooter from "@/components/preview-footer";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { screenshot, hasScreenshot } = useScreenshotStorage();

  useEffect(() => {
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
              {screenshot?.capturedAt && new Date(screenshot.capturedAt).toLocaleString()}
            </p>
          </div>
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={screenshot?.imageData}
              alt={`Screenshot of ${screenshot?.url}`}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <PreviewFooter />
    </div>
  );
}
