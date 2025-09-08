// src/components/LayoutCraft.tsx
import Image from "next/image";
import React from "react";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import LinkReturnHome from "components/LinkReturnHome";
import ButtonDownloadPdf from "components/ButtonDownloadPdf";

type CraftLayoutProps = {
  title: string;
  date?: string;
  hero?: string;
  tags?: string[];
  text?: string;
  pdf?: string;
  children?: React.ReactNode;
};

export default function LayoutCraft({
  title,
  date,
  hero,
  text,
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
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl shadow object-cover"
                  />
                </div>
              ) : null}
            </div>
          )}

          {/* Download PDF button */}
          {pdf && (
            <ButtonDownloadPdf
              href={`/downloads/patterns/${pdf}`}
              label="Download Pattern (PDF)"
              ariaLabel={`Download ${title} pattern PDF`}
            />
          )}

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
