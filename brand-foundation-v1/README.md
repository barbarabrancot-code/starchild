# Starchild Brand Foundation v1

A visual, responsive, English-only brand foundation document for **Starchild** — built as a single-page static website with an editorial/strategy-document design.

## Files

| File | Description |
|------|-------------|
| `index.html` | Semantic HTML with 12 content sections, accessible landmarks, and keyboard support |
| `styles.css` | Full editorial design system — near-black ink, warm paper background, yellow/magenta/blue accents, responsive layout |
| `app.js` | Vanilla JS interactions — sticky nav active section, collapsible mobile nav, reveal-on-scroll, collapsible voice principles |
| `README.md` | This file |

## Preview

Open `index.html` directly in a browser, or serve it with a local static server:

```bash
# Python 3
python -m http.server 8000

# Node (if available)
npx serve .

# Or any other static server
```

Then visit **http://localhost:8000** in your browser.

No build step, no dependencies, no remote assets — everything is local, fonts included.

## Design System

The same one the product uses — see `src/index.css` and the prototype components.

### Colors
- **Starchild Orange** `#F84600` — the accent, and the only brand colour
- **Amber** `#FFA940` — secondary accent, as used on the product's eyebrows
- **Ground** `#0A0A0A` — page
- **Surface** `#111112` — cards, and `#1A1A1C` for anything raised above them
- **Border** `rgba(255,255,255,.09)` — every rule and edge
- **Text** white at 100 / 72 / 55 / 45 / 32% for the descending levels of emphasis

There is deliberately no third brand colour. Where a group needs three states
(now / directional / later), it runs orange → amber → muted white. The product's
green and red are semantic — connected, positive — so they are not borrowed here.

### Typography
- **Everything:** Google Sans (400 / 500 / 600 / 700), bundled in `fonts/`
- **Code:** Cascadia Code / Fira Code / Consolas (system monospace)

## Features

- **Sticky sidebar navigation** with active section highlighting on scroll
- **Collapsible mobile nav** with hamburger toggle and overlay
- **Reveal-on-scroll transitions** (disabled under `prefers-reduced-motion`)
- **Collapsible voice principle cards** (accordion-style)
- **Accessible:** semantic headings, ARIA attributes, skip link, keyboard focus styles
- **Responsive:** works on desktop, tablet, and mobile
- **Reduced motion:** all animations disabled when `prefers-reduced-motion: reduce` is set

## Content Sections

The board (NOW · NEXT · LATER) opens the document, ahead of the numbered phases.

1. Align · Validate · Formalize
2. Who Are We?
3. Who Is It For? (Primary & Secondary audiences + Jobs to Be Done)
4. Positioning (Old Way vs Starchild + Pillars)
5. Voice Principles (Do/Don't examples + Words we use/avoid)
6. Visual Direction (Locked Now / Directional / Later + Color palette)
7. Product Language (Conductor Mode, Agent, Marketplace, Skill, MCP)
8. Brand Decision Log
9. Landing Page Validation Loop
10. After the LP — Brand System v1
