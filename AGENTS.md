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

No test suite or linter is configured. `npm install` needs `--legacy-peer-deps` (see `.github/workflows/deploy.yml`) — `@astrojs/tailwind` is a leftover devDependency that conflicts with the `@tailwindcss/vite` v4 setup actually in use.

## Architecture

This is a **fully static, multi-page portfolio site** with no client-side framework (no React/Vue/Svelte). It deploys to `https://davidferreira.dev` via GitHub Actions → GitHub Pages on push to `main`.

There are two landing pages, each a full single-file page (all sections + component-scoped CSS in a `<style>` block at the bottom), sharing the same `Layout.astro` shell and visual system (dark navy + lime accent, Fraunces/Inter/JetBrains Mono):

- `src/pages/index.astro` — **the main landing page.** Positions David as a mobile engineering leader (Hero, Work/case studies, Experience timeline, Capabilities, Contact). This is the site's primary identity — don't remove or replace it when adding new pages.
- `src/pages/ai-consulting.astro` — a secondary page positioning David as an AI solutions consultant / AI-first mobile engineering leader, aimed at driving consulting inquiries rather than job applications (Hero with a canvas particle-network background, Trust strip, Services, Expertise, Consulting Process, Case Studies, Track Record, Why Work With Me, Final CTA/Contact). Cross-linked from `index.astro`'s nav ("AI Consulting") and links back via its own nav ("Portfolio") and footer.

**File layout (shared):**

- `src/layouts/Layout.astro` — HTML shell: fonts (Inter + JetBrains Mono + Fraunces), meta/OG tags, optional `keywords` and `structuredData` (JSON-LD) props for pages that want them, the IntersectionObserver `.reveal` scroll-reveal script, and active-nav highlight logic
- `src/styles/global.css` — Tailwind v4 `@theme` design tokens (colors, fonts, spacing), base resets, and the `.reveal` / `.glass` / `.gradient-text` utility classes

**Content is inline data in each page file**, not shared between them. Experience timeline entries, capability/expertise groups, services, the consulting process, and project/case-study cards are defined as JS arrays and rendered with `.map()` — there are no external data files or content collections.

## Styling

Tailwind CSS v4 is loaded via the `@tailwindcss/vite` Vite plugin (not `@astrojs/tailwind`). Design tokens are defined with `@theme` in `global.css`. The primary accent color is `#C6F135` (lime) against a dark navy background (`#07090F`/`#0D0F1A`).

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
