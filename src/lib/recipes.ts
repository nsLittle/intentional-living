// src/lib/recipes.ts
import { getCollection, type PostMeta } from "./content";

export type RecipeMeta = {
  slug: string;
  title: string;
  date: Date | null;
  hero?: string;
  text?: string;
};

// local, type-safe date parser (content.ts’s helper isn’t exported)
function parseDate(input: unknown): Date | null {
  if (!input) return null;
  if (input instanceof Date && !isNaN(input.getTime())) return input;
  if (typeof input === "string") {
    const d = new Date(input);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function toRecipeMeta(p: PostMeta): RecipeMeta {
  return {
    slug: p.slug,
    title: p.title,
    date: parseDate(p.date),
    hero: p.coverImage || undefined,
    text: p.excerpt || undefined,
  };
}

/**
 * Returns all recipes, already sorted newest-first (frontmatter date with mtime fallback),
 * with drafts filtered out — leveraging getCollection('recipes').
 */
export function getAllRecipes(): RecipeMeta[] {
  const items = getCollection("recipes"); // sorted + drafts filtered
  return items.map(toRecipeMeta);
}

/**
 * Returns the latest recipe (or null if none), using the same sorting rules
 * as getAllRecipes via getCollection('recipes', 1).
 */
export function getLatestRecipe(): RecipeMeta | null {
  const first = getCollection("recipes", 1)[0];
  return first ? toRecipeMeta(first) : null;
}
