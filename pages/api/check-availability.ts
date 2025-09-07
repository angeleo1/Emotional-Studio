import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { isBookingEnabled } from '../../config/booking';

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

    // JSON 파일에서 예약 데이터 읽기
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    
    if (!fs.existsSync(bookingsPath)) {
      return res.status(200).json({ 
        availableTimes: getAvailableTimes(),
        bookedTimes: []
      });
    }

    const bookingsData = JSON.parse(fs.readFileSync(bookingsPath, 'utf8'));
    
    // 해당 날짜의 예약된 시간 찾기
    const bookedTimes = bookingsData.bookings
      .filter((booking: any) => booking.date === date && booking.status === 'confirmed')
      .map((booking: any) => booking.time);

    // 사용 가능한 시간 계산
    const allTimes = getAvailableTimes();
    const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));

    res.status(200).json({
      availableTimes,
      bookedTimes
    });

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