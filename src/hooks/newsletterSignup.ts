// src/hooks/useNewsletterSignup.ts
"use client";

import { useState, type FormEvent } from "react";

export type Status = "idle" | "submitting" | "success" | "exists" | "error";

export function useNewsletterSignup(endpoint = "/api/subscribe") {
  const [email, setEmail] = useState("");
  // Honeypot: bots tend to fill every input; humans never see this.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Subscribe failed.");
      }

      setEmail("");
      setWebsite("");
      setStatus(data.status === "already-subscribed" ? "exists" : "success");
    } catch (err: unknown) {
      let message = "Something went wrong";
      if (err instanceof Error) message = err.message;
      setStatus("error");
      setError(message || "Unexpected error.");
    }
  }

  function reset() {
    setEmail("");
    setWebsite("");
    setStatus("idle");
    setError("");
  }

  return {
    email,
    setEmail,
    website,
    setWebsite,
    status,
    error,
    onSubmit,
    reset,
  };
}
