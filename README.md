# Shahin — personal portfolio

Live at **https://mrmadani.github.io/**. Static HTML/CSS, hosted free on GitHub Pages, MIT licensed.

## Files

| File | What it is |
|---|---|
| `index.html` | All page content (hero, about, sections, contact) and SEO/Open Graph tags |
| `styles.css` | Look and feel; colors are at the top under `:root` |
| `favicon.svg` | Browser-tab icon |
| `assets/profile.jpg` | Your headshot (add it; initials show until you do) |
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

Search `index.html` for `PLACEHOLDER` and `YOUR_` — every spot is marked. Yellow dashed boxes on
the live page are placeholders too.

- `YOUR_EMAIL@example.com` (contact button, AI-services CTA, footer)
- `YOUR-LINKEDIN-HANDLE` (LinkedIn button)
- Achievements in the Cybersecurity and Sales sections
- Graduation year, Security+ year / verification link
- `assets/profile.jpg` — your photo (square, ≥ 600×600)

To remove a placeholder line you don't want, delete its whole `<li>...</li>` or `<p class="placeholder">` line.

## Updating the LinkedIn preview

Edit `tools/og-card.html`, then run `sh tools/make-images.sh` (needs Google Chrome) and push.
LinkedIn caches previews; refresh it at https://www.linkedin.com/post-inspector/.
