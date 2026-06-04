# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev Server

```bash
node serve.mjs        # http://localhost:3000 — serves Portfolio.html + /api/contact
```

The server binds to `0.0.0.0` (all interfaces), so it is reachable from phones/tablets on the same Wi-Fi at the machine's LAN IP (find it with `ipconfig getifaddr en0`).

Env vars are loaded automatically from `.env.local` at startup (no dotenv dependency — `serve.mjs` parses it natively). After editing `.env.local`, restart the server for changes to take effect.

**Important:** Always restart the server after updating `.env.local` — env vars are read once at boot and cached in memory.

To kill a stuck server on port 3000: `lsof -ti :3000 | xargs kill -9`

## Preview

Use `mcp__Claude_Preview__preview_start` with server name `"portfolio"` (config in `.claude/launch.json`). Use `preview_screenshot` / `preview_eval` to verify. Always serve from localhost — never `file:///`.

## Architecture

No build step, no bundler. React 18 + Babel standalone loaded from CDN. All components share state via `window`.

**Load order in `Portfolio.html` (order matters — each file expects previous ones on `window`):**

```
image-slot.js          ← <image-slot> custom element
data.js                ← window.DATA (all content)
tweaks-panel.jsx       ← window.useTweaks, TweaksPanel, Tweak* controls
components/icons.jsx   ← window.Icon, window.social
components/nav.jsx     ← window.Nav
components/hero.jsx    ← window.Hero
components/marquee.jsx ← window.Marquee
components/about.jsx   ← window.About
components/skills.jsx  ← window.Skills
components/experience.jsx ← window.Experience
components/projects.jsx   ← window.Projects
components/contact.jsx    ← window.ContactForm, window.Contact
app.jsx                ← mounts ReactDOM.createRoot, wires everything together
```

`sections.jsx` and `styles.css` (monolithic originals) are **not loaded** — kept only as reference. Active styles live in `styles/`.

## CSS Structure

`styles/global.css` owns: CSS custom properties, resets, shared primitives (`.pill`, `.tag`, `.dot`, `.watermark`, `.shead`, `.eyebrow`, `.section`, `.wrap`, `image-slot`). All other `styles/*.css` files are component-scoped.

The `.tag` hover state is defined globally — do not reduplicate per-component. Skill tags that have a known URL are rendered as `<a class="tag">` in `components/skills.jsx`; unknowns stay `<span class="tag">`.

## Icons

`components/icons.jsx` exports `window.Icon` with: `arrow`, `linkedin`, `github`, `globe`, `sun`, `moon`, `burger`, `close`. Also exports `window.social(label)` which returns the right icon for a link label. Add new icons here — they must be on `window.Icon` before any component that uses them loads.

## Theming

Four `data-*` attributes on `<html>` gate CSS variants:

| Attribute | Values | Effect |
|---|---|---|
| `data-theme` | `light` \| `dark` | Swaps full CSS variable palette |
| `data-direction` | `editorial` \| `brutalist` \| `swiss` | Overrides `--radius`, `--line`, grid columns |
| `data-namestyle` | `split` \| `outline` \| `fill` | Hero name stroke variant |
| `data-motion` | `on` \| `off` | Gates `.anim-ready` entrance animations |

Controlled at runtime via the Tweaks Panel (activated by the omelette host, not visible in normal browsing).

## Scroll Reveal — Critical Gotcha

The `IntersectionObserver` in `app.jsx` runs once on mount and observes all `.reveal:not(.in)` elements. **Elements added to the DOM after mount (e.g. the form success state) will never get `.in` and will be invisible** if they carry the `reveal` class. Never put `reveal` on dynamically-rendered elements; control their visibility with regular CSS or inline styles instead.

## Experience Section — `data-open` Pattern

The accordion uses `data-open` attribute (not a CSS class) to avoid a React reconciliation bug: when React updates `className`, it overwrites the `.in` class added imperatively by the IntersectionObserver. CSS targets `.exprow[data-open]` rather than `.exprow.open`.

The first (most recent) row is expanded by default — `useState(0)` in `experience.jsx`. To collapse all on load, change it to `useState(null)`.

## Contact Form

`ContactForm` in `components/contact.jsx` posts JSON to `POST /api/contact`. `serve.mjs` validates fields and calls the Resend API. Required `.env.local` vars:

```
RESEND_API_KEY=re_...
EMAIL_ADDRESS=rohankatkam1698@gmail.com
EMAIL_FROM=onboarding@resend.dev
```

`EMAIL_FROM` must be a verified Resend sender. `onboarding@resend.dev` works on Resend's free tier only when sending to your own verified email address.

The HTML email template is inlined directly in `serve.mjs` as a template literal (`emailHtml`). It uses a dark header / light card layout matching the portfolio palette (`#0d0d0d` / `#f2f1ec` / `#eceae5`). The `reply_to` field is set to the sender's email so replying in any mail client goes directly to them.

## Mobile Nav

`components/nav.jsx` renders a hamburger button (`.nav__burger`) on screens ≤760px that toggles a `nav__mobile-menu` dropdown. The `.nav` wrapper has `pointer-events: none` — the mobile menu must explicitly set `pointer-events: auto` or taps pass through silently.

