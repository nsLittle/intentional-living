// app/components/HeroNowPopUp.tsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type NowPopupProps = {
  storageKey?: string;
  autoCloseMs?: number;
  variant?: "portrait" | "landscape";
};

export default function HeroNowPopup({
  storageKey = "si_now_popup_seen_v1",
  autoCloseMs = 15_000,
  variant = "landscape",
}: NowPopupProps) {
  const [open, setOpen] = useState(true);

  // Use sessionStorage so it shows once per tab/session.
  // Later we can switch to localStorage (once per day/week) if you want.
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(storageKey);
      if (!seen) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!open) return;

    const t = window.setTimeout(() => {
      close();
    }, autoCloseMs);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, autoCloseMs]);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {}
  };

  const dateLabel = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, []);

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes siShimmer {
          0% { transform: translateX(-120%); opacity: 0; }
          20% { opacity: 0.35; }
          50% { opacity: 0.25; }
          100% { transform: translateX(120%); opacity: 0; }
        }
      `}</style>

      {/* <button
        type="button"
        onClick={close}
        className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
        aria-label="Close">
        ✕
      </button> */}

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="A small moment from Simple Intentions"
        className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-10">
          {/* Shimmer overlay */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent"
              style={{ animation: "siShimmer 2.6s ease-in-out infinite" }}
            />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              {/* <div className="text-xs tracking-wide uppercase text-neutral-500">
                A small moment • {dateLabel}
              </div> */}

              <button
                type="button"
                onClick={close}
                className="absolute top-6 right-6 rounded-full px-2 py-1 text-neutral-500 hover:text-neutral-900"
                aria-label="Close">
                ✕
              </button>
            </div>

            {/* <div className="w-full flex justify-center mt-4">
              <Image
                src="/images/notes/orchid-window.jpeg"
                alt="Purple orchid beside a snowy Vermont window"
                width={250}
                height={500}
                priority
                className="rounded-xl shadow-md object-cover"
              />
            </div> */}

            {/* Title banner */}
            <h2 className="text-4xl font-bold leading-snug text-black mb-2 text-center">
              Living life in small gestures.
            </h2>

            <p className="text-base uppercase tracking-widest text-neutral-500 mb-10 text-center">
              A small moment • {dateLabel}
            </p>

            {/* Two column layout */}
            <div className="grid grid-cols-2 gap-16 items-center">
              {/* Left: text */}
              <p className="text-xl leading-9 text-neutral-700 text-center max-w-lg mx-auto">
                A small tropical touch in a winter-scape. On mornings when the
                air bites at the windows and the world outside feels hushed and
                frozen, it can be hard to remember warmth. A gift of orchids
                from a friend rests quietly beside the snow beyond the glass, a
                gentle reminder that growth and care still exist even in the
                coldest seasons. In this small contrast — bloom against frost —
                I am reminded to notice the quiet gestures that soften a day.
              </p>

              {/* Right: image */}
              <div className="flex justify-end">
                <Image
                  src="/images/notes/orchid-window.jpeg"
                  alt="Purple orchid beside a snowy Vermont window"
                  width={380}
                  height={520}
                  priority
                  className="rounded-xl shadow-md object-cover"
                />
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between text-sm text-neutral-500">
              <span>Closes in ~15 seconds</span>

              <div className="flex items-center gap-3">
                <a
                  href="/leave-a-note-contact"
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-neutral-800 hover:bg-neutral-50">
                  Share your own note →
                </a>

                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-neutral-800 hover:bg-neutral-50">
                  Keep wandering →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
