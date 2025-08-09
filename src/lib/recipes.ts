// src/lib/recipes.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RECIPES_DIR = path.join(process.cwd(), "src", "content", "recipes");

export type RecipeMeta = {
  slug: string;
  title: string;
  date: Date | null;
  hero?: string;
  text?: string;
};

function parseDate(input: unknown): Date | null {
  if (!input || typeof input !== "string") return null;
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

function readRecipeFile(slug: string): RecipeMeta | null {
  const filePath = path.join(RECIPES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  const title = (data.title as string) ?? (data.recipe as string) ?? slug;
  const date = parseDate(data.date);
  const hero = (data.hero as string) || undefined;
  const text =
    (data.text as string) ||
    (data.description as string) ||
    (data["text too"] as string) ||
    undefined;

  return { slug, title, date, hero, text };
}

export function getAllRecipes(): RecipeMeta[] {
  if (!fs.existsSync(RECIPES_DIR)) return [];

  const slugs = fs
    .readdirSync(RECIPES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const items = slugs
    .map(readRecipeFile)
    .filter((x): x is RecipeMeta => Boolean(x));

  // Sort by date desc; fall back to file mtime for undated files
  items.sort((a, b) => {
    if (a.date && b.date) return b.date.getTime() - a.date.getTime();
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;

    const aMtime = fs.statSync(path.join(RECIPES_DIR, `${a.slug}.mdx`)).mtime;
    const bMtime = fs.statSync(path.join(RECIPES_DIR, `${b.slug}.mdx`)).mtime;
    return bMtime.getTime() - aMtime.getTime();
  });

  return items;
}

export function getLatestRecipe(): RecipeMeta | null {
  const all = getAllRecipes();
  return all.length ? all[0] : null;
}
