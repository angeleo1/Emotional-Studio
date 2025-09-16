import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBookings } from '../../lib/bookingStorage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const allBookings = getAllBookings();
    
    res.status(200).json({
      message: 'All bookings retrieved',
      totalBookings: allBookings.length,
      bookings: allBookings
    });
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ 
      message: 'Error getting bookings',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
