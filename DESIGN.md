# IGNITE — Editorial Orbital Atlas

> *Design brief for the IGNITE landing page. Companion to the codebase, not a substitute for it. Read alongside `src/styles/globals.css` and `src/lib/motion.js` — those are the live source of truth.*

## Identity

IGNITE is the team that won the **Airbus Partner Award** at **ACT IN SPACE 2026 World Finals** in Bordeaux. The product is orbital imaging that turns vegetation risk into preventive grid decisions — *seeing the unseen, from space.*

The landing page is **brand register**: design IS the product. A visitor's first impression carries the entire technical story. The visual conceit is **Editorial Orbital Atlas** — an editorial-magazine voice in the print-specimen sense (display serif italic, ruled separators, plate numbering, deliberate negative space) cross-bred with a **mission-control HUD** (live coordinates, signal bars, scan lines, satellite trails, an interactive globe with location markers). Neither half alone works: pure editorial is generic Stripe-adjacent slop; pure mission-control is space-startup cosplay. The hybrid is the voice.

## Brand voice — three words

- **Mechanical** · the language of telemetry, the cadence of scheduled passes, the certainty of monospaced labels.
- **Editorial** · the gravity of a museum caption, the rhythm of a Klim type specimen, italic emphasis used like a typographer's pen mark.
- **Inevitable** · this technology *had* to come from above; the page should read as a record of something that happened, not a pitch.

## Anti-references (what this page is not)

- Not a SaaS landing page with a hero metric and gradient accent.
- Not a generic editorial-magazine layout (Fraunces + caps tracked metadata + monochrome restraint is currently the AI-default editorial lane; the orbital/mission-control half is the differentiator).
- Not a tech-startup astronaut hero photo.
- Not a developer-tool dark-mode terminal mood — the editorial half exists to keep this out of that lane.

---

## Current strengths (preserve)

These are working. Edits should reinforce, not replace.

- **`MotionConfig reducedMotion="user"`** at `App.jsx:38` — the modern, correct way to respect user motion preference at the framework level.
- **`usePrefersReducedMotion` hook** (`src/hooks/usePrefersReducedMotion.js`) — already wired in Starfield + OrbitalGlobe. Reuse for HowViz.
- **Global `@media (prefers-reduced-motion: reduce)` CSS block** (`globals.css:1369-1383`) — disables animations + transitions site-wide.
- **`:focus-visible` global rule** (`globals.css:100-103`) — ember outline at 4px offset. Refinement opportunity (rounded elements) but not a gap.
- **WebGL globe with SVG fallback** via `hasWebGL()` (`src/components/Globe/index.jsx`).
- **Cobe globe markers** narratively tied to the IGNITE story: Bordeaux (largest, Airbus award city) + 7 Brazilian cities (the grid IGNITE protects).
- **Starfield** with deterministic PRNG seeding, devicePixelRatio handling, visibility-API pause, shooting stars on a stochastic schedule.
- **Skip link** present + functional.
- **Aria-labels** on Nav, lang toggle (with contextual "Switch to English" / "Mudar para Português"), hero coords container, globe canvas, team links.
- **OG + Twitter + theme-color meta** complete in `index.html`.
- **Imagery is real**: `team-award.jpeg` + `team-banner.jpeg` carry mood; not stock.
- **Heading hierarchy is clean**: one `<h1>`, all section titles `<h2>`, `<h3>` in How substeps only.
- **Real imagery**, real LinkedIn URLs in the team roster — page feels lived-in, not template.

---

## Revised section rhythm

The current page has 8 stops (Hero → Mission → Solution → How → Impact → Award → Team → CTA + Footer). Three consecutive sections (Mission, Solution, Impact) currently share a kicker-title-3-row-list cadence. The fix is **rhythm variation**, not section reordering.

