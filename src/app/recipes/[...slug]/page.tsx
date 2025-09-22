// src/app/recipes/[...slug]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs";
import type { Metadata } from "next";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import LayoutRecipe from "components/LayoutRecipe";
import { getAllRecipes } from "lib/recipes";
import LinkReturnPost from "components/LinkReturnPost";

// === Social previews (OG/Twitter) ===
const SITE_ORIGIN = "https://dev--simple-intentions.netlify.app"; // change at launch

type RecipeFrontmatter = {
  title?: string;
  recipe?: string;
  description?: string;
  text?: string;
  hero?: string;
  shareImage?: string;
  date?: string;
  parentPost?: string;
  yield?: string;
  prepTime?: string;
  "prep time"?: string;
  bakingPrepTime?: string;
  bakingTime?: string;
  cookingPrepTime?: string;
  cookingTime?: string;
  bakingIngredients?: string[];
  cookingIngredients?: string[];
  bakingSteps?: string[];
  cookingSteps?: string[];
  notes?: string;
  pdf?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugParts } = await params;
  const filePath =
    path.join(process.cwd(), "src", "content", "recipes", ...slugParts) +
    ".mdx";

  // Read frontmatter
  let fm: Partial<RecipeFrontmatter> = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    fm = data ?? {};
  } catch {
    // If the file isn't found at build time, return minimal metadata
    const fallbackUrl = `${SITE_ORIGIN}/recipes/${slugParts.join("/")}`;
    return {
      title: "Recipe | Simple Intentions",
      alternates: { canonical: fallbackUrl },
    };
  }

  const slugLast = slugParts[slugParts.length - 1];
  const url = `${SITE_ORIGIN}/recipes/${slugParts.join("/")}`;

  const titleBase = fm.title ?? fm.recipe ?? slugLast.replace(/-/g, " ");
  const title = `${titleBase} | Simple Intentions`;

  const description =
    fm.description ?? fm.text ?? "Simple, seasonal recipes from Vermont.";

  // Prefer an explicit share image; else fall back to your 1000×1500 pin; else hero
  const sharePath =
    fm.shareImage ?? `/recipes/${slugLast}/${slugLast}-pin.webp` ?? fm.hero;

  // Ensure absolute URL for social cards
  const shareUrl = sharePath?.startsWith("http")
    ? sharePath
    : `${SITE_ORIGIN}${sharePath ?? ""}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Simple Intentions",
      title,
      description,
      // 1000×1500 matches your Pin asset
      images: sharePath
        ? [{ url: shareUrl, width: 1000, height: 1500 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: sharePath ? [shareUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug.split("/") }));
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugParts = slug;
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
  const title = data.title ?? data.recipe ?? slugParts[slugParts.length - 1];
  const date = data.date ?? undefined;
  const hero = data.hero ?? undefined;
  const parentPost = data.parentPost ?? undefined;
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
      parentPost={parentPost}
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
      <MDXRemote source={content} components={{ LinkReturnPost }} />
    </LayoutRecipe>
  );
}
