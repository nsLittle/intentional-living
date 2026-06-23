import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import ReflectionForm from "components/ReflectionForm";

export default function ReflectionPage() {
  return (
    <>
      <HeaderNavBarServer />
      <Header />

      <main className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 font-serif text-4xl text-[#5c5045]">
            Reflection
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-[#5c5045]">
            Notice what today revealed before Mirror looks for patterns.
          </p>

          <ReflectionForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
