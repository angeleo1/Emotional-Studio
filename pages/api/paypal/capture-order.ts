import { NextApiRequest, NextApiResponse } from 'next';
import { isBookingEnabled } from '../../../config/booking';
import { getPayPalAccessToken } from '../../../lib/paypal-server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // booking이 비활성화된 경우 에러 반환
  if (!isBookingEnabled()) {
    return res.status(503).json({ 
      error: 'Booking service is temporarily unavailable',
      message: 'Booking service is temporarily unavailable'
    });
  }

  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'orderID is required'
      });
    }

    // PayPal 액세스 토큰 가져오기
    const accessToken = await getPayPalAccessToken();

    // PayPal 주문 캡처
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal capture error:', errorData);
      throw new Error(`PayPal capture error: ${errorData.message || 'Unknown error'}`);
    }

    const captureData = await response.json();

    return res.status(200).json({
      success: true,
      captureData,
    });

  } catch (error) {
    console.error('PayPal capture error:', error);
    return res.status(500).json({ 
      error: 'Failed to capture PayPal order',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
