# Changelog

## 2026-11-12

### Warm tool-like pass

- Lighter page (`#F8F6F1`), warm-white panels (`#FFFDF9`), charcoal text (`#292722`), and secondary text (`#706A61`). Terracotta (`#A6472A`) is limited to actions. Sage status color is `#556352` (the suggested `#657861` was 4.41:1 on the page background, under WCAG AA). `#556352` is 5.90:1 on the page, 6.28:1 on a panel, and 5.33:1 on a 12% sage tint.
- Services are open columns with vertical rules. The workflow and “how we work” steps sit on a thin line. Field notes are rows. The large beige bands are gone.
- The hero example is a wider mail draft, labeled Example workflow, with sage status tags and a line down toward the services section.
- Motion is a short draft open and a slight section fade. `prefers-reduced-motion` turns both off.

### Home page, from Angela's review

- Hero now leads with payment reminders and inquiry replies only. The old “This page gathers…” summary is gone. The right side is a fictional payment-follow-up draft, not a field-note list.
- Home order is Services, one payment-reminder workflow, how we work together, field-note summaries, FAQ, and booking. Booking still says we reply by email to set up a short call.
- Field notes on the home page are short cards (title, result, tool chain, “See the workflow”). The Problem / Tools & how / Before → After text lives on `notes/` pages, with Traditional Chinese copies under `zh/notes/`. Like buttons are gone. One service line sits under the whole notes section.
- “Coming soon” teaser cards are off the home page. The tools pages lead with consulting and put example tools under “In development.”
- Primary nav is Services, How it works, Examples, FAQ, and Book a consultation. Field notes sit in the footer. “Case studies” is renamed Examples. These are workflow demos, not client cases.
- Ordinary link underlines are lighter. The filled terracotta buttons are Book a consultation and See an example.

## 2026-11-09

### Visual redesign

- Replaced the dark teal theme with a warm editorial palette: cream paper (`#F3EEE6`), warm charcoal text (`#2A241E`), and one terracotta accent (`#A34524`) for buttons, links, and small highlights.
- Headings use Fraunces and Noto Serif TC. Body text uses Inter and Noto Sans TC, loaded from Google Fonts. The GatherTomorrow wordmark stays in Inter, with the same Gather / Tomorrow split.
- Added a skip link, visible focus rings, and a mobile menu that opens without JavaScript. `assets/nav.js` only sets `aria-expanded`, closes the menu on Escape, and closes it after a link is chosen.

### Generative-engine optimization

- Every page now opens with a short summary paragraph in the static HTML. Script is limited to language choice and the menu enhancements above.
- English and Traditional Chinese home pages include a six-question FAQ. Pricing and project length are visible placeholders (`TBD – pending Angela` / `待 Angela 定`). FAQPage JSON-LD includes only the four questions that have published answers.
- Confirmed title, meta description, canonical, hreflang, and Open Graph tags on each page. Sitemap `lastmod` is 2026-11-09.
- `robots.txt` allows general crawlers and named AI search and training crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, and Bytespider), and points at the sitemap.
