import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing Stripe connection...');
    console.log('Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('Stripe Secret Key length:', process.env.STRIPE_SECRET_KEY?.length);
    console.log('Stripe Secret Key starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 10));

    // 간단한 Stripe API 호출 테스트
    const account = await stripe.accounts.retrieve();
    
    res.status(200).json({
      success: true,
      message: 'Stripe connection successful',
      account: {
        id: account.id,
        country: account.country,
        type: account.type,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
      }
    });
  } catch (error) {
    console.error('Stripe connection test failed:', error);
    
    res.status(500).json({
      success: false,
      message: 'Stripe connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}



























