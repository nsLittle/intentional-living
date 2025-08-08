// src/components/LatestPost.tsx
import Image from "next/image";
import Link from "next/link";

export default function LatestPost() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-black">My Latest Prattling...</h2>

      <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
        {/* Image block */}
        <div className="w-full md:w-1/3 max-w-xs rounded-xl overflow-hidden shadow-md mx-auto md:mx-0">
          <Image
            src="/images/little-wildflowers.jpeg"
            alt="Luxury of the Meadows"
            width={400}
            height={250}
            layout="responsive"
            className="object-cover"
          />
        </div>

        {/* Text block */}
        <div className="md:w-2/3">
          <h3 className="text-3xl font-bold text-black mb-2">
            <Link href="/posts/luxury-meadows" className="hover:underline">
              Luxury of the Meadows
            </Link>
          </h3>
          <p className="text-sm text-gray-500 mb-3">August 7, 2025</p>
          <p className="text-2xl max-w-md">
            Gathering wildflowers and having them in the house all summer long
            is the luxury of the meadows...
          </p>
          <Link
            href="/posts/luxury-meadows"
            className="inline-block mt-4 text-[#4b816d] font-semibold hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
