// src/pages/posts/[slug].tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { getPostBySlug, getAllPostSlugs } from "../../../lib/posts";
import { useRouter } from "next/router";
import Head from "next/head";

type PostPageProps = {
  post: {
    title: string;
    date?: string;
    contentHtml: string;
  };
};

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading…</div>;
  }

  return (
    <>
      <Head>
        <title>{`Intentional Living – ${post.title}`}</title>
      </Head>
      <article className="prose prose-lg max-w-3xl mx-auto py-16 px-4">
        <h1>{post.title}</h1>
        {post.date && <p className="text-sm text-gray-500">{post.date}</p>}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs();

  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
