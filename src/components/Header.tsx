import Link from "next/link";

export default function Header() {
  return (
    <header className="relative w-full h-58">
      <img
        src="/images/header-banner/log-garden.jpeg"
        alt="Intentional Living Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </header>
  );
}
