import fs from "fs";
import path from "path";
import matter from "gray-matter";
import LayoutWoodlandsCraft from "components/LayoutWoodlandCrafts";

type Craft = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
  materials?: string[];
  instructions?: string;
  pdf?: string;
  parentPost?: string;
};

function loadCraft(slug: string): Craft | null {
  const dir = path.join(process.cwd(), "src", "content", "woodland-crafts");
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? undefined,
    hero: (data.hero as string) ?? undefined,
    text: (data.text as string) ?? undefined,
    materials: (data.materials as string[]) ?? undefined,
    instructions: (data.instructions as string) ?? undefined,
    pdf: (data.pdf as string) ?? undefined,
    parentPost: (data.parentPost as string) ?? undefined,
  };
}

// simple plain-text → HTML so LayoutPost can render it
function toHtml(text?: string) {
  if (!text) return undefined;
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<p>${escaped
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br/>")}</p>`;
}

// Next 15 dynamic routes: params is a Promise
export default async function WoodlandCraftDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const craft = loadCraft(slug);
  if (!craft) return null;

  return (
    <LayoutWoodlandsCraft
      title={craft.title}
      date={craft.date}
      hero={craft.hero}
      parentPost={craft.parentPost}
      text={toHtml(craft.text)}
      materials={craft.materials}
      instructions={craft.instructions}
      pdf={craft.pdf}
    />
  );
}
