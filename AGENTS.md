# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands:

```bash
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally
```

## Architecture

This is a **fully static, single-page portfolio site** with no client-side framework (no React/Vue/Svelte). It deploys to `https://davidferreira.dev` via GitHub Actions → GitHub Pages on push to `main`.

**File layout:**

- `src/layouts/Layout.astro` — HTML shell: fonts (Inter + JetBrains Mono), meta/OG tags, the IntersectionObserver scroll-reveal script, and active-nav highlight logic
- `src/pages/index.astro` — The entire site: all sections (Hero, About, Work, Experience, Capabilities, Principles, Contact, Footer) in one file, plus all component-scoped CSS in a `<style>` block at the bottom
- `src/styles/global.css` — Tailwind v4 `@theme` design tokens (colors, fonts, spacing), base resets, and the `.reveal` / `.glass` / `.gradient-text` utility classes

**Content is inline data in `index.astro`.** Experience timeline entries, capability groups, and project cards are defined as JS arrays and rendered with `.map()` — there are no external data files or content collections.

## Styling

Tailwind CSS v4 is loaded via the `@tailwindcss/vite` Vite plugin (not `@astrojs/tailwind`). Design tokens are defined with `@theme` in `global.css`. The primary accent color is `#00c2d1` (cyan).

Most component styles live in the scoped `<style>` block at the bottom of `index.astro`, not in Tailwind utility classes. `global.css` only defines tokens and shared utilities like `.reveal`.

## Scroll reveal

Elements marked with class `reveal` start invisible (`opacity: 0; transform: translateY(20px)`) and transition to visible when they enter the viewport. The IntersectionObserver in `Layout.astro` adds `.visible` to trigger the transition. `reveal-delay-1` adds a 0.1s delay for staggered effects. The `prefers-reduced-motion` media query disables all animations.

## Static sub-sites

`public/ridersnow-site/` contains a static copy of the RidersNow project site, served at `/ridersnow-site/`. Files placed in `public/` are copied verbatim to `dist/` at build time.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
