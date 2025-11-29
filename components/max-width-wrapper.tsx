import { cn } from "@/lib/utils";
import * as React from "react";

function MaxWidthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className={cn("overflow-hidden max-h-screen min-h-screen")}>
      {children}
    </section>
  );
}

function MaxWidthWrapperLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={cn("relative max-w-screen-2xl mx-auto")}>{children}</main>
  );
}

export { MaxWidthWrapperLayout, MaxWidthWrapper };
