import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full">
      <Image
        src="/images/header-banner/log-garden.jpeg"
        alt="Intentional Living Banner"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </header>
  );
}
