import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle payment success event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      // Send booking confirmation email to admin
      const emailData = {
        name: paymentIntent.metadata.customerName,
        email: paymentIntent.metadata.customerEmail,
        message: `
🎉 **PAYMENT SUCCESSFUL - BOOKING CONFIRMED** 🎉

Payment Details:
- Amount: $${(paymentIntent.amount / 100).toFixed(2)} AUD
- Payment ID: ${paymentIntent.id}
- Status: ${paymentIntent.status}

Booking Details:
- Customer Name: ${paymentIntent.metadata.customerName}
- Customer Email: ${paymentIntent.metadata.customerEmail}
- Customer Phone: ${paymentIntent.metadata.customerPhone}
- Shooting Type: ${paymentIntent.metadata.shootingType}
- Date: ${paymentIntent.metadata.date}
- Time: ${paymentIntent.metadata.time}

Options & Goods:
- Colour Option: ${paymentIntent.metadata.colorOption}
- A4 Print: ${paymentIntent.metadata.a4print}
- A4 Frame: ${paymentIntent.metadata.a4frame}
- Original Digital Film: ${paymentIntent.metadata.digital}
- Calendar: ${paymentIntent.metadata.calendar}

Additional Information:
${paymentIntent.metadata.message}

---
This booking has been automatically confirmed after successful payment.
        `,
        type: 'email'
      };

      // Send email through Resend
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/pusher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send confirmation email');
      }

    } catch (error) {
      console.error('Error processing payment success:', error);
    }
  }

  res.status(200).json({ received: true });
} 