import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    
    const result = await model.generateContent("Say hello in one sentence");
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ 
      success: true,
      hasKey: true,
      keyLength: apiKey.length,
      response: text,
      message: 'Gemini API is working correctly'
    });
  } catch (error: any) {
    return res.status(500).json({ 
      error: 'Gemini API test failed',
      hasKey: true,
      keyLength: apiKey.length,
      errorMessage: error?.message,
      errorDetails: error?.toString()
    });
  }
}

