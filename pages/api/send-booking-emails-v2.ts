import { NextApiRequest, NextApiResponse } from 'next';
import { sendBookingEmails } from '../../lib/emailService';
import { clearAvailabilityCache } from './check-availability-v2';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { bookingData } = req.body;

    if (!bookingData) {
      return res.status(400).json({ message: 'Booking data is required' });
    }

    // 부킹 데이터를 JSON 파일에 저장
    await saveBookingToFile(bookingData);

    // 예약 가능 시간 캐시 클리어 (실시간 업데이트)
    clearAvailabilityCache();

    // 이메일 전송
    const emailResults = await sendBookingEmails(bookingData);

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

// 부킹 데이터를 JSON 파일에 저장하는 함수
async function saveBookingToFile(bookingData: any) {
  try {
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    
    let bookingsData = { bookings: [] };
    
    // 기존 데이터가 있으면 읽기
    if (fs.existsSync(bookingsPath)) {
      const existingData = fs.readFileSync(bookingsPath, 'utf8');
      bookingsData = JSON.parse(existingData);
    }
    
    // 새 부킹 데이터 추가
    const newBooking = {
      ...bookingData,
      id: bookingData.bookingId,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    bookingsData.bookings.push(newBooking);
    
    // 파일에 저장
    fs.writeFileSync(bookingsPath, JSON.stringify(bookingsData, null, 2));
    
    console.log('Booking data saved successfully:', bookingData.bookingId);
  } catch (error) {
    console.error('Error saving booking data:', error);
    throw error;
  }
}
