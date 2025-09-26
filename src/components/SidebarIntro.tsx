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

      <p className="mt-4 text-lg leading-relaxed max-w-xs mx-auto">
        I&#39;m an opportunistic forager, home cook, and creator of{" "}
        <span className="font-bold">Simple Intentions</span>. A quiet corner
        inspired by the warmth of Vermont&#39;s simple living.
      </p>

      <p className="mt-4 text-lg leading-relaxed max-w-xs mx-auto">
        I share pantry-first recipes, gentle crafts, and respectful foraging
        notes. With my daughters and our cats besides us, we savor life&#39;s
        small joys.
      </p>

      <p className="mt-4 text-lg leading-relaxed max-w-xs mx-auto">
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
