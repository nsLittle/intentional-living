// src/app/page.tsx

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import HeroContent from "components/HeroContent";

export default function Home() {
  return (
    <main className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      {/* Header Navigation Bar */}
      <div className="w-full max-w-none">
        <div className="min-w-0">
          <HeaderNavBarServer />
        </div>
      </div>

      {/* Header */}
      <div className="w-full max-w-none">
        <div className="min-w-0">
          <Header />
        </div>
      </div>

      <div
        className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8
                grid gap-8
               sm:grid-cols-[2fr_1fr] sm:items-start">
        {/* Sidebar (right on desktop) */}
        <div className="order-2 sm:order-none sm:col-start-2 sm:row-start-1 min-w-0">
          <Sidebar />
        </div>

        {/* Hero (left on desktop) */}
        <div className="order-1 sm:order-none sm:col-start-1 sm:row-start-1 min-w-0 self-start [&>*:first-child]:mt-0">
          <HeroContent />
        </div>
      </div>

      <Footer />
    </main>
  );
}
