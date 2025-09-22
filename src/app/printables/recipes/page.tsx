// src/app/printables/recipes/page.tsx
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getAllPrintables } from "lib/printables";

// "/downloads/recipes/bold-earth.pdf" -> "bold-earth"
function slugFromHref(href: string) {
  const name = href.split("/").pop() ?? "";
  return name.replace(/\.pdf$/i, "");
}

// /downloads/<category>/<name>.pdf -> /downloads/thumbnails/<category>/<name>.webp
function thumbFromPdf(pdf?: string) {
  if (!pdf) return undefined;
  const withoutPrefix = pdf.replace(/^\/downloads\//, "");
  const [category, rest] = withoutPrefix.split("/", 2);
  if (!category || !rest) return undefined;
  const base = rest.replace(/\.pdf$/i, "");
  return `/downloads/thumbnails/${category}/${base}.webp`;
}

export default function PrintablesRecipesPage() {
  const all = getAllPrintables().filter((p) => p.category === "recipes");
  // A→Z like your main page
  const items = [...all].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );

  return (
    <>
      <HeaderNavBarServer />
      <Header />

      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            Printable Recipes
          </h1>
          <p className="mt-3 text-center text-[#5c5045]/80">
            Download ready-to-print recipe cards and pantry helpers.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {items.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((p) => {
              return (
                <li
                  key={p.href}
                  className="rounded-xl border bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center gap-4 p-4">
                    {(() => {
                      const slug = slugFromHref(p.href);
                      const thumb = thumbFromPdf(p.href);
                      return (
                        <>
                          {/* Left thumbnail -> detail page */}
                          {thumb ? (
                            <Link
                              href={`/printables/${slug}`}
                              className="shrink-0">
                              <Image
                                src={thumb}
                                alt={p.title}
                                width={96}
                                height={96}
                                className="w-24 h-24 object-cover rounded-md border transition hover:opacity-90"
                                priority
                              />
                            </Link>
                          ) : (
                            <Link
                              href={`/printables/${slug}`}
                              className="shrink-0">
                              <div className="w-24 h-24 rounded-md border bg-[linear-gradient(135deg,#f6efe7,#fff)] transition hover:opacity-90" />
                            </Link>
                          )}

                          {/* Middle text -> title links to detail page */}
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-lg text-[#5c5045] font-bold truncate">
                              <Link
                                href={`/printables/${slug}`}
                                className="hover:underline">
                                {p.title}
                              </Link>
                            </p>
                            <p className="text-sm text-gray-600 break-all">
                              {p.filename}
                            </p>
                          </div>

                          {/* Right button -> direct PDF download */}
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                            download>
                            Download
                          </a>
                        </>
                      );
                    })()}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-600">No recipe printables yet.</p>
        )}
      </main>

      <Footer />
    </>
  );
}
