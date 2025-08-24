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
  const textToo = data.textToo ?? undefined;
  const recipeYield = data.yield ?? undefined;
  const prepTime = data.prepTime ?? data["prep time"] ?? undefined;
  const ingredients: string[] = Array.isArray(data.ingredients)
    ? data.ingredients
    : [];
  const steps: string[] = Array.isArray(data.steps) ? data.steps : [];
  const notes: string | undefined = data.notes ?? undefined;
  const pdf: string | undefined = data.pdf ?? undefined;

  return (
    <LayoutRecipe
      title={title}
      date={date}
      hero={hero}
      text={text}
      textToo={textToo}
      yield={recipeYield}
      prepTime={prepTime}
      ingredients={ingredients}
      steps={steps}
      notes={notes}
      pdf={pdf}>
      <MDXRemote source={content} />
    </LayoutRecipe>
  );
}
