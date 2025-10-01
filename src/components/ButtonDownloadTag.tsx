// src/components/ButtonDownloadTag.tsx
import React from "react";

type ButtonDownloadTagProps = {
  /** Public URL to the printable tag PDF (or image), e.g. "/downloads/tags/bold-earth-tag.pdf" */
  href: string;
  /** Visible text on the button */
  label?: string;
  /** Optional override for aria-label */
  ariaLabel?: string;
  /** Optional extra classes */
  className?: string;
};

export default function ButtonDownloadTag({
  href,
  label = "Download Tag",
  ariaLabel,
  className,
}: ButtonDownloadTagProps) {
  const base =
    "inline-block text-white text-lg font-semibold px-6 py-3 rounded-full hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  // Light Green 2: #8FC3A9
  const color = "bg-[#8FC3A9] focus:ring-[#8FC3A9]/30";

  return (
    <a
      href={href}
      download
      className={`${base} ${color}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel ?? label}>
      {label}
    </a>
  );
}
