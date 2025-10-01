// src/lib/publish.ts
type Frontmatter = {
  published?: boolean;
  date?: string | Date; // optional, but NOT used for gating
};

const showDrafts =
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true" ||
  process.env.SHOW_DRAFTS === "true";

// Robust date → timestamp (UTC for YYYY-MM-DD), null if invalid/missing
function toTimeMs(d?: string | Date): number | null {
  if (!d) return null;
  if (d instanceof Date) {
    const t = d.valueOf();
    return Number.isNaN(t) ? null : t;
  }
  const s = d.trim();
  const iso = Date.parse(s);
  if (!Number.isNaN(iso)) return iso;

  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) {
    const [, yyyy, mm, dd] = m;
    return Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd));
  }
  return null;
}

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
