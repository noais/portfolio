# RidersNow promo site

A single self-contained landing page (`index.html`) — no build step, no dependencies. Bilingual **pt-PT / EN** (Portuguese-first, toggle top-right), matched to the app's dark ocean design system.

## Run locally
Just open the file:
```bash
open index.html          # macOS
```
Or serve it (nicer for testing):
```bash
python3 -m http.server -d . 8080   # then visit http://localhost:8080
```

## Screenshots
Real App Store screenshots live in `assets/` (`01-live`, `02-plan`, `03-hosts`, `04-create`), pulled from the live listing. `01-live.png` is used in the hero phone (with the CSS replica as an `onerror` fallback); all four appear in the "See it. Plan it. Show up." gallery. To refresh them, re-download from the App Store listing and overwrite the files.

## Status of links
- **App Store:** live → `https://apps.apple.com/us/app/ridersnow/id6767537767`
- **Google Play:** shown as **"Em breve / Soon"** (disabled). When the Play listing is live, set `class="store"` (remove `soon`), add the real `href`, and drop the `.soon-tag`.
- **Email:** the "Schools" CTA uses `hello@ridersnow.app` — the same domain the outreach emails reference.

## Deploy (free options)
- **Netlify / Vercel:** drag the `site/` folder onto the dashboard, or `vercel` / `netlify deploy` from here.
- **GitHub Pages:** push the repo, enable Pages, point it at `/growth/site` (or move these files to the repo root of a `gh-pages` branch).
- **Cloudflare Pages:** connect the repo, set the output directory to `growth/site`, no build command.

Point the `ridersnow.app` domain at whichever host you pick.
