import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBookings, getBookedTimesForDate } from '../../lib/bookingStorage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { date } = req.query;
    const allBookings = getAllBookings();
    
    console.log('=== DEBUG BOOKINGS ===');
    console.log('All bookings:', allBookings.length);
    console.log('All bookings details:', allBookings.map(b => ({
      id: b.bookingId,
      date: b.date,
      time: b.time,
      status: b.status,
      name: b.name
    })));
    
    if (date) {
      const bookedTimes = getBookedTimesForDate(date as string);
      console.log(`Booked times for ${date}:`, bookedTimes);
      
      res.status(200).json({
        message: 'Debug bookings info',
        totalBookings: allBookings.length,
        allBookings: allBookings,
        queryDate: date,
        bookedTimesForDate: bookedTimes
      });
    } else {
      res.status(200).json({
        message: 'Debug bookings info',
        totalBookings: allBookings.length,
        allBookings: allBookings
      });
    }
  } catch (error) {
    console.error('Error in debug-bookings:', error);
    res.status(500).json({ 
      message: 'Error retrieving bookings',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
