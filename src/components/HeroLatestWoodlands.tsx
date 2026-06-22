// src/components/HeroLatestWoodlands.tsx
import Image from "next/image";
import Link from "next/link";
import { getAllWoodlands } from "lib/woodland";
import { isPublished } from "lib/publish";

type Woodland = {
  slug: string;
  title: string;
  date: string | Date;
  hero?: string;
  text?: string;
  published?: boolean;
};

const toISO = (d: string | Date) => (typeof d === "string" ? new Date(d) : d);

export default function HeroLatestWoodlands() {
  const all = getAllWoodlands() as Woodland[];

  const published = all.filter((w) =>
    isPublished({
      date: typeof w.date === "string" ? w.date : w.date.toISOString(),
      published: w.published,
    })
  );

  published.sort((a, b) => +toISO(b.date) - +toISO(a.date));

  const woodland = published[0];
  if (!woodland) return null;

  function truncateText(text: string, maxChars: number): string {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trimEnd() + "…";
  }

  return (
    <section className="my-12">
      <h2 className="text-4xl font-bold mb-6">Latest from the Woodlands…</h2>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {woodland.hero && (
          <Image
            src={woodland.hero}
            alt={woodland.title}
            height={400}
            width={300}
            priority
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-md"
          />
        )}

        <div className="flex-1">
          <Link href={`/woodland/${woodland.slug}`}>
            <h3 className="text-2xl font-semibold text-gray-800 hover:underline mb-2">
              {woodland.title}
            </h3>
          </Link>

          <p className="text-sm text-gray-500 mb-6">
            {toISO(woodland.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="text-lg text-gray-700 mb-8">
            {truncateText(woodland.text ?? "", 350)}
          </p>

          <Link
            href={`/woodland/${woodland.slug}`}
            className="text-green-700 font-semibold hover:underline">
            Explore →
          </Link>
        </div>
      </div>
    </section>
  );
}
