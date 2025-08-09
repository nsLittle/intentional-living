import Image from "next/image";
import Link from "next/link";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import HeaderNavBar from "components/HeaderNavBar";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import HeroContent from "components/HeroContent";

export default function Home() {
  return (
    <main className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      {/* Header Navigation Bar Server */}
      <HeaderNavBarServer />

      {/*Header*/}
      <Header />

      <div className="w-full max-w-none px-6 lg:pl-24 lg:pr-6 py-6 flex flex-col lg:flex-row-reverse">
        {/* Sidebar */}
        <Sidebar />

        {/* Hero Content */}
        <HeroContent />
      </div>

      <Footer />
    </main>
  );
}
