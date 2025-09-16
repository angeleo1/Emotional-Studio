import { NextApiRequest, NextApiResponse } from 'next';
import { saveBooking } from '../../lib/bookingStorage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 2025년 9월 17일 12:30에 테스트 예약 추가
    const testBooking = {
      bookingId: `ES${Date.now()}`,
      name: '테스트 예약',
      email: 'test@example.com',
      phone: '0400000000',
      date: '2025-09-17',
      time: '12:30',
      shootingType: '1person',
      colorOption: true,
      a4print: false,
      a4frame: false,
      digital: true,
      additionalRetouch: 0,
      message: '테스트 예약입니다.',
      totalAmount: '95',
      paymentStatus: 'completed',
      paymentIntentId: 'test_payment_intent'
    };

    saveBooking(testBooking);

    res.status(200).json({
      message: 'Test booking added successfully',
      booking: testBooking
    });
  } catch (error) {
    console.error('Error adding test booking:', error);
    res.status(500).json({ 
      message: 'Error adding test booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
