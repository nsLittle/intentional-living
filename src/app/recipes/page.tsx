import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import LayoutAllRecipes from "components/LayoutAllRecipes";
import ReturnHome from "components/LinkReturnHome";
import Footer from "components/Footer";

export default function RecipesPage() {
  const dir = path.join(process.cwd(), "src", "content", "recipes");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const recipes = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? undefined,
      hero: data.hero ?? undefined,
      text: data.text ?? undefined,
    };
  });

  return (
    <div>
      <HeaderNavBarServer />
      <Header />
      <LayoutAllRecipes recipes={recipes} />
      <Footer />
    </div>
  );
}
