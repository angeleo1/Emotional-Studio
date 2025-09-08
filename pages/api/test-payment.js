module.exports = async function handler(req, res) {
  console.log('=== Test Payment API Called ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'aud' } = req.body;
    
    res.status(200).json({
      success: true,
      message: 'Test payment API working',
      receivedData: { amount, currency }
    });
  } catch (error) {
    console.error('Error in test payment API:', error);
    res.status(500).json({ 
      error: 'Test payment API error',
      message: error.message
    });
  }
}
