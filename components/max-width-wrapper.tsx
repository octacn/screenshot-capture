import { cn } from "@/lib/utils";
import * as React from "react";

export default function MaxWidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "relative max-w-screen-2xl mx-auto",
        "overflow-hidden max-h-screen min-h-screen w-screen"
      )}
    >
      {children}
    </main>
  );
}
