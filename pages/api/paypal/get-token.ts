import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // PayPal 액세스 토큰 요청
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_AU',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
      auth: {
        username: process.env.PAYPAL_CLIENT_ID!,
        password: process.env.PAYPAL_CLIENT_SECRET!,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayPal token error:', errorText);
      let errorMessage = 'Unknown error';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error_description || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(`PayPal token error: ${errorMessage}`);
    }

    const tokenData = await response.json();

    return res.status(200).json({
      success: true,
      accessToken: tokenData.access_token,
      tokenType: tokenData.token_type,
      expiresIn: tokenData.expires_in,
    });

  } catch (error) {
    console.error('PayPal token error:', error);
    return res.status(500).json({ 
      error: 'Failed to get PayPal token',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

