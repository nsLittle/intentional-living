// src/components/SidebarAlignmentLink.tsx
"use client";

export default function SidebarAlignmentLink() {
  return (
    <div className="mt-6 rounded-2xl bg-[#8b6e4e] p-5 shadow-md">
      <h3 className="text-2xl text-white font-semibold mb-2">
        Intentional Alignment
      </h3>
      <p className="text-sm leading-relaxed text-[#fefcf9]">
        Sometimes I use this tool when I feel stuck or a little off.
      </p>

      <a
        href="/alignment"
        className="
    mt-4
    inline-flex
    items-center
    justify-center
    rounded-lg
    bg-[#6F5845]
    px-6
    py-3
    text-sm
    font-semibold
    text-[#fefcf9]
    shadow-sm
    transition
    hover:opacity-90
    focus:outline-none
    focus:ring-2
    focus:ring-[#7FA38C]/60
    focus:ring-offset-2
  ">
        Alignment →
      </a>
    </div>
  );
}
