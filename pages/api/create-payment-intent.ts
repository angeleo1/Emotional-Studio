import { NextApiRequest, NextApiResponse } from 'next';
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
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  
  // booking이 비활성화된 경우 에러 반환
  if (!isBookingEnabled()) {
    console.log('Booking is disabled');
    return res.status(503).json({ 
      message: 'Booking service is temporarily unavailable',
      code: 'BOOKING_DISABLED'
    });
  }
  
  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'aud' } = req.body;
    console.log('Amount:', amount, 'Currency:', currency);
    console.log('Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('Stripe Secret Key length:', process.env.STRIPE_SECRET_KEY?.length);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always',
      },
      metadata: {
        // Add any additional metadata you want to track
        booking_type: 'photo_session',
      },
    });

    console.log('PaymentIntent created successfully:', paymentIntent.id);
    console.log('Client secret:', paymentIntent.client_secret);
    
    const responseData = {
      clientSecret: paymentIntent.client_secret,
    };
    
    console.log('Sending response:', responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    // Stripe 에러인 경우 더 자세한 정보 제공
    if (error instanceof Error && error.message.includes('stripe')) {
      console.error('Stripe error detected');
    }
    
    res.status(500).json({ 
      message: 'Error creating payment intent',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
} 