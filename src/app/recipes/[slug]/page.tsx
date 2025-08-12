// src/app/recipes/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import LayoutRecipe from "components/LayoutRecipe";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "content", "recipes");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "recipes",
    `${slug}.mdx`
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
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
    <div className="prose mx-auto px-6 py-12">
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
    </div>
  );
}
