// src/components/LayoutAllWoodlandCrafts.tsx
import React from "react";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";

type LayoutAllWoodlandCraftsProps = {
  title?: string; // defaults to "All Woodland Crafts"
  intro?: string; // optional short blurb above the grid/list
  children?: React.ReactNode; // your grid/cards go here
};

export default function LayoutAllWoodlandCrafts({
  title = "All Woodland Crafts",
  intro,
  children,
}: LayoutAllWoodlandCraftsProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <HeaderNavBarServer />
      <Header />

      <main className="w-full bg-[#fefcf9] px-6 py-12 flex flex-col items-center">
        <section className="w-full max-w-5xl">
          <h1 className="text-4xl font-bold text-center mb-10">{title}</h1>

          {intro ? (
            <p className="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-[#5c5045]/80">
              {intro}
            </p>
          ) : null}

          {children}
        </section>
      </main>

      <Footer />
    </div>
  );
}
