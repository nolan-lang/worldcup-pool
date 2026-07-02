export default async function handler(req, res) {
  const dates = req.query.dates || '20260628-20260719';
  const urls = [
    `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${dates}&limit=200`,
    `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world.cup/scoreboard?dates=${dates}&limit=200`
  ];
  let lastError = null;
  for (const url of urls) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0', 'accept': 'application/json' } });
      if (!r.ok) throw new Error(`ESPN ${r.status}`);
      const data = await r.json();
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
      return res.status(200).json({ ok: true, source: url, data });
    } catch (e) { lastError = e.message; }
  }
  return res.status(502).json({ ok: false, error: lastError || 'Unable to reach ESPN' });
}
