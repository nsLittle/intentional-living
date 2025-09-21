// src/app/printables/page.tsx
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import Link from "next/link";
import { getAllPrintables } from "lib/printables";

type Grouped = Record<string, ReturnType<typeof getAllPrintables>>;

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
          {grouped.recipes?.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {grouped.recipes.map((p) => (
                <li
                  key={p.href}
                  className="rounded-xl border bg-[#fefcf9] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-gray-600 break-all">
                        {p.filename}
                      </p>
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                      download>
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No recipe printables yet.</p>
          )}
        </section>

        {/* Projects (patterns) */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-[#5c5045] mb-4">
            Projects{" "}
            {grouped.projects?.length ? `(${grouped.projects.length})` : ""}
          </h2>
          {grouped.projects?.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {grouped.projects.map((p) => (
                <li
                  key={p.href}
                  className="rounded-xl border bg-[#fefcf9] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-gray-600 break-all">
                        {p.filename}
                      </p>
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                      download>
                      Download
                    </a>
                  </div>
                </li>
              ))}
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
              {grouped.tags.map((p) => (
                <li
                  key={p.href}
                  className="rounded-xl border bg-[#fefcf9] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-gray-600 break-all">
                        {p.filename}
                      </p>
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                      download>
                      Download
                    </a>
                  </div>
                </li>
              ))}
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
