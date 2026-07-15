# RidersNow web (privacy + support + landing)

Static one-pager hosted on GitHub Pages. Three pages:

- `index.html` → marketing landing (used as `marketingUrl` in App Store metadata)
- `privacy/index.html` → privacy policy (used as `privacyPolicyUrl`)
- `support/index.html` → support / FAQ (used as `supportUrl`)

## Deploy as a Pages project under the `noais` org

1. Create a new public repo: `https://github.com/noais/ridersnow`
   ```bash
   gh repo create noais/ridersnow --public --description "RidersNow landing + privacy + support" --add-readme=false
   ```
2. From this directory:
   ```bash
   cd /Users/davidferreira/Developer/waveleft-ios/web
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/noais/ridersnow.git
   git push -u origin main
   ```
3. In GitHub repo `Settings → Pages`, set source to `Deploy from a branch`, `main` branch, `/ (root)` folder. Save.
4. Wait 60–120 seconds. Verify:
   - `https://noais.github.io/ridersnow/`
   - `https://noais.github.io/ridersnow/privacy/`
   - `https://noais.github.io/ridersnow/support/`

The metadata files in `../metadata/` already point to these URLs.

> Optional: later, point a custom domain (e.g. `ridersnow.app`) via repo `Settings → Pages → Custom domain` and a `CNAME` file in this directory.
