// src/components/HeroFeaturedRecipes.tsx
import Image from "next/image";

export default function HeroFeaturedRecipes() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">
        Featured Recipes & Guides
      </h2>
      <p className="mt-4 text-xl mb-6 max-w-">
        Seasonal foraging finds and wild food recipes from the Vermont woods.
        Learn to identify, harvest, and prepare nature's bounty safely and
        sustainably.
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
          Wild Crafting
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-white bg-[#3d6f5f] shadow-md">
          Explore Recipes
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-white bg-[#4b816d] shadow-md">
          Foraging Guides
        </button>
      </div>
      <div className="mt-8 flex gap-4 mb-14">
        <button className="px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md">
          Seasonal Cooking
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-[#3c3027] bg-[#9ec5b6] shadow-md">
          Wildcrafting Tips
        </button>
        <button className="px-8 py-5 rounded-full font-semibold text-[#3c3027] bg-[#f5f0e7] shadow-md">
          Simple Intentions
        </button>
      </div>
    </div>
  );
}
