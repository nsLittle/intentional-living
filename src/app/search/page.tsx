// src/app/search/page.tsx
import HeaderNavBar from "components/HeaderNavBar";
import Header from "components/Header";
import Footer from "components/Footer";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  buildSearchIndex,
  type BuiltItem as SearchItem,
} from "lib/buildSearchIndex";

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = sp?.q;
  const q = Array.isArray(raw) ? raw[0] : raw ?? "";
  const query = q.trim();
  const items: SearchItem[] = await buildSearchIndex();
  const results = query ? fuseSearch(items, query) : [];

  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <HeaderNavBar />
      <Header />

      <div className="w-full bg-[#fefcf9] px-6 py-12 flex flex-col items-center">
        <article className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">
            {query ? `Search: “${query}”` : "Search"}
          </h1>

          {!query ? (
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-neutral-700">
                Try searching from the header, or append{" "}
                <code className="px-1 rounded bg-neutral-100">?q=tea</code> to
                the URL.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-neutral-700">
                {results.length} result{results.length === 1 ? "" : "s"} for{" "}
                <span className="font-medium">&quot;{query}&quot;</span>.
              </p>

              <ul className="mt-4 divide-y">
                {results.map((item) => (
                  <li key={item.href} className="py-4">
                    <Link href={item.href} className="block">
                      <div className="flex items-baseline gap-2">
                        <span className="inline-flex text-[11px] uppercase tracking-wide rounded-full border px-2 py-0.5">
                          {item.kind}
                        </span>
                        <h3 className="text-lg font-semibold underline text-[#2f5d4b]">
                          {item.title}
                        </h3>
                      </div>
                      {item.summary && (
                        <p className="mt-1 text-sm text-neutral-700 line-clamp-2">
                          {item.summary}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {results.length === 0 && (
                <p className="mt-4 italic text-neutral-600">
                  No matches. Try another phrase or fewer words.
                </p>
              )}

              <div className="mt-6">
                <Link href="/" className="text-sm underline text-[#2f5d4b]">
                  ← Back to home
                </Link>
              </div>
            </div>
          )}
        </article>
      </div>

      <Footer />
    </div>
  );
}

function fuseSearch(items: SearchItem[], query: string) {
  const fuse = new Fuse<SearchItem>(items, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "summary", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "href", weight: 0.05 },
      { name: "kind", weight: 0.05 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2,
  });
  return fuse.search(query).map((r) => r.item);
}
