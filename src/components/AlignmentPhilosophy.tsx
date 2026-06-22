"use client";

import { useState } from "react";
import ReAlignment from "components/ReAlignment";

export default function AlignmentPhilosophy() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started && (
        <section className="bg-white text-black">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
              Intentional Alignment
            </h1>

            <p className="mt-4 font-serif text-[#5c5045] text-lg text-center max-w-2xl mx-auto">
              True change begins by naming who you are becoming.
            </p>

            <p className="mt-4 font-serif text-[#5c5045] text-lg text-center max-w-2xl mx-auto">
              Simple Intentions helps you turn that becoming into one small
              practice you return to everyday.
            </p>

            <p className="mt-4 font-serif text-[#5c5045] text-lg text-center max-w-2xl mx-auto">
              The goal is not perfection. The goal is returning.
            </p>
          </div>
        </section>
      )}

      <main className="bg-white text-black py-12">
        <ReAlignment onStart={() => setStarted(true)} />
      </main>
    </>
  );
}
