// src/components/ButtonPrintPDF.tsx
"use client";
import React from "react";

type ButtonPrintPDFProps = {
  href?: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
};

export default function ButtonPrintPDF({
  href,
  label = "Print Recipe (PDF)",
  ariaLabel,
  className,
}: ButtonPrintPDFProps) {
  const base =
    "inline-block bg-[#6DA58D] text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-[#3b6c5a] focus:outline-none focus:ring-2 focus:ring-[#4b816d]/30 focus:ring-offset-2";

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window === "undefined" || !href) return;

    const win = window.open(href, "_blank");
    if (!win) return;

    const onLoad = () => {
      try {
        win.focus();
        win.print();
        win.addEventListener("afterprint", () => {
          try {
            win.close();
          } catch {}
        });
      } catch {}
    };

    if (win.document?.readyState === "complete") {
      onLoad();
    } else {
      win.addEventListener("load", onLoad, { once: true });
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`${base}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel ?? label}>
      {label}
    </button>
  );
}
