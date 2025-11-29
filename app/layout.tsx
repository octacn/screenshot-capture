import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import { MaxWidthWrapperLayout } from "@/components/max-width-wrapper";
import { ThemeProvider } from "@/components/theme-toggler";
import { META_THEME_COLORS } from "@/hooks/meta-colors";
import Internet from "@/components/internet";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />

        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "font-inter tracking-wide font-normal antialiased",
          mono.variable,
          inter.variable
        )}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MaxWidthWrapperLayout>
            <Internet />
            {children}
          </MaxWidthWrapperLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
