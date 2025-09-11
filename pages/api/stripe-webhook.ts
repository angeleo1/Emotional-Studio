import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Resend } from 'resend';

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
          to: [process.env.CONTACT_EMAIL || 'angeleo9691@gmail.com'],
          subject: `New Booking #${bookingData.bookingId}`,
          html: `
            <h2>New Booking Confirmation</h2>
            <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
            <p><strong>Payment Intent ID:</strong> ${bookingData.paymentIntentId}</p>
            <p><strong>Payment Status:</strong> ${bookingData.paymentStatus}</p>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>People:</strong> ${bookingData.shootingType}</p>
            <p><strong>Additional Options:</strong></p>
            <ul>
              ${bookingData.colorOption ? '<li>Color Option (+$10)</li>' : ''}
              ${bookingData.a4print ? '<li>4x6" Print (+$10)</li>' : ''}
              ${bookingData.a4frame ? '<li>4x6" Frame (+$15)</li>' : ''}
              ${bookingData.digital ? '<li>Original Digital Film (+$20)</li>' : ''}
              ${bookingData.additionalRetouch > 0 ? `<li>Additional Retouch: ${bookingData.additionalRetouch} (+$${bookingData.additionalRetouch * 15})</li>` : ''}
            </ul>
            ${bookingData.message ? `<p><strong>Message:</strong> ${bookingData.message}</p>` : ''}
            <p><strong>Total Amount:</strong> $${bookingData.totalAmount}</p>
          `
        });

        // 고객에게도 확인 이메일 전송
        await resend.emails.send({
          from: 'Emotional Studio <noreply@emotionalstudio.com>',
          to: [bookingData.email],
          subject: `Booking Confirmation #${bookingData.bookingId}`,
          html: `
            <h2>Thank you for your booking!</h2>
            <p>Dear ${bookingData.name},</p>
            <p>Your booking has been confirmed. Here are the details:</p>
            <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>People:</strong> ${bookingData.shootingType}</p>
            <p><strong>Total Amount:</strong> $${bookingData.totalAmount}</p>
            <p>We look forward to seeing you at Emotional Studio!</p>
            <p>Best regards,<br>Emotional Studio Team</p>
          `
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
