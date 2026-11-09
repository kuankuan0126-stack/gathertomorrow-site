# Changelog

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
