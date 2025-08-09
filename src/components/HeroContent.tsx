import HeroLatestPost from "./HeroLatestPost";
import HeroIntro from "./HeroIntro";
import HeroFeaturedRecipes from "./HeroFeaturedRecipes";

export default function HeroContent() {
  return (
    <div className="flex-grow flex flex-col pr-0 lg:pr-8">
      {/* Main */}
      <HeroIntro />

      {/* Featured Recipes */}
      <HeroFeaturedRecipes />

      {/* Latest Posts */}
      <HeroLatestPost />
    </div>
  );
}
