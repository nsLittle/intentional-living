// src/components/DropDownPrintablesHighlights.tsx
// Server component that gathers Printables and renders the client grid.

import { getAllPrintables } from "lib/printables";

// /downloads/<category>/<name>.pdf -> /downloads/thumbnails/<category>/<name>.webp
function thumbFromPdf(pdf?: string) {
  if (!pdf) return undefined;
  const withoutPrefix = pdf.replace(/^\/downloads\//, ""); // "recipes/bold-earth.pdf"
  const [category, rest] = withoutPrefix.split("/", 2);
  if (!category || !rest) return undefined;
  const base = rest.replace(/\.pdf$/i, "");
  return `/downloads/thumbnails/${category}/${base}.webp`;
}

type Props = {
  category?: "recipes" | "projects" | "tags" | "all";
  maxItems?: number;
  emptyMessage?: string;
  className?: string;
};

const FALLBACK_DATA_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
         <rect width='100%' height='100%' fill='#f6efe7'/>
       </svg>`
  );

export default function DropDownPrintablesHighlights({
  category = "all",
  maxItems = 6,
  emptyMessage = "No printables yet.",
  className,
}: Props) {
  // Get all printables from your lib
  let all = getAllPrintables();

  // Filter if a specific category is requested
  if (category !== "all") {
    all = all.filter((p) => p.category === category);
  }

  // Sort A→Z to keep it predictable in a small grid
  const sorted = all.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );

  // Map to the client grid items
  const items: DropDownHighLightsGridItem[] = sorted.map((p) => ({
    title: p.title,
    href: p.href, // PDF link (download)
    img: thumbFromPdf(p.href) ?? undefined,
  }));

  return (
    <DropDownHighLightsGrid
      items={items}
      fallbackImg={FALLBACK_DATA_URL}
      emptyMessage={emptyMessage}
      className={className}
      maxItems={maxItems}
    />
  );
}
