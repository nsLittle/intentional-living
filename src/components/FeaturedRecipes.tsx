export default function FeaturedRecipes() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-black">
        Featured Recipes & Guides
      </h2>
      <p className="mt-4 text-2xl mb-6 max-w-xl">
        Seasonal foraging finds and wild food recipes from the Vermont woods.
        Learn to identify, harvest, and prepare nature's bounty safely and
        sustainably.
      </p>

      <img
        src="/images/cat-in-moss.png"
        alt="Cat in moss"
        className="rounded-xl shadow-lg w-full max-w-md object-cover"
      />

      <div className="mt-8 flex gap-4 mb-14">
        <button className="bg-[#4b816d] text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-[#3b6c5a]">
          Wild Crafting
        </button>
        <button className="bg-[#f5f0e7] text-[#3c3027] text-lg font-semibold px-6 py-3 rounded-full shadow-md">
          Explore Recipes
        </button>
        <button className="bg-[#f5f0e7] text-[#3c3027] text-lg font-semibold px-6 py-3 rounded-full shadow-md">
          Foraging Guides
        </button>
      </div>
    </div>
  );
}
