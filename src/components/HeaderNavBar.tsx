// src/components/HeaderNavBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeaderNavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#2f5d4b]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-14 flex items-center">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
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
        </div>
      </div>
    </nav>
  );
}
