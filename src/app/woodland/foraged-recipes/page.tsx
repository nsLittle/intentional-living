// src/app/woodland/foraged-recipes/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllFieldNotes from "components/LayoutAllFieldNotes";
import Footer from "components/Footer";

type NoteCard = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
  href?: string; // when coming from /recipes
};

function readTaggedNotes(
  dirAbs: string,
  baseHref: "/woodland/field-notes" | "/recipes"
) {
  if (!fs.existsSync(dirAbs)) return [] as NoteCard[];
  const files = fs.readdirSync(dirAbs).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dirAbs, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));

      const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
      if (!tags.includes("foraged-recipes")) return null;

      const card: NoteCard = {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? undefined,
        hero: (data.hero as string) ?? undefined,
        text: (data.text as string) ?? undefined,
        href:
          baseHref === "/recipes"
            ? `/recipes/${slug}`
            : `/woodland/field-notes/${slug}`,
      };
      return card;
    })
    .filter(Boolean) as NoteCard[];
}

export default function FieldNotesForagedRecipesPage() {
  const fieldNotesDir = path.join(
    process.cwd(),
    "src",
    "content",
    "field-notes"
  );
  const recipesDir = path.join(process.cwd(), "src", "content", "recipes");

  // Gather both sources, filtered by tag
  const fromFieldNotes = readTaggedNotes(fieldNotesDir, "/field-notes");
  const fromRecipes = readTaggedNotes(recipesDir, "/recipes");

  const notes = [...fromFieldNotes, ...fromRecipes].sort((a, b) => {
    const ad = Date.parse(a.date ?? "");
    const bd = Date.parse(b.date ?? "");
    if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0); // newer first
    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            Foraged Recipes
          </h1>
        </div>
      </div>
      <LayoutAllFieldNotes notes={notes} />
      <Footer />
    </>
  );
}
