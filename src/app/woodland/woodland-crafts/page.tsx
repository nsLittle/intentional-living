import fs from "fs";
import path from "path";
import matter from "gray-matter";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllCrafts from "components/LayoutAllCrafts";
import Footer from "components/Footer";

type CraftSummary = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
};

function readCrafts(): CraftSummary[] {
  const dir = path.join(process.cwd(), "src", "content", "woodland-crafts");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const crafts = files.map((file) => {
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
  return crafts.sort((a, b) => {
    const ad = Date.parse(a.date ?? "");
    const bd = Date.parse(b.date ?? "");
    if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0);
    return (a.title ?? a.slug).localeCompare(b.title ?? b.slug, undefined, {
      sensitivity: "base",
    });
  });
}

export default function WoodlandCraftsIndexPage() {
  const crafts = readCrafts();

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <LayoutAllCrafts crafts={crafts} heading="Woodland Crafts" />
      <Footer />
    </>
  );
}
