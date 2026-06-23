"use client";

import { useState } from "react";

const btnClass =
  "inline-block px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d50]";

export default function ReflectionForm() {
  const [reflection, setReflection] = useState("");

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <label className="block">
        <span className="mb-4 block text-center font-serif text-xl text-[#5c5045]">
          What stands out today?
        </span>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={6}
          className="w-full rounded-md border border-gray-300 bg-white p-4 outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 placeholder:italic"
          placeholder="What do you notice about today's evidence?"
        />
      </label>

      <div className="mt-8 text-center">
        <button
          type="button"
          className={btnClass}
          disabled={!reflection.trim()}>
          Ask Mirror
        </button>
      </div>
    </div>
  );
}
