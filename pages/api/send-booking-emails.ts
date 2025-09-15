import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { generateBookingEmail, generateCustomerConfirmationEmail } from '../../utils/emailTemplates';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const bookingId = bookingData.bookingId || `ES${Date.now()}`;

    // 부킹 데이터를 JSON 파일에 저장
    await saveBookingToFile({
      ...bookingData,
      bookingId,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    });

    // 관리자에게 부킹 알림 이메일 전송
    await resend.emails.send({
      from: 'Emotional Studio <noreply@emotionalstudio.com>',
      to: ['admin@emotionalstudios.com.au'],
      subject: `🎉 New Booking #${bookingId} - ${bookingData.name}`,
      html: generateBookingEmail({
        ...bookingData,
        bookingId
      })
    });

    // 고객에게 컨펌 이메일 전송
    await resend.emails.send({
      from: 'Emotional Studio <noreply@emotionalstudio.com>',
      to: [bookingData.email],
      subject: `✅ Booking Confirmed #${bookingId} - ${new Date(bookingData.date).toLocaleDateString()}`,
      html: generateCustomerConfirmationEmail({
        ...bookingData,
        bookingId
      })
    });

    console.log('Booking confirmation emails sent successfully');

    res.status(200).json({ 
      message: 'Emails sent successfully',
      bookingId: bookingId
    });

  } catch (error) {
    console.error('Error sending booking emails:', error);
    res.status(500).json({ 
      message: 'Error sending emails',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
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
