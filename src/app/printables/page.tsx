// src/app/printables/page.tsx
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getAllPrintables } from "lib/printables";

type Grouped = Record<string, ReturnType<typeof getAllPrintables>>;

// /downloads/<category>/<name>.pdf -> /downloads/thumbnails/<category>/<name>.webp
function thumbFromPdf(pdf?: string) {
  if (!pdf) return undefined;
  const withoutPrefix = pdf.replace(/^\/downloads\//, ""); // "recipes/bold-earth.pdf"
  const [category, rest] = withoutPrefix.split("/", 2);
  if (!category || !rest) return undefined;
  const base = rest.replace(/\.pdf$/i, "");
  return `/downloads/thumbnails/${category}/${base}.webp`;
}

function groupByCategory() {
  const grouped: Grouped = {};
  for (const p of getAllPrintables()) {
    (grouped[p.category] ??= []).push(p);
  }
  // Sort titles A→Z within each category
  for (const key of Object.keys(grouped)) {
    grouped[key] = grouped[key].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
  }
  return grouped;
}

export default function PrintablesPage() {
  const grouped = groupByCategory();

  return (
    <>
      <HeaderNavBarServer />
      <Header />

      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            All Printables
          </h1>
          <p className="mt-3 text-center text-[#5c5045]/80">
            Download ready-to-print PDFs for your pantry labels, patterns, and
            gift tags.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {/* Recipes */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-[#5c5045] mb-4">
            Recipes{" "}
            {grouped.recipes?.length ? `(${grouped.recipes.length})` : ""}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {grouped.recipes.map((p) => {
              const thumb = thumbFromPdf(p.href);
              return (
                <li
                  key={p.href}
                  className="rounded-xl border bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center gap-4 p-4">
                    {/* Left thumbnail */}
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={p.title}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-md border"
                        priority
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-md border bg-[linear-gradient(135deg,#f6efe7,#fff)]" />
                    )}

                    {/* Middle text */}
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-lg text-[#5c5045] font-bold truncate">
                        {p.title}
                      </p>
                      <p className="text-sm text-gray-600 break-all">
                        {p.filename}
                      </p>
                    </div>

                    {/* Right button */}
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                      download>
                      Download
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Projects (patterns) */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-[#5c5045] mb-4">
            Projects{" "}
            {grouped.projects?.length ? `(${grouped.projects.length})` : ""}
          </h2>
          {grouped.projects?.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {grouped.projects.map((p) => {
                const thumb = thumbFromPdf(p.href);
                return (
                  <li
                    key={p.href}
                    className="rounded-xl border bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      {/* Left thumbnail */}
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={p.title}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover rounded-md border"
                          priority
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-md border bg-[linear-gradient(135deg,#f6efe7,#fff)]" />
                      )}

                      {/* Middle text */}
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-lg text-[#5c5045] font-bold truncate">
                          {p.title}
                        </p>
                        <p className="text-sm text-gray-600 break-all">
                          {p.filename}
                        </p>
                      </div>

                      {/* Right button */}
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                        download>
                        Download
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">No project printables yet.</p>
          )}
        </section>

        {/* Tags */}
        <section>
          <h2 className="font-serif text-2xl text-[#5c5045] mb-4">
            Tags {grouped.tags?.length ? `(${grouped.tags.length})` : ""}
          </h2>
          {grouped.tags?.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {grouped.tags.map((p) => {
                const thumb = thumbFromPdf(p.href);
                return (
                  <li
                    key={p.href}
                    className="rounded-xl border bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 p-4">
                      {/* Left thumbnail */}
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={p.title}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover rounded-md border"
                          priority
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-md border bg-[linear-gradient(135deg,#f6efe7,#fff)]" />
                      )}

                      {/* Middle text */}
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-lg text-[#5c5045] font-bold truncate">
                          {p.title}
                        </p>
                        <p className="text-sm text-gray-600 break-all">
                          {p.filename}
                        </p>
                      </div>

                      {/* Right button */}
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                        download>
                        Download
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">No tag printables yet.</p>
          )}
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/printables/categories"
            className="text-[#2f5d4b] hover:underline">
            Browse by category →
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
