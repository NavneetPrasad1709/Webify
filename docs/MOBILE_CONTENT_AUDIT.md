# Mobile homepage content optimisation

Method: headless Chrome at each width, intro and lead popup suppressed, page
scrolled end to end so every reveal fires, then `document.scrollHeight` and each
`main > section` height recorded. "Before" = live site, "after" = local
production build of this change. Raw data: `docs/screenshots/*/metrics.json`.

## Result

| Width | Before | After | Shorter by |
| --- | --- | --- | --- |
| 360 | 23,305 px | 17,593 px | 24.5% |
| 375 | 23,053 px | 17,359 px | 24.7% |
| 390 | 22,747 px | 17,157 px | 24.6% |
| 430 | 22,248 px | 17,028 px | 23.5% |
| 768 | 20,408 px | 15,816 px | 22.5% |
| 1440 | 18,352 px | 14,083 px | 23.3% |

No horizontal overflow at any width, before or after.

The brief's 30 to 40% target was **not** reached. The remaining length is
Pricing (3 tiers), Work (3 live builds), the offshore-objections block and the
footer: real buyer information, which the brief says not to remove. Going
further would mean visual changes (smaller cards, collapsed tiers), which
were out of scope.

## Section by section at 375 px

| Section | Before | After | What changed |
| --- | --- | --- | --- |
| Hero | 921 | 903 | New positioning copy, same layout |
| Credibility | 702 | 702 | Unchanged |
| Services | 1,348 | 985 | Shows 6 core services + "View All Services"; full 12 on /service |
| Work | 1,704 | 1,704 | Unchanged (proof, kept) |
| Three moments | 1,485 | 1,461 | Subtitle shortened |
| Impacts | 994 | 870 | Positioning paragraph rewritten, 54 words to 31 |
| Brands (tools) | 797 | removed | Same stack is on /service; ownership covered in FAQ and pricing |
| How We Ship | 2,905 | 2,050 | 6 generic cards to 4 concrete steps |
| Founding Offers | 1,815 | removed | Moved to /about; every point was repeated elsewhere |
| Pricing | 2,532 | 2,219 | 6/6/4 features to 4/4/4; intro and footnote cut to one line each |
| FAQ | 1,271 | 1,194 | Answers shortened; questions refocused |
| Blog | 1,872 | 1,378 | 2 previews on phones, 3 from tablet up |
| Working Remotely | 2,119 | 1,727 | Each answer cut to one sentence |
| CTA band | 470 | removed (home only) | Was the 2nd of 3 back-to-back CTAs |
| Footer | 2,128 | 2,174 | Unchanged (new service in list) |

## Content moved, not deleted

- Founding Offers section: now on `/about`, before the closing CTA.
- Full services list: `/service` and the footer (now 12 incl. SaaS).
- Tech stack: `/service` TechStack section.
- Detailed service information: each `/service/<slug>` page.
- Third blog preview on phones: `/blog`.

## Design preserved

No component styles, tokens, fonts, colours or animations changed. Two small
markup additions reuse existing patterns: a "View All Services" PillButton
(same component and tone as other section CTAs) and a responsive class that
hides the third blog card under 768 px. Section crops in
`docs/screenshots/sections/` show the edited sections at 360 and 1440 px.
