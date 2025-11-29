import Link from "next/link";
import { Box, IconBox } from "@/components/box";
import { Icons } from "@/components/icons";
import { ThemeToggler } from "@/components/theme-toggler";
import { siteConfig } from "@/lib/config";

export default function SiteFooter() {
  return (
    <Box className="flex justify-between items-center h-14 border-t">
      <ThemeToggler />

      <p className="text-muted-foreground font-mono text-center text-sm">
        Design & Developed by
        <Link
          href={siteConfig.social.linkedin}
          className="whitespace-nowrap transition-colors duration-300 ml-1 hover:text-app text-app/70 cursor-default font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {siteConfig.developer}
        </Link>
        <br /> &copy; {new Date().getFullYear()}. All rights reserved.
      </p>

      <div className="flex gap-x-2">
        {[1, 2, 3].map((idx) => (
          <IconBox key={idx}>
            <Icons.laptop />
          </IconBox>
        ))}
      </div>
    </Box>
  );
}
