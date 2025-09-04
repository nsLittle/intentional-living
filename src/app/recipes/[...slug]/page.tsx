// src/app/recipes/[slug]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import LayoutRecipe from "components/LayoutRecipe";
import { getAllRecipes } from "lib/recipes";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "recipes");

// Emit params for nested files, e.g. { slug: ["cookies","m-and-m-cookies"] }
export async function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug.split("/") }));
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string | string[] };
}) {
  const { slug: slugParam } = await params;
  const slugParts = Array.isArray(slugParam) ? slugParam : [slugParam];

  if (slugParts.length < 1) {
    return notFound();
  }

  const filePath =
    path.join(process.cwd(), "src", "content", "recipes", ...slugParts) +
    ".mdx";

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch {
    return notFound(); // renders your global app/not-found.tsx
  }

  const { content, data } = matter(fileContent);

  // Normalize frontmatter keys we expect in the layout
  const title = data.title ?? data.recipe ?? params.slug;
  const date = data.date ?? undefined;
  const hero = data.hero ?? undefined;
  const text = data.text ?? undefined;
  const recipeYield = data.yield ?? undefined;
  const prepTime = data.prepTime ?? data["prep time"] ?? undefined;
  const ingredients: string[] = Array.isArray(data.ingredients)
    ? data.ingredients
    : [];
  const steps: string[] = Array.isArray(data.steps) ? data.steps : [];
  const bakingPrepTime =
    data.bakingPrepTime ?? data.cookingPrepTime ?? undefined;
  const bakingTime = data.bakingTime ?? data.cookingTime ?? undefined;
  const bakingIngredients: string[] =
    Array.isArray(data.bakingIngredients) && data.bakingIngredients.length
      ? data.bakingIngredients
      : Array.isArray(data.cookingIngredients)
      ? data.cookingIngredients
      : [];
  const bakingSteps: string[] =
    Array.isArray(data.bakingSteps) && data.bakingSteps.length
      ? data.bakingSteps
      : Array.isArray(data.cookingSteps)
      ? data.cookingSteps
      : [];
  // Decide which label to show based on which fields exist
  const hasBaking =
    Boolean(data.bakingPrepTime || data.bakingTime) ||
    (Array.isArray(data.bakingIngredients) &&
      data.bakingIngredients.length > 0) ||
    (Array.isArray(data.bakingSteps) && data.bakingSteps.length > 0);

  const hasCooking =
    Boolean(data.cookingPrepTime || data.cookingTime) ||
    (Array.isArray(data.cookingIngredients) &&
      data.cookingIngredients.length > 0) ||
    (Array.isArray(data.cookingSteps) && data.cookingSteps.length > 0);

  const methodLabel: "Baking" | "Cooking" | undefined = hasBaking
    ? "Baking"
    : hasCooking
    ? "Cooking"
    : undefined;
  const notes: string | undefined = data.notes ?? undefined;
  const pdf: string | undefined = data.pdf ?? undefined;

  return (
    <LayoutRecipe
      title={title}
      date={date}
      hero={hero}
      text={text}
      yield={recipeYield}
      prepTime={prepTime}
      ingredients={ingredients}
      steps={steps}
      bakingPrepTime={bakingPrepTime}
      bakingTime={bakingTime}
      bakingIngredients={bakingIngredients}
      bakingSteps={bakingSteps}
      notes={notes}
      pdf={pdf}
      methodLabel={methodLabel}>
      <MDXRemote source={content} />
    </LayoutRecipe>
  );
}
