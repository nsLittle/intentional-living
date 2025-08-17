// src/components/DropDownPanelRecentList.tsx
"use client";

import Link from "next/link";

export type DropDownPanelRecentItem = {
  href: string;
  title: string;
};

export type DropDownPanelRecentListProps = {
  items?: DropDownPanelRecentItem[];
  emptyMessage?: string;
  className?: string;
};

export default function DropDownPanelRecentList({
  items = [],
  emptyMessage = "No items yet.",
  className = "",
}: DropDownPanelRecentListProps) {
  const hasItems = items.length > 0;

  return (
    <div className={className}>
      <ul className="mt-2 divide-y divide-black/5">
        {hasItems &&
          items.map((it) => (
            <li key={it.href} className="py-2">
              <Link
                href={it.href}
                className="text-sm text-[#3f372f] hover:underline">
                {it.title}
              </Link>
            </li>
          ))}

        {!hasItems && (
          <li className="py-2 text-sm text-[#7a6f64] italic">{emptyMessage}</li>
        )}
      </ul>
    </div>
  );
}
