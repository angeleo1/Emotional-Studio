import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { generateBookingEmail, generateCustomerConfirmationEmail } from '../../utils/emailTemplates';
import { generateExcelBuffer } from '../../utils/excelGenerator';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  shootingType: string;
  colorOption?: boolean;
  otherGoods?: any;
  message?: string;
  status: string;
  createdAt: string;
}

interface BookingsData {
  bookings: Booking[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, date, time, shootingType, colorOption, otherGoods, message } = req.body;

    // 필수 필드 검증
    if (!name || !email || !phone || !date || !time || !shootingType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 날짜 형식 검증 (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // JSON 파일 경로 (개발 환경에서만 사용)
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    
    // 기존 예약 데이터 읽기 (개발 환경에서만)
    let bookingsData: BookingsData = { bookings: [] };
    try {
      if (process.env.NODE_ENV === 'development' && fs.existsSync(bookingsPath)) {
        const fileContent = fs.readFileSync(bookingsPath, 'utf8');
        bookingsData = JSON.parse(fileContent);
      }
    } catch (fileError) {
      console.error('Error reading bookings file:', fileError);
      bookingsData = { bookings: [] };
    }

    // 중복 예약 확인
    const existingBooking = bookingsData.bookings.find((booking: Booking) => 
      booking.date === date && booking.time === time && booking.status === 'confirmed'
    );

    if (existingBooking) {
      return res.status(409).json({ message: 'This time slot is already booked' });
    }

    // 새 예약 생성
    const newBooking: Booking = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      date,
      time,
      shootingType,
      colorOption: colorOption || false,
      otherGoods: otherGoods || {},
      message: message || '',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // 예약 데이터에 추가 (개발 환경에서만)
    try {
      if (process.env.NODE_ENV === 'development') {
        bookingsData.bookings.push(newBooking);
        fs.writeFileSync(bookingsPath, JSON.stringify(bookingsData, null, 2));
      }
    } catch (fileError) {
      console.error('Error writing to bookings file:', fileError);
      // 파일 쓰기 실패해도 계속 진행
    }

    // 이메일 전송 (선택적)
    if (process.env.RESEND_API_KEY) {
      try {
        // 엑셀 파일 생성 (모든 예약 데이터 포함)
        const allBookings = [...bookingsData.bookings, newBooking];
        const excelBuffer = generateExcelBuffer(allBookings);
        
        // 현재 날짜로 파일명 생성
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const excelFileName = `bookings_${dateStr}_${timeStr}.xlsx`;

        // 관리자에게 알림 이메일 (엑셀 첨부)
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: process.env.CONTACT_EMAIL || 'admin@emotionalstudios.com.au',
          subject: `New Booking - ${name} on ${new Date(date).toLocaleDateString()}`,
          html: generateBookingEmail(newBooking),
          attachments: [
            {
              filename: excelFileName,
              content: excelBuffer.toString('base64')
            }
          ]
        });

        // 고객에게 확인 이메일
        console.log('📧 Sending customer confirmation email to:', email);
        const customerEmailResult = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Booking Confirmation - emotional studios',
          html: generateCustomerConfirmationEmail(newBooking)
        });
        console.log('📧 Customer email result:', customerEmailResult);

        console.log('✅ Emails sent successfully with Excel attachment');
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // 이메일 실패해도 예약은 성공으로 처리
      }
    } else {
      console.log('⚠️ RESEND_API_KEY not configured, skipping email sending');
    }

    // 성공 응답
    return res.status(201).json({ 
      message: 'Booking saved successfully',
      booking: newBooking
    });

  } catch (error) {
    console.error('Error saving booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 