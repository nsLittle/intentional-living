// src/components/FooterPlain.tsx
import FooterNewsletterSignup from "./FooterNewsletterSignup";
import FooterCopyright from "./FooterCopyright";

export default function FooterPlain() {
  return (
    <footer className="bg-[#2e271f] text-white py-15 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Copyright */}
        <FooterCopyright />
      </div>
    </footer>
  );
}
