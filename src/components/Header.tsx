import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full h-58">
      <Image
        src="/images/header-banner/log-garden.jpeg"
        alt="Intentional Living Banner"
        className="absolute inset-0 w-full h-full object-cover"
        width={200}
        height={150}
      />
    </header>
  );
}
