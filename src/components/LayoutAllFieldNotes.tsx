import Link from "next/link";
import Image from "next/image";
import LinkReturnHome from "./LinkReturnHome";

type FieldNotes = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
};

type LayoutAllFieldNotesProps = {
  notes: FieldNotes[];
};

export default function LayoutAllFieldNotes({
  notes,
}: LayoutAllFieldNotesProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        {notes.map((note) => (
          <div
            key={note.slug}
            className="rounded-xl overflow-hidden shadow-lg bg-white">
            {note.hero && (
              <Image
                src={note.hero}
                alt={note.title}
                width={800}
                height={450}
                sizes="(min-width:1280px) 364px, (min-width:768px) 50vw, 100vw"
                priority
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/posts/${note.slug}`} className="hover:underline">
                  {note.title}
                </Link>
              </h2>
              {note.date && (
                <p className="text-gray-500 italic mb-4">{note.date}</p>
              )}
              {note.text && (
                <div
                  className="text-lg leading-relaxed line-clamp-3 [&_a]:underline [&_a]:text-[#2f5d4b]"
                  dangerouslySetInnerHTML={{ __html: note.text }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <LinkReturnHome />
    </div>
  );
}
