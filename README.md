# 🌿 Intentional Living

_Seasonal foraging, wild food recipes, and reflections on simple living from the Vermont woods._

This is a handcrafted site built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and hosted on [Vercel](https://vercel.com), with a future plan to integrate [Resend](https://resend.com) for newsletter subscriptions.

---

## 🛠️ Local Development

To run the project locally:

```bash
npm install
npm run dev
```

Then visit: http://localhost:3000

## 📁 Project Structure

- `app/layout.tsx` – App shell, fonts, and metadata
- `app/page.tsx` – Landing page with hero section, sidebar, and footer
- `src/components/` – Modularized UI components (Header, Footer, HeroContent, etc.)
- `src/content/` – MDX blog posts (e.g., golden-fairy-rings.mdx, luxury-meadows.mdx)
- `src/posts/[slug]/page.tsx` – Dynamic route to render each blog post
  - visit: http://localhost:3000/posts/post-name
- `src/lib/posts.ts` – Helper functions to parse MDX (using gray-matter, fs, etc.)
- `public/images/` – Foraging photos, backgrounds, and favicon
- `public/favicon.ico` – Custom circular brush logo
- `app/globals.css` – Tailwind CSS and base global styles

## ✨ Features

🌲 Beautiful landing page with banner, buttons, and personal intro
🌼 Sidebar with intro story, and newletter subscription
📫 Footer with newsletter subscription and navigation quick links
🎨 Tailwind CSS styling with custom fonts and earthy palette
📄 MDX-based blog posts stored in src/content
🔁 Dynamic routing for individual post pages (src/posts/[slug]/page.tsx)
🧠 gray-matter used to parse frontmatter from .mdx files

<!-- 💌 Ready for Resend email integration (placeholder in place)
🚀 Deployable instantly on Vercel -->
