import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY is not set',
      hasKey: false
    });
  }

  try {
    // List available models
    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      return res.status(500).json({ 
        error: 'Failed to list models',
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        errorData: errorData
      });
    }

    const data = await apiResponse.json();
    const models = data.models || [];

    return res.status(200).json({ 
      success: true,
      hasKey: true,
      models: models.map((m: any) => ({
        name: m.name,
        displayName: m.displayName,
        supportedGenerationMethods: m.supportedGenerationMethods,
        description: m.description
      })),
      totalModels: models.length
    });
  } catch (error: any) {
    return res.status(500).json({ 
      error: 'Failed to list models',
      errorMessage: error?.message,
      errorDetails: error?.toString()
    });
  }
}

