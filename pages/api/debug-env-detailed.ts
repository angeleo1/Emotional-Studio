import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 모든 환경변수 확인
  const allEnvVars = Object.keys(process.env).filter(key => 
    key.includes('EMAIL') || 
    key.includes('STRIPE') || 
    key.includes('CONTACT') ||
    key.includes('NODE_ENV')
  );

  const envDetails = allEnvVars.reduce((acc, key) => {
    acc[key] = {
      exists: !!process.env[key],
      value: process.env[key] ? '***MASKED***' : 'undefined',
      length: process.env[key] ? process.env[key].length : 0
    };
    return acc;
  }, {} as any);

  res.status(200).json({
    message: 'Detailed environment variables check',
    allEmailRelatedVars: allEnvVars,
    envDetails,
    rawProcessEnv: {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
      NODE_ENV: process.env.NODE_ENV
    },
    timestamp: new Date().toISOString()
  });
}
