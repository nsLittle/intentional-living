// src/compoenents/LayoutAllRecipes.tsx
import Link from "next/link";
import Image from "next/image";
import ReturnHome from "./LinkReturnHome";

type RecipeSummary = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
};

type LayoutAllRecipesProps = {
  recipes: RecipeSummary[];
  heading?: string;
};

export default function LayoutAllRecipes({
  recipes,
  heading,
}: LayoutAllRecipesProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {heading ?? "All Recipes"} {/* UPDATED */}
        </h1>
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {recipes.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="block group">
              <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
                {recipe.hero && (
                  <Image
                    src={recipe.hero}
                    alt={recipe.title}
                    width={800}
                    height={450}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-black mb-2 group-hover:underline">
                    {recipe.title}
                  </h2>
                  {recipe.date && (
                    <p className="text-sm text-gray-500 mb-4">{recipe.date}</p>
                  )}
                  {recipe.text && (
                    <p className="text-lg line-clamp-3">{recipe.text}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ReturnHome />
      </div>
    </div>
  );
}
