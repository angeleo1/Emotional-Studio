import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('=== Payment Session API Called ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);

  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST method is allowed'
    });
  }

  try {
    const { bookingData, amount, currency = 'aud' } = req.body;

    if (!bookingData || !amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'bookingData and amount are required'
      });
    }

    // Stripe Checkout Session 생성
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link', 'wechat_pay', 'alipay'],
      payment_method_options: {
        wechat_pay: {
          client: 'web'
        }
      },
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Emotional Studio Photography Session',
              description: `Photography session for ${bookingData.name}`,
            },
            unit_amount: Math.round(amount * 100), // 센트 단위
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://www.emotionalstudios.com.au'}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://www.emotionalstudios.com.au'}/booking-cancel`,
      metadata: {
        bookingId: `ES${Date.now()}`,
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        sessionDate: bookingData.date,
        sessionTime: bookingData.time,
        shootingType: bookingData.shootingType,
        totalAmount: amount.toString(),
      },
      customer_email: bookingData.email,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    console.log('Checkout Session created:', session.id);

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ 
      error: 'Payment session creation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
