export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const debugInfo = {
    timestamp: new Date().toISOString(),
    resendApiKey: {
      exists: !!process.env.RESEND_API_KEY,
      length: process.env.RESEND_API_KEY?.length || 0,
      firstChars: process.env.RESEND_API_KEY?.substring(0, 10) || 'N/A',
      lastChars: process.env.RESEND_API_KEY?.substring(-10) || 'N/A'
    },
    environment: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
    allEnvVars: Object.keys(process.env).filter(key => key.includes('RESEND') || key.includes('EMAIL'))
  };

  res.status(200).json(debugInfo);
} 