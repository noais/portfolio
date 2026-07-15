# David Ferreira — Personal Portfolio

Personal portfolio site for David Ferreira, engineering leader and senior mobile/software engineer based in Portugal.

Built with [Astro](https://astro.build) + Tailwind CSS v4. Fully static, no client-side frameworks.

## Getting started

```bash
# Install dependencies
npm install

# Start local dev server (hot reload at http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Stack

- **Astro 7** — static site generation
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **@astrojs/sitemap** — generates `sitemap-index.xml` on build
- TypeScript strict mode

## Project structure

```
src/
  layouts/Layout.astro   — HTML shell, fonts, OG tags, scroll-reveal script
  pages/index.astro      — Full single-page site (all sections + styles)
  styles/global.css      — Tailwind @theme tokens, base resets, reveal utilities
public/
  favicon.svg            — DF monogram favicon
  robots.txt             — Search engine instructions
```

## Deploying

The site is configured for `https://noais.github.io` (`site` in `astro.config.mjs`).

To deploy as a GitHub Pages user site:

```bash
npm run build
# Push dist/ to the gh-pages branch, or use a GitHub Actions workflow
```
