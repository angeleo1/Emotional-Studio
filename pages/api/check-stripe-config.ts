import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const config = {
    stripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
    stripePublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    resendApiKey: !!process.env.RESEND_API_KEY,
    contactEmail: !!process.env.CONTACT_EMAIL,
    bookingEnabled: process.env.NEXT_PUBLIC_BOOKING_ENABLED !== 'false',
  };

  const allConfigured = Object.values(config).every(Boolean);

  res.status(200).json({
    configured: allConfigured,
    config,
    message: allConfigured 
      ? 'All required environment variables are configured' 
      : 'Some environment variables are missing'
  });
}
