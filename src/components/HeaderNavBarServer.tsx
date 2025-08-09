import HeaderNavBar from "./HeaderNavBar";
import { getCollection, getHighlights } from "../lib/content";
import { getRecentPost } from "lib/posts";

export default async function HeaderNavBarServer() {
  const prattlesRecent = getCollection("prattles", 5).map((p) => ({
    title: p.title,
    href: `/prattles/${p.slug}`,
  }));

  const prattlesHighlights = getHighlights("prattles", 2).map((p) => ({
    title: p.title,
    href: `/prattles/${p.slug}`,
    img: p.coverImage,
  }));

  return (
    <HeaderNavBar
      prattlesRecent={prattlesRecent}
      prattlesHighlights={prattlesHighlights}
    />
  );
}
