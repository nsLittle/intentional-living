import Link from "next/link";
import Image from "next/image";
import LinkReturnHome from "./LinkReturnHome";

type Post = {
  slug: string;
  title: string;
  date?: string;
  hero?: string;
  text?: string;
};

type LayoutAllPostsProps = {
  posts: Post[];
};

export default function LayoutAllPosts({ posts }: LayoutAllPostsProps) {
  return (
    <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="rounded-xl overflow-hidden shadow-lg bg-white">
            {post.hero && (
              <Image
                src={post.hero}
                alt={post.title}
                width={800}
                height={450}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.date && (
                <p className="text-gray-500 italic mb-4">{post.date}</p>
              )}
              {post.text && (
                <p className="text-lg leading-relaxed line-clamp-3">
                  {post.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <LinkReturnHome />
    </div>
  );
}
