// src/components/HeroFeatured.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroFeatured() {
  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold mb-6">Featured Recipes & Guides</h2>
      <p className="mt-4 text-xl mb-6 max-w-">
        Seasonal foraging finds, recipes and wild crafting from Vermont. Meader
        through our woodsy pages for inspiration and simple intentions.
      </p>

      <Image
        src="/images/posts/cat-in-moss.png"
        alt="Cat in moss"
        width={600}
        height={400}
        className="rounded-xl shadow-lg w-full max-w-md object-cover"
      />

      <div className="mt-8 flex gap-4 mb-8">
        <button
          className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap
 rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
          <Link
            href="/recipes"
            className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
            Recipes
          </Link>
        </button>
        <button
          className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap
 rounded-full font-semibold text-white bg-[#3d6f5f] shadow-md">
          <Link
            href="/crafts"
            className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
            Crafts
          </Link>
        </button>
        <button
          className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap
 rounded-full font-semibold text-white bg-[#4b816d] shadow-md">
          <Link
            href="/printables"
            className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
            Printables
          </Link>
        </button>
      </div>
      <div className="mt-8 flex gap-4 mb-14">
        <button
          className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap
 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md">
          <Link
            href="/posts"
            className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
            Posts
          </Link>
        </button>
        <button
          className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap
 rounded-full font-semibold text-[#3c3027] bg-[#9ec5b6] shadow-md">
          TBD
        </button>
        <button
          className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap
 rounded-full font-semibold text-[#3c3027] bg-[#f5f0e7] shadow-md">
          <Link
            href="/reframer"
            className="inline-flex items-center justify-center w-36 h-16 whitespace-nowrap rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
            Alignment
          </Link>
        </button>
      </div>
    </div>
  );
}
