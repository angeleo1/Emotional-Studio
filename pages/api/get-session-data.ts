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
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    // Stripe 세션 정보 가져오기
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent', 'line_items']
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // 부킹 데이터 추출
    const bookingData = {
      name: session.customer_details?.name || session.metadata?.customerName || 'Unknown',
      email: session.customer_details?.email || session.metadata?.customerEmail || 'Unknown',
      phone: session.customer_details?.phone || session.metadata?.customerPhone || 'Unknown',
      date: session.metadata?.sessionDate || 'Unknown',
      time: session.metadata?.sessionTime || 'Unknown',
      shootingType: session.metadata?.shootingType || 'Unknown',
      colorOption: session.metadata?.colorOption === 'true',
      a4print: session.metadata?.a4print === 'true',
      a4frame: session.metadata?.a4frame === 'true',
      digital: session.metadata?.digital === 'true',
      calendar: session.metadata?.calendar === 'true',
      additionalRetouch: parseInt(session.metadata?.additionalRetouch || '0'),
      message: session.metadata?.message || '',
      totalAmount: session.amount_total ? (session.amount_total / 100).toFixed(2) : '0',
      paymentStatus: session.payment_status,
      paymentIntentId: session.payment_intent?.id || session.id,
    };

    const bookingId = `ES${Date.now()}`;

    res.status(200).json({
      bookingId,
      sessionId: session_id,
      status: 'completed',
      bookingData,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
      }
    });

  } catch (error) {
    console.error('Error fetching session data:', error);
    res.status(500).json({ 
      message: 'Error fetching session data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
