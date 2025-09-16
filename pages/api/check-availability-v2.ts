import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { isBookingEnabled } from '../../config/booking';

// 메모리 캐시 (개발 환경에서만 사용)
let availabilityCache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 30000; // 30초

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // booking이 비활성화된 경우 에러 반환
  if (!isBookingEnabled()) {
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
    
    if (!date || typeof date !== 'string') {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    // 캐시 확인
    const cacheKey = `availability_${date}`;
    const cached = availabilityCache[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Returning cached availability data for:', date);
      return res.status(200).json(cached.data);
    }

    // JSON 파일에서 예약 데이터 읽기
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    
    if (!fs.existsSync(bookingsPath)) {
      const result = { 
        availableTimes: getAvailableTimes(),
        bookedTimes: [],
        lastUpdated: new Date().toISOString()
      };
      
      // 캐시에 저장
      availabilityCache[cacheKey] = {
        data: result,
        timestamp: Date.now()
      };
      
      return res.status(200).json(result);
    }

    const bookingsData = JSON.parse(fs.readFileSync(bookingsPath, 'utf8'));
    
    // 해당 날짜의 예약된 시간 찾기 (확인된 예약만)
    const bookedTimes = bookingsData.bookings
      .filter((booking: any) => {
        // 날짜 형식 통일 (YYYY-MM-DD)
        const bookingDate = new Date(booking.date).toISOString().split('T')[0];
        const queryDate = new Date(date).toISOString().split('T')[0];
        
        return bookingDate === queryDate && 
               (booking.status === 'confirmed' || booking.status === 'completed');
      })
      .map((booking: any) => booking.time);

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

    // 캐시에 저장
    availabilityCache[cacheKey] = {
      data: result,
      timestamp: Date.now()
    };

    console.log(`Availability check for ${date}: ${availableTimes.length}/${allTimes.length} slots available`);

    res.status(200).json(result);

  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Internal server error' });
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

// 캐시 클리어 함수 (필요시 사용)
export function clearAvailabilityCache() {
  availabilityCache = {};
  console.log('Availability cache cleared');
}
