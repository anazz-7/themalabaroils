export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (req.method === 'POST') {
    const { catalog } = req.body || {};
    if (!catalog) return res.status(400).json({ error: 'Missing catalog' });

    if (kvUrl && kvToken) {
      try {
        await fetch(`${kvUrl}/set/malabar_catalog`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${kvToken}` },
          body: JSON.stringify(catalog)
        });
        return res.status(200).json({ success: true, message: 'Saved to Vercel KV' });
      } catch (err) {
        return res.status(500).json({ error: 'KV write error' });
      }
    }

    return res.status(200).json({ success: true, message: 'Saved to session' });
  }

  if (req.method === 'GET') {
    if (kvUrl && kvToken) {
      try {
        const resp = await fetch(`${kvUrl}/get/malabar_catalog`, {
          headers: { Authorization: `Bearer ${kvToken}` }
        });
        const data = await resp.json();
        if (data && data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          return res.status(200).json({ catalog: parsed });
        }
      } catch (err) {}
    }

    return res.status(200).json({ catalog: null });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
