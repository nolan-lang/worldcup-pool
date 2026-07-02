# Placerville World Cup Pool

Static Vercel app with a single `index.html` and an ESPN proxy function at `/api/scores`.

## Deploy
1. Upload this folder to GitHub.
2. Import the repo into Vercel.
3. Framework preset: Other.
4. Deploy.

The page pulls `/api/scores` every 60 seconds. If ESPN is unavailable, embedded results still render.
