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
    console.log('=== test-email-debug API 호출됨 ===');
    
    // 테스트 부킹 데이터
    const testBookingData = {
      bookingId: `TEST_${Date.now()}`,
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
      totalAmount: '95',
      paymentStatus: 'completed',
      paymentIntentId: 'test_payment_intent'
    };

    console.log('테스트 부킹 데이터:', testBookingData);
    console.log('환경변수 확인:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT_SET');
    console.log('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? 'SET' : 'NOT_SET');
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

    // 이메일 전송 테스트
    console.log('이메일 전송 시작...');
    const emailResults = await sendBookingEmails(testBookingData);
    console.log('이메일 전송 결과:', emailResults);

    res.status(200).json({
      message: 'Email test completed',
      testData: testBookingData,
      emailResults,
      envCheck: {
        EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'NOT_SET',
        EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? 'SET' : 'NOT_SET',
        CONTACT_EMAIL: process.env.CONTACT_EMAIL
      }
    });

  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({
      message: 'Email test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      envCheck: {
        EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'NOT_SET',
        EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? 'SET' : 'NOT_SET',
        CONTACT_EMAIL: process.env.CONTACT_EMAIL
      }
    });
  }
}
