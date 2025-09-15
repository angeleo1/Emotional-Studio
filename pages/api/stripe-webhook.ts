import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { generateBookingEmail, generateCustomerConfirmationEmail } from '../../utils/emailTemplates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const resend = new Resend(process.env.RESEND_API_KEY);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ message: 'Invalid signature' });
  }

  console.log('Webhook event received:', event.type);

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Checkout session completed:', session.id);
      console.log('Session metadata:', session.metadata);

      // 예약 데이터 추출
      const bookingData = {
        bookingId: session.metadata?.bookingId || `ES${Date.now()}`,
        paymentIntentId: session.payment_intent,
        paymentStatus: 'succeeded',
        name: session.metadata?.customerName || '',
        email: session.customer_email || session.metadata?.customerEmail || '',
        phone: session.metadata?.customerPhone || '',
        date: session.metadata?.sessionDate || '',
        time: session.metadata?.sessionTime || '',
        shootingType: session.metadata?.shootingType || '',
        colorOption: session.metadata?.colorOption === 'true',
        a4print: session.metadata?.a4print === 'true',
        a4frame: session.metadata?.a4frame === 'true',
        digital: session.metadata?.digital === 'true',
        additionalRetouch: parseInt(session.metadata?.additionalRetouch || '0'),
        message: session.metadata?.message || '',
        totalAmount: parseFloat(session.metadata?.totalAmount || '0'),
      };

      console.log('Processed booking data:', bookingData);

      // 이메일로 예약 정보 전송
      try {
        await resend.emails.send({
          from: 'Emotional Studio <noreply@emotionalstudio.com>',
          to: ['admin@emotionalstudios.com.au'],
          subject: `🎉 New Booking #${bookingData.bookingId} - ${bookingData.name}`,
          html: generateBookingEmail(bookingData)
        });

        // 고객에게도 확인 이메일 전송
        await resend.emails.send({
          from: 'Emotional Studio <noreply@emotionalstudio.com>',
          to: [bookingData.email],
          subject: `✅ Booking Confirmed #${bookingData.bookingId} - ${new Date(bookingData.date).toLocaleDateString()}`,
          html: generateCustomerConfirmationEmail(bookingData)
        });

        console.log('Booking confirmation emails sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // 이메일 전송 실패해도 예약은 성공으로 처리
      }

      console.log('Booking processed successfully:', bookingData.bookingId);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ message: 'Webhook processing failed' });
  }
}

// Next.js API route body parsing을 비활성화
export const config = {
  api: {
    bodyParser: false,
  },
};
