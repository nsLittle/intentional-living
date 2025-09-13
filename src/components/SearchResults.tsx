"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Fuse from "fuse.js";

type IndexItem = {
  title: string;
  href: string;
  kind: "post" | "recipe" | "craft" | "page";
  summary?: string;
  tags?: string[];
  date?: string;
  hero?: string;
};

export default function SearchResults({ query }: { query: string }) {
  const [items, setItems] = useState<IndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the index once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/search-index", { cache: "force-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { items: IndexItem[] } = await res.json();
        if (!cancelled) setItems(Array.isArray(data.items) ? data.items : []);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load index";
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fuse = useMemo(
    () =>
      items.length
        ? new Fuse(items, {
            includeScore: true,
            threshold: 0.3, // a bit stricter
            ignoreLocation: true,
            minMatchCharLength: 2,
            keys: [
              { name: "title", weight: 0.7 },
              { name: "tags", weight: 0.3 },
            ],
          })
        : null,
    [items]
  );

  const results = useMemo(() => {
    const q = query.trim();

    // Build initial list (Fuse when querying; raw items when empty)
    const baseRaw: IndexItem[] = !q
      ? items
      : fuse
      ? fuse.search(q).map((r) => r.item)
      : [];

    // Dedupe by canonical URL
    const seen = new Set<string>();
    const base = baseRaw.filter((it) => {
      if (seen.has(it.href)) return false;
      seen.add(it.href);
      return true;
    });

    // Precise filter: whole-word in title OR exact tag match
    if (!q) return base;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(^|\\s)${escaped}(\\s|$)`, "i");

    return base.filter((item) => {
      const inTitle = re.test(item.title);
      const inTags =
        Array.isArray(item.tags) &&
        item.tags.some((t) => t.toLowerCase() === q.toLowerCase());
      return inTitle || inTags;
    });
  }, [query, fuse, items]);

  if (loading) return <p className="text-sm">Loading…</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;

  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>
      <ul className="space-y-3">
        {results.map((item) => (
          <li
            key={item.href}
            className="rounded-2xl border p-4 hover:shadow-sm transition">
            <Link
              href={item.href}
              className="flex items-center justify-between gap-4">
              {/* Left: text */}
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-xs text-gray-500">
                  {item.kind}
                  {item.date ? ` • ${item.date}` : ""}
                  {item.tags?.length ? ` • ${item.tags.join(", ")}` : ""}
                </p>
                {item.summary ? (
                  <p className="text-sm mt-1 line-clamp-2">{item.summary}</p>
                ) : null}
              </div>

              {/* Right: thumbnail */}
              {item.hero ? (
                <Image
                  src={item.hero}
                  // alt kept empty if decorative; use title for basic alt
                  alt={item.title}
                  width={64}
                  height={64}
                  className="rounded-md object-cover flex-none"
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
