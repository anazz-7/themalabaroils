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
    const order = req.body;
    if (kvUrl && kvToken) {
      try {
        await fetch(`${kvUrl}/lpush/malabar_orders`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${kvToken}` },
          body: JSON.stringify(order)
        });
      } catch (err) {}
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    if (kvUrl && kvToken) {
      try {
        const resp = await fetch(`${kvUrl}/lrange/malabar_orders/0/100`, {
          headers: { Authorization: `Bearer ${kvToken}` }
        });
        const data = await resp.json();
        if (data && Array.isArray(data.result)) {
          const orders = data.result.map((o) => (typeof o === 'string' ? JSON.parse(o) : o));
          return res.status(200).json({ orders });
        }
      } catch (err) {}
    }

    return res.status(200).json({ orders: [] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

