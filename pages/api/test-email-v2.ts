import { NextApiRequest, NextApiResponse } from 'next';
import { sendBookingEmails } from '../../lib/emailService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 테스트용 부킹 데이터
    const testBookingData = {
      bookingId: `TEST${Date.now()}`,
      name: '테스트 사용자',
      email: 'test@example.com',
      phone: '0400000000',
      date: '2025-01-15',
      time: '14:00',
      shootingType: '1person',
      colorOption: true,
      a4print: false,
      a4frame: false,
      digital: true,
      additionalRetouch: 0,
      message: '테스트 예약입니다.',
      totalAmount: 95
    };

    console.log('Testing email sending with data:', testBookingData);

    // 이메일 전송 테스트
    const emailResults = await sendBookingEmails(testBookingData);

    res.status(200).json({
      message: 'Email test completed',
      testData: testBookingData,
      emailResults
    });

  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({
      message: 'Email test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
