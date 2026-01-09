// src/components/Sidebar.tsx
import SidebarIntro from "./SidebarIntro";
import SidebarNewsletterSignup from "./SidebarNewsletterSignup";

export default function Sidebar() {
  return (
    <aside className="w-full lg:max-w-sm flex-shrink-0 flex flex-col items-center text-center">
      {/* Intro */}
      <div className="mt-8">
        <SidebarIntro />
      </div>

      {/* Newsletter Signup */}
      <div className="mt-8 mb-24">
        <SidebarNewsletterSignup />
      </div>

      <div className="mt-6 rounded-2xl bg-[#8b6e4e] p-5 shadow-md">
        <h3 className="text-2xl text-white font-semibold mb-2">
          Intentional Alignment
        </h3>
        <p className="text-sm leading-relaxed text-[#fefcf9]">
          Sometimes I use this tool when I feel stuck or a little off.
        </p>

        <a
          href="/alignment"
          className="mt-4 inline-block text-sm font-semibold text-[#fefcf9] hover:opacity-90">
          Alignment →
        </a>
      </div>
    </aside>
  );
}
