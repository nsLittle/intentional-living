import Link from "next/link";
import { getLatestRecipe } from "lib/recipes";

export default function HeroLatestRecipe() {
  const recipe = getLatestRecipe();

  if (!recipe) return null;

  return (
    <section className="my-12">
      <h2 className="text-4xl font-bold mb-6">My Latest Kitchen Goodies…</h2>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {recipe.hero && (
          <img
            src={recipe.hero}
            alt={recipe.title}
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-md"
          />
        )}

        <div className="flex-1">
          <Link href={`/recipes/${recipe.slug}`}>
            <h3 className="text-2xl font-semibold text-gray-800 hover:underline mb-2">
              {recipe.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mb-6">
            {recipe.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-lg text-gray-700 mb-8">{recipe.text}</p>
          <Link
            href={`/recipes/${recipe.slug}`}
            className="text-green-700 font-semibold hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </section>
  );
}
