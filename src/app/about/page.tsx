// app/about/page.tsx
import fs from "node:fs";
import path from "node:path";
import React from "react";
import matter from "gray-matter";
import { marked } from "marked";
import LayoutAbout from "components/LayoutAbout";

export const metadata = {
  title: "About — Simple Intentions",
  description:
    "Mother, home cook, and creator of Simple Intentions — recipes, foraging, and intentional living from Vermont.",
};

const ABOUT_MDX_PATH = path.join(process.cwd(), "src", "content", "about.mdx");

type Frontmatter = {
  title: string;
  date?: string;
  hero?: string;
  tags?: string[];
  text?: string;
};

export default function AboutPage() {
  const file = fs.readFileSync(ABOUT_MDX_PATH, "utf8");
  const { data, content } = matter(file);
  const fm = data as Frontmatter;

  const markdown = fm.text?.trim()?.length ? fm.text : content;
  const html = marked.parse(markdown || "");

  return (
    <LayoutAbout
      title={fm.title ?? "About"}
      date={fm.date}
      hero={fm.hero}
      text={html as string}
    />
  );
}