Navigation from the mobile menu uses `scrollIntoView({ behavior: "smooth" })` called via `setTimeout(..., 300)` — do **not** use `e.preventDefault()` without this delay or `window.location.href` directly, as React re-renders cancel anchor navigation on mobile browsers.

## Content & Images

- All copy lives in `data.js` (`window.DATA`) — edit only there.
- To hide a project or social link, comment it out in `data.js` then `git add data.js && git push` — Vercel auto-deploys.
- Project screenshots go in `public/` and are referenced via the `img` field on each project in `data.js`. Projects with `img: ""` render a CSS diagonal-stripe placeholder.
- Portrait image: `public/portrait.jpg` (committed to git, ships to Vercel). Source file: `uploads/IMG_0426.JPG`. To swap: copy new image to `public/portrait.jpg` and push.
- The `<img>` in `hero.jsx` uses `objectPosition: "center 20%"` to crop to the face/upper body area.
- `uploads/` holds original dropped files — gitignored, local only.
- `.image-slots.state.json` is gitignored — only used locally for the drag-to-reposition feature on localhost.

## Hero Layout

The hero uses a **3-column grid** on desktop: `[lead text] [portrait] [socials]`.

```
components/hero.jsx structure:
  <h1 class="hero__name">   ← full-width ROHAN / KATKAM
  <div class="hero__row">   ← 3-col grid on desktop
    .hero__lead             ← col 1: title, blurb, CTA button
    .hero__portrait         ← col 2 (center): <img src="public/portrait.jpg">
    .hero__socials          ← col 3: LinkedIn/GitHub pills
```

**Portrait styling:** `border-radius: 24px` (rounded rectangle). On desktop: `width: clamp(280px, 32vw, 460px)`, `height: clamp(360px, 42vw, 580px)`. The `.hero__row` has `margin-top: clamp(-40px, -5vw, -70px)` to slightly overlap with KATKAM.

## Responsive Layout

Breakpoints used across component CSS files:

| Width | Behaviour |
|---|---|
| >900px | Desktop: hero 3-col grid (lead \| portrait \| socials), experience shows full 5-col row |
| ≤900px | iPad: hero collapses to single column — portrait first (order:-1), then lead, then socials centered |
| ≤760px | Mobile: nav links hidden, hamburger shown; `nav__cta` ("Let's Talk") hidden |
| ≤720px | Skills and projects grids collapse to 1 column |
| ≤600px | Contact form row collapses to 1 column; hero portrait shrinks to 58vw |

**Horizontal overflow:** `html` and `.section` both have `overflow-x: hidden`. The `.watermark` and `.marquee__track` intentionally exceed viewport width — they are clipped by their parents, not the page. Do not remove these overflow rules or the navbar will shift right on mobile during scroll.

**Hero z-index layers:** name (`z-index: 1`) → portrait (`z-index: 4`) → hero__row (`z-index: 4`). The portrait sits in front of the name text by design.

**Social pills:** `.hero__socials .pill` has a fixed `width: 120px` and `justify-content: center` so all three pills (LinkedIn, GitHub, Portfolio) are equal width with centered icon + label.

## Deployment

- **GitHub:** https://github.com/rk94407/rohan-katkam-portfolio
- **Vercel:** https://rohan-katkam-portfolio-app.vercel.app (project: `rohan-katkam-portfolio-app`, team: `rk94407s-projects`)
- Auto-deploys on every `git push` to `main`.
- `vercel.json` has `outputDirectory: "."` so Vercel serves files from the project root. `api/contact.js` is the serverless contact form handler.
- Required env vars in Vercel dashboard: `RESEND_API_KEY`, `EMAIL_ADDRESS`, `EMAIL_FROM`.
- **Local server** (`serve.mjs`) handles `/api/contact` locally; `index.html` served at `/`.

## .gitignore — What's excluded

- `.env.local` — API keys
- `.image-slots.state.json` — base64 portrait (~1.2 MB), regenerated from `uploads/`
- `uploads/` — all original photo files (large binaries)
- `sections.jsx` + `styles.css` — legacy monolithic originals, not loaded
- `.DS_Store`, `node_modules/`, editor folders

**Background removal:** `rembg` + `onnxruntime` are installed at `~/Library/Python/3.9`. To re-process the portrait: run rembg with the `isnet-general-use` session, composite the transparent result onto `#eceae5` (light bg) using PIL, then base64-encode and write to `.image-slots.state.json`.

## Design Constraints

- **Fonts**: Archivo (display + body) + JetBrains Mono (mono) — Google Fonts.
- **Palette**: Monochrome only. `#eceae5`/`#0d0d0d` (light) · `#0c0c0b`/`#f2f1ec` (dark). No accent colors.
- **Animations**: `transform` and `opacity` only. Never `transition-all`.
- **Magnetic buttons**: `data-magnetic` attribute on any pill/button.
- **Staggered reveals**: `data-d="1|2|3|4|5"` on `.reveal` elements sets `transition-delay`.
