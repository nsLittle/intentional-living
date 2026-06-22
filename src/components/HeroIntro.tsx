// src/components/HeroIntro.tsx
import Link from "next/link";

export default function HeroIntro() {
  return (
    <section className="bg-white text-center max-w-4xl mx-auto pt-2">
      <div className="text-center">
        <h2 className="text-5xl font-bold leading-tight mb-4 mt-4">
          Intentional Alignment
        </h2>

        <p className="text-xl italic  leading-relaxed mb-6">
          Simple Intentions helps you define who you are becoming, gather
          evidence from daily life, and discover the patterns shaping your
          story.
        </p>
      </div>

      <div className="text-lg mb-8 [&_a]:underline [&_a]:text-green-700">
        <p className="mb-4">Not perfection.</p>

        <p className="mb-4 text-xl bold">Practice.</p>

        <p className="mb-4">Not goals.</p>

        <p className="mb-4 text-xl  bold">Becoming.</p>
      </div>

      <Link
        href="/alignment"
        className="inline-block bg-[#74aa91] text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition">
        Start Cultivating →
      </Link>
    </section>
  );
}
