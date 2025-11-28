import type { Metadata } from "next";
import "@/styles/globals.css";
import { Hanken_Grotesk, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Hanken_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Screen shot Capture",
  description: "This is a screen shot capture tool build with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-inter tracking-wide font-normal antialiased",
          mono.variable,
          inter.variable
        )}
        cz-shortcut-listen="true"
      >
        <MaxWidthWrapper>
          {children}
        </MaxWidthWrapper>
      </body>
    </html>
  );
}
