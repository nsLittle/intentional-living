import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import ReAlignment from "components/ReAlignment";

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
            Sometimes we all need a helpful friend to help us with our yuck.
          </p>
          <p className="mt-4 font-serif text-[#5c5045] text-lg text-center max-w-2xl mx-auto">
            Simple Intentions sits with you while things fall together.
          </p>
          <p className="mt-4 font-serif text-[#5c5045] text-lg text-center max-w-2xl mx-auto">
            Tell us what’s feeling heavy, and we’ll help you reshape it into
            something more honest and supportive.
          </p>
        </div>
      </div>

      <main className="bg-white text-black">
        <ReAlignment />
      </main>

      <Footer />
    </>
  );
}
