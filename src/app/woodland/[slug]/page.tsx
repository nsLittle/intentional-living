import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { notFound } from "next/navigation";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";

type Craft = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
  pdf?: string;
};

function getWoodlandCraft(slug: string): Craft | null {
  const dir = path.join(process.cwd(), "src", "content", "woodland-crafts");
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? undefined,
    hero: (data.hero as string) ?? undefined,
    text: (data.text as string) ?? undefined,
    pdf: (data.pdf as string) ?? `${slug}.pdf`,
  };
}

// NOTE: Next.js 15 passes `params` as a Promise in dynamic routes.
//       We must `await` it before using its properties.
export default async function WoodlandCraftPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const craft = getWoodlandCraft(slug);
  if (!craft) notFound();

  return (
    <>
      <HeaderNavBarServer />
      <Header />

      <main className="bg-white text-black">
        <article className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="font-serif text-[#5c5045] text-4xl font-bold">
            {craft.title}
          </h1>

          {craft.date && (
            <p className="mt-2 text-sm text-gray-600">
              {new Date(craft.date).toLocaleDateString()}
            </p>
          )}

          {craft.hero && (
            <div className="mt-6">
              <Image
                src={craft.hero}
                alt=""
                width={1200}
                height={630}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          )}

          {craft.text && (
            <p className="mt-6 leading-relaxed text-[#3b342d] whitespace-pre-line">
              {craft.text}
            </p>
          )}

          {craft.pdf && (
            <div className="mt-8">
              <a
                href={`/pdf/${craft.pdf}`}
                className="underline text-[#2f5d4b]">
                View PDF
              </a>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
