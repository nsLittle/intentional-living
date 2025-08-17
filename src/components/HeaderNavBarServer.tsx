// src/components/HeaderNavBarServer.tsx
import HeaderNavBar from "./HeaderNavBar";
import { getAllRecipes } from "../lib/recipes";
import { getRecentPosts, getPostHighlights } from "../lib/posts";

export default async function HeaderNavBarServer() {
  const postsRecent = getRecentPosts(5);

  const postsHighlights = getPostHighlights(4);

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
