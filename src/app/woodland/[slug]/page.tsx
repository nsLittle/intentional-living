// src/app/woodland/[slug]/page.tsx
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import LayoutFieldNotes from "components/LayoutFieldNotes";

export default async function FieldNoteSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "field-notes",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data /*, content*/ } = matter(raw);

  const {
    title = slug,
    date,
    hero,
    parentPost,
    text,
    // materials, // ⟵ remove for now
    // pdf,       // ⟵ remove for now
  } = data as {
    title?: string;
    date?: string;
    hero?: string;
    parentPost?: string;
    text?: string;
    materials?: string[];
    pdf?: string;
  };

  return (
    <LayoutFieldNotes
      title={title}
      date={date}
      hero={hero}
      parentPost={parentPost}
      text={text}
      // materials={materials} // ⟵ remove for now
      // pdf={pdf}             // ⟵ remove for now
    />
  );
}
