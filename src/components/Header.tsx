import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px]">
      <Image
        src="/images/header-banner/log-garden.jpeg"
        alt="Intentional Living Banner"
        fill
        className="object-cover"
        priority
        sizes="(min-width:1536px) 1536px, (min-width:1280px) 1344px, 100vw"
        quality={60}
      />
    </header>
  );
}
