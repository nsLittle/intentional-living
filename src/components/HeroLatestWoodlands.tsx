// src/components/HeroLatestWoodlands.tsx
import Image from "next/image";
import Link from "next/link";
import { getLatestWoodland } from "lib/woodland";

export default function HeroLatestWoodlands() {
  const item = getLatestWoodland();

  if (!item) return null;

  return (
    <section className="my-2 mt-8">
      <h2 className="text-4xl font-bold mb-6">Latest from the Woodlands…</h2>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {item.hero && (
          <Image
            src={item.hero}
            alt={item.title}
            height={400}
            width={300}
            priority
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-md"
          />
        )}

        <div className="flex-1">
          <Link href={item.href}>
            <h3 className="text-2xl font-semibold text-gray-800 hover:underline mb-2">
              {item.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mb-6">
            {item.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Link
            href={item.href}
            className="text-green-700 font-semibold hover:underline">
            Explore →
          </Link>
        </div>
      </div>
    </section>
  );
}
