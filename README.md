# Shahin — personal portfolio

Live at **https://mrmadani.github.io/**. Static HTML/CSS, hosted free on GitHub Pages, MIT licensed.

## Files

| File | What it is |
|---|---|
| `index.html` | All page content (hero, about, sections, contact) and SEO/Open Graph tags |
| `styles.css` | Look and feel; colors are at the top under `:root` |
| `explorer/` | The Automation Explorer page (mrmadani.github.io/explorer/) |
| `explorer/explorer-data.js` | **All Explorer content**: 16 industries, their steps, documents and sample questions |
| `booking.js` | Your Calendly link (`CALENDLY_URL`) for every booking button on the site |
| `favicon.svg` | Browser-tab icon |
| `assets/profile.jpg` | Your headshot (to swap it, replace this file with a square image of the same name) |
| `assets/og-image.png` | The preview image LinkedIn shows when you share the link |
| `assets/apple-touch-icon.png` | iPhone home-screen icon |
| `tools/` | Sources + script that regenerate the two PNGs above |

## How to edit

**Option A — in the browser (no setup):** open the repo on GitHub, click `index.html`, click the
pencil icon, edit, then "Commit changes". The live site updates in about a minute.

**Option B — on your Mac:**

```bash
cd ~/Claude/Personal/MrMadani.github.io
open index.html          # preview locally
# ...edit index.html / styles.css...
git add -A && git commit -m "Update content" && git push
```

## Placeholders to fill in

**Calendly:** open `booking.js` and paste your scheduling link into `CALENDLY_URL` at the top
(the `https://calendly.com/...` address inside Calendly's embed code). Both booking buttons then
open the Calendly popup. Until it's set, they open an email to you.

**Automation Explorer:** edit `explorer/explorer-data.js`. The comment at the top explains every
field. Each industry has four stages (Win the customer, Deliver, Get paid, Keep them); each step
has a level (`auto`, `draft`, `alert` or `human`), a before/after, tools, minutes saved and setup
effort. Link straight to an industry with `explorer/#id`, e.g. `explorer/#healthcare`.
Time-saved figures are estimates; adjust them to match what your team has actually measured.

Content comes from Shahin_Madani_Resume.pdf. The resume has no graduation or certification
years, so the site leaves them out too.

## Updating the LinkedIn preview

Edit `tools/og-card.html`, then run `sh tools/make-images.sh` (needs Google Chrome) and push.
LinkedIn caches previews; refresh it at https://www.linkedin.com/post-inspector/.
