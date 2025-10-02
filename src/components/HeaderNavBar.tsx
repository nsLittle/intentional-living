"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import DropDownPanelContainer from "./DropDownPanelContainer";
import DropDownHighLightsGrid from "./DropDownPanelHighlightsGrid";
import DropDownPanelCategoryGrid from "./DropDownPanelCategoryGrid";
import DropDownPanelRecentList from "./DropDownPanelRecentList";
import Search from "./Search";
import SearchResults from "./SearchResults";

type MenuKey =
  | "posts"
  | "recipes"
  | "crafts"
  | "woodlands"
  | "printables"
  | null;

type RecentItem = { title: string; href: string; date?: string };

type HeaderNavBarProps = {
  postsRecent?: { title: string; href: string }[];
  postsHighlights?: { title: string; href: string; img?: string }[];
  recipesRecent?: RecentItem[];
  recipesHighlights?: { title: string; href: string; img?: string }[];
  craftsRecent?: { title: string; href: string }[];
  craftsHighlights?: { title: string; href: string; img?: string }[];
  woodlandRecent?: { title: string; href: string }[];
  woodlandHighlights?: { title: string; href: string; img?: string }[];
  printablesRecent?: { title: string; href: string }[];
  printablesHighlights?: { title: string; href: string; img?: string }[];
};

