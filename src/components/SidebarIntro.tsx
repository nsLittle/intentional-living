import Image from "next/image";

export default function SidebarIntro() {
  return (
    <div className="max-w-4xl mx-auto text-relative">
      <h2 className="text-3xl font-bold text-center">Welcome!</h2>

      <p className="mt-4 text-lg leading-relaxed max-w-3xl">
        I&#39;m an opportunistic forager, home cook, and creator of{" "}
        <span className="font-bold">Simple Intentions</span>. A small
        Vermont-made space for mindful living.
      </p>

      <p className="mt-4 text-lg leading-relaxed max-w-3xl">
        Here you&#39;ll find pantry-first recipes, humble crafts, and respectful
        field notes from the woods. Shaped by slow days, laughter in the
        kitchen, and collecting foraged finds as I meander through the woods
        with my daughters and cats, savoring life&#39;s small joys.
      </p>

      <p className="mt-4 text-lg leading-relaxed max-w-3xl">
        Simple pleasures. Gathered with care.
      </p>

      <p className="mt-6 text-xl">With warmth,</p>
      <p className="mt-2 mb-6 italic font-bold text-xl">Mutsumi</p>

      <div className="flex justify-center">
        <Image
          src="/images/little/little-woods.jpeg"
          alt="Little"
          width={64}
          height={64}
          className="w-48 h-48 rounded-full object-cover shrink-0"
        />
      </div>
    </div>
  );
}
