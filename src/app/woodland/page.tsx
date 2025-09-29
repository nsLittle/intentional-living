// src/app/woodland/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllWoodlands from "components/LayoutAllWoodlands";
import Footer from "components/Footer";

type NoteItem = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
  pdf?: string;
  href: string; // route to the detail page
  source: "field-notes" | "woodland-crafts" | "foraged-recipes";
};

function readDir(
  absDir: string,
  baseRoute: "/woodland/field-notes" | "/woodland/woodland-crafts",
  source: Extract<NoteItem["source"], "field-notes" | "woodland-crafts">
): NoteItem[] {
  if (!fs.existsSync(absDir)) return [];

  const files = fs.readdirSync(absDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(absDir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? undefined, // prefer YYYY-MM-DD
      hero: (data.hero as string) ?? undefined,
      text: (data.text as string) ?? undefined,
      pdf: (data.pdf as string) ?? `${slug}.pdf`,
      href: `${baseRoute}/${slug}`,
      source,
    };
  });
}

function readForagedFromRecipes(recipesDirAbs: string): NoteItem[] {
  if (!fs.existsSync(recipesDirAbs)) return [];

  const files = fs.readdirSync(recipesDirAbs).filter((f) => f.endsWith(".mdx"));

  const items: NoteItem[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(recipesDirAbs, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];

    if (!tags.includes("foraged-recipes")) continue;

    items.push({
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? undefined,
      hero: (data.hero as string) ?? undefined,
      text: (data.text as string) ?? undefined,
      pdf: (data.pdf as string) ?? `${slug}.pdf`,
      href: `/recipes/${slug}`,
      source: "foraged-recipes",
    });
  }

  return items;
}

export default function AllNatureNotesIndexPage() {
  // Content folders (adjust if yours differ)
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
  const recipesDir = path.join(process.cwd(), "src", "content", "recipes");

  // Folder-based sections
  const fieldNotes = readDir(
    fieldNotesDir,
    "/woodland/field-notes",
    "field-notes"
  );
  const woodlandCrafts = readDir(
    woodlandCraftsDir,
    "/woodland/woodland-crafts",
    "woodland-crafts"
  );

  // Tag-based add-on: ONLY recipes that are tagged "foraged-recipes"
  // (We do NOT add Field Notes with that tag here to avoid duplicates.)
  const foragedFromRecipes = readForagedFromRecipes(recipesDir);

  // Combine and sort: newest date first; then title A→Z
  const notes: NoteItem[] = [
    ...fieldNotes,
    ...woodlandCrafts,
    ...foragedFromRecipes,
  ].sort((a, b) => {
    const ad = Date.parse(a.date ?? "");
    const bd = Date.parse(b.date ?? "");
    if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });

  return (
    <>
      <HeaderNavBarServer />
      <Header />

      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            All Woodland Notes
          </h1>

          {notes.length === 0 && (
            <p className="mt-6 text-center text-gray-600">
              No notes found. Ensure MDX files exist in:
              <code className="mx-1 px-2 py-0.5 rounded bg-gray-100">
                src/content/field-notes/
              </code>
              <code className="mx-1 px-2 py-0.5 rounded bg-gray-100">
                src/content/woodland-crafts/
              </code>
              <code className="mx-1 px-2 py-0.5 rounded bg-gray-100">
                src/content/recipes/ (tagged with &quot;foraged-recipes&quot;)
              </code>
            </p>
          )}
        </div>
      </div>

      <LayoutAllWoodlands notes={notes} />

      <Footer />
    </>
  );
}
