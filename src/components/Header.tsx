import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full h-58">
      <Image
        src="/images/header-banner/log-garden.jpeg"
        alt="Intentional Living Banner"
        fill
        className="object-cover"
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
      />
    </header>
  );
}
