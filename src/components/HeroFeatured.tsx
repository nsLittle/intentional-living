// src/components/HeroFeatured.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroFeatured() {
  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold mb-6">Featured Recipes & Guides</h2>
      <p className="mt-4 text-xl mb-8 max-w  leading-relaxed">
        Meander through our woodsy pages for inspiration and simple intentions.
        From seasonal foraging finds, recipes and wild crafting from Vermont.
      </p>

      <Image
        src="/images/notes/cat-in-moss.jpeg"
        alt="Cat in moss"
        width={600}
        height={400}
        className="rounded-xl shadow-lg w-full max-w-md object-cover"
      />

      <div className="mt-12 flex gap-4 mb-8">
        <Link
          href="/notes"
          className="inline-flex items-center justify-center w-36 h-16 rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
          Notes
        </Link>
        <Link
          href="/recipes"
          className="inline-flex items-center justify-center w-36 h-16 rounded-full font-semibold text-white bg-[#3d6f5f] shadow-md">
          Recipes
        </Link>
        <Link
          href="/crafts"
          className="inline-flex items-center justify-center w-36 h-16 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md">
          Crafts
        </Link>
      </div>

      <div className="mt-8 flex gap-4 mb-14">
        <Link
          href="/woodland"
          className="inline-flex items-center justify-center w-36 h-16 rounded-full font-semibold text-[#2f3b32] bg-[#b8c9b4] shadow-md">
          Woodlands
        </Link>
        <Link
          href="/alignment"
          className="inline-flex items-center justify-center w-36 h-16 rounded-full font-semibold text-white bg-[#8b6e4e] shadow-md">
          Alignment
        </Link>
        <Link
          href="/printables"
          className="inline-flex items-center justify-center w-36 h-16 rounded-full font-semibold text-[#3c3027] bg-[#eae3d4] shadow-md">
          Printables
        </Link>
      </div>
    </div>
  );
}
