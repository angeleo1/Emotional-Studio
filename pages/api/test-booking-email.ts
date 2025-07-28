import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { generateBookingEmail, generateCustomerConfirmationEmail } from '../../utils/emailTemplates';
import { generateExcelBuffer } from '../../utils/excelGenerator';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 테스트 예약 데이터
    const testBooking = {
      id: 'test-001',
      name: 'John Doe',
      email: 'test@example.com',
      phone: '0400000000',
      date: '2024-01-20',
      time: '14:00',
      shootingType: 'couple',
      colorOption: true,
      otherGoods: {
        a4print: true,
        a4frame: false,
        digital: true,
        calendar: false
      },
      message: 'This is a test booking for email functionality.',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // 기존 예약 데이터 (테스트용)
    const existingBookings = [
      {
        id: 'existing-001',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0400000001',
        date: '2024-01-20',
        time: '16:00',
        shootingType: 'solo',
        colorOption: false,
        otherGoods: {},
        message: '',
        status: 'confirmed',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'existing-002',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '0400000002',
        date: '2024-01-21',
        time: '13:30',
        shootingType: 'triple',
        colorOption: true,
        otherGoods: {
          a4print: false,
          a4frame: true,
          digital: false,
          calendar: true
        },
        message: 'Special request for outdoor photos.',
        status: 'confirmed',
        createdAt: '2024-01-16T11:00:00Z'
      }
    ];

    // 모든 예약 데이터 (기존 + 새 예약)
    const allBookings = [...existingBookings, testBooking];

    // 엑셀 파일 생성
    const excelBuffer = generateExcelBuffer(allBookings);
    
    // 현재 날짜로 파일명 생성
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    const excelFileName = `test_bookings_${dateStr}_${timeStr}.xlsx`;

    // 이메일 전송
    try {
      // 관리자에게 테스트 알림 이메일 (엑셀 첨부) - Resend 무료 계정 제한으로 angeleo9691@gmail.com으로 전송
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'angeleo9691@gmail.com',
        subject: `TEST - New Booking - ${testBooking.name} on ${new Date(testBooking.date).toLocaleDateString()}`,
        html: generateBookingEmail(testBooking),
        attachments: [
          {
            filename: excelFileName,
            content: excelBuffer.toString('base64')
          }
        ]
      });

      // 테스트 고객에게 확인 이메일 - Resend 무료 계정 제한으로 angeleo9691@gmail.com으로 전송
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'angeleo9691@gmail.com',
        subject: 'TEST - Booking Confirmation - emotional studios',
        html: generateCustomerConfirmationEmail(testBooking)
      });

      console.log('✅ Test emails sent successfully with Excel attachment');
      
      res.status(200).json({ 
        message: 'Test emails sent successfully',
        booking: testBooking,
        excelFile: excelFileName
      });

    } catch (emailError) {
      console.error('❌ Test email sending failed:', emailError);
      res.status(500).json({ 
        message: 'Email sending failed',
        error: emailError
      });
    }

  } catch (error) {
    console.error('Error in test booking email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 