| Section | Current shape | Revised shape | Why |
|---|---|---|---|
| **Hero** | 12 overlays (saturated) | 9 overlays — cut cardinal ticks, corner brackets, scan line | Same density read with less noise; mission-control feel preserved by primary satellite + coords HUD + signal bars |
| **Mission** | 3-col grid (3 equal stats) | Asymmetric (1 lead stat 1.5× + 2 stacked secondaries) | First narrative beat needs a hierarchy, not a list |
| **Solution** | 3 pillar rows, equal vertical spacing | Vertical-stagger pillars (`margin-top: 0 / 80px / 160px`) | The orbital metaphor — pillars trace a trajectory across the page |
| **How** | 3 vertical steps with HowViz | Keep current vertical flow + scroll-driven progress reveal in HowViz | The flow IS the differentiator; amplify don't redesign |
| **Impact** | 3 numeric rows aligned variably | 1 huge featured number (14vw) + 2 secondary ledger row | The Impact section *is* the receipt; one number deserves to dominate |
| **Award** | 2-col photo + text | Unchanged (already differentiated) | Photo + h2 + badges already carries weight; touch only the h2 italic policy |
| **Team** | Roster grid of 5 equal | 1 featured (Renan, project lead, 2× tile + 1 bio line) + 4 normal | Hierarchy in the founding story; not "5 indistinct co-founders" |
| **CTA** | Centered split title | Unchanged (already differentiated) | Final stop should *land* — the centered minimalism is correct |
| **Footer** | Three-col mono | Unchanged | The receipt at the bottom of the page |

---

## Three signature moments

These are what take the page from "very good" to "memorable". One per phase of the read.

### 1. PlateNumber count-up (Mission + Impact) — *first beat*

Replace the static inline `.plate-num` spans + numeric `<span>`s in Mission stats and Impact rows with the dormant `<PlateNumber>` atom (`src/components/atoms/PlateNumber.jsx`), extended with:

- New prop `countUp: boolean`
- New prop `target: number` (the end value; when provided + `countUp`, animates 0 → target)
- Use `motion/react`'s `useInView` + `useMotionValue` + `animate()` with `--ease-editorial` over 1.6s
- Respect `usePrefersReducedMotion()` — render the final value directly when reduced

The visual effect: stats *appear* by being counted out, like a teletype settling on a final value. The numbers feel like a transmission, not a marketing card.

### 2. Globe marker spotlight on Mission enter — *second beat*

The cobe globe in Hero already has 8 markers, with Bordeaux as the largest. When MissionSection enters the viewport, briefly **pulse the Bordeaux marker** from `size: 0.075` to `size: 0.115` and back over ~1.2s with `--ease-editorial`.

Implementation:
- Add `highlight: 'bordeaux' | null` prop to `<OrbitalGlobe>`
- `useInView` on Mission `<section id="mission">` from inside the App tree (passing setter down) or via a small shared ref
- Bordeaux marker pulse loop runs once per highlight set; respects `usePrefersReducedMotion()`

The visual effect: as the reader scrolls into "what we built", the globe responds — the city where the team won the Airbus award acknowledges itself. A scrolltied detail that earns its complexity.

### 3. Solution pillar orbit-on-hover — *third beat*

Each `.pillar-row` in Solution gets an absolute-positioned SVG overlay drawing a **dashed orbital line** from the pillar icon center to an off-card anchor point. On hover, the dash animates from invisible (`stroke-dasharray: 0 1000`) to drawn (`stroke-dasharray: 1000 0`) using `--ease-editorial` over `--dur-slow` (600ms). On hover-end, reverse.

Stroke: `var(--ember)`, 0.6px, opacity 0.55. Subtle. The pillar feels connected to something off-page — the larger orbital story.

**INTENTIONALLY OMITTED — the CTA departure sweep.** The page already has Starfield + Sun-flare + ticker scroll + satellite trail + signal bars. A fourth motion event at the close would tip the page into "too much". Three signatures, well-polished, beat four indistinct sparkles.

---

## Token system extensions

