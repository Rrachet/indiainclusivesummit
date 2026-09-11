# India Inclusive Summit

Marketing site for **India Inclusive Summit**, presented by Triumphs of Talent.
A national platform bringing lived experience, business leadership, policy and
innovation together to create a more inclusive India.

**Live:** https://rrachet.github.io/indiainclusivesummit/

---

## Why this repo is built the way it is

The site is about disability inclusion, so accessibility is a correctness
requirement here rather than a polish item. That constraint drove most of the
technical decisions below.

**No build step.** Five static files deployed straight to GitHub Pages. A
bundler would add a toolchain and a compile stage for a single-page brochure
site that changes a few times a year. The trade-off is that the source ships
unminified — worth it at 29 KB of CSS and JS combined. The only dependency in
`package.json` is Playwright, used by the test suite and never shipped.

**Motion is progressive enhancement, and the fallback is the default.** The
"Why the Summit" section is a plain vertical stack in CSS. The pinned
horizontal track is layered on top only after `main.js` has loaded GSAP
successfully, at which point it sets `.motion-ready` on the root element.

This ordering matters. The obvious alternative — style the horizontal track by
default and undo it for reduced motion — silently clips cards 2-4 out of reach
whenever the CDN is slow, blocked or down, with no error anywhere. Making the
readable layout the default means any failure in the motion layer degrades to
something usable instead of something broken. Scroll reveals fall back to an
`IntersectionObserver` for the same reason.

**Pinned CDN dependencies with Subresource Integrity.** GSAP and ScrollTrigger
are loaded at an exact version with `integrity` and `crossorigin` set, so a
swapped or compromised CDN file cannot execute on this origin.

**No smooth-scroll library.** An earlier revision used Lenis to hijack native
scrolling. It was removed: overriding the browser's scroll is a known
accessibility hazard (it breaks assistive-technology scroll positioning and is
a common motion-sickness trigger), and it is the wrong default on a site about
inclusion.

## Accessibility

| Concern | How it is handled |
|---|---|
| Keyboard navigation | Skip link to `#main`; visible `:focus-visible` ring on every interactive element; `Escape` closes the mobile menu and returns focus to the toggle |
| Horizontal section | Exposed as a focusable `role="region"` with an accessible name, so it can be reached and scrolled with the keyboard |
| Reduced motion | No GSAP is loaded at all, so `.motion-ready` is never set and the vertical-stack layout stands; the loader and decorative cursor are hidden |
| Menu state | `aria-expanded` and `aria-controls` on the toggle, kept in sync with the label |
| Decorative elements | Loader, cursor, progress bar, gradient overlays and arrow glyphs are all `aria-hidden` |
| Landmarks | `header` / `nav[aria-label]` / `main` / `footer`, with each section labelled by its own heading |
| Headings | One `h1`, sections at `h2`, cards at `h3` — no skipped levels |

Registration links directly to the official Triumphs of Talent form rather than
re-collecting name, email and phone in fields the static site cannot submit
anywhere.

## Project layout

```
index.html                      Document shell, font preloads, no-JS fallback
main.js                         Markup, navigation, scroll reveals, motion layer
style.css                       Reset, accessibility, layout, responsive
premium.css                     Decorative effects only (grain, button sheen)
tot_logo_bg.png                 Triumphs of Talent logo
tests/accessibility.test.mjs    Browser-driven accessibility regression tests
```

## Running locally

The site itself has no dependencies. Serve the directory over HTTP — opening
`index.html` from the filesystem works, but a server matches production more
closely:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Tests

```bash
npm install
npx playwright install chromium
npm test
```

The suite drives a real browser and blocks the CDN, Unsplash and Google Fonts,
so it is hermetic and exercises the degraded path on every run. It asserts:

- no content is clipped out of reach when the motion layer fails to load
- the same holds under `prefers-reduced-motion` and at mobile width
- the loader always clears, whatever else fails
- the skip link is the first tab stop and moves focus to `<main>`
- landmarks, heading order, `alt` text and `aria-hidden` on decorative elements
- the menu reports `aria-expanded` and closes on `Escape`
- every CDN script is version-pinned and integrity-checked

Tests gate deployment: `.github/workflows/static.yml` only publishes after they
pass.

## Deployment

Pushing to `main` runs the test suite, then publishes to GitHub Pages. The
deploy job copies only the five files the site serves into `_site`, so tests,
CI config and dev dependencies are never uploaded.

## Licence

Source code is MIT licensed — see [LICENSE](LICENSE). The Triumphs of Talent
and India Inclusive Summit names, logos and copy are not covered.
