export default function FooterNewsletterSignup() {
  return (
    <div className="w-full max-w-md text-center mb-6">
      <h3 className="text-white text-xl font-semibold mb-2">Newsletter</h3>
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
  );
}
