// src/components/LayoutCraft.tsx
import Image from "next/image";
import React from "react";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import LinkReturnHome from "components/LinkReturnHome";
import LinkReturnPost from "./LinkReturnPost";
import ButtonDownloadPdf from "components/ButtonDownloadPdf";
import PinterestShare from "./PinterestShare";
import FacebookShareButton from "./FacebookShareButton";
import SectionCard from "./SectionCard";

type CraftLayoutProps = {
  title: string;
  date?: string;
  hero?: string;
  parentPost;
  tags?: string[];
  text?: string;
  size?: string;
  materials?: string[];
  gauge?: string;
  instructions?: string;
  pdf?: string;
  children?: React.ReactNode;
};

export default function LayoutCraft({
  title,
  date,
  hero,
  parentPost,
  text,
  size,
  materials,
  gauge,
  instructions,
  pdf,
  children,
}: CraftLayoutProps) {
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
            {/* ⬇️ Use parentPost if provided, else fall back to home */}
            <LinkReturnPost href={parentPost ?? "/recipes"} />
          </div>

          {hero && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PinterestShare
                imageUrl={hero}
                description={`${title} • Simple Intentions`}
              />
              <FacebookShareButton
                variant="icon"
                className="relative -top-1 hover:drop-shadow hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30 focus:ring-offset-2"
              />
            </div>
          )}

          {/* Intro text + image (2/3 text, 1/3 image) */}
          {(text || hero) && (
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-6">
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

          {/* Pattern details */}
          {(size ||
            (materials && materials.length) ||
            gauge ||
            instructions) && (
            <SectionCard>
              <h2 className="text-2xl font-semibold mb-4">Knitting Pattern</h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {size && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">
                      Size
                    </dt>
                    <dd className="text-lg">{size}</dd>
                  </div>
                )}

                {gauge && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-gray-500">
                      Gauge
                    </dt>
                    <dd className="text-lg">{gauge}</dd>
                  </div>
                )}

                {materials && materials.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                      Materials
                    </dt>
                    <dd>
                      <ul className="list-disc pl-6 space-y-1">
                        {materials.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>

              {instructions && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                  <p className="whitespace-pre-line leading-relaxed">
                    {instructions}
                  </p>
                </div>
              )}
            </SectionCard>
          )}

          {/* Download PDF button */}
          <div className="mt-8">
            {pdf && (
              <ButtonDownloadPdf
                href={`/downloads/patterns/${pdf}`}
                label="Download Pattern (PDF)"
                ariaLabel={`Download ${title} pattern PDF`}
              />
            )}
          </div>

          {/* MDX body content */}
          <section className="prose">{children}</section>

          <div className="mt-10">
            <LinkReturnHome />
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
}
