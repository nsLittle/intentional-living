// src/components/FooterNewsletterSignup.tsx
"use client";

import { useNewsletterSignup } from "hooks/newsletterSignup";

export default function FooterNewsletterSignup() {
  const { email, setEmail, website, setWebsite, status, error, onSubmit } =
    useNewsletterSignup();

  return (
    <div className="w-full max-w-md text-center mb-6">
      <h3 className="text-white text-xl font-semibold mb-2">Newsletter</h3>
      <p className="text-gray-300 mb-4">
        Get recipes, tips, and first access to new posts.
      </p>

      <form
        className="flex flex-col sm:flex-column items-center gap-3"
        onSubmit={onSubmit}
        noValidate>
        {/* Hidden honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="footer-website">Website</label>
          <input
            id="footer-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <input
          type="email"
          name="email"
          id="footer-nl-email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-500 bg-[#35302b] text-white placeholder:text-gray-400 focus:outline-none"
          disabled={status === "submitting"}
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-[#4b816d] text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-60"
          disabled={status === "submitting"}>
          {status === "submitting" ? "Joining…" : "Subscribe"}
        </button>
      </form>

      <p className="text-xs text-gray-300 mt-2 min-h-5" aria-live="polite">
        {status === "success" && "Thanks! You’re subscribed."}
        {status === "exists" && "You’re already on the list."}
        {status === "error" && (error || "There was a problem.")}
      </p>
    </div>
  );
}