type HL = { title: string; href: string; img?: string };
const asHL = (
  x: { title?: string; href?: string; img?: string } | undefined
): HL | undefined =>
  x && x.title && x.href
    ? { title: x.title, href: x.href, img: x.img }
    : undefined;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function HeaderNavBar(props: HeaderNavBarProps) {
  const [open, setOpen] = useState<MenuKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchWrapRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  const sortRecent = (a: RecentItem, b: RecentItem) => {
    const ta = Number.isFinite(Date.parse(a.date ?? ""))
      ? Date.parse(a.date!)
      : -Infinity;
    const tb = Number.isFinite(Date.parse(b.date ?? ""))
      ? Date.parse(b.date!)
      : -Infinity;

    if (tb !== ta) return tb - ta;

    return (a.title || "").localeCompare(b.title || "", undefined, {
      sensitivity: "base",
    });
  };

  const postsRecentSorted = [...(props.postsRecent ?? [])].sort(sortRecent);
  const postsHighlightsSorted = [...(props.postsHighlights ?? [])].sort(
    sortRecent
  );
  const recipesRecentSorted = [...(props.recipesRecent ?? [])].sort(sortRecent);
  const woodlandRecentSorted = [...(props.woodlandRecent ?? [])].sort(
    sortRecent
  );

  const sortAlphaByTitle = (a: { title?: string }, b: { title?: string }) =>
    (a.title || "").localeCompare(b.title || "", undefined, {
      sensitivity: "base",
    });

  const printablesRecentSortedAlpha = [...(props.printablesRecent ?? [])]
    .sort(sortAlphaByTitle)
    .slice(0, 5);

  const firstByHrefTests = <T extends { href?: string }>(
    arr: T[] | undefined,
    tests: string[]
  ) => {
    const a = arr ?? [];
    for (const item of a) {
      const h = (item.href || "").toLowerCase();
      if (tests.some((t) => h.startsWith(t) || h.includes(t))) return item;
    }
    return undefined;
  };

  // Choose from highlights first; if not found, fall back to recent.
  // If still empty overall, fall back to first 4 of whichever source exists.
  const srcH = props.printablesHighlights ?? [];
  const srcR = props.printablesRecent ?? [];

  const pick = (tests: string[]) =>
    asHL(firstByHrefTests(srcH, tests)) ?? asHL(firstByHrefTests(srcR, tests));

  // Replace the helper with this broader matcher (above printablesCategoryHighlights)
  const firstByHrefPatterns = <T extends { href?: string; title?: string }>(
    arr: T[] | undefined,
    patterns: (RegExp | string)[],
    fallbackTitleRegex?: RegExp
  ) => {
    const list = arr ?? [];
    const hit =
      list.find((i) => {
        const h = i.href || "";
        return patterns.some((p) =>
          typeof p === "string" ? h.includes(p) : p.test(h)
        );
      }) ??
      (fallbackTitleRegex
        ? list.find((i) => fallbackTitleRegex.test(i.title || ""))
        : undefined);
    return hit as T | undefined;
  };

  // (optional) quick visibility into what we have
  console.debug("[HeaderNavBar] printables inputs", {
    highlights: props.printablesHighlights,
    recent: props.printablesRecent,
  });

  console.debug("[printables] href samples", {
    highlights: (props.printablesHighlights ?? []).map((x) => x.href),
    recent: (props.printablesRecent ?? []).map((x) => x.href),
  });

  console.debug("[printables] chosen-before-normalize", {
    recipes: "pending",
    projects: "pending",
    fieldNotes: "pending",
    tags: "pending",
  });

  // Rebuild the category highlights with wider nets + title fallbacks
  const picksRaw = [
    // Recipes
    firstByHrefPatterns(
      props.printablesHighlights,
      [
        "/printables/recipes",
        "/downloads/recipes",
        "/recipes/printables",
        "/recipes/",
      ],
      /recipe/i
    ) ??
      firstByHrefPatterns(
        props.printablesRecent,
        [
          "/printables/recipes",
          "/downloads/recipes",
          "/recipes/printables",
          "/recipes/",
        ],
        /recipe/i
      ),

    // Projects
    firstByHrefPatterns(
      props.printablesHighlights,
      [
        "/printables/projects",
        "/downloads/projects",
        "/crafts/printables",
        "/projects/",
      ],
      /(project|craft)/i
    ) ??
      firstByHrefPatterns(
        props.printablesRecent,
        [
          "/printables/projects",
          "/downloads/projects",
          "/crafts/printables",
          "/projects/",
        ],
        /(project|craft)/i
      ),

    // Field Notes
    firstByHrefPatterns(
      props.printablesHighlights,
      [
        "/printables/field-notes",
        "/downloads/field-notes",
        "/woodland/field-notes",
      ],
      /(field\s*notes|foraged)/i
    ) ??
      firstByHrefPatterns(
        props.printablesRecent,
        [
          "/printables/field-notes",
          "/downloads/field-notes",
          "/woodland/field-notes",
        ],
        /(field\s*notes|foraged)/i
      ),

    // Tags
    firstByHrefPatterns(
      props.printablesHighlights,
      ["/printables/tags", "/downloads/tags"],
      /tag/i
    ) ??
      firstByHrefPatterns(
        props.printablesRecent,
        ["/printables/tags", "/downloads/tags"],
        /tag/i
      ),
  ].filter(Boolean) as { title?: string; href?: string; img?: string }[];

  console.debug("[printables] chosen-raw", {
    recipes: picksRaw[0]?.href,
    projects: picksRaw[1]?.href,
    fieldNotes: picksRaw[2]?.href,
    tags: picksRaw[3]?.href,
  });

  // ➊ Helper: top-up with unique items from a pool (by href)
  const topUpHighlights = <T extends { href?: string }>(
    base: T[],
    pool: T[],
    max = 4
  ) => {
    const seen = new Set(base.map((x) => (x.href || "").toLowerCase()));
    for (const item of pool) {
      const h = (item.href || "").toLowerCase();
      if (!h || seen.has(h)) continue;
      base.push(item);
      seen.add(h);
      if (base.length >= max) break;
    }
    return base.slice(0, max);
  };

  // … keep your existing picksRaw computation …

  // ➋ Normalize + guaranteed fill to 4 cards
  const picksNormalized: HL[] = picksRaw
    .map((x) =>
      x?.title && x?.href
        ? { title: x.title, href: x.href, img: x.img }
        : undefined
    )
    .filter(Boolean) as HL[];

  // Build a pool from highlights first, then recent, normalized to HL shape
  const pool: HL[] = [
    ...(props.printablesHighlights ?? []),
    ...(props.printablesRecent ?? []),
  ]
    .map((x: any) =>
      x?.title && x?.href
        ? { title: x.title, href: x.href, img: x.img }
        : undefined
    )
    .filter(Boolean) as HL[];

  // ➌ Final list: start with what we matched, then top-up from pool to 4
  const printablesCategoryHighlights: HL[] = topUpHighlights(
    picksNormalized,
    pool,
    4
  );

  const woodlandHighlightsEffective =
    (props.woodlandHighlights?.length ?? 0) > 0
      ? props.woodlandHighlights
      : [
          {
            title: "Witches’ Butter",
            href: "/woodland/field-notes/witches-butter",
            img: "/images/posts/witches-butter.jpeg",
          },
          {
            title: "Ghost Pipe Craft",
            href: "/woodland/woodland-crafts/ghost-pipe",
            img: "/images/crafts/ghost-pipe.png",
          },
        ];

  useEffect(() => {
    function handleDown(e: MouseEvent) {
      if (searchOpen) {
        const el = searchWrapRef.current;
        if (el && !el.contains(e.target as Node)) setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleDown);
    return () => document.removeEventListener("mousedown", handleDown);
  }, [searchOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-w-0">
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#2f5d4b]/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 md:h-22 md:flex-row md:items-center md:justify-between min-w-0">
            {/* Brand */}
            <Link
              href="/"
              className="order-1 md:order-none flex items-center gap-3 min-w-0">
              <Image
                src="/favicon.ico"
                alt="Simple Intentions"
                width={32}
                height={32}
                className="rounded-sm mt-2"
              />
              <div className="leading-tight">
                <span className="block font-serif text-2xl text-[#fefcf9] mt-2">
                  Simple
                </span>
                <span className="block font-serif text-2xl text-[#fefcf9] -mt-2">
                  Intentions
                </span>
              </div>
            </Link>

            {/* Center nav */}
            <nav
              aria-label="Primary"
              className="order-2 md:order-none w-full md:flex-1 min-w-0 flex justify-center">
              <ul className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
                <li
                  className="relative inline-flex items-center"
                  onMouseEnter={() => openMenu("posts")}
                  onMouseLeave={scheduleClose}>
                  <Link
                    href="/posts"
                    className="text-[#fefcf9] text-base hover:underline"
                    onFocus={() => openMenu("posts")}
                    onBlur={scheduleClose}
                    aria-expanded={open === "posts"}
                    aria-haspopup="true">
                    Posts
                  </Link>
                </li>

                <li
                  className="relative inline-flex items-center"
                  onMouseEnter={() => openMenu("recipes")}
                  onMouseLeave={scheduleClose}>
                  <Link
                    href="/recipes"
                    className="text-[#fefcf9] text-base hover:underline"
                    onFocus={() => openMenu("recipes")}
                    onBlur={scheduleClose}
                    aria-expanded={open === "recipes"}
                    aria-haspopup="true">
                    Recipes
                  </Link>
                </li>

                <li
                  className="relative inline-flex items-center"
                  onMouseEnter={() => openMenu("crafts")}
                  onMouseLeave={scheduleClose}>
                  <Link
                    href="/crafts"
                    className="text-[#fefcf9] text-base hover:underline"
                    onFocus={() => openMenu("crafts")}
                    onBlur={scheduleClose}
                    aria-expanded={open === "crafts"}
                    aria-haspopup="true">
                    Crafts
                  </Link>
                </li>

                <li
                  className="relative inline-flex items-center"
                  onMouseEnter={() => openMenu("woodlands")}
                  onMouseLeave={scheduleClose}>
                  <Link
                    href="/woodland"
                    className="text-[#fefcf9] text-base hover:underline"
                    onFocus={() => openMenu("woodlands")}
                    onBlur={scheduleClose}
                    aria-expanded={open === "woodlands"}
                    aria-haspopup="true">
                    Woodlands
                  </Link>
                </li>

                <li
                  className="relative inline-flex items-center"
                  onMouseEnter={() => openMenu("printables")}
                  onMouseLeave={scheduleClose}>
                  <Link
                    href="/printables"
                    className="text-[#fefcf9] text-base hover:underline"
                    onFocus={() => openMenu("printables")}
                    onBlur={scheduleClose}
                    aria-expanded={open === "printables"}
                    aria-haspopup="true">
                    Printables
                  </Link>
                </li>

                <li>
                  <Link
                    href="/reframer"
                    className="text-[#fefcf9] text-base hover:underline">
                    Alignment
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="text-[#fefcf9] text-base hover:underline">
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="text-[#fefcf9] text-base hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right: search (button + panel) */}
            <div className="ml-auto flex items-center mt-2">
              <div className="relative" ref={searchWrapRef}>
                <button
                  ref={searchButtonRef}
                  type="button"
                  className="text-[#fefcf9] hover:opacity-80"
                  aria-label="Search"
                  aria-expanded={searchOpen}
                  onClick={() => setSearchOpen((v) => !v)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </button>

                {searchOpen && (
                  <div
                    id="site-search-dropdown"
                    role="dialog"
                    aria-modal="false"
                    className="fixed right-4 top-16 w-[min(90vw,40rem)] rounded-2xl border bg-white shadow-2xl z-[9999] p-4"
                    onClick={(e) => e.stopPropagation()}>
                    <Search
                      value={searchQuery}
                      onChange={setSearchQuery}
                      autoFocus
                      className="w-full"
                    />
                    <div className="mt-3 max-h-[70vh] overflow-auto">
                      <SearchResults query={searchQuery} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown panel for posts */}
        <DropDownPanelContainer
          isOpen={open === "posts"}
          onOpen={() => openMenu("posts")}
          onClose={scheduleClose}>
          <DropDownPanelCategoryGrid
            className="col-span-12 md:col-span-3 md:col-start-1"
            title="Posts"
            allHref="/posts"
            allLabel="All Posts →"
            items={[
              { href: "/posts/woodland", label: "Woodland Finds" },
              { href: "/posts/kitchen", label: "Kitchen Recipes" },
              { href: "/posts/crafts", label: "Crafty Creations" },
            ]}
          />
          {/* ✅ Use postsRecentSorted for the middle column */}
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={postsRecentSorted}
            emptyMessage="No posts yet."
          />
          {/* Keep highlights on the right; you can keep your sorted highlights too */}
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={postsHighlightsSorted ?? props.postsHighlights}
            fallbackImg="/images/header-banner/log-garden.jpeg"
            emptyMessage="No highlights yet."
            maxItems={4}
          />
        </DropDownPanelContainer>

        {/* Dropdown panel for recipes */}
        <DropDownPanelContainer
          isOpen={open === "recipes"}
          onOpen={() => openMenu("recipes")}
          onClose={scheduleClose}>
          <DropDownPanelCategoryGrid
            className="col-span-12 md:col-span-3 md:col-start-1"
            title="Recipes"
            allHref="/recipes"
            allLabel="All Recipes →"
            items={[
              { href: "/recipes/spice-mix", label: "Spice Mix" },
              { href: "/recipes/cookies", label: "Cookies in a Jar" },
              { href: "/recipes/soup-pasta", label: "Soup & Pasta in a Jar" },
              { href: "/recipes/sides", label: "Sides" },
            ]}
          />
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={recipesRecentSorted}
            emptyMessage="No recipes yet."
          />
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={props.recipesHighlights}
            fallbackImg="/images/recipes/spice-mix/bold-earth.png"
            emptyMessage="No highlights yet."
            maxItems={4}
          />
        </DropDownPanelContainer>

        {/* Dropdown panel for crafts */}
        <DropDownPanelContainer
          isOpen={open === "crafts"}
          onOpen={() => openMenu("crafts")}
          onClose={scheduleClose}>
          <DropDownPanelCategoryGrid
            className="col-span-12 md:col-span-4 md:col-start-1"
            title="Craft Projects"
            allHref="/crafts"
            allLabel="All Craft Projects →"
            items={[
              { href: "/crafts/knitting", label: "Knitting Projects" },
              {
                href: "/crafts/kitchen-crafts",
                label: "Kitchen Craft Projects",
              },
              { href: "/crafts/other-crafts", label: "Other Craft Projects" },
            ]}
          />
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={props.craftsRecent}
            emptyMessage="No crafts yet."
          />
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={props.craftsHighlights}
            fallbackImg="/images/crafts/fairy-house.png"
            emptyMessage="No highlights yet."
            maxItems={4}
          />
        </DropDownPanelContainer>

        {/* Dropdown panel for woodlands */}
        <DropDownPanelContainer
          isOpen={open === "woodlands"}
          onOpen={() => openMenu("woodlands")}
          onClose={scheduleClose}>
          <DropDownPanelCategoryGrid
            className="col-span-12 md:col-span-3 md:col-start-1"
            title="All Woodland Notes"
            allHref="/woodland"
            allLabel="All Woodland Notes →"
            items={[
              { href: "/woodland/field-notes", label: "Field Notes" },
              { href: "/woodland/woodland-crafts", label: "Woodland Crafts" },
              { href: "/woodland/foraged-recipes", label: "Foraged Recipes" },
            ]}
          />
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={woodlandRecentSorted}
            emptyMessage="No woodland notes yet."
          />
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={woodlandHighlightsEffective}
            fallbackImg="/images/header-banner/log-garden.jpeg" // same fallback as Posts for parity
            emptyMessage="No highlights yet."
            maxItems={4}
          />
        </DropDownPanelContainer>

        {/* Dropdown panel for printables */}
        <DropDownPanelContainer
          isOpen={open === "printables"}
          onOpen={() => openMenu("printables")}
          onClose={scheduleClose}>
          <DropDownPanelCategoryGrid
            className="col-span-12 md:col-span-3 md:col-start-1"
            title="Printables"
            allHref="/printables"
            allLabel="All Printables →"
            items={[
              { href: "/printables/recipes", label: "Recipes" },
              { href: "/printables/projects", label: "Craft Projects" },
              { href: "/printables/field-notes", label: "Field Notes" },
              { href: "/printables/tags", label: "Tags" },
            ]}
          />
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={printablesRecentSortedAlpha}
            emptyMessage="No printables yet."
          />
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={
              printablesCategoryHighlights as {
                title: string;
                href: string;
                img?: string;
              }[]
            }
            fallbackImg="/images/header-banner/log-garden.jpeg"
            emptyMessage="No highlights yet."
            maxItems={4}
          />
        </DropDownPanelContainer>
      </nav>
    </div>
  );
}
