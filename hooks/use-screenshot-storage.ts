"use client";

import { useState, useEffect, useCallback } from "react";

export interface StoredScreenshot {
  imageData: string;
  url: string;
  capturedAt: string;
  imageType: string;
}

const STORAGE_KEY = "screenshot-preview";

function getInitialScreenshot(): StoredScreenshot | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as StoredScreenshot;
    } catch (e) {
      console.error("Failed to parse stored screenshot:", e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return null;
}

export function useScreenshotStorage() {
  const [screenshot, setScreenshot] = useState<StoredScreenshot | null>(() =>
    getInitialScreenshot()
  );

  const saveScreenshot = useCallback((data: StoredScreenshot) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setScreenshot(data);
    window.dispatchEvent(
      new CustomEvent("screenshot-updated", { detail: data })
    );
  }, []);

  const clearScreenshot = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setScreenshot(null);
    window.dispatchEvent(
      new CustomEvent("screenshot-updated", { detail: null })
    );
  }, []);

  const downloadScreenshot = useCallback(
    (filename?: string) => {
      if (!screenshot) return;

      const link = document.createElement("a");
      link.href = screenshot.imageData;
      link.download =
        filename || `screenshot-${Date.now()}.${screenshot.imageType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [screenshot]
  );

  useEffect(() => {
    const handleUpdate = (event: CustomEvent<StoredScreenshot | null>) => {
      setScreenshot(event.detail);
    };

    window.addEventListener(
      "screenshot-updated",
      handleUpdate as EventListener
    );
    return () => {
      window.removeEventListener(
        "screenshot-updated",
        handleUpdate as EventListener
      );
    };
  }, []);

  return {
    screenshot,
    saveScreenshot,
    clearScreenshot,
    downloadScreenshot,
    hasScreenshot: !!screenshot,
  };
}
