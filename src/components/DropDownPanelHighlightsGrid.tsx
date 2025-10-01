// src/components/DropDownHighLightsGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export type DropDownHighLightsGridItem = {
  title: string;
  href: string;
  img?: string;
  published?: boolean;
};

export type DropDownHighLightsGridsGridProps = {
  items?: DropDownHighLightsGridItem[];
  fallbackImg: string;
  emptyMessage?: string;
  className?: string;
  maxItems?: number;
};

function normalizeImg(src: string | undefined, fallbackImg: string) {
  if (!src || src.trim().length === 0) return fallbackImg;
  return src.startsWith("/") ? src : `/${src}`;
}

export default function DropDownHighLightsGrid({
  items = [],
  fallbackImg,
  emptyMessage = "No DropDownHighLightsGrids yet.",
  className,
  maxItems,
}: DropDownHighLightsGridsGridProps) {
  const visible = items.filter((i) => i.published !== false);
  const list = maxItems ? visible.slice(0, maxItems) : visible;
  const hasItems = list.length > 0;

  return (
    <div className={`grid grid-cols-2 gap-3 ${className ?? ""}`}>
      {hasItems &&
        list.map((h) => {
          const img = normalizeImg(h.img, fallbackImg);
          return (
            <Link key={h.href} href={h.href} className="group block w-full">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/5">
                <Image
                  src={img}
                  alt={h.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="mt-1 text-xs font-medium text-[#2f5d4b] group-hover:underline">
                {h.title}
              </div>
            </Link>
          );
        })}

      {!hasItems && (
        <div className="text-xs text-[#7a6f64] italic col-span-2">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}
