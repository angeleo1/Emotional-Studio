import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      shootingType, 
      colorOption, 
      otherGoods,
      formData 
    } = req.body;

    // 기본 패키지 가격 계산
    let basePrice = 0;
    switch (shootingType) {
      case 'solo':
        basePrice = 5500; // $55.00 in cents
        break;
      case 'couple':
        basePrice = 9800; // $98.00 in cents
        break;
      case 'triple':
        basePrice = 15000; // $150.00 in cents
        break;
      case 'more':
        basePrice = 15000; // 기본값, 나중에 수동 조정
        break;
      default:
        return res.status(400).json({ message: 'Invalid shooting type' });
    }

    // 추가 옵션 가격 계산
    let additionalCost = 0;
    if (colorOption) additionalCost += 1000; // $10.00
    if (otherGoods.a4print) additionalCost += 1000; // $10.00
    if (otherGoods.a4frame) additionalCost += 1500; // $15.00
    if (otherGoods.digital) additionalCost += 2000; // $20.00
    if (otherGoods.calendar) additionalCost += 4500; // $45.00

    const totalAmount = basePrice + additionalCost;

    // Stripe 결제 인텐트 생성
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'aud',
      metadata: {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shootingType: shootingType,
        date: formData.date ? formData.date.toLocaleDateString() : 'Not selected',
        time: formData.time || 'Not selected',
        colorOption: colorOption ? 'Yes' : 'No',
        a4print: otherGoods.a4print ? 'Yes' : 'No',
        a4frame: otherGoods.a4frame ? 'Yes' : 'No',
        digital: otherGoods.digital ? 'Yes' : 'No',
        calendar: otherGoods.calendar ? 'Yes' : 'No',
        message: formData.message || 'No additional information'
      },
      description: `Emotional Studios Booking - ${shootingType} session`,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount,
      currency: 'aud'
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
} 