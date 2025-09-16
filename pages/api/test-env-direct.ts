import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 직접 환경변수 설정 (임시)
  process.env.EMAIL_USER = 'angeleo9691@gmail.com';
  process.env.EMAIL_APP_PASSWORD = 'dlea eoqz uocs pioz';

  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'NOT_SET',
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? 'SET' : 'NOT_SET',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'SET' : 'NOT_SET',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT_SET',
  };

  res.status(200).json({
    message: 'Environment variables check with direct setting',
    env: envCheck,
    timestamp: new Date().toISOString()
  });
}
