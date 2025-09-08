const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

module.exports = async function handler(req, res) {
  console.log('=== API Called ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'aud' } = req.body;
    console.log('Amount:', amount, 'Currency:', currency);

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always'
      },
    });

    console.log('PaymentIntent created:', paymentIntent.id);
    
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to create payment intent',
      message: error.message
    });
  }
}