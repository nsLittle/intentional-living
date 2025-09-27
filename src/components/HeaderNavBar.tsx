// src/components/HeaderNavBar.tsx
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
import HeaderNavBarNewsletterSignup from "./HeaderNavBarNewsletterSignup";

type MenuKey =
  | "posts"
  | "recipes"
  | "crafts"
  | "fieldnotes"
  | "printables"
  | null;

type HeaderNavBarProps = {
  postsRecent?: { title: string; href: string }[];
  postsHighlights?: { title: string; href: string; img?: string }[];
  recipesRecent?: { title: string; href: string }[];
  recipesHighlights?: { title: string; href: string; img?: string }[];
  craftsRecent?: { title: string; href: string }[];
  craftsHighlights?: { title: string; href: string; img?: string }[];
  fieldNotesRecent?: { title: string; href: string }[];
  fieldNotesHighlights?: { title: string; href: string; img?: string }[];
  printablesRecent?: { title: string; href: string }[];
  printablesHighlights?: { title: string; href: string; img?: string }[];
};
// src/app/layout.tsx
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function HeaderNavBar(props: HeaderNavBarProps) {
  const [open, setOpen] = useState<MenuKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const subscribeWrapRef = useRef<HTMLDivElement | null>(null);
  const subscribeButtonRef = useRef<HTMLButtonElement | null>(null);
  const subWasOpenRef = useRef(false);

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

  useEffect(() => {
    function handleDown(e: MouseEvent) {
      // existing search dropdown logic…
      if (searchOpen) {
        const el = searchWrapRef.current;
        if (el && !el.contains(e.target as Node)) setSearchOpen(false);
      }
      // subscribe dropdown logic
      if (subscribeOpen) {
        const el = subscribeWrapRef.current;
        if (el && !el.contains(e.target as Node)) setSubscribeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleDown);
    return () => document.removeEventListener("mousedown", handleDown);
  }, [searchOpen, subscribeOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSubscribeOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (subWasOpenRef.current && !subscribeOpen) {
      subscribeButtonRef.current?.focus();
    }
    subWasOpenRef.current = subscribeOpen;
  }, [subscribeOpen]);

  return (
    <div className="min-w-0">
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#2f5d4b]/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 md:h-14 md:flex-row md:items-center md:justify-between min-w-0">
            {/* Brand */}
            <Link
              href="/"
              className="order-1 md:order-none flex items-center gap-3 min-w-0">
              <Image
                src="/favicon.ico"
                alt="Simple Intentions"
                width={32}
                height={32}
                className="rounded-sm mt-6"
              />
              <div className="leading-tight">
                <span className="block font-serif text-2xl text-[#fefcf9] mt-6">
                  Simple
                </span>
                <span className="block font-serif text-2xl text-[#fefcf9] -mt-2">
                  Intentions
                </span>
              </div>
            </Link>

            {/* center nav */}
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
                  onMouseEnter={() => openMenu("fieldnotes")}
                  onMouseLeave={scheduleClose}>
                  <Link
                    href="/woodland-notes"
                    className="text-[#fefcf9] text-base hover:underline"
                    onFocus={() => openMenu("fieldnotes")}
                    onBlur={scheduleClose}
                    aria-expanded={open === "fieldnotes"}
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
                    className="text-[#fefcf9] tex`t-base hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right: search + subscribe */}
            <div className="ml-auto flex items-center gap-4 mt-6">
              {/* One wrapper for BOTH button and panel */}
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
                    {/* Input */}
                    <Search
                      value={searchQuery}
                      onChange={setSearchQuery}
                      autoFocus
                      className="w-full"
                    />

                    {/* Results list */}
                    <div className="mt-3 max-h-[70vh] overflow-auto">
                      <SearchResults query={searchQuery} />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={subscribeWrapRef}>
                <button
                  ref={subscribeButtonRef}
                  type="button"
                  className="bg-[#6ea089] text-[#fefcf9] px-3 py-1.5 rounded-md text-sm font-medium hover:opacity-90"
                  aria-haspopup="dialog"
                  aria-expanded={subscribeOpen}
                  aria-controls="subscribe-dropdown"
                  onClick={() => {
                    setSubscribeOpen((v) => !v);
                    setSearchOpen(false);
                  }}>
                  Subscribe
                </button>

                {subscribeOpen && (
                  <div
                    id="subscribe-dropdown"
                    role="dialog"
                    aria-modal="false"
                    className="absolute right-0 top-10 w-[min(90vw,22rem)] rounded-xl border bg-white shadow-2xl z-[9999] p-4
               flex flex-col items-center justify-center text-center"
                    onClick={(e) => e.stopPropagation()}>
                    {/* Center the form */}
                    <HeaderNavBarNewsletterSignup className="flex items-center justify-center" />

                    {/* Smaller, centered helper text */}
                    <p className="mt-2 text-[11px] leading-snug text-gray-600">
                      We’ll never share your email.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*Dropdown panel for posts*/}
        <DropDownPanelContainer
          isOpen={open === "posts"}
          onOpen={() => openMenu("posts")}
          onClose={scheduleClose}>
          {/* Left column: section nav */}
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

          {/* Middle column: recent posts */}
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={props.postsRecent}
            emptyMessage="No posts yet."
          />

          {/* Right column: post highlights */}
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={props.postsHighlights}
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
          {/* Left column */}
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
          {/* Middle column */}
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={props.recipesRecent}
            emptyMessage="No recipes yet."
          />
          {/* Right column */}
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
          {/* Middle column */}
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={props.craftsRecent}
            emptyMessage="No crafts yet."
          />
          {/* Right column */}
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={props.craftsHighlights}
            fallbackImg="/images/crafts/fairy-house.png"
            emptyMessage="No highlights yet."
            maxItems={4}
          />
        </DropDownPanelContainer>
        {/* Dropdown panel for field notes */}
        <DropDownPanelContainer
          isOpen={open === "fieldnotes"}
          onOpen={() => openMenu("fieldnotes")}
          onClose={scheduleClose}>
          {/* Left column */}
          <DropDownPanelCategoryGrid
            className="col-span-12 md:col-span-3 md:col-start-1"
            title="All Woodland Notes"
            allHref="/woodland-notes"
            allLabel="All Woodland Notes →"
            items={[
              {
                href: "/field-notes",
                label: "Woodland Notes",
              },
              {
                href: "/field-notes/woodland-crafts",
                label: "Woodland Crafts",
              },
              {
                href: "/field-notes/foraged-recipes",
                label: "Woodland Recipes",
              },
            ]}
          />
          {/* Middle column */}
          <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={props.fieldNotesRecent}
            emptyMessage="No field notes yet."
          />
          {/* Right column */}
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={props.fieldNotesHighlights}
            fallbackImg="/images/posts/witches-butter.jpeg"
            emptyMessage="No highlights yet."
            maxItems={4}
          />
        </DropDownPanelContainer>
        {/* Dropdown panel for printables */}
        <DropDownPanelContainer
          isOpen={open === "printables"}
          onOpen={() => openMenu("printables")}
          onClose={scheduleClose}>
          {/* Left column: section nav */}
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
          {/* Middle column: recent printables */}
          {/* <DropDownPanelRecentList
            className="col-span-12 md:col-span-4 md:col-start-5"
            items={props.printablesRecent}
            emptyMessage="No printables yet."
          />
          <DropDownHighLightsGrid
            className="col-span-12 md:col-span-3 md:col-start-9"
            items={props.printablesHighlights}
            fallbackImg="/images/printables/fallback.png"
            emptyMessage="No highlights yet."
            maxItems={4}
          /> */}
        </DropDownPanelContainer>
        ;
      </nav>
    </div>
  );
}
