"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      title="Mode Toggle"
      className="flex items-center py-1 rounded-full border px-1 bg-surface select-none gap-1"
    >
      <ThemeToggleButton
        aria-label="System theme"
        onClick={() => setTheme("system")}
        isActive={theme === "system"}
      >
        <Icons.laptop />
      </ThemeToggleButton>

      <ThemeToggleButton
        aria-label="Light theme"
        onClick={() => setTheme("light")}
        isActive={theme === "light"}
      >
        <Icons.sun />
      </ThemeToggleButton>

      <ThemeToggleButton
        aria-label="Dark theme"
        onClick={() => setTheme("dark")}
        isActive={theme === "dark"}
      >
        <Icons.moon />
      </ThemeToggleButton>
    </div>
  );
}

function ThemeToggleButton({
  isActive,
  className,
  ...props
}: React.ComponentProps<"div"> & { isActive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-full *:size-6 p-0.5 border border-transparent transition-colors",
        "hover:bg-border hover:border hover:border-accent hover:btn-inner-shadow",
        isActive && "bg-border btn-inner-shadow",
        className
      )}
      {...props}
    />
  );
}
