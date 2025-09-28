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
            Intentional Alignment
          </h1>
          <p className="mt-4 font-serif text-[#5c5045] text-lg text-center max-w-2xl mx-auto">
            Live your life intentionally.
            <br />
            Align your thoughts to your values.
            <br />
            Let your actions reflect your true intentions.
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
