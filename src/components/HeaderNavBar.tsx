"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

type MenuKey = "prattles" | null;

type HeaderNavBarProps = {
  prattlesRecent?: { title: string; href: string }[];
  prattlesHighlights?: { title: string; href: string; img?: string }[];
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
            {/* Prattles (with dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("prattles")}
              onMouseLeave={scheduleClose}>
              <button
                className="text-[#fefcf9] text-sm hover:underline"
                onFocus={() => openMenu("prattles")}
                onBlur={scheduleClose}
                aria-expanded={open === "prattles"}
                aria-haspopup="true">
                Prattles &amp; Such
              </button>
            </div>

            {/* Static links for now */}
            <Link
              href="/recipes"
              className="text-[#fefcf9] text-sm hover:underline">
              Kitchen Goodies
            </Link>
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
      <div
        onMouseEnter={() => openMenu("prattles")}
        onMouseLeave={scheduleClose}
        onFocus={() => openMenu("prattles")}
        onBlur={scheduleClose}
        className={`${
          open === "prattles"
            ? "fixed top-14 left-0 w-full z-40 opacity-100 translate-y-0 pointer-events-auto"
            : "fixed top-14 left-0 w-full z-40 opacity-0 -translate-y-1 pointer-events-none"
        } transition-all duration-150`}>
        <div className="bg-[#fefcf9] border-t border-black/10 shadow-lg">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid grid-cols-12 gap-6">
            {/* Left column: section nav */}
            <div className="col-span-12 md:col-span-3">
              <h4 className="font-serif text-lg text-[#2f5d4b]">
                Prattles &amp; Such
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/prattles"
                    className="text-[#5c5045] hover:underline">
                    All Prattles →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tags/reflections"
                    className="text-[#5c5045] hover:underline">
                    Reflections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tags/seasons"
                    className="text-[#5c5045] hover:underline">
                    Seasons
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tags/foraging-life"
                    className="text-[#5c5045] hover:underline">
                    Foraging Life
                  </Link>
                </li>
              </ul>
            </div>

            {/* Middle column: recent list (placeholder items for now) */}
            <div className="col-span-12 md:col-span-5">
              <h5 className="font-medium text-[#5c5045]">Recent</h5>
              <ul className="mt-2 divide-y divide-black/5">
                {[
                  {
                    title: "Quiet Joys of Mossy Mornings",
                    href: "/prattles/mossy-mornings",
                  },
                  {
                    title: "A Slow Pantry for Late Summer",
                    href: "/prattles/slow-pantry",
                  },
                  {
                    title: "When the Woods Go Quiet",
                    href: "/prattles/woods-go-quiet",
                  },
                  {
                    title: "Notes from the Herb Shelf",
                    href: "/prattles/herb-shelf",
                  },
                  {
                    title: "Walking the Creek After Rain",
                    href: "/prattles/creek-after-rain",
                  },
                ].map((p) => (
                  <li key={p.href} className="py-2">
                    <Link
                      href={p.href}
                      className="text-sm text-[#3f372f] hover:underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column: two highlights */}
            <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-3">
              {[
                {
                  title: "Ghost Pipe, Gently",
                  href: "/prattles/ghost-pipe-gently",
                  img: "/images/posts/ghost-pipe.jpg",
                },
                {
                  title: "Keeping House with Ferns",
                  href: "/prattles/house-with-ferns",
                  img: "/images/posts/ferns.jpg",
                },
              ].map((h) => (
                <Link key={h.href} href={h.href} className="group">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/5">
                    {/* You can swap to next/image if these exist */}
                    <img
                      src={h.img}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#2f5d4b] group-hover:underline">
                    {h.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      ;
    </nav>
  );
}
