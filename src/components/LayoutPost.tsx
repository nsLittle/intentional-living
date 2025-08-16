import Image from "next/image";
import React from "react";
import { marked } from "marked";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import LinkReturnHome from "components/LinkReturnHome";

type PostLayoutProps = {
  title: string;
  date?: string;
  hero?: string;
  tags?: string[];
  text?: string;
  textToo?: string;
  textThree?: string;
  children?: React.ReactNode;
};

export default function LayoutPost({
  title,
  date,
  hero,
  text,
  textToo,
  textThree,
  children,
}: PostLayoutProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <HeaderNavBarServer />
      <Header />

      <div className="w-full bg-[#fefcf9] px-6 py-12 flex flex-col items-center">
        {" "}
        {/* Content */}
        <article className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {date && <p className="text-gray-500 italic mb-8">{date}</p>}

          {(text || hero) && (
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Text column (2/3) */}
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

              {/* Image column (1/3) */}
              {hero && (
                <div className="md:col-span-1 md:pl">
                  <Image
                    src={hero}
                    alt={title}
                    width={800}
                    height={533}
                    className="w-full h-auto rounded-xl shadow object-cover"
                  />
                </div>
              )}
            </div>
          )}

          <div className="mt-8">
            <LinkReturnHome />
          </div>

          {children}
        </article>
      </div>

      <Footer />
    </div>
  );
}
