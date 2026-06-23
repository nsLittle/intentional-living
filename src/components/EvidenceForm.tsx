"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const btnClass =
  "inline-block px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d50]";

export default function EvidenceForm() {
  const router = useRouter();
  const [evidence, setEvidence] = useState("");

  function handleSave() {
    router.push("/alignment/reflection");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <label className="block">
        <span className="mb-4 block text-center font-serif text-xl text-[#5c5045]">
          What happened today?
        </span>

        <textarea
          value={evidence}
          onChange={(e) => {
            setEvidence(e.target.value);
          }}
          rows={10}
          className="w-full rounded-md border border-gray-300 bg-white p-4 outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 placeholder:italic"
          placeholder="Paste your daily action list, notes, reflections, calendar events, or anything you want Mirror to notice."
        />
      </label>

      <div className="mt-8 text-center">
        <button
          type="button"
          className={btnClass}
          onClick={handleSave}
          disabled={!evidence.trim()}>
          Save evidence
        </button>
      </div>
    </div>
  );
}
