// src/lib/featuredHero.ts
/**
 * Seasonal Bias + Daily Rotation
 *
 * Seasons (by month):
 * - Winter (Dec–Feb): bias Recipes
 * - Spring (Mar–May): bias Woodland
 * - Summer (Jun–Aug): bias Woodland/Crafts
 * - Fall   (Sep–Nov): bias Recipes/Crafts
 *
 * Rotation:
 * - Within each season, we order the 4 sections so the biased ones
 *   are first. We then pick by weekday (0=Sun..6=Sat), cycling the 4.
 *
 * Optional override:
 * - Set NEXT_PUBLIC_FEATURED_HERO to one of: post | woodland | recipe | craft
 *   to lock the homepage hero.
 */

export type HeroKey = "post" | "woodland" | "recipe" | "craft";

export function pickFeaturedHeroKey(
  now: Date = new Date(),
  available?: Partial<Record<HeroKey, boolean>>
): HeroKey {
  const envOverride =
    (process.env.NEXT_PUBLIC_FEATURED_HERO as HeroKey | undefined) ??
    (process.env.FEATURED_HERO as HeroKey | undefined);
  if (envOverride && isValidKey(envOverride)) return envOverride;

  const m = now.getMonth();
  const season = monthToSeason(m);

  const baseOrder: HeroKey[] = (() => {
    switch (season) {
      case "winter":
        return ["recipe", "post", "craft", "woodland"];
      case "spring":
        return ["woodland", "post", "recipe", "craft"];
      case "summer":
        return ["woodland", "craft", "post", "recipe"];
      case "fall":
        return ["recipe", "craft", "woodland", "post"];
    }
  })();

  const weekday = now.getDay();
  const seq: HeroKey[] = Array.from({ length: 7 }, (_, i) => baseOrder[i % 4]);

  // ✅ NEW: pick first key in rotation that is available
  const start = weekday;
  for (let i = 0; i < seq.length; i++) {
    const k = seq[(start + i) % seq.length];
    if (!available || available[k] !== false) return k;
  }

  return seq[weekday];
}

function monthToSeason(m: number) {
  if (m === 11 || m === 0 || m === 1) return "winter";
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  return "fall";
}

function isValidKey(k: string): k is HeroKey {
  return k === "post" || k === "woodland" || k === "recipe" || k === "craft";
}
