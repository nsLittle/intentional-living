import HeroLatestPost from "./HeroLatestPost";
import HeroIntro from "./HeroIntro";
import HeroFeatured from "./HeroFeatured";
import HeroLatestCraft from "./HeroLatestCraft";

export default function HeroContent() {
  return (
    <div className="flex-grow flex flex-col pr-0 lg:pr-10">
      {/* Main */}
      <HeroIntro />
      <div className="border-t border-gray-300">
        {/* Featured */}
        <HeroFeatured />
      </div>

      <div className="mb-16 border-t border-gray-300">
        {/* Latest Posts */}
        <HeroLatestPost />
      </div>

      <div className="border-t border-gray-300">
        {/* Latest Craft */}
        <HeroLatestCraft />
      </div>

      {/* Latest Recipe */}
      {/* <HeroLatestRecipe /> */}
    </div>
  );
}
