import fs from "fs";
import path from "path";
import matter from "gray-matter";
import LayoutPost from "components/LayoutPost";

type FieldNote = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string; // plain text or light markdown-ish
};

function loadFieldNote(slug: string): FieldNote | null {
  const dir = path.join(process.cwd(), "src", "content", "field-notes");
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? undefined,
    hero: (data.hero as string) ?? undefined,
    text: (data.text as string) ?? undefined,
  };
}

// convert plain text to simple HTML so LayoutPost can render it
function toHtml(text?: string) {
  if (!text) return undefined;
  // paragraph-ize double newlines, preserve single newlines
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<p>${escaped
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br/>")}</p>`;
}

// Next 15: params is a Promise in dynamic routes
export default async function FieldNoteDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const note = loadFieldNote(slug);
  if (!note) return null;

  return (
    <LayoutPost
      title={note.title}
      date={note.date}
      hero={note.hero}
      text={toHtml(note.text)}
    />
  );
}
