import { NextApiRequest, NextApiResponse } from 'next';
import { isBookingEnabled } from '../../config/booking';
import { Resend } from 'resend';
import { generateBookingEmail, generateCustomerConfirmationEmail } from '../../utils/emailTemplates';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 필수 필드 검증
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.date || !bookingData.time || !bookingData.shootingType) {
      return res.status(400).json({ 
        message: 'Missing required booking information',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }

    const bookingId = `ES${Date.now()}`;
    const totalAmount = bookingData.totalAmount || calculateTotalAmount(bookingData);
    
    // 부킹 데이터를 JSON 파일에 저장
    await saveBookingToFile({
      ...bookingData,
      bookingId,
      totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    });
    
    // 이메일로 예약 정보 전송
    try {
      console.log('Sending admin email to:', 'admin@emotionalstudios.com.au');
      console.log('Sending customer email to:', bookingData.email);
      
      const adminEmailResult = await resend.emails.send({
        from: 'Emotional Studio <noreply@emotionalstudio.com>',
        to: ['admin@emotionalstudios.com.au'],
        subject: `🎉 New Booking #${bookingId} - ${bookingData.name}`,
        html: generateBookingEmail({
          ...bookingData,
          bookingId,
          totalAmount
        })
      });
      console.log('Admin email sent:', adminEmailResult);

      // 고객에게도 확인 이메일 전송
      const customerEmailResult = await resend.emails.send({
        from: 'Emotional Studio <noreply@emotionalstudio.com>',
        to: [bookingData.email],
        subject: `✅ Booking Confirmed #${bookingId} - ${new Date(bookingData.date).toLocaleDateString()}`,
        html: generateCustomerConfirmationEmail({
          ...bookingData,
          bookingId,
          totalAmount
        })
      });
      console.log('Customer email sent:', customerEmailResult);
      
      console.log('All emails sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      console.error('Email error details:', JSON.stringify(emailError, null, 2));
      // 이메일 전송 실패해도 예약은 성공으로 처리
    }

    res.status(200).json({ 
      message: 'Booking saved successfully',
      bookingId: bookingId,
      totalAmount: totalAmount
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ 
      message: 'Error saving booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// 총 금액 계산 함수
function calculateTotalAmount(bookingData: any) {
  let basePrice = 0;
  switch (bookingData.shootingType) {
    case 'test': basePrice = 1; break;
    case '1person': basePrice = 65; break;
    case '2people': basePrice = 130; break;
    case '3people': basePrice = 195; break;
    case '4people': basePrice = 260; break;
    default: basePrice = 0;
  }

  let additionalCost = 0;
  if (bookingData.colorOption) additionalCost += 10;
  if (bookingData.a4print) additionalCost += 10;
  if (bookingData.a4frame) additionalCost += 15;
  if (bookingData.digital) additionalCost += 20;
  if (bookingData.additionalRetouch) {
    additionalCost += (bookingData.additionalRetouch * 15);
  }

  return basePrice + additionalCost;
}

// 부킹 데이터를 JSON 파일에 저장하는 함수
async function saveBookingToFile(bookingData: any) {
  try {
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    const dataDir = path.dirname(bookingsPath);
    
    // data 디렉토리가 없으면 생성
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    let bookingsData = { bookings: [] };
    
    // 기존 파일이 있으면 읽기
    if (fs.existsSync(bookingsPath)) {
      const fileContent = fs.readFileSync(bookingsPath, 'utf8');
      bookingsData = JSON.parse(fileContent);
    }
    
    // 새 부킹 추가
    bookingsData.bookings.push(bookingData);
    
    // 파일에 저장
    fs.writeFileSync(bookingsPath, JSON.stringify(bookingsData, null, 2));
    
    console.log('Booking saved to file:', bookingData.bookingId);
  } catch (error) {
    console.error('Error saving booking to file:', error);
    throw error;
  }
} 