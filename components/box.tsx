import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Icons } from "@/components/icons";
import Link from "next/link";

function Box({ children, className }: React.ComponentProps<"section">) {
  return <section className={cn("px-10", className)}>{children}</section>;
}

function BoxButton({
  children,
  className,
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      className={cn("skill-inner-shadow", className)}
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

function DropdownBox() {
  const appItems = [
    {
      label: "Markdown",
      icon: Icons.nextjs,
      href: "hello",
    },
    {
      label: "v0",
      icon: Icons.logo,
      href: "hello",
    },
    {
      label: "ChatGPT",
      icon: Icons.nextjs,
      href: "hello",
    },
    {
      label: "Claude",
      icon: Icons.logo,
      href: "hello",
    },
  ];
  return (
    <DropdownMenu>
      <ButtonGroup>
        <Button variant="secondary" size="sm">
          Copy Page
        </Button>

        <ButtonGroupSeparator />

        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"} size={"icon-sm"}>
            <ChevronDown className="rotate-180 sm:rotate-0" />
          </Button>
        </DropdownMenuTrigger>
      </ButtonGroup>

      <DropdownMenuContent className="bg-secondary grid p-0" align="end">
        {appItems.map((Item) => {
          return (
            <Link
              href={Item.href}
              key={Item.label}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-3.5 py-2 text-sm font-medium",
                "inline-flex items-center gap-2 justify-between",
                "border-b border-b-muted-foreground/20 last:border-0",
                "hover:bg-background/30 transition-colors duration-300",
                "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0"
              )}
            >
              {Item.label}
              <Item.icon />
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { Box, BoxButton, IconBox, DropdownBox };
