import HeaderNavBar from "./HeaderNavBar";
import { getCollection, getHighlights } from "../lib/content";

export default async function HeaderNavBarServer() {
  const postsRecent = getCollection("posts", 5).map((p) => ({
    title: p.title,
    href: `/posts/${p.slug}`,
  }));

  const postsHighlights = getHighlights("posts", 2).map((p) => ({
    title: p.title,
    href: `/posts/${p.slug}`,
    img: p.coverImage,
  }));

  return (
    <HeaderNavBar postsRecent={postsRecent} postsHighlights={postsHighlights} />
  );
}
