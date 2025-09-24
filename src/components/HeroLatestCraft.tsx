// src/components/HeroLatestCraft.tsx
import Image from "next/image";
import Link from "next/link";
import { getLatestCraft } from "lib/crafts";

export default function HeroLatestCraft() {
  const craft = getLatestCraft();

  if (!craft) {
    console.log("[HeroLatestCraft] No craft returned from getLatestCraft()");
    return (
      <section className="my-12 border border-red-300 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700">
          No latest craft found.
        </h2>
        <p className="text-sm text-red-600">
          getLatestCraft() returned null/undefined.
        </p>
      </section>
    );
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
          <Link href={`/Crafts/${craft.slug}`}>
            <h3 className="text-2xl font-semibold text-gray-800 hover:underline mb-2">
              {craft.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mb-6">
            {craft.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div
            className="text-lg text-gray-700 mb-8 [&_a]:underline [&_a]:text-green-700"
            dangerouslySetInnerHTML={{ __html: craft.text ?? "" }}
          />
          <Link
            href={`/Crafts/${craft.slug}`}
            className="text-green-700 font-semibold hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </section>
  );
}
