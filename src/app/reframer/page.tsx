import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import Reframer from "components/Reframer";

export default function ReframerPage() {
  return (
    <>
      <HeaderNavBarServer />
      <Header />

      <div className="bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
            Intentions Reframer
          </h1>
          <p className="mt-3 text-center opacity-80">
            Share your feelings. Get a kinder perspective.
          </p>
        </div>
      </div>

      <main className="bg-white text-black">
        <Reframer />
      </main>

      <Footer />
    </>
  );
}
