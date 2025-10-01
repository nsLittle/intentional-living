"use client";

import React from "react";

type ButtonPrintTagProps = {
  href: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
};

export default function ButtonPrintTag({
  href,
  label = "Print Tag",
  ariaLabel,
  className,
}: ButtonPrintTagProps) {
  const base =
    "inline-block text-lg font-semibold px-6 py-3 rounded-full hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const color = "bg-[#F3EDE3] text-[#5C5045] focus:ring-[#5C5045]/20";

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

    if (win.document?.readyState === "complete") onLoad();
    else win.addEventListener("load", onLoad, { once: true });
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`${base} ${color}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel ?? label}>
      {label}
    </button>
  );
}
