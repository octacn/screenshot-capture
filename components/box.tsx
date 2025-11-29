import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Box({ children, className }: React.ComponentProps<"section">) {
  return <section className={cn("px-10", className)}>{children}</section>;
}

function BoxButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      className={cn("skill-inner-shadow", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

function IconBox({ children }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none",
        "transition-colors inline-flex items-center justify-center",
        "border bg-surface p-1 rounded-md btn-inner-shadow cursor-default"
      )}
    >
      {children}
    </div>
  );
}

export { Box, BoxButton, IconBox };
