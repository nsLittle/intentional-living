// src/lib/searchIndex.ts

export type SearchItem = {
  title: string;
  href: string; // e.g., "/posts/rose-hip-tea"
  kind: "post" | "recipe" | "craft";
  summary?: string; // short optional blurb (used for search text & snippet)
  tags?: string[]; // optional tags
};

// ⬇️ Seed with a few real items now; add more anytime.
export const SEARCH_ITEMS: SearchItem[] = [
  // Examples
  {
    title: "Bold Earth Spice Mix",
    href: "/recipes/spice-mix",
    kind: "recipe",
    summary: "My base spice mix for soups and roasted veggies.",
    tags: ["spice", "jar", "pantry"],
  },
  {
    title: "Fairy House Craft",
    href: "/crafts/fairy-house",
    kind: "craft",
    summary: "A woodland-inspired fairy house using found materials.",
    tags: ["crafts", "woodland", "kids"],
  },
  {
    title: "Backyard Birds: Beginner’s Guide",
    href: "/posts/backyard-birds",
    kind: "post",
    summary:
      "Bird identification basics and feeder tips for Vermont backyards.",
    tags: ["bird", "birds", "backyard"],
  },
];
