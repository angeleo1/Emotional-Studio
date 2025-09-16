import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getBookedTimesForDate } from '../../lib/bookingStorageSupabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  // Stripe 환경변수 체크
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
  console.log('All env keys:', Object.keys(process.env));
  console.log('STRIPE_SECRET_KEY:', stripeSecretKey ? 'EXISTS' : 'NOT_FOUND');
  console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'EXISTS' : 'NOT_FOUND');
  
  if (!stripeSecretKey) {
    console.log('Stripe not configured - missing STRIPE_SECRET_KEY');
    return res.status(503).json({ 
      error: 'Payment service is not configured',
      message: 'Payment service is temporarily unavailable'
    });
  }

  // Stripe 객체 생성
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  try {
    const { bookingData, amount, currency = 'aud' } = req.body;

    if (!bookingData || !amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'bookingData and amount are required'
      });
    }

    // 실시간 중복 예약 체크
    console.log('=== 중복 예약 체크 시작 ===');
    console.log('체크할 날짜:', bookingData.date);
    console.log('체크할 시간:', bookingData.time);
    
    const bookedTimes = await getBookedTimesForDate(bookingData.date);
    console.log('이미 예약된 시간들:', bookedTimes);
    
    if (bookedTimes.includes(bookingData.time)) {
      console.log('❌ 중복 예약 감지됨!');
      return res.status(409).json({
        error: 'Time slot already booked',
        message: 'This time slot is no longer available. Please select a different time.',
        code: 'TIME_SLOT_UNAVAILABLE',
        availableTimes: bookedTimes
      });
    }
    
    console.log('✅ 예약 가능한 시간 확인됨');
    console.log('=== 중복 예약 체크 완료 ===');

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
            unit_amount: Math.round(amount * 100),
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