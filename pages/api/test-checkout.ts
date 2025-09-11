import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('=== Test Checkout API Called ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST method is allowed',
      receivedMethod: req.method
    });
  }

  try {
    const { bookingData, amount, currency } = req.body;

    if (!bookingData || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'bookingData and amount are required'
      });
    }

    // 간단한 응답 반환
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      success: true,
      message: 'Test checkout API working',
      data: {
        bookingData,
        amount,
        currency: currency || 'aud'
      }
    });

  } catch (error) {
    console.error('Test checkout error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
