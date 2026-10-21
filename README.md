# India Inclusive Summit

Event website for **India Inclusive Summit**, presented by **Triumphs of Talent**. A single-page, motion-led site that introduces the summit, explains why it matters, and sends visitors to the official registration form.

**Live site:** [indiainclusivesummit.vercel.app](https://indiainclusivesummit.vercel.app)

## What it does

- Animated loader and hero introducing the summit
- "Why" section with a horizontally scrolling track on desktop
- Interest/registration section that opens the official Google Form in a new tab
- Respects `prefers-reduced-motion` (skips the animation libraries entirely)
- Responsive layout with a mobile menu

## Tech

- Plain HTML, CSS and vanilla JavaScript. There is no build step and no framework.
- [GSAP](https://gsap.com/) + ScrollTrigger and [Lenis](https://github.com/darkroomengineering/lenis) for scroll motion, loaded from a CDN
- Google Fonts (DM Sans, Manrope)
- Deployed on Vercel; a GitHub Pages workflow is also included in `.github/workflows/static.yml`

## Project structure

```text
index.html        Page shell
style.css         Base styles
premium.css       Visual polish layer on top of style.css
app-final.js      Renders the page and runs all interactions (the file index.html loads)
tot_logo_bg.png   Triumphs of Talent logo
archive/legacy/   Earlier iterations kept for reference, not used by the live site
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes

- The registration form is external (Google Forms). This site does not collect or store any data itself.
- Hero and section imagery is loaded from Unsplash URLs; the logo is the only local image the live page uses.
- `archive/legacy/` holds earlier versions of the scripts and styles plus unused images. It can be deleted once you are sure you no longer need it.
