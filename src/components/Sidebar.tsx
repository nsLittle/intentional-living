// src/components/Sidebar.tsx
import SidebarIntro from "./SidebarIntro";
import SidebarNewsletterSignup from "./SidebarNewsletterSignup";

export default function Sidebar() {
  return (
    <aside className="w-full lg:max-w-sm flex-shrink-0 flex flex-col items-center text-center">
      <SidebarIntro />

      <SidebarNewsletterSignup />
    </aside>
  );
}
