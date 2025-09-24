// src/components/HeroLatestPost.tsx
import Image from "next/image";
import Link from "next/link";
import { getLatestPost } from "lib/posts";

export default function HeroLatestPost() {
  const post = getLatestPost();

  if (!post) return null;

  return (
    <section className="my-2">
      <h2 className="text-4xl font-bold mb-6">My Latest Prattling…</h2>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {post.hero && (
          <Image
            src={post.hero}
            alt={post.title}
            height={400}
            width={300}
            priority
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-md"
          />
        )}

        <div className="flex-1">
          <Link href={`/posts/${post.slug}`}>
            <h3 className="text-2xl font-semibold text-gray-800 hover:underline mb-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mb-6">
            {post.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div
            className="text-lg text-gray-700 mb-8 [&_a]:underline [&_a]:text-green-700"
            dangerouslySetInnerHTML={{ __html: post.text ?? "" }}
          />
          <Link
            href={`/posts/${post.slug}`}
            className="text-green-700 font-semibold hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </section>
  );
}
