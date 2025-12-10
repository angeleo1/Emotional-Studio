import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY is not set',
      hasKey: false,
      keyLength: 0
    });
  }

  try {
    // Use v1beta API endpoint with gemini-pro (most stable)
    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: 'Say hello in one sentence' }]
        }],
        generationConfig: {
          maxOutputTokens: 100,
          temperature: 0.7,
        },
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      return res.status(500).json({ 
        error: 'Gemini API test failed',
        hasKey: true,
        keyLength: apiKey.length,
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        errorData: errorData
      });
    }

    const data = await apiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    return res.status(200).json({ 
      success: true,
      hasKey: true,
      keyLength: apiKey.length,
      response: text,
      usedEndpoint: 'v1beta/models/gemini-pro',
      message: 'Gemini API is working correctly'
    });
  } catch (error: any) {
    return res.status(500).json({ 
      error: 'Gemini API test failed',
      hasKey: true,
      keyLength: apiKey.length,
      errorMessage: error?.message,
      errorDetails: error?.toString(),
      stack: error?.stack
    });
  }
}
