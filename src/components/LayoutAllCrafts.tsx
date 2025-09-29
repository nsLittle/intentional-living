// src/components/LayoutAllCrafts.tsx
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
              href={`/woodland/woodland-crafts/${craft.slug}`}
              className="block group h-full" // ← NEW: let each card fill equal height
            >
              <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow flex h-full flex-col">
                {" "}
                {/* ← NEW */}
                {craft.hero && (
                  <Image
                    src={craft.hero}
                    alt={craft.title}
                    width={800}
                    height={450}
                    priority
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  {" "}
                  {/* ← NEW */}
                  <h2 className="text-2xl font-bold text-black mb-2 group-hover:underline line-clamp-2 min-h-[3.25rem]">
                    {/* ↑ NEW: clamp title to 2 lines and reserve space */}
                    {craft.title}
                  </h2>
                  {/* Reserve a single-line slot for date, even if missing */}
                  {craft.date ? (
                    <p className="text-sm text-gray-500 mb-4">{craft.date}</p>
                  ) : (
                    <p className="mb-4 h-5" /> // ← NEW: keeps heights aligned
                  )}
                  <p className="text-lg line-clamp-3 flex-1">{craft.text}</p>{" "}
                  {/* ← NEW: let text fill remaining */}
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
