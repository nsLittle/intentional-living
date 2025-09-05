import Link from "next/link";
import Image from "next/image";
import ReturnHome from "./LinkReturnHome";

type CraftSummary = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
};

type LayoutAllCraftsProps = {
  crafts: CraftSummary[];
  heading?: string;
};

export default function LayoutAllCrafts({
  crafts,
  heading,
}: LayoutAllCraftsProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {heading ?? "All Crafts"}
        </h1>
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {crafts.map((craft) => (
            <Link
              key={craft.slug}
              href={`/crafts/${craft.slug}`}
              className="block group">
              <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
                {craft.hero && (
                  <Image
                    src={craft.hero}
                    alt={craft.title}
                    width={800}
                    height={450}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-black mb-2 group-hover:underline">
                    {craft.title}
                  </h2>
                  {craft.date && (
                    <p className="text-sm text-gray-500 mb-4">{craft.date}</p>
                  )}
                  {craft.text && (
                    <p className="text-lg line-clamp-3">{craft.text}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ReturnHome />
      </div>
    </div>
  );
}
