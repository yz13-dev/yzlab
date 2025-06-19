import "@/styles/globals.css";
import "@/styles/shiki.css";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@yzlab/ui/cn";
import { Toaster } from "@yzlab/ui/components/sonner";
import { TooltipProvider } from "@yzlab/ui/components/tooltip";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Onest, Pixelify_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const PIXEL = Pixelify_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: "variable",
  variable: "--font-pixel",
});

const SANS = Onest({
  weight: "variable",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
});

const MONO = Geist_Mono({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "YZLAB",
  description: "Lab",
};

const isDev = process.env.NODE_ENV === "development";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(SANS.variable, MONO.variable, PIXEL.variable)}
    >
      {isDev && (
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
      )}
      <body id="root" className="antialiased">
        <Toaster />
        <Analytics />
        <NuqsAdapter>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
