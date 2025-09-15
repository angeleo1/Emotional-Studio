import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Set' : 'Not set',
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'Set' : 'Not set',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL ? 'Set' : 'Not set',
  };

  console.log('Environment check:', envCheck);

  return res.status(200).json({
    success: true,
    environment: envCheck,
    timestamp: new Date().toISOString()
  });
}
