export default function handler(req, res) {
  res.status(200).json({
    stripeKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Loaded' : 'Not loaded',
    stripeSecret: process.env.STRIPE_SECRET_KEY ? 'Loaded' : 'Not loaded',
    hasKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  });
} 