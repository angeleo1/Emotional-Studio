import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  
  return res.status(200).json({ 
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey?.length || 0,
    apiKeyPrefix: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set',
    message: apiKey ? 'API key is set' : 'API key is NOT set'
  });
}

