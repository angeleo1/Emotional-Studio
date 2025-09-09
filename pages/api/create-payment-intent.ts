import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { isBookingEnabled } from '../../config/booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('=== Payment Intent API Called ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY);
  console.log('Booking enabled:', isBookingEnabled());

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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'aud' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always'
      },
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ 
      error: 'Failed to create payment intent',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
