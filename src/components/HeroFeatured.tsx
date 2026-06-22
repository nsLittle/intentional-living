// src/components/HeroFeatured.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroFeatured() {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mt-8 mb-8 text-center">
        Recipes, Crafts & Field Notes
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">
        <Image
          src="/images/notes/cat-in-moss.jpeg"
          alt="Cat in moss"
          width={400}
          height={300}
          className="rounded-xl shadow-lg w-full max-w-sm object-cover"
        />

        <div className="flex flex-col justify-between w-full max-w-xl mx-auto text-center lg:text-left lg:self-stretch lg:pt-12">
          {" "}
          <p className="text-xl leading-relaxed text-center lg:text-left mx-auto">
            Meander through our woodsy pages for inspiration and simple
            intentions. From seasonal foraging finds, recipes and wild crafting
            from Vermont. Simple Intentions is a collection of recipes, crafts,
            woodland field notes, and reflections on intentional living. Created
            from slow days, curious wandering, and the belief that meaningful
            lives are built through small practices repeated with care. Explore
            what speaks to you and gather a few simple ideas to carry into your
            own season.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-4 lg:gap-y-2">
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
      </div>
    </div>
  );
}
