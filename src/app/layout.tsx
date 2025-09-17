// src/app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { Viewport } from "next/types";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  title: "Simple Intentions",
  description: "Wild food, simple living, and seasonal joy from Vermont.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#fefcf9]">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`bg-[#fefcf9] min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="sw-register" strategy="afterInteractive">
          {isProd
            ? `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(console.error);
                });
              }
            `
            : ""}
        </Script>
        {children}
      </body>
    </html>
  );
}
