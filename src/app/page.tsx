// src/app/page.tsx
import Image from "next/image";
import Header from "components/Header";
import FooterPlain from "components/FooterPlain";

export default function PlaceholderHome() {
  return (
    <main className="min-h-screen flex flex-col bg-[#fefcf9]">
      <header className="w-full border-b border-black/5 bg-[#2f5d4b]">
        <div className="mx-auto max-w-6xl px-4 h-20 flex items-center gap-3">
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
          <div className="ml-auto">
            <span className="text-[#fefcf9]/80 text-sm">
              Coming November 2025
            </span>
          </div>
        </div>
      </header>

      <Header />

      {/* Hero (plain white with message) */}
      <section className="flex-1 flex items-center justify-center">
        <div className="text-center py-50">
          <h1 className="text-3xl md:text-5xl font-serif text-[#2f5d4b]">
            Growing roots.{" "}
            <span className="block md:inline">Sprouting soon.</span>
          </h1>
        </div>
      </section>

      {/* Footer (copyright) */}
      <FooterPlain />
    </main>
  );
}
