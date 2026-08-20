# Starchild Brand Foundation v1

A visual, responsive, English-only brand foundation document for **Starchild** — built as a single-page static website with an editorial/strategy-document design.

## Files

| File | Description |
|------|-------------|
| `index.html` | Semantic HTML with 13 content sections, accessible landmarks, and keyboard support |
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

No build step, no dependencies, no remote assets — everything is local and uses system fonts only.

## Design System

### Colors
- **Starchild Yellow** `#FFD166` — primary accent
- **Starchild Magenta** `#E63984` — secondary accent
- **Starchild Blue** `#118AB2` — tertiary accent
- **Ink** `#1A1A2E` — near-black text
- **Paper** `#FAF6F0` — warm background
- **Warm Gray** `#8B8178` — muted text

### Typography
- **Headings:** Georgia / Times New Roman (system serif)
- **Body:** Segoe UI / Helvetica Neue / Arial (system sans-serif)
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

1. Align · Validate · Formalize
2. Who Are We?
3. Who Is It For? (Primary & Secondary audiences + Jobs to Be Done)
4. Positioning (Old Way vs Starchild + Pillars)
5. Messaging Hierarchy (Tagline → Full Story)
6. Voice Principles (Do/Don't examples + Words we use/avoid)
7. Visual Direction (Locked Now / Directional / Later + Color palette)
8. Product Language (Conductor Mode, Agent, Marketplace, Skill, MCP)
9. Brand Decision Log
10. Landing Page Validation Loop
11. After the LP — Brand System v1
12. NOW · NEXT · LATER Roadmap
13. Team (Quote + Values)
