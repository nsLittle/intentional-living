// src/app/crafts/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { globSync } from "glob";

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllCrafts from "components/LayoutAllCrafts";
import Footer from "components/Footer";

const CRAFTS_DIR = path.join(process.cwd(), "src", "content", "crafts");

export default function CraftsIndexPage() {
  const files = globSync("**/*.mdx", { cwd: CRAFTS_DIR });

  const crafts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(CRAFTS_DIR, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: typeof data.date === "string" ? (data.date as string) : undefined,
        hero: typeof data.hero === "string" ? (data.hero as string) : undefined,
        text:
          (typeof data.text === "string" ? (data.text as string) : undefined) ??
          (typeof data.description === "string"
            ? (data.description as string)
            : undefined),
      };
    })
    .sort((a, b) => {
      const ad = Date.parse(a.date ?? "");
      const bd = Date.parse(b.date ?? "");
      if ((bd || 0) !== (ad || 0)) return (bd || 0) - (ad || 0); // newer first
      const at = (a.title ?? a.slug ?? "").toString();
      const bt = (b.title ?? b.slug ?? "").toString();
      return at.localeCompare(bt, undefined, { sensitivity: "base" }); // A→Z on tie
    });

  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <LayoutAllCrafts heading="All Crafts" crafts={crafts} />
      <Footer />
    </>
  );
}
