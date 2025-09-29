// src/components/HeaderNavBarServer.tsx
import path from "path";
import fs from "fs";
import matter from "gray-matter";

import HeaderNavBar from "./HeaderNavBar";
import { getAllRecipes } from "../lib/recipes";
import { getRecentPosts, getPostHighlights } from "../lib/posts";
import { getAllCrafts } from "../lib/crafts";
import { getAllPrintables } from "lib/printables";
import {
  computeRecentPrintables,
  computePrintableHighlights,
} from "lib/printablesRecent";

type RecentLink = { title: string; href: string };

/** Read MDX filenames from a folder and map to {title, href} with gray-matter */
function readMdxAsRecent(
  folderAbs: string,
  hrefBase: string,
  limit: number
): RecentLink[] {
  if (!fs.existsSync(folderAbs)) return [];
  const files = fs
    .readdirSync(folderAbs)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(folderAbs, f), "utf8");
      const { data } = matter(raw);
      const title = (data.title as string) ?? slug;
      const date = (data.date as string) ?? ""; // YYYY-MM-DD preferred
      return { slug, title, date };
    })
    .sort((a, b) => {
      const ad = Date.parse(a.date || "");
      const bd = Date.parse(b.date || "");
      if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    });

  return files.slice(0, limit).map(({ slug, title }) => ({
    title,
    href: `${hrefBase}/${slug}`,
  }));
}

/** Filter Recipes to those tagged `foraged-recipes` and map to recent links */
function recentForagedFromRecipes(limit: number): RecentLink[] {
  // Prefer lib if tags are exposed there; otherwise fall back to reading files directly.
  try {
    const all = getAllRecipes();
    const filtered = all.filter(
      (r: any) => Array.isArray(r.tags) && r.tags.includes("foraged-recipes")
    );
    const sorted = filtered.sort((a: any, b: any) => {
      const ad = Date.parse(a.date || "");
      const bd = Date.parse(b.date || "");
      if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
      return (a.title || "").localeCompare(b.title || "", undefined, {
        sensitivity: "base",
      });
    });
    return sorted.slice(0, limit).map((r: any) => ({
      title: r.title,
      href: `/recipes/${r.slug}`,
    }));
  } catch {
    const recipesDir = path.join(process.cwd(), "src", "content", "recipes");
    if (!fs.existsSync(recipesDir)) return [];
    const files = fs
      .readdirSync(recipesDir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => {
        const slug = f.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(recipesDir, f), "utf8");
        const { data } = matter(raw);
        const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
        const title = (data.title as string) ?? slug;
        const date = (data.date as string) ?? "";
        return { slug, title, date, tags };
      })
      .filter((x) => x.tags.includes("foraged-recipes"))
      .sort((a, b) => {
        const ad = Date.parse(a.date || "");
        const bd = Date.parse(b.date || "");
        if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
        return a.title.localeCompare(b.title, undefined, {
          sensitivity: "base",
        });
      });
    return files.slice(0, limit).map(({ slug, title }) => ({
      title,
      href: `/recipes/${slug}`,
    }));
  }
}

export default async function HeaderNavBarServer() {
  // Posts
  const postsRecent = getRecentPosts(5);
  const postsHighlights = getPostHighlights(4);

  // Recipes
  const recipesRecent = getAllRecipes()
    .slice(0, 6)
    .map((r) => ({ title: r.title, href: `/recipes/${r.slug}` }));

  const recipesHighlights = getAllRecipes()
    .slice(0, 4)
    .map((r) => ({ title: r.title, href: `/recipes/${r.slug}`, img: r.hero }));

  // Crafts (site-wide)
  const crafts = getAllCrafts();
  const craftsRecent = crafts.slice(0, 6).map((c) => ({
    title: c.title,
    href: `/crafts/${c.slug}`,
  }));
  const craftsHighlights = crafts.slice(0, 4).map((c) => ({
    title: c.title,
    href: `/crafts/${c.slug}`,
    img: c.hero,
  }));

  // Printables
  const printablesRecent = computeRecentPrintables(getAllPrintables(), 6);
  const printablesHighlights = computePrintableHighlights(
    getAllPrintables(),
    4
  );

  // Woodlands (UNIFIED recent): Field Notes + Woodland Crafts + Foraged Recipes
  const fieldNotesDir = path.join(
    process.cwd(),
    "src",
    "content",
    "field-notes"
  );
  const woodlandCraftsDir = path.join(
    process.cwd(),
    "src",
    "content",
    "woodland-crafts"
  );

  const fieldNotesRecent = readMdxAsRecent(fieldNotesDir, "/woodland", 6);

  const woodlandCraftsRecent = readMdxAsRecent(
    woodlandCraftsDir,
    "/woodland/woodland-crafts",
    6
  );
  const foragedRecipesRecent = recentForagedFromRecipes(6);

  const woodlandRecent: RecentLink[] = [
    ...fieldNotesRecent,
    ...woodlandCraftsRecent,
    ...foragedRecipesRecent,
  ]
    // sort newest-first by trying to infer from the slug arrays we built above (we already sorted inside each group)
    // keep it simple: just take first 6 after concatenation and intra-group sort, or resort by title as a tie-breaker
    .slice(0, 6);

  return (
    <HeaderNavBar
      postsRecent={postsRecent}
      postsHighlights={postsHighlights}
      recipesRecent={recipesRecent}
      recipesHighlights={recipesHighlights}
      craftsRecent={craftsRecent}
      craftsHighlights={craftsHighlights}
      woodlandRecent={woodlandRecent}
      printablesRecent={printablesRecent}
      printablesHighlights={printablesHighlights}
    />
  );
}
