import HeroFeatured from "./HeroFeatured";
import HeroFeaturedPost from "./HeroFeaturedPost";
import HeroNowPopup from "./HeroNowPopUp";

export default function HeroContent() {
  return (
    <div className="flex-grow flex flex-col pr-0 lg:pr-10">
      {/* Main */}
      <div>
        <HeroNowPopup />
      </div>

      <div>
        {/* Featured */}
        <HeroFeatured />
      </div>

      <div className="mt-12">
        {/* Featured Post */}
        <HeroFeaturedPost />
      </div>

      {/* <div className="mb-16 border-t border-gray-300"> */}
      {/* Latest Posts */}
      {/* <HeroLatestPost />
      </div> */}

      {/* <div className="border-t border-gray-300"> */}
      {/* Latest Craft */}
      {/* <HeroLatestCraft />
      </div> */}

      {/* <div className="border-t border-gray-300"> */}
      {/* Latest Recipe */}
      {/* <HeroLatestRecipe />
      </div> */}

      {/* <div className="border-t border-gray-300"> */}
      {/* Latest Woodlands */}
      {/* <HeroLatestWoodlands />
      </div> */}
    </div>
  );
}
