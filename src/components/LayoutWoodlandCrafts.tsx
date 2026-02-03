// src/components/LayoutWoodlandsCraft.tsx
import Image from "next/image";
import React, { Suspense } from "react";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import LinkReturnHome from "components/LinkReturnHome";
import LinkReturnPost from "./LinkReturnPost";
import ButtonDownloadPdf from "components/ButtonDownloadPdf";
import PinterestShare from "./PinterestShare";
import FacebookShareButton from "./FacebookShareButton";
import SectionCard from "components/SectionCard";

type WoodlandCraftLayoutProps = {
  title: string;
  date?: string;
  hero?: string;
  parentPost?: string; // if present, show "Return to post"
  tags?: string[];
  text?: string; // HTML or plain — rendered with dangerouslySetInnerHTML
  materials?: string[]; // accepts HTML strings
  instructions?: string; // plain text; preserves line breaks
  pdf?: string; // filename only, e.g., "fairy-homes.pdf"
  children?: React.ReactNode;
};

export default function LayoutWoodlandsCraft({
  title,
  date,
  hero,
  parentPost,
  text,
  materials,
  instructions,
  pdf,
  children,
}: WoodlandCraftLayoutProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <HeaderNavBarServer />
      <Header />

      <div className="w-full bg-[#fefcf9] px-6 py-12 flex flex-col items-center">
        <article className="w-full max-w-3xl">
          {/* Title + date */}
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {date ? <p className="text-gray-500 italic mb-8">{date}</p> : null}

          <div className="mt-10">
            {/* Use parentPost if provided, else return to Woodland Crafts hub */}
            <LinkReturnPost href={parentPost ?? "/woodland/woodland-crafts"} />
          </div>

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

          {/* Intro text + image (2/3 text, 1/3 image) */}
          {(text || hero) && (
            <div className="mb-14 grid grid-cols-1 md:grid-cols-[1fr_420px] gap-20 items-start">
              <div className="flex justify-end">
                {text && (
                  <div
                    className="text-lg leading-relaxed whitespace-pre-line
                    [&_a]:text-green-700 [&_a]:font-medium [&_a]:underline
                    [&_a:hover]:text-green-900"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                )}
              </div>

              {hero ? (
                <div className="md:col-span-1">
                  <Image
                    src={hero}
                    alt={title}
                    width={800}
                    height={450}
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="w-full h-auto rounded-xl shadow object-cover"
                  />
                </div>
              ) : null}
            </div>
          )}

          {/* Woodland Craft details */}
          {(materials && materials.length) || instructions ? (
            <SectionCard>
              <h2 className="text-2xl font-semibold mb-4">
                Craft Instructions
              </h2>

              {materials && materials.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                    Materials
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    {materials.map((m, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: m }} />
                    ))}
                  </ul>
                </div>
              )}

              {instructions && (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                    Instructions
                  </h3>

                  <ol className="list-decimal pl-6 space-y-3">
                    {instructions
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, idx) => (
                        <li key={idx}>
                          {line
                            .replace(/^\d+\.\s*/, "") // remove "1. "
                            .replace(/\*\*(.*?)\*\*/g, "$1")}{" "}
                          {/* remove **bold** */}
                        </li>
                      ))}
                  </ol>
                </div>
              )}
            </SectionCard>
          ) : null}

          {/* Download PDF button (printable) */}
          <div className="mt-8">
            {pdf && (
              <ButtonDownloadPdf
                href={`/downloads/printables/${pdf}`}
                label="Download Printable (PDF)"
                ariaLabel={`Download ${title} printable PDF`}
              />
            )}
          </div>

          {/* MDX body content */}
          {/* <section className="prose">{children}</section> */}

          <div className="mt-10">
            <LinkReturnHome />
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
