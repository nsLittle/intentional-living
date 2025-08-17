// src/components/HeaderNavBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import DropDownPanelContainer from "./DropDownPanelContainer";
import DropDownHighLightsGrid from "./DropDownPanelHighlightsGrid";
import DropDownPanelCategoryGrid from "./DropDownPanelCategoryGrid";
import DropDownPanelRecentList from "./DropDownPanelRecentList";

type MenuKey = "posts" | "recipes" | null;

type HeaderNavBarProps = {
  postsRecent?: { title: string; href: string }[];
  postsHighlights?: { title: string; href: string; img?: string }[];
  recipesRecent?: { title: string; href: string }[];
  recipesHighlights?: { title: string; href: string; img?: string }[];
};

export default function HeaderNavBar(props: HeaderNavBarProps) {
  const [open, setOpen] = useState<MenuKey>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#2f5d4b]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-14 flex items-center">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/favicon.ico"
              alt="Simple Intentions"
              width={28}
              height={28}
              className="rounded-sm"
            />
            <div className="leading-tight">
              <span className="block font-serif text-base text-[#fefcf9]">
                Simple
              </span>
              <span className="block font-serif text-lg -mt-1 text-[#fefcf9]">
                Intentions
              </span>
            </div>
          </Link>

          {/* Quick links */}
          <div className="flex-1 flex justify-center gap-6">
            {/* Posts (with dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("posts")}
              onMouseLeave={scheduleClose}>
              <button
                className="text-[#fefcf9] text-sm hover:underline"
                onFocus={() => openMenu("posts")}
                onBlur={scheduleClose}
                aria-expanded={open === "posts"}
                aria-haspopup="true">
                Posts
              </button>
            </div>

            <div
              className="relative"
              onMouseEnter={() => openMenu("recipes")}
              onMouseLeave={scheduleClose}>
              <button
                className="text-[#fefcf9] text-sm hover:underline"
                onFocus={() => openMenu("recipes")}
                onBlur={scheduleClose}
                aria-expanded={open === "recipes"}
                aria-haspopup="true">
                Recipes
              </button>
            </div>

            {/* Static links for now */}
            <Link
              href="/crafts"
              className="text-[#fefcf9] text-sm hover:underline">
              Crafts
            </Link>
            <Link
              href="/printables"
              className="text-[#fefcf9] text-sm hover:underline">
              Printables
            </Link>
            <Link
              href="/about"
              className="text-[#fefcf9] text-sm hover:underline">
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#fefcf9] text-sm hover:underline">
              Contact
            </Link>
          </div>

          {/* Right: search + subscribe */}
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              className="text-[#fefcf9] hover:opacity-80"
              aria-label="Search">
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
            <Link
              href="/subscribe"
              className="bg-[#6ea089] text-[#fefcf9] px-3 py-1.5 rounded-md text-sm font-medium hover:opacity-90">
              Subscribe
            </Link>
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
      ;
    </nav>
  );
}
