// src/lib/publish.ts

type Frontmatter = {
  published?: boolean;
  date?: string | Date; // optional, but NOT used for gating
};

const showDrafts =
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true" ||
  process.env.SHOW_DRAFTS === "true";

export function isPublished(fm: Frontmatter): boolean {
  if (showDrafts) return true;
  if (fm?.published === false) return false;
  return true; // <— no future-date check
}

export function filterPublished<T extends { data: Frontmatter }>(
  items: T[]
): T[] {
  return items.filter((item) => isPublished(item.data));
}
