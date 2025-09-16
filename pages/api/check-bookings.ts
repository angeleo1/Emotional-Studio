import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBookings } from '../../lib/bookingStorageSupabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bookings = await getAllBookings();
    console.log('=== 모든 예약 조회 ===');
    console.log('Total bookings:', bookings.length);
    console.log('All bookings:', bookings);
    
    // 2025-09-17 12:30 예약 확인
    const targetBooking = bookings.find(b => 
      b.date === '2025-09-17' && b.time === '12:30'
    );
    
    console.log('2025-09-17 12:30 예약:', targetBooking);
    
    res.status(200).json({
      message: 'All bookings retrieved',
      totalBookings: bookings.length,
      bookings: bookings,
      targetBooking: targetBooking
    });
  } catch (error) {
    console.error('Error retrieving all bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}