# Gather Tomorrow LLC — Website

This is the public website for Gather Tomorrow LLC. It's a static site: English at the root, Traditional Chinese under `zh/`. There is nothing to install or build. Hosting is GitHub Pages from the default branch today. Firebase Hosting setup for Sam is in `DEPLOY-FIREBASE.md`.

## What each file does
- **index.html** — English home page (hero, field notes, mini tools, case studies, booking form).
- **zh/index.html** — Traditional Chinese (Taiwan) home page.
- **tools/index.html** — English Tools page: example paid-tool cards and consulting plans. Nothing is for sale. Buy buttons have no link. Each card has an empty `data-stripe-payment-link` for a future Stripe Payment Link.
- **zh/tools/index.html** — Traditional Chinese Tools page.
- **assets/style.css** — The look: colors, fonts, spacing. The main colors are at the top (`--accent` is the teal highlight).
- **assets/lang.js** — Picks English or Chinese on the first visit from the browser language, and remembers the header choice in `localStorage` (`gt-lang`). No IP lookup.
- **firebase.json**, **.firebaserc** — Firebase Hosting config. The project id is the placeholder `YOUR_FIREBASE_PROJECT_ID` until Sam replaces it. No keys live here.
- **.github/workflows/firebase-hosting.yml** — Preview deploy on pull requests, live deploy on push to `main`. Reads the `FIREBASE_SERVICE_ACCOUNT` secret.
- **DEPLOY-FIREBASE.md** — Sam's deploy steps, including the custom domain and leaving MX records alone.
- **.nojekyll** — Tells GitHub Pages to publish the site as-is. Leave it alone.
- **robots.txt**, **sitemap.xml**, **llms.txt** — Discovery files for search and answer engines.

## Languages
The header on every page has **中／EN**. The first visit follows the browser language: any `zh*` language gets Traditional Chinese, everything else gets English. After someone uses the toggle, that choice overrides the browser on later visits. Both languages stay at their own URLs, so a shared link still opens that page.

## Things still to do
- **Booking form:** Look for `TALLY FORM EMBED GOES HERE` in `index.html` (and the matching note in `zh/index.html`). Paste the Tally embed code there once the form exists. Until then, the form opens the visitor's email app addressed to support@gathertomorrow.com.
- **Like buttons:** Display only for now. They don't count anything yet.
- **Articles and the home-page mini tools:** Marked "Coming soon" / 「即將推出」. Replace the excerpts when the full versions are ready.
- **Paid tools:** The Tools page cards are examples priced 待定 / TBD. When a tool is real, paste its Stripe Payment Link into `data-stripe-payment-link` on that card. Do not commit a secret key.
- **Firebase:** Follow `DEPLOY-FIREBASE.md`. Do not commit a service account JSON.

No passwords or private keys are stored here, and none should ever be added. This repository is public.
