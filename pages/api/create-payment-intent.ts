import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('=== Payment Intent API Called ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'aud' } = req.body;
    console.log('Amount:', amount, 'Currency:', currency);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      automatic_payment_methods: {
        enabled: false, // Link 결제 방식 비활성화
      },
      payment_method_types: ['card'], // 카드 결제만 허용
      metadata: {
        // Add any additional metadata you want to track
        booking_type: 'photo_session',
      },
    });

    console.log('PaymentIntent created successfully:', paymentIntent.id);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Error creating payment intent' });
  }
} 