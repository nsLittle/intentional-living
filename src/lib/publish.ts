// src/lib/publish.ts
type Frontmatter = {
  published?: boolean;
  date?: string | Date;
};

export function isPublished(fm: Frontmatter): boolean {
  if (process.env.SHOW_DRAFTS === "true") return true;

  if (fm?.published === false) return false;

  if (fm?.date) {
    const d = new Date(fm.date);
    if (!Number.isNaN(d.valueOf()) && d > new Date()) return false;
  }

  return true;
}

export function filterPublished<T extends { data: Frontmatter }>(
  items: T[]
): T[] {
  return items.filter((item) => isPublished(item.data));
}
