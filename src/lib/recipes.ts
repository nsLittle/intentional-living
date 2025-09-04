// src/lib/recipes.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type RecipeItem = {
  title: string;
  href: string;
  date?: string;
};

export type RecipeLink = {
  title: string;
  href: string;
  img?: string;
  date?: string;
};

const RECIPES_DIR = path.join(process.cwd(), "src", "content", "recipes");

// Recursively collect all .mdx files so nested folders work.
function walkMdxFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walkMdxFiles(full);
    return e.isFile() && e.name.endsWith(".mdx") ? [full] : [];
  });
}

export function getLatestRecipe() {
  if (!fs.existsSync(RECIPES_DIR)) return null;

  const files = walkMdxFiles(RECIPES_DIR);

  const recipes = files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const rel = path.relative(RECIPES_DIR, filePath); // e.g. "soup-pasta/chicken-noodle-soup.mdx"
    const slug = rel.replace(/\\/g, "/").replace(/\.mdx?$/, "");

    // frontmatter date (if valid) else file mtime
    const fmDate =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const date =
      fmDate && !isNaN(fmDate.getTime()) ? fmDate : fs.statSync(filePath).mtime;

    return {
      slug,
      title: data.title || slug,
      date,
      text: data.text ? data.text.slice(0, 200).trim() + "..." : "",
      hero: data.hero || null,
    };
  });

  const sorted = recipes.sort((a, b) => b.date.getTime() - a.date.getTime());
  return sorted[0] ?? null;
}

export function getRecentRecipes(limit = 5): RecipeItem[] {
  if (!fs.existsSync(RECIPES_DIR)) return [];

  const files = walkMdxFiles(RECIPES_DIR);

  const items = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    const rel = path.relative(RECIPES_DIR, filePath);
    const slug = rel.replace(/\\/g, "/").replace(/\.mdx?$/, "");

    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    return {
      title: data?.title ?? slug,
      href: `/recipes/${slug}`,
      date: dateObj.toISOString(),
      _sort: dateObj.getTime(),
    } as any;
  });

  return items
    .sort((a, b) => b._sort - a._sort)
    .slice(0, limit)
    .map(({ _sort, ...rest }) => rest);
}

export function getRecipeHighlights(limit = 4): RecipeLink[] {
  if (!fs.existsSync(RECIPES_DIR)) return [];

  const files = walkMdxFiles(RECIPES_DIR);

  const items = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    const rel = path.relative(RECIPES_DIR, filePath);
    const slug = rel.replace(/\\/g, "/").replace(/\.mdx?$/, "");

    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    const hero =
      typeof data?.hero === "string" && data.hero.trim().length > 0
        ? data.hero.trim()
        : undefined;

    return {
      title: (data?.title as string) ?? slug,
      href: `/recipes/${slug}`,
      img: hero,
      date: dateObj.toISOString(),
      _sort: dateObj.getTime(),
    } as any;
  });

  return items
    .sort((a, b) => b._sort - a._sort)
    .slice(0, limit)
    .map(({ _sort, ...rest }) => rest);
}

// For callers like generateStaticParams — newest first, same fields as above.
export function getAllRecipes() {
  if (!fs.existsSync(RECIPES_DIR)) return [];
  const files = walkMdxFiles(RECIPES_DIR);

  const items = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    const rel = path.relative(RECIPES_DIR, filePath);
    const slug = rel.replace(/\\/g, "/").replace(/\.mdx?$/, "");
    const stat = fs.statSync(filePath);
    const parsed =
      typeof data?.date === "string" ? new Date(data.date) : undefined;
    const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

    return {
      slug,
      title: data?.title ?? slug,
      date: dateObj,
      hero: typeof data?.hero === "string" ? data.hero : undefined,
      text: typeof data?.text === "string" ? data.text : undefined,
      _sort: dateObj.getTime(),
    } as any;
  });

  return items
    .sort((a, b) => b._sort - a._sort)
    .map(({ _sort, ...rest }) => rest);
}
