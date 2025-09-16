import { NextApiRequest, NextApiResponse } from 'next';
import { sendBookingEmails } from '../../lib/emailService';
import { clearAvailabilityCache } from './check-availability-v2';
import { saveBooking } from '../../lib/bookingStorageSupabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('=== send-booking-emails-v2 API 호출됨 ===');
    const { bookingData } = req.body;
    console.log('받은 bookingData:', bookingData);

    if (!bookingData) {
      console.error('Booking data가 없습니다');
      return res.status(400).json({ message: 'Booking data is required' });
    }

    console.log('부킹 데이터 저장 시작...');
    // 부킹 데이터를 Supabase에 저장
    await saveBooking(bookingData);
    console.log('부킹 데이터 저장 완료');

    // 캐시 제거됨 - 실시간 데이터 사용

    console.log('이메일 전송 시작...');
    // 이메일 전송
    const emailResults = await sendBookingEmails(bookingData);
    console.log('이메일 전송 결과:', emailResults);

    res.status(200).json({ 
      message: 'Booking processed successfully',
      bookingId: bookingData.bookingId,
      emailResults
    });

  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ 
      message: 'Error processing booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

