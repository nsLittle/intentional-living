"use client";

import { useNewsletterSignup } from "hooks/newsletterSignup"; // same path as Footer uses
import { useId } from "react";

type Props = {
  endpoint?: string;
  className?: string;
};

export default function HeaderNavBarNewsletterSignup({
  endpoint = "/api/subscribe",
  className = "",
}: Props) {
  const {
    email,
    setEmail,
    website,
    setWebsite,
    status,
    error,
    onSubmit,
    reset,
  } = useNewsletterSignup(endpoint);

  const emailId = useId();
  const hpId = useId();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex items-center gap-2"
        aria-label="Header newsletter signup">
        {/* Hidden honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={hpId}>Website</label>
          <input
            id={hpId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Email */}
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-40 sm:w-48 px-3 py-1.5 rounded-md border border-black/10 bg-white/95 text-[#1b1b1b] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6ea089]"
          disabled={status === "submitting"}
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#6ea089] text-[#fefcf9] px-3 py-1.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
          disabled={status === "submitting"}>
          {status === "submitting" ? "Joining…" : "Subscribe"}
        </button>
      </form>

      {/* Visible, centered helper/status line (like Footer) */}
      <p
        className="mt-2 text-[11px] leading-snug text-gray-600 min-h-4 text-center"
        aria-live="polite">
        {status === "success" && "Thanks! You’re subscribed."}
        {status === "exists" && "You’re already on the list."}
        {status === "error" && (error || "There was a problem.")}
      </p>
    </div>
  );
}
