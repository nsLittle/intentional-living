import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[420px]">
      <Image
        src="/images/header-banner/log-garden.jpeg"
        alt="Intentional Living Banner"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
        quality={60}
      />
    </header>
  );
}
