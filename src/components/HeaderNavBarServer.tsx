import HeaderNavBar from "./HeaderNavBar";
import { getCollection, getHighlights } from "../lib/content";
import { getAllRecipes } from "lib/recipes";

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

  const recipesRecent = getAllRecipes()
    .slice(0, 6)
    .map((r) => ({
      title: r.title,
      href: `/recipes/${r.slug}`,
    }));

  const recipesHighlights = getAllRecipes()
    .slice(0, 4)
    .map((r) => ({
      title: r.title,
      href: `/recipes/${r.slug}`,
      img: r.hero,
    }));

  return (
    <HeaderNavBar
      postsRecent={postsRecent}
      postsHighlights={postsHighlights}
      recipesRecent={recipesRecent}
      recipesHighlights={recipesHighlights}
    />
  );
}
