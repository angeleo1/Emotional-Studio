export default function handler(req, res) {
  console.log('=== DEBUG PAYMENT API ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  
  // 모든 요청에 대해 200 응답
  res.status(200).json({
    success: true,
    method: req.method,
    timestamp: new Date().toISOString(),
    message: 'Debug API working'
  });
}
