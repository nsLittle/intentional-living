// src/app/contact/page.tsx
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import ContactForm from "components/ContactForm";

export default function Contact() {
  return (
    <main className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      {/* Header Navigation Bar (server) */}
      <HeaderNavBarServer />

      {/* Header */}
      <Header />

      {/* Contact form (full-width page content; no sidebar) */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
