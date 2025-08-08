export default function SidebarIntro() {
  return (
    <div className="items-center text-center">
      <img
        src="/images/little-meadow.jpg"
        alt="Little"
        className="mx-auto items-center w-32 h-32 rounded-full object-cover mb-12 shadow-md"
      />
      <h2 className="text-3xl font-bold">Hi, I'm Little!</h2>
      <p className="mt-4 text-xl leading-relaxed max-w-xs mx-auto">
        I'm an opportunistic forager, home cook, and creator of{" "}
        <span className="font-bold">Simple Intentions</span>, a quiet corner of
        the web inspired by the warmth of Vermont's simple living.
      </p>
      <p className="mt-4 text-xl leading-relaxed max-w-xs mx-auto">
        I share recipes, seasonal foraging finds, and reflections on intentional
        living. With my daughters and cats beside me, we savor life's small
        joys. Laughter in the kitchen, wild mushrooms in a basket, and meals
        made with love and simplicity.
      </p>
      <p className="mt-6 mb-6 italic text-2xl text-gray-500">
        With warmth, <br />
        Little
      </p>
    </div>
  );
}