Existing tokens in `globals.css:6-31` are correct but incomplete. Add these layers.

### Type scale — ratio 1.333 (perfect fourth)

Anchor: hero h1 at `clamp(48px, 8vw, 124px)` (current). Each step ÷ 1.333.

```css
:root {
  --step-1: clamp(72px, 13vw, 220px);   /* display-xl — kept for any future hero punctuation */
  --step-2: clamp(56px, 9vw, 140px);    /* cta-title */
  --step-3: clamp(48px, 8vw, 124px);    /* hero-title (current value, now tokenized) */
  --step-4: clamp(48px, 7.5vw, 110px);  /* section-title */
  --step-5: clamp(32px, 4vw, 64px);     /* display-m / mid-emphasis */
  --step-6: clamp(20px, 1.6vw, 24px);   /* body upper / lead */
  --step-7: clamp(17px, 1.2vw, 19px);   /* body */
}
```

Rewrite the existing 7 `clamp()` font-sizes to consume `--step-n`. This is housekeeping, not visual change — sizes stay where they are, just unified under a ratio so future additions are predictable.

### Motion durations

```css
:root {
  --dur-fast:       150ms;    /* hover state */
  --dur-base:       300ms;    /* button transition, small UI */
  --dur-slow:       600ms;    /* signature reveal */
  --dur-cinematic:  1200ms;   /* count-up, globe spotlight */
}
```

Mirror in `src/lib/motion.js` so duration values come from one place (or read CSS custom properties from JS when the variant is constructed).

### Easings

```css
:root {
  --ease-editorial: cubic-bezier(0.2, 0.8, 0.2, 1);  /* exists — keep */
  --ease-launch:    cubic-bezier(0.16, 1, 0.3, 1);    /* new — entrance physics */
  --ease-out-strong: cubic-bezier(0.22, 0.61, 0.36, 1); /* new — secondary hover */
}
```

### Spacing scale (4px base)

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 40px;
  --space-7: 64px;
  --space-8: 96px;
}
```

Adopt incrementally — section paddings and gaps where they're currently raw px or clamp values.

### Radius

```css
:root {
  --radius-1:    2px;     /* hairline pieces, .badge */
  --radius-2:    8px;     /* small buttons */
  --radius-pill: 999px;   /* pill controls (.cta-link, .lang-btn) */
}
```

### Focus ring

```css
:root {
  --ring: 0 0 0 2px var(--bg-deeper), 0 0 0 4px var(--ember);
}

:focus-visible {
  outline: none;
  box-shadow: var(--ring);
  border-radius: inherit;
}
```

Upgrades the existing `outline` rule to box-shadow so rounded elements (`.cta-link`, `.badge`) get a proper rounded ring.

---

## Color semantics (single-ember system)

The previous codebase had a 4-accent theme switcher. The rewrite collapsed to a single committed ember palette. **Do not reintroduce theme switching** — commit harder, not wider.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#04060e` | Primary surface |
| `--bg-elev` | `#0a0c14` | Elevated surface |
| `--bg-deeper` | `#02030a` | Deepest layer (focus ring inner shadow) |
| `--ink` | `#efe9dc` | Body / primary text |
| `--ink-2` | `#8d8a82` | Secondary text |
| `--ink-3` | **`#8a8a82`** | Tertiary text — **REPLACE** current `#4a4a45` (fails AA at 2.29:1) with `#8a8a82` (~5.7:1, clears AA easily) |
| `--rule` | `rgba(239, 233, 220, 0.08)` | Hairline |
| `--rule-strong` | `rgba(239, 233, 220, 0.18)` | Stronger hairline |
| `--ember` | `#ff5132` | Action / CTA / live signal / alert |
| `--ember-soft` | `#ffce5c` | Hover state / secondary mark / "delivered" |

Ember is **the** action color. Ember-soft is for the moment a signal *resolves* — the satisfying-after-the-alarm warmth.

---

## Italic policy (Fraunces)

