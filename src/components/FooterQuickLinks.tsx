export default function FooterQuickLinks() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-center">Quick Links</h3>
      <nav className="flex flex-wrap justify-center gap-3 text-sm text-gray-300 mb-12">
        <a href="" className="hover:text-white">
          Home
        </a>
        <span className="text-gray-500">|</span>
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
    </div>
  );
}
