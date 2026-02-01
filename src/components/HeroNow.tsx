import React from "react";
import Image from "next/image";

export default function HeroNow() {
  return (
    <section aria-label="Intro" className="max-w-2xl mt-8 mb-8">
      <h1 className="text-4xl font-bold text-black leading-tight">
        My life right now...
      </h1>
      <Image
        src="/images/notes/orchid-window.jpeg"
        alt="Orchids in winter window"
        width={600}
        height={400}
        className="rounded-xl shadow-lg w-full max-w-md object-cover"
      />
      <p>Living life in small gestures.</p>
      <p className="mt-4">
        A small tropical touch in a winter-scape. Even when the temperatures
        reach −10 and it feels difficult to feel warm, a gift of orchids from a
        friend sits beside the snow outside the window, reminding me of warmth,
        growth, and quiet care.
      </p>
    </section>
  );
}
