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
import { getWoodlandHighlights } from "lib/woodland";
import { isPublished } from "lib/publish";

type RecentLink = { title: string; href: string };

type PublishAwareRecent = { title: string; href: string; date: string };

type HighlightLink = { title: string; href: string; img?: string };

// type CraftLite = {
//   slug: string;
//   title: string;
//   date?: string;
//   hero?: string;
//   published?: boolean;
// };

type NoteRecent = { title: string; href: string; date: string };

type WoodlandHighlight = {
  title: string;
  href: string;
  img?: string;
  date: string;
};

/** Read MDX filenames from a folder and map to {title, href} with gray-matter */
// function readMdxAsRecent(
//   folderAbs: string,
//   hrefBase: string,
//   limit: number
// ): RecentLink[] {
//   if (!fs.existsSync(folderAbs)) return [];
//   const files = fs
//     .readdirSync(folderAbs)
//     .filter((f) => f.endsWith(".mdx"))
//     .map((f) => {
//       const slug = f.replace(/\.mdx$/, "");
//       const raw = fs.readFileSync(path.join(folderAbs, f), "utf8");
//       const { data } = matter(raw);
//       const title = (data.title as string) ?? slug;
//       const date = (data.date as string) ?? ""; // YYYY-MM-DD preferred
//       return { slug, title, date };
//     })
//     .sort((a, b) => {
//       const ad = Date.parse(a.date || "");
//       const bd = Date.parse(b.date || "");
//       if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
//       return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
//     });

//   return files.slice(0, limit).map(({ slug, title }) => ({
//     title,
//     href: `${hrefBase}/${slug}`,
//   }));
// }

function readMdxRecentPublished(
  absDir: string,
  hrefBase: "/woodland/field-notes" | "/woodland/woodland-crafts",
  limit: number
): NoteRecent[] {
  if (!fs.existsSync(absDir)) return [];
  const files = fs.readdirSync(absDir).filter((f) => f.endsWith(".mdx"));

  const rows = files
    .map((f) => {
      const slug = f.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(absDir, f), "utf8");
      const { data } = matter(raw);
      if (!isPublished(data)) return null;

      const stat = fs.statSync(path.join(absDir, f));
      const parsed =
        typeof data?.date === "string" ? new Date(data.date) : undefined;
      const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

      return {
        title: (data?.title as string) ?? slug,
        href: `${hrefBase}/${slug}`,
        date: dateObj.toISOString(),
      };
    })
    .filter((x): x is NoteRecent => Boolean(x))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return rows;
}

function readMdxHighlightsPublished(
  absDir: string,
  hrefBase: "/woodland/field-notes" | "/woodland/woodland-crafts",
  limit: number
): WoodlandHighlight[] {
  if (!fs.existsSync(absDir)) return [];
  const files = fs.readdirSync(absDir).filter((f) => f.endsWith(".mdx"));

  const rows = files
    .map((f) => {
      const slug = f.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(absDir, f), "utf8");
      const { data } = matter(raw);
      if (!isPublished(data)) return null;

      const stat = fs.statSync(path.join(absDir, f));
      const parsed =
        typeof data?.date === "string" ? new Date(data.date) : undefined;
      const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

      const hero =
        typeof data?.hero === "string" && data.hero.trim().length > 0
          ? data.hero.trim()
          : undefined;

      return {
        title: (data?.title as string) ?? slug,
        href: `${hrefBase}/${slug}`,
        img: hero,
        date: dateObj.toISOString(),
      };
    })
    .filter((x): x is WoodlandHighlight => Boolean(x))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return rows;
}

