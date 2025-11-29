"use client";

import { useState, useCallback } from "react";
import type { ScreenshotSchema } from "@/types/screenshot-type";
import { useScreenshotStorage } from "./use-screenshot-storage";

export function useCaptureScreenshot() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { saveScreenshot } = useScreenshotStorage();

  const capture = useCallback(
    async (options: ScreenshotSchema): Promise<string | null> => {
      setLoading(true);
      setError(null);
      setImage(null);

      try {
        const res = await fetch("/api/screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(options),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || `Failed to capture screenshot: ${res.status}`);
        }

        const blob = await res.blob();
        
        // Convert blob to base64 for localStorage storage
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
        reader.readAsDataURL(blob);
        const base64Data = await base64Promise;

        // Save to localStorage for preview page
        saveScreenshot({
          imageData: base64Data,
          url: options.url,
          capturedAt: new Date().toISOString(),
          imageType: options.imageType || "png",
        });

        setImage(base64Data);
        return base64Data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [saveScreenshot]
  );

  const reset = useCallback(() => {
    setImage(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    image,
    loading,
    error,
    capture,
    reset,
  };
}