Fraunces is the brand's italic voice. It carries emphasis the way a typographer's pen mark carries it — sparingly, intentionally.

- **Hero h1 last line** — already in italic via `<em>`. The emphasis is *the* emphasis of the page.
- **Pillar accents** (Solution) — short italic phrases inside pillar bodies, max one per pillar.
- **Award h2 "Airbus Prize."** — the only h2 that earns italic; this is the narrative summit. Set as `font-style: italic` directly.
- **Team banner quote** — already italic; keep.
- **CTA's emphasized word** — already italic via `<em>` in `renderTitle()`; keep.

**Banned:** italic in body copy, italic in nav, italic in mono labels, italic across multiple h2s. Italic earns its place by being rare.

---

## Motion principles

- **Entrance** — staggered reveal on viewport enter. Use `motion/react` with `viewportOnce: true` (already in `src/lib/motion.js`). Distance ≤ 8px, duration 0.32s (`sectionReveal` variant). Stats use `statRise` (0.5s with scale 0.99→1).
- **Hover** — `--dur-base` (300ms) with `--ease-editorial`. No bounce, no elastic.
- **Scroll-tied** — reserved for Starfield parallax (already done) and the new globe-marker spotlight on Mission enter. No scroll-jacking.
- **Reduced-motion** — `MotionConfig reducedMotion="user"` already handles the framework layer. Three explicit gates: Starfield (already wired), OrbitalGlobe (already wired), HowViz (gap — Etapa 5b).
- **Forbidden** — animating CSS layout properties (use transform + opacity); CSS animation on heights (use `grid-template-rows`); spring physics on entrance reveals (`--ease-editorial` is the entrance contract).

---

## Anti-patterns the page must keep avoiding

Listed because they're the AI-default tempting one-shot fixes:

- Gradient text (`background-clip: text` + gradient) — never. Use a single color, emphasis via size + italic.
- Glassmorphism — not the language of this page. Mission-control reads as flat panels with hairline borders.
- Identical card grids — this is exactly what Etapa 4c rhythm variation fixes.
- Side-stripe borders on cards / list items — never. Hairline full borders + ember accent dot is the pattern.
- "Hero metric template" (giant number + small label + supporting stats + gradient) — Impact section *does* use a featured number, but the surrounding chrome is editorial ledger, not SaaS dashboard.
- Adding a fourth signature moment — three is the contract. A fourth flattens the page.

---

## Future / out-of-scope

- **Cleanup of `ignite/project/`** — the deprecated Babel-standalone tree at `ignite/project/` is stale and confuses new contributors / explorations. Worth deleting in a follow-up commit, but out of scope for the Impeccable elevation.
- **`data-edit-id` per-string editing wiring** — the old code had a postMessage handshake; gone in the rewrite. Not coming back unless an external editor needs it.
- **Lighthouse 100/100** — current target is ≥85 performance, ≥95 accessibility. Going higher requires image compression below ~80KB and may compromise visual fidelity.
- **CMS migration** — copy lives in `src/i18n.js`. Move to a headless CMS only when the team needs non-developer copy edits.
- **Additional language support** — PT/EN is the scope. Add languages only with native speakers.
- **Award sub-page / case study microsite** — separate project.

---

## Token migration order (when implementing)

The token system extensions above touch many files. To stay sane and review-friendly:

1. Add all new `--step-*`, `--space-*`, `--dur-*`, `--ease-*`, `--radius-*`, `--ring` variables to `:root` in one commit (Etapa 4a).
2. Migrate font-sizes to consume `--step-*` in the same commit (Etapa 4a).
3. Replace `--ink-3` value + upgrade focus ring to `--ring` (Etapa 4b).
4. Adopt spacing tokens incrementally during layout work (Etapa 4c / 6c).
5. Migrate motion durations in `lib/motion.js` last, during the polish pass (Etapa 6c).

Never refactor tokens and visuals in the same commit — token churn is invisible; visual churn is not.
