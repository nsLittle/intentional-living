export default function HeroIntro() {
  return (
    <section aria-label="Intro" className="max-w-2xl mt-12 mb-16">
      <h1 className="text-4xl font-bold text-black leading-tight">
        Simple Intentions, Vermont Made
      </h1>

      <div className="mb-6">
        <p className="mt-6 text-xl leading-loose">
          Life doesn’t steady itself. It steadies through small, repeated
          gestures.
        </p>

        <p className="mt-6 text-xl leading-loose">
          This is a quiet space for women rebuilding from chaos — with
          pantry-first rhythms, weekly structure, and gentle rituals that make
          daily life feel calm again.
        </p>

        <p className="mt-10 text-xl leading-loose">
          Bed made. Food steady. Body moving. Tomorrow written down.
        </p>

        <p className="mt-6 text-xl leading-loose">Walk with me. This works.</p>
      </div>

      {/* Primary CTA (can be wired to your existing Link component) */}
      <div className="mt-10">
        <a
          href="/slow-life-from-chaos"
          className="inline-block text-lg font-semibold underline underline-offset-4">
          Read the framework →
        </a>
      </div>
    </section>
  );
}
