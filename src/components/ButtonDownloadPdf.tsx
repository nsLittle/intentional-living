// src/components/ButtonDownloadPdf.tsx
import React from "react";

type ButtonDownloadPdfProps = {
  /** Public URL to the PDF, e.g. "/downloads/recipes/bold-earth.pdf" or "/downloads/patterns/ballband-pattern.pdf" */
  href: string;
  /** Visible text on the button */
  label?: string;
  /** Optional override for aria-label */
  ariaLabel?: string;
  /** Optional extra classes to tweak styling per page */
  className?: string;
};

export default function ButtonDownloadPdf({
  href,
  label = "Download (PDF)",
  ariaLabel,
  className,
}: ButtonDownloadPdfProps) {
  const base =
    "inline-block bg-[#4b816d] text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-[#3b6c5a]";

  return (
    <a
      href={href}
      download
      className={`${base}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel ?? label}>
      {label}
    </a>
  );
}
