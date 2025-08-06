export default function Home() {
  return (
    <main className="bg-[#fefcf9] min-h-screen text-[#5c5045] font-serif">
      <header className="relative w-full h-64">
        <img
          src="/images/log-garden.jpeg"
          alt="Intentional Living Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center justify-center bg-black/30"></div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row-reverse gap-16">
        {/* Sidebar */}
        <aside className="lg:w-1/3 flex flex-col items-center text-center">
          <img
            src="/images/little-wildflowers.jpeg"
            alt="Little"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
          />
          <h2 className="text-2xl font-bold">Hi, I'm Little!</h2>
          <p className="mt-4 text-xl leading-relaxed max-w-xs mx-auto">
            I'm an opportunistic forager, home cook, and creator of{" "}
            <span className="font-bold">Intentional Living</span>, a quiet
            corner of the web inspired by the warmth of Vermont's simple living.
          </p>
          <p className="mt-4 text-xl leading-relaxed max-w-xs mx-auto">
            I share recipes, seasonal foraging finds, and reflections on
            intentional living. With my daughters and cats beside me, we savor
            life's small joys. Laughter in the kitchen, wild mushrooms in a
            basket, and meals made with love and simplicity.
          </p>
          <p className="mt-4 italic text-xl text-gray-500">
            With warmth, <br />
            Little
          </p>
        </aside>

        {/* Hero Content */}
        <section className="lg:w-2/3">
          <h1 className="text-5xl font-bold text-black leading-tight">
            Wild Crafting & Recipes
          </h1>
          <p className="mt-4 text-xl max-w-2xl">
            Discover the art of opportunistic foraging, seasonal cooking, and
            intentional living through recipes, crafts, guides, and stories from
            Vermont.
          </p>

          <div className="mt-8 flex gap-4 mb-10">
            <button className="bg-[#4b816d] text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-[#3b6c5a]">
              Explore Recipes
            </button>
            <button className="bg-[#f5f0e7] text-[#3c3027] text-lg font-semibold px-6 py-3 rounded-full shadow-md">
              Foraging Guides
            </button>
          </div>

          <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
            <img
              src="/images/breakfast-raspberries.jpeg"
              alt="Raspberries on skirt"
              className="rounded-xl shadow-lg mx-auto mb-8 w-full object-cover"
            />
            <h2 className="text-3xl font-bold text-black mb-4">
              Featured Recipes & Guides
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Seasonal foraging finds and wild food recipes from the Vermont
              woods. Learn to identify, harvest, and prepare nature's bounty
              safely and sustainably.
            </p>
          </section>
        </section>
      </div>

      <footer className="bg-[#2e271f] text-white py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Quick Links */}
          <h3 className="text-lg font-semibold mb-2 text-center">
            Quick Links
          </h3>
          <nav className="flex flex-wrap justify-center gap-3 text-sm text-gray-300 mb-12">
            <a href="#" className="hover:text-white">
              About
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">
              Posts
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">
              Recipes
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">
              Printables
            </a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </nav>

          {/* Newsletter Placeholder */}
          <div className="w-full max-w-md text-center mb-6">
            <h3 className="text-white text-xl font-semibold mb-2">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4">
              Get recipes, tips, and first access to new posts.
            </p>
            <div className="flex flex-col sm:flex-column items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-500 bg-[#35302b] text-white placeholder:text-gray-400 focus:outline-none"
                disabled
              />
              <button
                className="w-full sm:w-auto bg-[#4b816d] text-white font-semibold px-6 py-2 rounded-md cursor-not-allowed"
                disabled>
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">
              (Coming soon — not yet connected)
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center">
            © 2025 Intentional Living.
          </p>
        </div>
      </footer>
    </main>
  );
}
