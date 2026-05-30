// src/components/HeroIntro.tsx
import Link from "next/link";
import Image from "next/image";

export default function HeroIntro() {
  return (
    <section className="text-center max-w-4xl mx-auto pt-2">
      <div className="text-center">
        <h2 className="text-5xl font-bold leading-tight mb-4 mt-4">
          Intentional Living
        </h2>

        <p className="text-2xl italic text-gray-600 leading-relaxed mb-6">
          When Life Feels Slightly Off, Start Here.
        </p>
      </div>

      {/* <Image
        src="/images/lichen-log.png"
        alt="Mushroom log"
        width={1200}
        height={300}
        className="w-full max-w-2xl h-32 object-cover rounded-xl mx-auto my-8"
      /> */}

      <div className="text-lg text-gray-700 mb-8 [&_a]:underline [&_a]:text-green-700">
        <p className="mb-4">
          Life rarely falls apart all at once. More often, we drift. Sometimes
          we know something isn&apos;t working long before we understand why.
        </p>

        <p className="mb-4">
          A neglected routine. A crowded schedule. A value forgotten. A season
          of life that quietly asks something different from us.
        </p>

        <p className="mb-4">
          A season changes, but we keep living as though nothing has changed.
          Simple Intentions helps you:
        </p>

        <ul className="space-y-4 list-none">
          <li>✓ Notice what feels out of alignment</li>
          <li>✓ Reflect on what matters most</li>
          <li>✓ Define a season of intentional growth</li>
          <li>✓ Track how your intentions evolve over time</li>
          <li>✓ Build evidence of change through daily practice</li>
        </ul>

        {/* <p className="mb-4">
          Whether you&apos;re cultivating health, relationships, creativity,
          work, or simply a more meaningful life, the process begins by paying
          attention.
        </p>

        <p className="mb-4">
          Not through perfection. Through attention. Through returning. Through
          small actions repeated often enough to shape a life.
        </p> */}
      </div>

      <Link
        href="/alignment"
        className="text-green-700 font-semibold hover:underline">
        Start your Alignment Reflection →
      </Link>
    </section>
  );
}
