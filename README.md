# 🌿 Intentional Living

Simple Intentions is built around a simple idea:

Life rarely falls apart all at once. More often, we drift.

The purpose of this site is to help people notice that drift and gently return to what matters through reflection, practical tools, seasonal projects, recipes, and small daily practices.

Current utility tools include:

Intentional Alignment
Newsletter
Future: Intention Explorer
Future: Intention Cultivator

This is a handcrafted site built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and hosted on [Netlify](https://simple-intentions.netlify.app/).

---

## 🔗 Live Site

- Hosted on Netlify: (https://simple-intentions.netlify.app/)

## 🚀 Quick Start (Local)

Requirements

- Node.js 18+ (recommend 20.x)
- npm (package manager)
- Next.js 15.4.5
- TypeScript

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
- `app/globals.css` – Tailwind CSS and base global styles
- `src/components/` – Modularized UI components (Header, Footer, HeroContent, etc.)
- `src/content/` – MDX blog posts (e.g., golden-fairy-rings.mdx, luxury-meadows.mdx)
- `src/posts/[slug]/page.tsx` – Dynamic route to render each blog post
- `src/lib/posts.ts` – Helper functions to parse MDX (using gray-matter, fs, etc.)
- `public/images/` – Foraging photos, backgrounds, and favicon
- `public/favicon.ico` – Custom circular brush logo

## ✨ Features

- 🌲 Intentional-living homepage with philosophy, tools, and content
- 🌼 Sidebar featuring utility tools and newsletter signup
- 📫 Footer with navigation and newsletter subscription
- 🎨 Tailwind CSS styling with custom fonts and earthy palette
- 📄 MDX-based notes, recipes, and craft projects stored in `src/content`
- 🔁 Dynamic routing for individual content pages
- 🧠 Frontmatter parsing with `gray-matter`

## 🌲 Incoming Features

The site is evolving from a traditional blog into a practical intentional-living platform.

### Current Utility Tools

- Intentional Alignment
- Newsletter

### Planned Utility Tools

- Intention Explorer
- Intention Cultivator

### Philosophy

Content supports the philosophy.

Tools support action.

Both work together to help visitors notice, return, and cultivate what matters.
