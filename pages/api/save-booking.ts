import { NextApiRequest, NextApiResponse } from 'next';
import { isBookingEnabled } from '../../config/booking';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // booking이 비활성화된 경우 에러 반환
  if (!isBookingEnabled()) {
    return res.status(503).json({ 
      message: 'Booking service is temporarily unavailable',
      code: 'BOOKING_DISABLED'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bookingData = req.body;
    console.log('Saving booking:', bookingData);

    // 여기서 실제로는 데이터베이스에 저장하거나 이메일을 보내는 등의 작업을 수행
    // 현재는 성공 응답만 반환
    res.status(200).json({ 
      message: 'Booking saved successfully',
      bookingId: Date.now().toString()
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking' });
  }
} 