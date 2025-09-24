import HeroLatestPost from "./HeroLatestPost";
import HeroIntro from "./HeroIntro";
import HeroLatestRecipe from "./HeroLatestRecipe";
import HeroLatestCraft from "./HeroLatestCraft";
import HeroFeaturedRecipes from "./HeroFeaturedRecipes";

export default function HeroContent() {
  return (
    <div className="flex-grow flex flex-col pr-0 lg:pr-10">
      {/* Main */}
      <HeroIntro />
      <div className="mb-16 border-t border-b border-gray-300">
        {/* Featured Recipes */}
        <HeroFeaturedRecipes />
      </div>

      {/* Latest Posts */}
      <HeroLatestPost />

      {/* Latest Craft */}
      <HeroLatestCraft />

      {/* Latest Recipe */}
      {/* <HeroLatestRecipe /> */}
    </div>
  );
}
