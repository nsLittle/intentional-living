import path from "path";
import fs from "fs";
import matter from "gray-matter";
import LayoutFieldNotes from "components/LayoutFieldNotes";

export default async function FieldNoteSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "field-notes",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    // Let Next render your 404
    // (you already have app/not-found.tsx)
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data /*, content*/ } = matter(raw);

  // Front-matter props (all optional except title)
  const {
    title = params.slug,
    date,
    hero,
    parentPost,
    text,
    materials,
    pdf,
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
      materials={materials}
      pdf={pdf}>
      {/* We'll wire the MDX body (`content`) next. */}
    </LayoutFieldNotes>
  );
}
