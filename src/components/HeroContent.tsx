import HeroLatestPost from "./HeroLatestPost";
import HeroIntro from "./HeroIntro";
import HeroFeaturedRecipes from "./HeroFeaturedRecipes";
import HeroLatestRecipe from "./HeroLatestRecipe";

export default function HeroContent() {
  return (
    <div className="flex-grow flex flex-col pr-0 lg:pr-12">
      {/* Main */}
      <HeroIntro />

      {/* Latest Posts */}
      <HeroLatestPost />

      {/* Latest Recipe */}
      <HeroLatestRecipe />

      {/* Featured Recipes */}
      <HeroFeaturedRecipes />
    </div>
  );
}
