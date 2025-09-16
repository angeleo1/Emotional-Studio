import { NextApiRequest, NextApiResponse } from 'next';
import { saveBooking } from '../../lib/bookingStorageSupabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('=== 테스트 예약 추가 시작 ===');
    
    const testBooking = {
      bookingId: `TEST${Date.now()}`,
      name: 'Test User',
      email: 'test@example.com',
      phone: '0412345678',
      date: '2025-09-17',
      time: '12:30',
      shootingType: '1person',
      colorOption: false,
      a4print: false,
      a4frame: false,
      digital: true,
      additionalRetouch: 1,
      message: 'This is a test booking for 17th 12:30',
      totalAmount: '80',
      paymentStatus: 'completed',
      paymentIntentId: 'test_pi_12345',
      status: 'confirmed'
    };

    console.log('테스트 예약 데이터:', testBooking);
    
    await saveBooking(testBooking);
    console.log('테스트 예약 저장 완료');

    res.status(200).json({ 
      message: 'Test booking added successfully', 
      booking: testBooking 
    });
  } catch (error) {
    console.error('Error adding test booking:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
