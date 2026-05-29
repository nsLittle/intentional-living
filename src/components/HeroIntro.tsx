// src/components/HeroIntro.tsx
import Link from "next/link";

export default function HeroIntro() {
  return (
    <section aria-label="Intro" className="my-2 mt-8">
      <h2 className="text-5xl font-bold leading-tight mb-8">
        Intentional Living Begins With Attention
      </h2>

      <div className="text-lg text-gray-700 mb-8 [&_a]:underline [&_a]:text-green-700">
        <p className="text-2xl italic text-gray-600 leading-relaxed mb-6">
          Life rarely falls apart all at once. More often, we drift.
        </p>

        <p className="mb-4">
          A neglected routine. A crowded schedule. A value forgotten. A season
          of life that quietly asks something different from us.
        </p>

        <p className="mb-4">
          Simple Intentions exists to help you notice that drift and gently
          return to what matters.
        </p>

        <p className="mb-4">
          Here you&apos;ll find reflections, practical tools, seasonal projects,
          recipes, and small daily practices designed to bring greater clarity,
          steadiness, and intention to ordinary life.
        </p>

        <p>
          Not through perfection. Through attention. Through returning. Through
          small actions repeated often enough to shape a life.
        </p>
      </div>

      <Link
        href="/alignment"
        className="text-green-700 font-semibold hover:underline">
        Try the Alignment Tool →
      </Link>
    </section>
  );
}
