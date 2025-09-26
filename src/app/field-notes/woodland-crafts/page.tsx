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
  href?: string; // override link target based on source folder
};

function readTagged(
  dirAbs: string,
  baseHref: "/field-notes" | "/crafts",
  tag: string
): NoteCard[] {
  if (!fs.existsSync(dirAbs)) return [];
  const files = fs.readdirSync(dirAbs).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dirAbs, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));

      const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
      if (!tags.includes(tag)) return null;

      const note: NoteCard = {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? undefined, // Prefer ISO: YYYY-MM-DD
        hero: (data.hero as string) ?? undefined,
        text: (data.text as string) ?? undefined,
        href:
          baseHref === "/crafts"
            ? (`/crafts/${slug}` as const)
            : (`/field-notes/${slug}` as const),
      };
      return note;
    })
    .filter(Boolean) as NoteCard[];
}

export default function FieldNotesWoodlandCraftsPage() {
  const fieldNotesDir = path.join(
    process.cwd(),
    "src",
    "content",
    "field-notes"
  );
  const craftsDir = path.join(process.cwd(), "src", "content", "crafts");

  const fromFieldNotes = readTagged(
    fieldNotesDir,
    "/field-notes",
    "woodland-crafts"
  );
  const fromCrafts = readTagged(craftsDir, "/crafts", "woodland-crafts");

  const notes = [...fromFieldNotes, ...fromCrafts].sort((a, b) => {
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
            Woodland Crafts
          </h1>
        </div>
      </div>
      <LayoutAllFieldNotes notes={notes} />
      <Footer />
    </>
  );
}
