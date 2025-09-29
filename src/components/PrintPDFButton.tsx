"use client";

type Props = { className?: string; label?: string };

export default function PrintPDFButton({
  className = "",
  label = "Download PDF",
}: Props) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border shadow-sm ${className}`}
      aria-label="Download this recipe as a PDF">
      {label}
    </button>
  );
}
