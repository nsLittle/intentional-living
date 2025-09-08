// src/components/HeaderNavBarServer.tsx
import HeaderNavBar from "./HeaderNavBar";
import { getAllRecipes } from "../lib/recipes";
import { getRecentPosts, getPostHighlights } from "../lib/posts";
import { getAllCrafts } from "../lib/crafts";

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

  const crafts = getAllCrafts();
  const craftsRecent = crafts.slice(0, 6).map((c) => ({
    title: c.title,
    href: `/crafts/${c.slug}`,
  }));
  const craftsHighlights = crafts.slice(0, 4).map((c) => ({
    title: c.title,
    href: `/crafts/${c.slug}`,
    img: c.hero,
  }));

  return (
    <HeaderNavBar
      postsRecent={postsRecent}
      postsHighlights={postsHighlights}
      recipesRecent={recipesRecent}
      recipesHighlights={recipesHighlights}
      craftsRecent={craftsRecent}
      craftsHighlights={craftsHighlights}
    />
  );
}