/** Recent, publish-aware reader for a recipes folder */
function readRecipesRecentPublished(
  recipesDirAbs: string,
  limit: number
): PublishAwareRecent[] {
  if (!fs.existsSync(recipesDirAbs)) return [];

  // Walk recursively like lib/recipes does
  const walkMdxFiles = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walkMdxFiles(full);
      return e.isFile() && e.name.endsWith(".mdx") ? [full] : [];
    });

  const files = walkMdxFiles(recipesDirAbs);

  const rows = files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);

      // compute slug relative to recipes root (supports nested)
      const rel = path.relative(recipesDirAbs, filePath);
      const slug = rel.replace(/\\/g, "/").replace(/\.mdx?$/, "");

      // publish gate (drafts + future-dated hidden)
      if (!isPublished(data)) return null;

      // date fallback to mtime (same pattern as lib)
      const stat = fs.statSync(filePath);
      const parsed =
        typeof data?.date === "string" ? new Date(data.date) : undefined;
      const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

      return {
        title: (data?.title as string) ?? slug,
        href: `/recipes/${slug}`,
        date: dateObj.toISOString(),
      };
    })
    .filter((x): x is PublishAwareRecent => Boolean(x))
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() // newest first
    )
    .slice(0, limit);

  return rows;
}

function readRecipesHighlightsPublished(
  recipesDirAbs: string,
  limit: number
): HighlightLink[] {
  if (!fs.existsSync(recipesDirAbs)) return [];

  const walkMdxFiles = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walkMdxFiles(full);
      return e.isFile() && e.name.endsWith(".mdx") ? [full] : [];
    });

  const files = walkMdxFiles(recipesDirAbs);

  const rows = files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      if (!isPublished(data)) return null;

      const rel = path.relative(recipesDirAbs, filePath);
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
      };
    })
    .filter(
      (x): x is HighlightLink & { date: string } =>
        x !== null && typeof x.date === "string"
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
    .map(({ title, href, img }) => ({ title, href, img }));

  return rows;
}

/** Filter Recipes to those tagged `foraged-recipes` and map to recent links */
// function recentForagedFromRecipes(limit: number): RecentLink[] {
//   // Prefer lib if tags are exposed there; otherwise fall back to reading files directly.
//   try {
//     const all = getAllRecipes();
//     const filtered = all.filter(
//       (r: any) => Array.isArray(r.tags) && r.tags.includes("foraged-recipes")
//     );
//     const sorted = filtered.sort((a: any, b: any) => {
//       const ad = Date.parse(a.date || "");
//       const bd = Date.parse(b.date || "");
//       if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
//       return (a.title || "").localeCompare(b.title || "", undefined, {
//         sensitivity: "base",
//       });
//     });
//     return sorted.slice(0, limit).map((r: any) => ({
//       title: r.title,
//       href: `/recipes/${r.slug}`,
//     }));
//   } catch {
//     const recipesDir = path.join(process.cwd(), "src", "content", "recipes");
//     if (!fs.existsSync(recipesDir)) return [];
//     const files = fs
//       .readdirSync(recipesDir)
//       .filter((f) => f.endsWith(".mdx"))
//       .map((f) => {
//         const slug = f.replace(/\.mdx$/, "");
//         const raw = fs.readFileSync(path.join(recipesDir, f), "utf8");
//         const { data } = matter(raw);
//         const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
//         const title = (data.title as string) ?? slug;
//         const date = (data.date as string) ?? "";
//         return { slug, title, date, tags };
//       })
//       .filter((x) => x.tags.includes("foraged-recipes"))
//       .sort((a, b) => {
//         const ad = Date.parse(a.date || "");
//         const bd = Date.parse(b.date || "");
//         if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
//         return a.title.localeCompare(b.title, undefined, {
//           sensitivity: "base",
//         });
//       });
//     return files.slice(0, limit).map(({ slug, title }) => ({
//       title,
//       href: `/recipes/${slug}`,
//     }));
//   }
// }

function readForagedRecipesRecentPublished(
  recipesDirAbs: string,
  limit: number
): NoteRecent[] {
  if (!fs.existsSync(recipesDirAbs)) return [];

  // Walk recursively so nested recipe folders work
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walk(full);
      return e.isFile() && e.name.endsWith(".mdx") ? [full] : [];
    });

  const files = walk(recipesDirAbs);

  const rows = files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);

      const tags = Array.isArray(data?.tags) ? (data.tags as string[]) : [];
      if (!tags.includes("foraged-recipes")) return null;
      if (!isPublished(data)) return null;

      const rel = path.relative(recipesDirAbs, filePath);
      const slug = rel.replace(/\\/g, "/").replace(/\.mdx?$/, "");

      const stat = fs.statSync(filePath);
      const parsed =
        typeof data?.date === "string" ? new Date(data.date) : undefined;
      const dateObj = parsed && !isNaN(parsed.getTime()) ? parsed : stat.mtime;

      return {
        title: (data?.title as string) ?? slug,
        href: `/recipes/${slug}`,
        date: dateObj.toISOString(),
      };
    })
    .filter((x): x is NoteRecent => Boolean(x))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return rows;
}

