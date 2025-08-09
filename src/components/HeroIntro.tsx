import ButtonPost from "./ButtonPosts";
import ButtonRecipes from "./ButtonRecipe";

export default function HeroIntro() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-black leading-tight">
        Wild Crafting, Recipes,
        <br /> Guides & More
      </h1>
      <div className="mb-8 mt-">
        <p className="mt-4 text-xl">
          Come discover the art of simple intentions, the joys of wild crafting,
          slowing down for seasonal coooking, and opportunistic foraging from
          Vermont.
        </p>
        <p className="mt-4 text-xl">
          This is where the warmth of woodsy treasures meet homemade goodness.
          It's about life's simple pleasures{" "}
          <span>savored with intentions.</span>
        </p>
      </div>

      <div className="flex flex-row gap-4 w-full">
        <ButtonPost />
        <ButtonRecipes />
      </div>
    </div>
  );
}
