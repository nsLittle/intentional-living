import Image from "next/image";

export default function SidebarIntro() {
  return (
    <div className="items-center text-center">
      <Image
        src="/images/little/little-woods.jpeg"
        alt="Little"
        width={128}
        height={128}
        className="mx-auto items-center w-32 h-32 rounded-full object-cover mb-12 shadow-md"
      />
      <h2 className="text-3xl font-bold">Welcome!</h2>

      <p className="mt-4 text-lg leading-relaxed max-w-xs mx-auto">
        I&#39;m an opportunistic forager, home cook, and creator of{" "}
        <span className="font-bold">Simple Intentions</span>. A small
        Vermont-made space for mindful living.
      </p>

      <p className="mt-4 text-lg leading-relaxed max-w-xs mx-auto">
        Here you&#39;ll find pantry-first recipes, humble crafts, and respectful
        field notes from the woods. Shaped by slow days, laughter in the
        kitchen, and collecting foraged finds in a basket as I meander in the
        woods with my daughters and cats, as we savor life&#39;s small joys.
      </p>

      <p className="mt-4 text-lg leading-relaxed max-w-xs mx-auto">
        Simple pleasures. Gathered with care.
      </p>

      <p className="mt-6 text-xl">With warmth,</p>
      <p className="mt-2 mb-6 italic font-bold text-xl">Little</p>
    </div>
  );
}
