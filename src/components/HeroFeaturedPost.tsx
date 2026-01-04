// src/components/HeroFeatured.tsx
import { pickFeaturedHeroKey } from "lib/featuredHero";

import HeroLatestPost from "./HeroLatestPost";
import HeroLatestWoodlands from "./HeroLatestWoodlands";
import HeroLatestCraft from "./HeroLatestCraft";
import HeroLatestRecipe from "./HeroLatestRecipe";

export default function HeroFeaturedPost() {
  const key = pickFeaturedHeroKey();

  switch (key) {
    case "post":
      return <HeroLatestPost />;
    case "woodland":
      return <HeroLatestWoodlands />;
    case "craft":
      return <HeroLatestCraft />;
    case "recipe":
      return <HeroLatestRecipe />;
    default:
      return null;
  }
}
