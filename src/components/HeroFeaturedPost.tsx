import { pickFeaturedHeroKey } from "lib/featuredHero";

import { getLatestPost } from "lib/posts";
import { getLatestRecipe } from "lib/recipes";
import { getLatestWoodland } from "lib/woodland";
import { getLatestCraft } from "lib/crafts";

import HeroLatestPost from "./HeroLatestPost";
import HeroLatestWoodlands from "./HeroLatestWoodlands";
import HeroLatestCraft from "./HeroLatestCraft";
import HeroLatestRecipe from "./HeroLatestRecipe";

export default function HeroFeaturedPost() {
  const available = {
    post: !!getLatestPost(),
    woodland: !!getLatestWoodland(),
    craft: !!getLatestCraft(),
    recipe: !!getLatestRecipe(),
  };

  const key = pickFeaturedHeroKey(new Date(), available);

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
