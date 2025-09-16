import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBookings, clearAllBookings } from '../../lib/bookingStorage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { action } = req.query;
    
    if (action === 'clear') {
      clearAllBookings();
      return res.status(200).json({ message: 'All bookings cleared' });
    }
    
    const bookings = getAllBookings();
    res.status(200).json({
      message: 'Booking storage debug info',
      totalBookings: bookings.length,
      bookings: bookings,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in debug-booking-storage:', error);
    res.status(500).json({ 
      message: 'Error accessing booking storage',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
