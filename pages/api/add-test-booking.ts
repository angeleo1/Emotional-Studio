import { NextApiRequest, NextApiResponse } from 'next';
import { saveBooking, clearAllBookings } from '../../lib/bookingStorage';
import { clearAvailabilityCache } from './check-availability-v2';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 기존 예약 모두 삭제
    clearAllBookings();

    // 테스트 예약 추가 (17일 12:30)
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

    saveBooking(testBooking);
    clearAvailabilityCache();

    res.status(200).json({ 
      message: 'Test booking added successfully', 
      booking: testBooking 
    });
  } catch (error) {
    console.error('Error adding test booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}