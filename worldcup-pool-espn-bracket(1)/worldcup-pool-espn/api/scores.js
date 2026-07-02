export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  try {
    const url = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=1000';
    const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' }});
    if (!r.ok) throw new Error('ESPN request failed');
    const json = await r.json();
    const games = (json.events || []).map(ev => {
      const comps = ev.competitions?.[0]?.competitors || [];
      const home = comps.find(c => c.homeAway === 'home') || comps[0] || {};
      const away = comps.find(c => c.homeAway === 'away') || comps[1] || {};
      const statusType = ev.status?.type || {};
      const winner = comps.find(c => c.winner)?.team?.displayName || null;
      return {
        id: ev.id,
        home: home.team?.displayName,
        away: away.team?.displayName,
        homeScore: home.score ?? null,
        awayScore: away.score ?? null,
        status: statusType.completed ? 'final' : statusType.state === 'in' ? 'live' : 'scheduled',
        winner
      };
    });
    res.status(200).json({ games, updatedAt: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ games: [], error: e.message });
  }
}
