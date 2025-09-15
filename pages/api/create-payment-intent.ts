import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { isBookingEnabled } from '../../config/booking';

// Stripe 객체는 런타임에 생성

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('=== Payment Intent API Called ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Body type:', typeof req.body);
  console.log('Body stringified:', JSON.stringify(req.body));
  console.log('Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY);
  console.log('Booking enabled:', isBookingEnabled());

  // Stripe 환경변수 체크
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log('Stripe not configured - missing STRIPE_SECRET_KEY');
    return res.status(503).json({ 
      error: 'Payment service is not configured',
      message: 'Payment service is temporarily unavailable'
    });
  }

  // Stripe 객체 생성
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });

  // booking이 비활성화된 경우 에러 반환
  if (!isBookingEnabled()) {
    console.log('Booking is disabled');
    return res.status(503).json({ 
      error: 'Booking service is temporarily unavailable',
      message: 'Booking service is temporarily unavailable'
    });
  }
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    console.log('Request headers:', req.headers);
    console.log('Request URL:', req.url);
    return res.status(405).json({ 
      error: 'Method not allowed',
      receivedMethod: req.method,
      expectedMethod: 'POST',
      url: req.url
    });
  }

  try {
    const { amount, currency = 'aud' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amount',
        message: 'Amount must be greater than 0'
      });
    }

    // 최소 금액 검증 (테스트용 $1 허용)
    if (amount < 1 && amount !== 1) {
      return res.status(400).json({ 
        error: 'Amount too low',
        message: 'Minimum amount is $1'
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always'
      },
      metadata: {
        source: 'emotional-studio-booking',
        amount: amount.toString(),
        currency: currency
      },
      description: `Emotional Studio Booking - $${amount} AUD`,
    });

    console.log('Payment Intent created:', paymentIntent.id);

    const responseData = {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
    
    console.log('Sending response data:', responseData);
    console.log('Response data stringified:', JSON.stringify(responseData));

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Stripe error:', error);
    
    // 에러 응답을 JSON으로 명확히 반환
    const errorResponse = {
      error: 'Failed to create payment intent',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    };
    
    console.log('Sending error response:', errorResponse);
    return res.status(500).json(errorResponse);
  }
}
