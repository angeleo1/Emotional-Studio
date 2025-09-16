// PayPal 서버 사이드 유틸리티

let accessToken: string | null = null;
let tokenExpiry: number = 0;

export async function getPayPalAccessToken(): Promise<string> {
  // 토큰이 아직 유효한 경우 기존 토큰 반환
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
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
      const errorData = await response.json();
      throw new Error(`PayPal token error: ${errorData.error_description || 'Unknown error'}`);
    }

    const tokenData = await response.json();
    
    // 토큰 저장 (만료 시간 5분 전에 갱신)
    accessToken = tokenData.access_token;
    tokenExpiry = Date.now() + (tokenData.expires_in - 300) * 1000;

    return accessToken;
  } catch (error) {
    console.error('PayPal token error:', error);
    throw error;
  }
}


