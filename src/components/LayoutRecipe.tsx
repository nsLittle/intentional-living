// src/components/LayoutRecipe.tsx
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./LinkReturnHome";

type RecipeLayoutProps = {
  title: string;
  date?: string;
  hero?: string;
  text?: string;
  textToo?: string; // Optional additional text
  yield?: string;
  prepTime?: string;
  ingredients?: string[];
  steps?: string[];
  notes?: string;
  pdf?: string;
  children: React.ReactNode;
};

export default function LayoutRecipe({
  title,
  date,
  hero,
  text,
  textToo,
  yield: recipeYield,
  prepTime,
  ingredients,
  steps,
  notes,
  pdf,
  children,
}: RecipeLayoutProps) {
  return (
    <div>
      <Header />
      <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Title + date */}
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {date ? <p className="text-gray-500 italic mb-8">{date}</p> : null}

          {/* Intro text + image side-by-side (2/3 text, 1/3 image) */}
          {(text || textToo || hero) && (
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Text column (2/3) */}
              <div className="md:col-span-2 space-y-6">
                {text ? (
                  <p className="text-xl leading-relaxed">{text}</p>
                ) : null}
                {textToo ? (
                  <p className="text-lg leading-relaxed">{textToo}</p>
                ) : null}
              </div>

              {/* Image column (1/3) */}
              {hero ? (
                <div className="md:col-span-1">
                  <Image
                    src={hero}
                    alt={title}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl shadow object-cover"
                  />
                </div>
              ) : null}
            </div>
          )}

          {/* Meta row (yield / prep time) */}
          {(recipeYield || prepTime) && (
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipeYield && (
                <div className="rounded-xl bg-white/70 px-4 py-3 shadow">
                  <div className="text-sm uppercase tracking-wide text-gray-500">
                    Yield
                  </div>
                  <div className="text-lg">{recipeYield}</div>
                </div>
              )}
              {prepTime && (
                <div className="rounded-xl bg-white/70 px-4 py-3 shadow">
                  <div className="text-sm uppercase tracking-wide text-gray-500">
                    Prep Time
                  </div>
                  <div className="text-lg">{prepTime}</div>
                </div>
              )}
            </div>
          )}

          {/* Ingredients */}
          {ingredients?.length ? (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc pl-6 space-y-2">
                {ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Steps */}
          {steps?.length ? (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Steps</h2>
              <ol className="list-decimal pl-6 space-y-3">
                {steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </section>
          ) : null}

          {/* Notes */}
          {notes ? (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">Notes</h2>
              <p className="leading-relaxed">{notes}</p>
            </section>
          ) : null}

          {/* Download PDF button */}
          {pdf && (
            <a
              href="/downloads/recipes/bold-earth.pdf"
              download
              className="inline-block bg-[#4b816d] text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-[#3b6c5a]"
              aria-label="Download Bold Earth recipe PDF">
              Download Recipe (PDF)
            </a>
          )}

          {/* MDX body content (optional) */}
          <section className="prose">{children}</section>

          <div className="mt-10">
            <ReturnHome />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
