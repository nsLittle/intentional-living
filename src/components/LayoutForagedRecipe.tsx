// src/components/LayoutForagedRecipe.tsx
import Image from "next/image";
import React from "react";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import LinkReturnHome from "components/LinkReturnHome";
import LinkReturnPost from "./LinkReturnPost";
import ButtonDownloadPdf from "components/ButtonDownloadPdf";
import ButtonPrintPDF from "components/ButtonPrintPDF";
import ButtonDownloadTag from "components/ButtonDownloadTag";
import ButtonPrintTag from "components/ButtonPrintTag";
import PinterestShare from "./PinterestShare";
import FacebookShareButton from "./FacebookShareButton";
import SectionCard from "components/SectionCard";
import { Suspense } from "react";

type ForagedRecipeLayoutProps = {
  title: string;
  date: string;
  hero?: string;
  parentPost?: string;
  text?: string;
  textToo?: string;
  yield?: string;
  prepTime?: string;
  ingredients?: string[];
  steps?: string[];
  bakingPrepTime?: string;
  bakingTime?: string;
  bakingIngredients?: string[];
  bakingSteps?: string[];
  pdf?: string;
  notes?: string;
  children?: React.ReactNode;
  methodLabel?: "Baking" | "Cooking";
};

export default function LayoutForagedRecipe({
  title,
  date,
  hero,
  parentPost,
  text,
  textToo,
  yield: recipeYield,
  prepTime,
  ingredients,
  steps,
  bakingPrepTime,
  bakingTime,
  bakingIngredients,
  bakingSteps,
  pdf,
  notes,
  children,
  methodLabel,
}: ForagedRecipeLayoutProps) {
  const method = methodLabel ?? "Baking";

  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <div className="no-print">
        <HeaderNavBarServer />
      </div>
      <Header />
      <div className="w-full bg-[#fefcf9] px-6 py-12 flex flex-col items-center">
        <article className="w-full max-w-3xl">
          {/* Title + date */}
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {date ? (
            <p className="text-gray-500 italic mb-8 no-print">{date}</p>
          ) : null}

          <div className="mt-10 no-print">
            {/* ⬇️ Use parentPost if provided, else fall back to home */}
            <LinkReturnPost href={parentPost ?? "/recipes"} />
          </div>

          <div className="no-print">
            {hero && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PinterestShare
                  imageUrl={hero}
                  description={`${title} • Simple Intentions`}
                />
                <Suspense fallback={null}>
                  <FacebookShareButton
                    variant="icon"
                    className="relative -top-1 hover:drop-shadow hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30 focus:ring-offset-2"
                  />
                </Suspense>
              </div>
            )}
          </div>

          {/* Intro text + image side-by-side (2/3 text, 1/3 image) */}
          <div className="no-print">
            {(text || textToo || hero) && (
              <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Text column (2/3) */}
                <div className="md:col-span-2 space-y-6">
                  {text ? (
                    <p className="text-xl leading-relaxed whitespace-pre-line">
                      {text}
                    </p>
                  ) : null}
                </div>

                {/* Image column (1/3) */}
                {hero ? (
                  <div className="md:col-span-1">
                    <Image
                      src={hero}
                      alt={title}
                      width={600}
                      height={450}
                      priority
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="w-full h-auto rounded-xl shadow object-cover"
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <SectionCard>
            <h2 className="text-3xl font-semibold mb-6 mt-4">
              Jarring Instructions
            </h2>
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

            {ingredients?.length ? (
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {steps?.length ? (
              <section>
                <h3 className="text-xl font-semibold mb-4">Steps</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  {steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </section>
            ) : null}
          </SectionCard>

          <SectionCard className="mt-16 mb-16">
            <h2 className="text-3xl font-semibold mb-6">
              {method} Instructions
            </h2>

            {(bakingPrepTime || bakingTime) && (
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bakingPrepTime && (
                  <div className="rounded-xl bg-white/70 px-4 py-3 shadow">
                    <div className="text-sm uppercase tracking-wide text-gray-500">
                      {method} Prep Time
                    </div>
                    <div className="text-lg">{bakingPrepTime}</div>
                  </div>
                )}
                {bakingTime && (
                  <div className="rounded-xl bg-white/70 px-4 py-3 shadow">
                    <div className="text-sm uppercase tracking-wide text-gray-500">
                      {method} Time
                    </div>
                    <div className="text-lg">{bakingTime}</div>
                  </div>
                )}
              </div>
            )}

            {bakingIngredients?.length ? (
              <section className="mb-10">
                <h3 className="text-xl font-semibold mb-4">
                  {method} Ingredients
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {bakingIngredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {bakingSteps?.length ? (
              <section className="mb-2">
                <h3 className="text-xl font-semibold mb-4">{method} Steps</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  {bakingSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </section>
            ) : null}
          </SectionCard>

          {/* Notes (optional) */}
          {notes && (
            <section className="mt-6">
              <h3 className="text-lg font-semibold">Notes</h3>
              <p className="mt-2">{notes}</p>
            </section>
          )}

          {/* Download + Print — ForagedRecipe PDF & Tag (2×2 grid) */}
          <div className="no-print mt-4 grid grid-cols-2 gap-y-3">
            {pdf && (
              <>
                {/* Green */}
                <ButtonDownloadPdf
                  href={`/downloads/recipes/${pdf}`}
                  label="Download ForagedRecipe"
                  ariaLabel={`Download ${title} recipe PDF`}
                  className="inline-flex h-12 w-3/4 items-center justify-center"
                />

                {/* Light Green 2 */}
                <ButtonDownloadTag
                  href={`/downloads/tags/${pdf.replace(".pdf", "-tag.pdf")}`}
                  label="Download Tag"
                  className="inline-flex h-12 w-3/4 items-center justify-center"
                />

                {/* Light Green 1 */}
                <ButtonPrintPDF
                  href={`/downloads/recipes/${pdf}`}
                  label="Print ForagedRecipe"
                  className="inline-flex h-12 w-3/4 items-center justify-center bg-[#6DA58D] hover:opacity-95 focus:ring-[#6DA58D]/30"
                />

                {/* Cream */}
                <ButtonPrintTag
                  href={`/downloads/tags/${pdf.replace(".pdf", "-tag.pdf")}`}
                  label="Print Tag"
                  className="inline-flex h-12 w-3/4 items-center justify-center"
                />
              </>
            )}
          </div>

          {/* MDX body content (optional) */}
          <section className="prose">{children}</section>

          <div className="mt-10 no-print">
            <LinkReturnHome />
          </div>
        </article>
      </div>
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
