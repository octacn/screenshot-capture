"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export default function Internet() {
  const [isOnline, setIsOnline] = React.useState(() =>
    typeof window !== "undefined" ? navigator.onLine : true
  );
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div
      className={cn(
        "absolute top-0 left-0 right-0 z-50 text-center transition-all inset-0",
        "animate-in fade-out-0 fade-in-0 bg-black/95",
        "text-xl font-mono capitalize tracking-wider",
        "flex items-center justify-center"
      )}
    >
      {isOnline ? (
        <span>✓ Back online</span>
      ) : (
        <span>⚠ No internet connection</span>
      )}
    </div>
  );
}
