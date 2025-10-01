// src/app/woodland/foraged-recipes/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllFieldNotes from "components/LayoutAllFieldNotes";

import Footer from "components/Footer";

type RecipeSummary = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
};

function readRecipes(): RecipeSummary[] {
  const dir = path.join(process.cwd(), "src", "content", "foraged-recipes");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const recipes = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? undefined,
      hero: (data.hero as string) ?? undefined,
      text: (data.text as string) ?? undefined,
    };
  });

  // newest date first, then title A→Z
  return recipes.sort((a, b) => {
    const ad = Date.parse(a.date ?? "");
    const bd = Date.parse(b.date ?? "");
    if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
    return (a.title ?? a.slug).localeCompare(b.title ?? b.slug, undefined, {
      sensitivity: "base",
    });
  });
}

export default function ForagedRecipesIndexPage() {
  const recipes = readRecipes();

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <LayoutAllFieldNotes notes={recipes} heading="Foraged Recipes" />
      <Footer />
    </>
  );
}
