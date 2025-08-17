// src/components/DropDownPanelCategoryGrid.tsx
"use client";

import Link from "next/link";

export type DropDownPanelCategory = {
  href: string;
  label: string;
};

export type DropDownPanelCategoryGridProps = {
  /** Column heading, e.g., "Posts" or "Recipes" */
  title: string;
  /** Primary "All ..." link target, e.g., "/posts" */
  allHref: string;
  /** Primary "All ..." link label, e.g., "All Posts →" */
  allLabel: string;
  /** Category/section links shown under the "All ..." link */
  items?: DropDownPanelCategory[];
  /** Whether to insert a gap <br /> between All link and list (kept for parity w/ current UI) */
  gap?: boolean;
  /** Tailwind className passthrough for responsive grid placement */
  className?: string;
};

export default function DropDownPanelCategoryGrid({
  title,
  allHref,
  allLabel,
  items = [],
  gap = true,
  className = "",
}: DropDownPanelCategoryGridProps) {
  return (
    <div className={className}>
      <h4 className="font-serif text-lg text-[#2f5d4b]">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <Link href={allHref} className="text-[#5c5045] hover:underline">
            {allLabel}
          </Link>
        </li>
        {gap && <br />}
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="text-[#5c5045] hover:underline">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
