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
    const { bookingData, amount, currency = 'AUD' } = req.body;

    if (!bookingData || !amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'bookingData and amount are required'
      });
    }

    // PayPal 주문 생성
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: `Emotional Studio Photography Session - ${bookingData.name}`,
          custom_id: `ES${Date.now()}`,
          soft_descriptor: 'Emotional Studio',
        },
      ],
      application_context: {
        brand_name: 'Emotional Studio',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${req.headers.origin || 'https://www.emotionalstudios.com.au'}/booking-success`,
        cancel_url: `${req.headers.origin || 'https://www.emotionalstudios.com.au'}/booking-cancel`,
      },
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'Emotional Studio',
            locale: 'en-AU',
            landing_page: 'NO_PREFERENCE',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: `${req.headers.origin || 'https://www.emotionalstudios.com.au'}/booking-success`,
            cancel_url: `${req.headers.origin || 'https://www.emotionalstudios.com.au'}/booking-cancel`,
          },
        },
      },
    };

    // PayPal 액세스 토큰 가져오기
    const accessToken = await getPayPalAccessToken();

    // PayPal API 호출
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `ES${Date.now()}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayPal API Error:', errorText);
      let errorMessage = 'Unknown error';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(`PayPal API Error: ${errorMessage}`);
    }

    const order = await response.json();

    return res.status(200).json({
      success: true,
      orderId: order.id,
      orderData: order,
    });

  } catch (error) {
    console.error('PayPal order creation error:', error);
    return res.status(500).json({ 
      error: 'Failed to create PayPal order',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
