// src/components/Sidebar.tsx
import SidebarIntro from "./SidebarIntro";
import NewsletterSignup from "./NewsletterSignup";

export default function Sidebar() {
  return (
    <aside className="w-full lg:max-w-sm flex-shrink-0 flex flex-col items-center text-center">
      <SidebarIntro />

      <NewsletterSignup />
    </aside>
  );
}
