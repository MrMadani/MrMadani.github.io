#!/bin/sh
# Regenerates the social preview image and the iPhone home-screen icon using Google Chrome.
# Run from the repo root:  sh tools/make-images.sh
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --screenshot="$ROOT/assets/og-image.png" "file://$ROOT/tools/og-card.html"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=180,180 \
  --screenshot="$ROOT/assets/apple-touch-icon.png" "file://$ROOT/tools/icon.html"

echo "Done: assets/og-image.png, assets/apple-touch-icon.png"