function readForagedRecipesHighlightsPublished(
  recipesDirAbs: string,
  limit: number
): WoodlandHighlight[] {
  if (!fs.existsSync(recipesDirAbs)) return [];

  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walk(full);
      return e.isFile() && e.name.endsWith(".mdx") ? [full] : [];
    });

  const files = walk(recipesDirAbs);

  const rows = files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);

      const tags = Array.isArray(data?.tags) ? (data.tags as string[]) : [];
      if (!tags.includes("foraged-recipes")) return null;
      if (!isPublished(data)) return null;

      const rel = path.relative(recipesDirAbs, filePath);
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
      };
    })
    .filter((x): x is WoodlandHighlight => Boolean(x))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return rows;
}

export default async function HeaderNavBarServer() {
  // Posts
  const postsRecent = getRecentPosts(5);
  const postsHighlights = getPostHighlights(4);

  // Recipes
  const recipesDirAbs = path.join(process.cwd(), "src", "content", "recipes");
  const recipesRecent = readRecipesRecentPublished(recipesDirAbs, 6).map(
    (r) => ({
      title: r.title,
      href: r.href,
      date: r.date,
    })
  );

  const recipesHighlights = readRecipesHighlightsPublished(recipesDirAbs, 4);

  // Crafts (site-wide, publish-aware; typed via return element)
  type CraftDetail = ReturnType<typeof getAllCrafts>[number];
  const craftsAll: CraftDetail[] = getAllCrafts();

  const craftsRecent = craftsAll
    .filter((c) => isPublished(c))
    .sort((a, b) => b.date.getTime() - a.date.getTime()) // newest first
    .slice(0, 6)
    .map((c) => ({
      title: c.title,
      href: `/crafts/${c.slug}`,
      date: c.date.toISOString(),
    }));

  const craftsHighlights = craftsAll
    .filter((c) => isPublished(c))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 4)
    .map((c) => ({
      title: c.title,
      href: `/crafts/${c.slug}`,
      img: c.hero,
      date: c.date.toISOString(),
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

  const fieldNotesRecent = readMdxRecentPublished(
    fieldNotesDir,
    "/woodland/field-notes",
    6
  );

  const woodlandCraftsRecent = readMdxRecentPublished(
    woodlandCraftsDir,
    "/woodland/woodland-crafts",
    6
  );

  const foragedRecipesRecent = readForagedRecipesRecentPublished(
    recipesDirAbs,
    6
  );

  const woodlandRecent: RecentLink[] = [
    ...fieldNotesRecent,
    ...woodlandCraftsRecent,
    ...foragedRecipesRecent,
  ].slice(0, 6);

  const woodlandHighlights = [
    ...readMdxHighlightsPublished(fieldNotesDir, "/woodland/field-notes", 8),
    ...readMdxHighlightsPublished(
      woodlandCraftsDir,
      "/woodland/woodland-crafts",
      8
    ),
    ...readForagedRecipesHighlightsPublished(recipesDirAbs, 8),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(({ title, href, img }) => ({ title, href, img }));

  return (
    <HeaderNavBar
      postsRecent={postsRecent}
      postsHighlights={postsHighlights}
      recipesRecent={recipesRecent}
      recipesHighlights={recipesHighlights}
      craftsRecent={craftsRecent}
      craftsHighlights={craftsHighlights}
      woodlandRecent={woodlandRecent}
      woodlandHighlights={woodlandHighlights}
      printablesRecent={printablesRecent}
      printablesHighlights={printablesHighlights}
    />
  );
}
