// src/components/Footer.tsx
import FooterNewsletterSignup from "./FooterNewsletterSignup";
import FooterCopyright from "./FooterCopyright";
import FooterQuickLinks from "./FooterQuickLinks";

export default function Footer() {
  return (
    <footer className="bg-[#2e271f] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Quick Links */}
        {/* <FooterQuickLinks /> */}

        {/* Newsletter Signup */}
        <FooterNewsletterSignup />

        {/* Copyright */}
        <FooterCopyright />
      </div>
    </footer>
  );
}
