// src/components/Sidebar.tsx
import SidebarIntro from "./SidebarIntro";
import SidebarNewsletterSignup from "./SidebarNewsletterSignup";
import SidebarAlignmentLink from "./SidebarAlignmentLink";

export default function Sidebar() {
  return (
    <aside className="w-full lg:max-w-sm flex-shrink-0 flex flex-col items-center text-center">
      {/* Intro */}
      <div className="mt-8">
        <SidebarIntro />
      </div>

      {/*Alignment Link*/}
      <div className="mt-8 mb-8">
        <SidebarAlignmentLink />
      </div>

      {/* Newsletter Signup */}
      <div className="mt-8 mb-24">
        <SidebarNewsletterSignup />
      </div>
    </aside>
  );
}
