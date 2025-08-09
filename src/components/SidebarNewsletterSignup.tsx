export default function SidebarNewsletterSignup() {
  return (
    <div className="bg-[#3b6c5a] text-white p-6 rounded-xl shadow-md mt-8">
      <h3 className="text-2xl font-semibold mb-2">Newsletter</h3>
      <p className="mb-4 text-sm">
        Get recipes, tips, and first access to new posts.
      </p>
      <form className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="rounded-md p-2 text-[#c5a880] placeholder:text-[#c5a880] bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
        />
        <button
          type="submit"
          className="bg-[#6fa58e] text-white py-2 px-4 rounded-md shadow hover:bg-[#5e8f7a] transition">
          Subscribe
        </button>
      </form>
    </div>
  );
}
