// src/components/Footer.tsx
import FooterCopyright from "./FooterCopyright";

export default function Footer() {
  return (
    <footer className="bg-[#2e271f] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Copyright */}
        <FooterCopyright />
      </div>
    </footer>
  );
}
