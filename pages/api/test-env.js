export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 임시로 직접 API 키 설정 (테스트용)
  const apiKey = process.env.RESEND_API_KEY || 're_6nW7eXkK_JwQHw7MiTwVwNYqgDRFHQJFu';

  const debugInfo = {
    timestamp: new Date().toISOString(),
    resendApiKey: {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      firstChars: apiKey?.substring(0, 10) || 'N/A',
      lastChars: apiKey?.substring(-10) || 'N/A',
      fromEnv: !!process.env.RESEND_API_KEY,
      fromFallback: !process.env.RESEND_API_KEY && !!apiKey
    },
    environment: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
    allEnvVars: Object.keys(process.env).filter(key => key.includes('RESEND') || key.includes('EMAIL'))
  };

  res.status(200).json(debugInfo);
} 