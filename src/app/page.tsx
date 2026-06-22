// src/app/page.tsx

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import HeroIntro from "components/HeroIntro";
import HeroContent from "components/HeroContent";

export default function Home() {
  return (
    <main className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <HeaderNavBarServer />
      <Header />

      <div className="mx-auto max-w-screen-6xl px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Full-width hero above the fold */}
        <section className="-mx-6 sm:-mx-10 lg:-mx-16 xl:-mx-24 bg-white pt-0 pb-10">
          {" "}
          <div className="mx-auto max-w-3xl px-6">
            <HeroIntro />
          </div>
        </section>

        <div />

        {/* Section Intro */}
        {/* Section Intro */}
        <div className="-mx-6 sm:-mx-10 lg:-mx-16 xl:-mx-24 bg-[#f6f1ea] text-center mt-0 py-12 px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Intentional Living in Action
          </h2>

          <p className="text-md italic mt-6">
            A Vermont-based lifestyle journal exploring intentional living
            through simple recipes, crafty projects, and seasonal reflection.
          </p>

          <aside className="min-w-0">
            <Sidebar />
          </aside>
        </div>

        {/* Content */}
        <div className="grid gap-8">
          <div className="min-w-0">
            <HeroContent />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
