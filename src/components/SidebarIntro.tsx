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
      <h2 className="text-3xl font-bold">Hi, I&#39;m Little!</h2>
      <p className="mt-4 text-lg leading-relaxed max-w-xs">
        I&#39;m an opportunistic forager, home cook, and creator of{" "}
        <span className="font-bold">Simple Intentions</span>, a quiet corner of
        the universe inspired by the warmth of Vermont&#39;s simple living.
      </p>
      <p className="mt-4 text-lg leading-relaxed max-w-xs">
        I share recipes, seasonal foraging finds, and reflections on intentional
        living. With my daughters and cats beside me, we savor life&#39;s small
        joys.
      </p>
      <p className="mt-4 text-lg leading-relaxed max-w-xs">
        Laughter in the kitchen, wild mushrooms in a basket, and meals made with
        love and simplicity.
      </p>
      <p className="mt-6 mb-6 italic text-xl text-gray-500">
        With warmth, <br />
        Little
      </p>
    </div>
  );
}
