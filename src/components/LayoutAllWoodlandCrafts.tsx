// src/app/woodland/crafts/page.tsx
/ add this import at the top
import LayoutAllCrafts from "components/LayoutAllCrafts";

// ...inside your component, AFTER computing fromCrafts/fromFieldNotes:

// Build a crafts-only list matching LayoutAllCrafts' props
const craftsForGrid = fromCrafts.map((n) => ({
  slug: n.slug,
  title: n.title,
  date: n.date,
  hero: n.hero,
  text: n.text,
}));

return (
  <>
    <HeaderNavBarServer />
    <Header />
    <div className="bg-white text-black">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-serif text-[#5c5045] text-4xl font-bold text-center">
          Woodland Crafts
        </h1>
      </div>
    </div>

    {/* swap this: <LayoutAllFieldNotes notes={notes} /> */}
    <LayoutAllCrafts crafts={craftsForGrid} heading="Woodland Crafts" />

    <Footer />
  </>
);
