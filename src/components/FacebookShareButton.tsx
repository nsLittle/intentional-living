// components/FacebookShareButton.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function FacebookShareButton({
  className = "",
  label = "Share on Facebook",
  variant = "label", // "label" | "icon"
}: {
  className?: string;
  label?: string;
  variant?: "label" | "icon";
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.example";

  const query = searchParams?.toString();
  const fullUrl = `${siteUrl}${pathname}${query ? `?${query}` : ""}`;

  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    fullUrl
  )}`;

  if (variant === "icon") {
    return (
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this page on Facebook"
        title="Share on Facebook"
        className={`inline-flex items-center justify-center
              -translate-y-px transition hover:drop-shadow hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30 focus:ring-offset-2
              ${className}`}>
        {/* 28×28 blue circle + white "f" to match your Pinterest SVG */}
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          focusable="false">
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path
            fill="#FFFFFF"
            d="M15.1 8.41h-1.45c-.57 0-.75.27-.75.66v1.57h2.14l-.29 2.05h-1.85V18h-2.12v-4.31H8.91v-2.05h1.77V9.32c0-1.75 1.07-2.71 2.64-2.71.75 0 1.4.06 1.78.09v1.71z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </a>
    );
  }

  // Default labeled button
  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share this page on Facebook"
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${className}`}
      title="Share on Facebook">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor">
        <path d="M22 12.061C22 6.504 17.523 2 12 2S2 6.504 2 12.061C2 17.08 5.657 21.216 10.438 22v-6.996H7.898v-2.943h2.54v-2.24c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.47h-1.26c-1.243 0-1.63.773-1.63 1.565v1.899h2.773l-.443 2.943h-2.33V22C18.343 21.216 22 17.08 22 12.061z" />
      </svg>
      {label}
    </a>
  );
}
