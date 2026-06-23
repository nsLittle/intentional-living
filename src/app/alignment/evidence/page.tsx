// src/app/alignment/evidence/page.tsx

import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import EvidenceForm from "components/EvidenceForm";

export default function EvidencePage() {
  const btnClass =
    "inline-block px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d50]";
  const pageClass = "px-6 py-20 text-center";
  const contentClass = "mx-auto max-w-3xl";
  return (
    <>
      <HeaderNavBarServer />
      <Header />
      <main className={pageClass}>
        <div className={contentClass}>
          <h1 className="mb-6 font-serif text-4xl text-[#5c5045]">Evidence</h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-[#5c5045]">
            Gather the daily actions, thoughts, events, and photos that show how
            this Season is taking shape.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <EvidenceForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
