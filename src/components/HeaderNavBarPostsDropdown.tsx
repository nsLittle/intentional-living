"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";

export type PostLink = { title: string; href: string; img?: string };

type PostsDropdownProps = {
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  postsRecent?: PostLink[];
  postsHighlights?: PostLink[];
};

export default function PostsDropdown({
  isOpen,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
  postsRecent,
  postsHighlights,
}: PostsDropdownProps) {
  const highlights =
    postsHighlights && postsHighlights.length > 0
      ? postsHighlights
      : ([
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
        ] as PostLink[]);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`${
        isOpen
          ? "fixed top-14 left-0 w-full z-40 opacity-100 translate-y-0 pointer-events-auto"
          : "fixed top-14 left-0 w-full z-40 opacity-0 -translate-y-1 pointer-events-none"
      } transition-all duration-150`}
      aria-hidden={!isOpen}>
      <div className="bg-[#fefcf9] border-t border-black/10 shadow-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid grid-cols-12 gap-6">
          {/* Left column: section nav */}
          <div className="col-span-12 md:col-span-3">
            <h4 className="font-serif text-lg text-[#2f5d4b]">Posts</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/posts" className="text-[#5c5045] hover:underline">
                  All Posts →
                </Link>
              </li>
              <br />
              <li>
                <Link
                  href="/posts/woodland"
                  className="text-[#5c5045] hover:underline">
                  Woodland Finds
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/kitchen"
                  className="text-[#5c5045] hover:underline">
                  Kitchen Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/posts/crafts"
                  className="text-[#5c5045] hover:underline">
                  Crafty Creationssss
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle column: recent posts */}
          <div className="col-span-12 md:col-span-5">
            <ul className="mt-2 divide-y divide-black/5">
              {(postsRecent ?? []).map((p) => (
                <li key={p.href} className="py-2">
                  <Link
                    href={p.href}
                    className="text-sm text-[#3f372f] hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
              {(!postsRecent || postsRecent.length === 0) && (
                <li className="py-2 text-sm text-[#7a6f64] italic">
                  No posts yet.
                </li>
              )}
            </ul>
          </div>

          {/* Right column: highlights */}
          <div className="col-span-12 md:col-span-3">
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <Link key={h.href} href={h.href} className="group block w-full">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/5">
                    <Image
                      src={h.img}
                      alt=""
                      width={400}
                      height={300}
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
  );
}
