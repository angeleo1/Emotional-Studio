import { NextApiRequest, NextApiResponse } from 'next';
import { isBookingEnabled } from '../../config/booking';
import { getBookedTimesForDate, getAllBookings } from '../../lib/bookingStorageSupabase';

// 캐시 제거 - 항상 실시간 데이터 사용

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== check-availability-v2 API 호출됨 ===');
  
  // booking이 비활성화된 경우 에러 반환
  if (!isBookingEnabled()) {
    console.log('Booking is disabled');
    return res.status(503).json({ 
      message: 'Booking service is temporarily unavailable',
      code: 'BOOKING_DISABLED'
    });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { date } = req.query;
    console.log('Checking availability for date:', date);
    
    if (!date || typeof date !== 'string') {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    // 캐시 제거 - 항상 실시간 데이터 사용

    // Supabase에서 예약된 시간 조회 (실시간)
    const bookedTimes = await getBookedTimesForDate(date);
    console.log('Booked times from Supabase:', bookedTimes);
    console.log('Query date:', date);
    const allBookings = await getAllBookings();
    console.log('All bookings in Supabase:', allBookings.length);

    // 사용 가능한 시간 계산
    const allTimes = getAvailableTimes();
    const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));

    const result = {
      availableTimes,
      bookedTimes,
      lastUpdated: new Date().toISOString(),
      totalBookings: bookedTimes.length,
      totalSlots: allTimes.length
    };

    // 캐시 제거 - 실시간 데이터만 사용

    console.log(`Availability check for ${date}: ${availableTimes.length}/${allTimes.length} slots available`);

    res.status(200).json(result);

  } catch (error) {
    console.error('Error checking availability:', error);
    
    // Supabase 연결 실패 시 서비스 비활성화
    if (error instanceof Error && error.message.includes('Supabase')) {
      console.log('Supabase connection failed, disabling booking service');
      return res.status(503).json({
        message: 'Booking service is temporarily unavailable due to database connection issues',
        code: 'DATABASE_CONNECTION_FAILED',
        availableTimes: [],
        bookedTimes: [],
        lastUpdated: new Date().toISOString(),
        totalBookings: 0,
        totalSlots: 0
      });
    }
    
    res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function getAvailableTimes() {
  return [
    '12:30',
    '13:00', 
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00'
  ];
}

// 캐시 제거됨 - 더 이상 필요 없음
export function clearAvailabilityCache() {
  console.log('Cache clearing not needed - using real-time data');
}
