"use client";

import React, { useState, FormEvent } from "react";

type SearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  inputId?: string;
  className?: string;
};

export default function Search({
  value,
  onChange,
  onSubmit,
  autoFocus,
  placeholder = "Search posts, recipes…",
  inputId = "site-search",
  className = "",
}: SearchProps) {
  const [local, setLocal] = useState(value ?? "");

  const handleInput = (v: string) => {
    setLocal(v);
    onChange?.(v);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(local.trim());
  };

  return (
    <form
      role="search"
      aria-label="Site"
      onSubmit={handleSubmit}
      className={className}>
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <input
        id={inputId}
        type="search"
        value={local}
        onChange={(e) => handleInput(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-xl border border-neutral-200 px-4 py-2 outline-none focus:ring-2 focus:ring-neutral-400"
      />
    </form>
  );
}
