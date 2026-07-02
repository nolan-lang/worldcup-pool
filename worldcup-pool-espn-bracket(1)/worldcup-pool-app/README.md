# Placerville World Cup Pool

Upload this folder to GitHub, then import it into Vercel.

Files:
- `index.html` — the full bracket app
- `api/scores.js` — Vercel serverless function that proxies ESPN scoreboard data

Vercel settings:
- Framework Preset: Other
- Build Command: leave blank
- Output Directory: leave blank

The app has fallback results baked in, and tries to refresh from `/api/scores` every 60 seconds.
