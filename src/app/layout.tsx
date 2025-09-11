// src/app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Intentions",
  description: "Wild food, simple living, and seasonal joy from Vermont.",
  manifest: "/site.webmanifest",
  themeColor: "#5c5045",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
        {children}
      </body>
    </html>
  );
}
