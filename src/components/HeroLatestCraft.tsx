// src/components/HeroLatestCraft.tsx
import Image from "next/image";
import Link from "next/link";
import { getAllCrafts } from "lib/crafts"; // ⬅️ change: use all crafts
import { isPublished } from "lib/publish";

type Craft = {
  slug: string;
  title: string;
  date: string | Date;
  hero?: string;
  text?: string;
  published?: boolean;
};

const toISO = (d: string | Date) => (typeof d === "string" ? new Date(d) : d);

export default function HeroLatestCraft() {
  // 1) load all crafts
  const all = getAllCrafts() as Craft[];

  // 2) filter to published using your util
  const published = all.filter((c) =>
    isPublished({
      date: typeof c.date === "string" ? c.date : c.date.toISOString(),
      published: c.published,
    })
  );

  // 3) sort newest → oldest
  published.sort((a, b) => +toISO(b.date) - +toISO(a.date));

  // 4) take the latest published (or render nothing)
  const craft = published[0];
  if (!craft) return null;

  function truncateText(text: string, maxChars: number): string {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trimEnd() + "…";
  }

  return (
    <section className="my-12">
      <h2 className="text-4xl font-bold mb-6">My Latest Crafts…</h2>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {craft.hero && (
          <Image
            src={craft.hero}
            alt={craft.title}
            height={400}
            width={300}
            priority
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-md"
          />
        )}

        <div className="flex-1">
          <Link href={`/crafts/${craft.slug}`}>
            <h3 className="text-2xl font-semibold text-gray-800 hover:underline mb-2">
              {craft.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mb-6">
            {toISO(craft.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-lg text-gray-700 mb-8">
            {truncateText(craft.text ?? "", 350)}
          </p>

          <Link
            href={`/crafts/${craft.slug}`}
            className="text-green-700 font-semibold hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </section>
  );
}
