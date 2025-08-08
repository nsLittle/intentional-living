import LatestPost from "components/LatestPost";
import MainHeroIntro from "./MainHeroIntro";
import FeaturedRecipes from "./FeaturedRecipes";

export default function HeroContent() {
  return (
    <div className="flex-grow flex flex-col pr-0 lg:pr-8">
      {/* Main */}
      <MainHeroIntro />

      {/* Featured Recipes */}
      <FeaturedRecipes />

      {/* Latest Posts */}
      <LatestPost />
    </div>
  );
}
