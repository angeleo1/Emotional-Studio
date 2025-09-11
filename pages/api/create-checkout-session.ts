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
  console.log('=== Checkout Session API Called ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);

  // booking이 비활성화된 경우 에러 반환
  if (!isBookingEnabled()) {
    console.log('Booking is disabled');
    return res.status(503).json({ 
      error: 'Booking service is temporarily unavailable',
      message: 'Booking service is temporarily unavailable'
    });
  }
  
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      bookingData, 
      amount, 
      currency = 'aud' 
    } = req.body;

    if (!bookingData || !amount || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid booking data or amount',
        message: 'Booking data and amount are required'
      });
    }

    // 최소 금액 검증 (테스트용 $1 허용)
    if (amount < 1 && amount !== 1) {
      return res.status(400).json({ 
        error: 'Amount too low',
        message: 'Minimum amount is $1'
      });
    }

    // 총 금액 계산
    const totalAmount = calculateTotalAmount(bookingData);
    
    // Checkout Session 생성
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Emotional Studio Photography Session',
              description: generateSessionDescription(bookingData),
              images: [], // 필요시 이미지 추가
            },
            unit_amount: Math.round(totalAmount * 100), // 센트 단위
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/booking-cancel`,
      metadata: {
        bookingId: `ES${Date.now()}`,
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        sessionDate: bookingData.date,
        sessionTime: bookingData.time,
        shootingType: bookingData.shootingType,
        colorOption: bookingData.colorOption ? 'true' : 'false',
        a4print: bookingData.a4print ? 'true' : 'false',
        a4frame: bookingData.a4frame ? 'true' : 'false',
        digital: bookingData.digital ? 'true' : 'false',
        additionalRetouch: bookingData.additionalRetouch?.toString() || '0',
        message: bookingData.message || '',
        totalAmount: totalAmount.toString(),
      },
      customer_email: bookingData.email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: false, // 필요시 true로 변경
      },
    });

    console.log('Checkout Session created:', session.id);

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Stripe Checkout error:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// 총 금액 계산 함수
function calculateTotalAmount(bookingData: any) {
  let basePrice = 0;
  switch (bookingData.shootingType) {
    case 'test': basePrice = 1; break;
    case '1person': basePrice = 65; break;
    case '2people': basePrice = 130; break;
    case '3people': basePrice = 195; break;
    case '4people': basePrice = 260; break;
    default: basePrice = 0;
  }

  let additionalCost = 0;
  if (bookingData.colorOption) additionalCost += 10;
  if (bookingData.a4print) additionalCost += 10;
  if (bookingData.a4frame) additionalCost += 15;
  if (bookingData.digital) additionalCost += 20;
  if (bookingData.additionalRetouch) {
    additionalCost += (bookingData.additionalRetouch * 15);
  }

  return basePrice + additionalCost;
}

// 세션 설명 생성 함수
function generateSessionDescription(bookingData: any) {
  const peopleCount = {
    'test': 'Test Session',
    '1person': '1 Person',
    '2people': '2 People', 
    '3people': '3 People',
    '4people': '4 People'
  }[bookingData.shootingType] || 'Unknown';

  let description = `${peopleCount} Photography Session on ${bookingData.date} at ${bookingData.time}`;
  
  const options = [];
  if (bookingData.colorOption) options.push('Color Option');
  if (bookingData.a4print) options.push('4x6" Print');
  if (bookingData.a4frame) options.push('4x6" Frame');
  if (bookingData.digital) options.push('Digital Original');
  if (bookingData.additionalRetouch > 0) options.push(`${bookingData.additionalRetouch} Additional Retouch`);
  
  if (options.length > 0) {
    description += ` with ${options.join(', ')}`;
  }
  
  if (bookingData.message) {
    description += ` - ${bookingData.message}`;
  }
  
  return description;
}
