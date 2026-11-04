# Design notes

## What Impeccable is

[Impeccable](https://impeccable.style) is an open-source design skill for AI coding agents, by Paul Bakaus. It gives an agent a shared vocabulary for building and revising interfaces (`polish`, `typeset`, `layout`, `animate`, `adapt`, `audit`, and others), plus a deterministic checker for common “AI slop” patterns, accessibility problems, and basic design-quality issues. It is not a component library and it does not ship a visual theme.

- Source: [github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- Docs: [impeccable.style](https://impeccable.style) and the getting-started guide at [impeccable.style/tutorials/getting-started](https://impeccable.style/tutorials/getting-started)
- Package: [`impeccable` on npm](https://www.npmjs.com/package/impeccable) (skill text reviewed at version 4.8.0)
- License: [Apache License 2.0](https://github.com/pbakaus/impeccable/blob/main/LICENSE). Copyright 2025 Paul Bakaus.

## How it is used, and whether a static site can use it

You install it with `npx impeccable install`. That writes the skill into the agent harness (for Cursor, under `.cursor/skills/`). After that, `/impeccable init` records who the product is for, and later commands such as `/impeccable polish the home page` load a playbook for one kind of change. A separate detector reads HTML, CSS, JSX, Vue, and Svelte. No framework is required.

This site is plain HTML and CSS, so the skill applies directly. The pass below follows the published skill and these references from the repo: the craft floor, and the typeset, layout, animate, adapt, and polish playbooks. The pages are marketing surfaces, so the skill’s “Persuade” mode applies: the page has to earn the next step, with a clear point of view, while staying inside the brand that already exists.

The skill was not installed into this repository. Installing it would add harness files and a design hook, which this site does not need in order to ship. The guidance was applied by hand. No Impeccable source was copied into the site.

## Principles applied

- **The brief wins.** The logo wordmark, the existing color values, and the English and Chinese marketing copy stay as they were. Impeccable’s warning about teal-on-navy “cyan on dark” palettes was not used as a reason to recolor the brand.
- **Refinement, not a new identity.** Same pages, same sections, same bilingual behavior (`assets/lang.js`, `gt-lang` in localStorage, hreflang, and the 中 / EN control).
- **Typography with a real scale.** Latin text uses self-hosted [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) (SIL Open Font License, `assets/fonts/OFL.txt`), in a variable file, weights roughly 500 for body and 600 for headings. The logo stays on the original Inter / system stack so the wordmark’s letterforms do not change. Traditional Chinese keeps the existing system stack (PingFang TC, Microsoft JhengHei, Noto Sans TC, Noto Sans CJK TC). Headlines use a clear size step, slightly tighter Latin tracking, looser Chinese leading, `text-wrap: balance` on headings, and `text-wrap: pretty` on body copy. Body size stays at or above 16px.
- **Spacing rhythm.** Sections, headings, and card internals use a 4px-based scale. Related lines sit close together. Sections and groups get more air. There is more space above a heading block than between the heading and the sentence under it.
- **Composition.** The headline leads. Category lines that used to sit above every heading (“Field notes”, “Tools”, and their Chinese equivalents) now follow the heading, as a side label on wide screens or a line under the hero actions. The words are unchanged. The full-page graph-paper background is limited to a fading grid in the hero. One horizon rule closes the hero.
- **Cards and controls.** Equivalent items stay in a grid, because they are actually equivalent. Cards have a consistent inset, a 1px border, and an offset shadow rather than a glow. The case study’s numbered list is drawn as the sequence it already is. Buttons keep the teal-to-blue brand gradient. Hover moves that gradient; it does not bounce. Disabled buy buttons stay visibly inactive.
- **Motion.** One authored moment: the hero rule draws in once, with a decelerating curve. Buttons and cards only change color, border, or shadow. `prefers-reduced-motion` leaves the rule in place and drops the movement. Hover effects are limited to devices that can hover.
- **Responsive behavior.** From 1040px, three-column groups. From 900px, the two case studies sit side by side. Below 960px, section links move into a menu so they are not removed from the page. Primary actions stay full width. The viewport meta uses `viewport-fit=cover`, and the footer and side padding respect the safe area.
- **Accessibility.** Body, muted, and accent pairings were checked against WCAG AA on the existing palette (muted text is about 7.5:1 on the page background and about 6.8:1 on cards). Focus is a 2px teal ring on links, buttons, the menu, and fields. The old `outline: none` on inputs is gone. Skip links, 44px targets on the language control and menu, visible labels, and `autocomplete` on the form fields are in place. Selection, the text caret, and the scrollbar use the existing palette.

## Chosen not to apply, and why

- **Deleting the small labels above headings.** The craft floor bans a kicker stacked above a heading, and says no brief earns that pattern back. The labels are existing marketing copy, which this task forbids removing. They were moved so they no longer sit above the heading. The words were not rewritten.
- **A new palette, `colorize`, or dropping the teal-on-navy field.** Those colors are the brand. Accent, accent-2, background, card, text, and muted values are unchanged. `#04101a` and `#1c2636` were already in the stylesheet and are only named as tokens now.
- **`overdrive`.** Shaders, spring physics, and scroll-driven effects fight the brief: a trustworthy consulting firm, closer to Tensorway and Itrex than to a demo reel.
- **`clarify` and any new claims.** English and Chinese marketing sentences were not edited. The only new strings are interface chrome: “Skip to content” / “跳至內容” and a visually hidden “Menu” / “選單”.
- **Replacing the ♡ on the like buttons.** That character is part of the existing control label.
- **A second display family, or a shipped CJK webfont.** One Latin family is enough for the hierarchy. A full Traditional Chinese webfont would add megabytes for a gain visitors in Taiwan and the US already get from the system fonts named in the stack.
- **Monospace as a “technical” costume.** Labels and prices use the text face. Monospace remains only on the Stripe attribute, which is code.
- **Decorative section numbers, gradient text, glass cards, and icon tiles.** Not part of this content. The sticky header’s blur is only there so the bar stays readable over the page.
- **Installing the skill, the live variant picker, or the design hook.** Useful in an agent workflow. Not part of the published site.

## Checked

Keyboard focus, the 中 / EN control (including the saved choice sending `/tools/` to `/zh/tools/`), the mobile menu, reduced motion, hreflang, and the unchanged color tokens and logo wordmark were exercised in a browser. Desktop shots are 1440px wide and phone shots are 390px wide.
