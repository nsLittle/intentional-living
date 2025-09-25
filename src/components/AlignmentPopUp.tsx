"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LS_KEY = "si_align_prompt_dismissed_until"; // timestamp (ms)

export default function AlignmentPopUp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show if not dismissed in the last 7 days
    const now = Date.now();
    const until = Number(localStorage.getItem(LS_KEY) || 0);
    if (now > until) setOpen(true);
  }, []);

  function dismiss(hours = 24 * 7) {
    const until = Date.now() + hours * 60 * 60 * 1000;
    localStorage.setItem(LS_KEY, String(until));
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Align to your values"
      onClick={() => dismiss()} // click backdrop to dismiss
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#fefcf9] text-[#5c5045] shadow-2xl border border-black/10 p-6"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-serif mb-2">Need a gentle alignment?</h2>
        <p className="text-sm opacity-80 mb-5">
          Frame a thought and back into alignment with your values.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/reframer"
            onClick={() => dismiss()}
            className="w-full text-center px-6 py-3 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md hover:opacity-90">
            Align now
          </Link>

          <button
            type="button"
            onClick={() => dismiss()}
            className="w-full px-6 py-3 rounded-full border border-black/10 hover:bg-black/5">
            Not now
          </button>
        </div>

        <button
          type="button"
          aria-label="Close"
          onClick={() => dismiss()}
          className="absolute top-3 right-3 rounded-full p-2 hover:bg-black/5">
          ✕
        </button>
      </div>
    </div>
  );
}
