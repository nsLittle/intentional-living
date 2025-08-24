// src/app/not-found.tsx
import Link from "next/link";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import LinkReturnHome from "components/LinkReturnHome";

export default function NotFound() {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <HeaderNavBarServer />
      <Header />

      <main className="flex flex-col items-center justify-center bg-stone-50 text-center py-30 px-12">
        <h1 className="text-6xl font-extrabold text-stone-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-stone-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-stone-500 mb-8 max-w-lg">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <LinkReturnHome />

        {/* <Link
          href="/"
          className="px-6 py-3 bg-stone-800 text-white rounded-xl shadow hover:bg-stone-700 transition">
          Back to Home
        </Link> */}
      </main>

      <Footer />
    </div>
  );
}
