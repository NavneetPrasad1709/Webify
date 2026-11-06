# Mobile QA report

Tool: headless Chrome via Puppeteer, real mobile viewport emulation
(`isMobile`, touch), intro and lead popup suppressed, full scroll to fire
every reveal. Dates: 6 Nov 2026.

## Homepage

| Width | Live before | After content pass (deployed) | After this pass | Horizontal overflow |
| --- | --- | --- | --- | --- |
| 360 | 23,305 | 17,593 | 17,567 | None |
| 375 | 23,053 | 17,359 | 17,333 | None |
| 390 | 22,747 | 17,157 | 17,157 | None |
| 430 | 22,248 | 17,028 | 17,051 | None |
| 768 | 20,408 | 15,816 | 15,816 | None |
| 1440 | 18,352 | 14,083 | 14,083 | None |

Screenshots: `docs/screenshots/before/` and `docs/screenshots/after/`
(full pages, local only); `docs/screenshots/sections/` (edited sections at
360 and 1440 px, committed).

## Checks

| Check | Result |
| --- | --- |
| Rotating hero word fits at 360 px | Yes: longest ("Custom Software.") measures 267 px of 320 px available |
| Services accordion + "View All Services" | Renders, same pill style |
| How We Ship 4-card grid at 1440 | Rows 3+2 / 2+3 intact |
| Blog previews | 2 on phones, 3 at 768 px and up |
| Project counters | Real values in HTML on all three projects |
| Menu watermark | No longer distorted (`object-contain`) |
| Lighthouse mobile a11y | 93 (unchanged) |

## Not verifiable headlessly

- How smooth scrolling feels on a real phone (Lenis/GSAP timing).
- Hover and tap feel of the footer link roll.
- Real network speed on a phone over 4G.

Check these on your own phone after deploy.
