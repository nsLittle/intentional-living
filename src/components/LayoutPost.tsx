import Header from "./Header";
import Footer from "./Footer";
import ReturnHome from "./LinkReturnHome";

type PostLayoutProps = {
  title: string;
  date: string;
  hero?: string;
  text?: string;
  children: React.ReactNode;
};

export default function LayoutPost({
  title,
  date,
  hero,
  text,
  children,
}: PostLayoutProps) {
  return (
    <div>
      {/* Header */}
      <Header />
      <div className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-gray-500 italic mb-8">{date}</p>

          {text && <p className="text-xl leading-relaxed mb-8">{text}</p>}

          {hero && (
            <img
              src={hero}
              alt={title}
              className="w-1/2 h-auto rounded-xl shadow mb-8 object-cover mx-auto"
            />
          )}

          <ReturnHome />
        </div>
      </div>
      <Footer />
    </div>
  );
}
