// src/app/field-notes/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllFieldNotes from "components/LayoutAllFieldNotes";
import Footer from "components/Footer";

export default function FieldNotesIndexPage() {
  const dir = path.join(process.cwd(), "src", "content", "field-notes");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))
    : [];

  const notes = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? undefined,
        hero: (data.hero as string) ?? undefined,
        text: (data.text as string) ?? undefined,
        pdf: (data.pdf as string) ?? `${slug}.pdf`,
      };
    })
    .sort((a, b) => {
      const ad = Date.parse(a.date ?? "");
      const bd = Date.parse(b.date ?? "");
      if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0); // newer first
      const at = (a.title ?? a.slug ?? "").toString();
      const bt = (b.title ?? b.slug ?? "").toString();
      return at.localeCompare(bt, undefined, { sensitivity: "base" }); // A→Z
    });

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            All Field Notes
          </h1>
        </div>
      </div>
      <LayoutAllFieldNotes notes={notes} />
      <Footer />
    </>
  );
}
