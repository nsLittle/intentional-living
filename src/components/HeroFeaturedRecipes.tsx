// src/components/HeroFeaturedRecipes.tsx
import Image from "next/image";

export default function HeroFeaturedRecipes() {
  return (
    <div className="mt-16">
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

      <div className="mt-8 flex gap-4 mb-14">
        <button className="px-8 py-5 rounded-full font-semibold text-white bg-[#2f5d50] shadow-md">
          <a href="/recipes">Explore Recipes</a>
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-white bg-[#3d6f5f] shadow-md">
          <a href="/crafts">Explore Crafts</a>
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-white bg-[#4b816d] shadow-md">
          <a href="/printables">Explore Printables</a>
        </button>
      </div>
      <div className="mt-8 flex gap-4 mb-14">
        <button className="px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md">
          To Be Determined
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-[#3c3027] bg-[#9ec5b6] shadow-md">
          To Be Determined
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-[#3c3027] bg-[#f5f0e7] shadow-md">
          <a href="/reframer">Simple Reframer</a>
        </button>
      </div>
    </div>
  );
}
