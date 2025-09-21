// src/components/LayoutAllPrintables.tsx
import Link from "next/link";
import Image from "next/image";
import LinkReturnHome from "./LinkReturnHome";

type Printable = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
};

type LayoutAllPrintablesProps = {
  printables: Printable[];
};

export default function LayoutAllPrintables({
  printables,
}: LayoutAllPrintablesProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        {printables.map((p) => (
          <div
            key={p.slug}
            className="rounded-xl overflow-hidden shadow-lg bg-white">
            {p.hero && (
              <Image
                src={p.hero}
                alt={p.title ?? "Printable"}
                width={800}
                height={450}
                sizes="(min-width:1280px) 364px, (min-width:768px) 50vw, 100vw"
                priority
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link
                  href={`/printables/${p.slug}`}
                  className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              {p.date && <p className="text-gray-500 italic mb-4">{p.date}</p>}
              {p.text && (
                <p className="text-lg leading-relaxed line-clamp-3">{p.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <LinkReturnHome />
    </div>
  );
}
