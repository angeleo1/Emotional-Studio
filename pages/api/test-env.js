export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 환경변수가 로드되지 않으면 직접 설정
  if (!process.env.RESEND_API_KEY) {
    process.env.RESEND_API_KEY = 're_6nW7eXkK_JwQHw7MiTwVwNYqgDRFHQJFu';
    process.env.CONTACT_EMAIL = 'admin@emotionalstudios.com.au';
  }

  // 환경변수 로딩 시도
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  // 더 자세한 디버깅 정보
  const debugInfo = {
    timestamp: new Date().toISOString(),
    resendApiKey: {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      firstChars: apiKey?.substring(0, 10) || 'N/A',
      lastChars: apiKey?.substring(-10) || 'N/A',
      fromEnv: !!process.env.RESEND_API_KEY,
      fromFallback: false
    },
    environment: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
    allEnvVars: Object.keys(process.env).filter(key => key.includes('RESEND') || key.includes('EMAIL')),
    // 추가 디버깅 정보
    processEnvKeys: Object.keys(process.env).slice(0, 20), // 처음 20개 키만
    resendApiKeyValue: process.env.RESEND_API_KEY ? 'EXISTS' : 'UNDEFINED',
    contactEmailValue: process.env.CONTACT_EMAIL ? 'EXISTS' : 'UNDEFINED',
    // 새로운 디버깅 정보
    nodeEnv: process.env.NODE_ENV,
    hasEnvFile: !!process.env.RESEND_API_KEY,
    envFileContent: process.env.RESEND_API_KEY ? 'LOADED' : 'NOT_LOADED'
  };

  res.status(200).json(debugInfo);
} 