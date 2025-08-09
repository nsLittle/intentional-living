"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

type MenuKey = "posts" | null;

type HeaderNavBarProps = {
  postsRecent?: { title: string; href: string }[];
  postsHighlights?: { title: string; href: string; img?: string }[];
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
        onMouseEnter={() => openMenu("posts")}
        onMouseLeave={scheduleClose}
        onFocus={() => openMenu("posts")}
        onBlur={scheduleClose}
        className={`${
          open === "posts"
            ? "fixed top-14 left-0 w-full z-40 opacity-100 translate-y-0 pointer-events-auto"
            : "fixed top-14 left-0 w-full z-40 opacity-0 -translate-y-1 pointer-events-none"
        } transition-all duration-150`}>
        <div className="bg-[#fefcf9] border-t border-black/10 shadow-lg">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid grid-cols-12 gap-6">
            {/* Left column: section nav */}
            <div className="col-span-12 md:col-span-3">
              <h4 className="font-serif text-lg text-[#2f5d4b]">Posts</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/posts"
                    className="text-[#5c5045] hover:underline">
                    All Posts →
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

            {/* Middle column: recent posts */}
            <div className="col-span-12 md:col-span-5">
              <ul className="mt-2 divide-y divide-black/5">
                {(props.postsRecent ?? []).map((p) => (
                  <li key={p.href} className="py-2">
                    <Link
                      href={p.href}
                      className="text-sm text-[#3f372f] hover:underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
                {(!props.postsRecent || props.postsRecent.length === 0) && (
                  <li className="py-2 text-sm text-[#7a6f64] italic">
                    No posts yet.
                  </li>
                )}
              </ul>
            </div>

            {/* Right column: two highlights */}
            <div className="col-span-12 md:col-span-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Spectral Ghost Pipes",
                    href: "/posts/spectral-ghost-pipes",
                    img: "/images/posts/ghost-pipe.jpeg",
                  },
                  {
                    title: "Golden Fairy Rings",
                    href: "/posts/golden-fairy-rings",
                    img: "/images/posts/chanterelles.jpeg",
                  },
                  {
                    title: "Luxury of the Meadows",
                    href: "/posts/luxury-meadows",
                    img: "/images/posts/little-wildflowers.jpeg",
                  },
                ].map((h) => (
                  <Link
                    key={h.href}
                    href={h.href}
                    className="group block w-full">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/5">
                      <img
                        src={h.img}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="mt-1 text-xs font-medium text-[#2f5d4b] group-hover:underline">
                      {h.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </nav>
  );
}
