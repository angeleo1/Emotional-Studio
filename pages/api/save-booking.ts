import { NextApiRequest, NextApiResponse } from 'next';
import { isBookingEnabled } from '../../config/booking';
import { Resend } from 'resend';

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

    const bookingId = Date.now().toString();
    
    // 이메일로 예약 정보 전송
    try {
      await resend.emails.send({
        from: 'Emotional Studio <noreply@emotionalstudio.com>',
        to: [process.env.CONTACT_EMAIL || 'angeleo9691@gmail.com'],
        subject: `New Booking #${bookingId}`,
        html: `
          <h2>New Booking Confirmation</h2>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Name:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Phone:</strong> ${bookingData.phone}</p>
          <p><strong>Date:</strong> ${bookingData.date}</p>
          <p><strong>Time:</strong> ${bookingData.time}</p>
          <p><strong>People:</strong> ${bookingData.shootingType}</p>
          <p><strong>Additional Options:</strong></p>
          <ul>
            ${bookingData.colorOption ? '<li>Color Option (+$10)</li>' : ''}
            ${bookingData.a4print ? '<li>4x6" Print (+$10)</li>' : ''}
            ${bookingData.a4frame ? '<li>4x6" Frame (+$15)</li>' : ''}
            ${bookingData.digital ? '<li>Original Digital Film (+$20)</li>' : ''}
            ${bookingData.additionalRetouch > 0 ? `<li>Additional Retouch: ${bookingData.additionalRetouch} (+$${bookingData.additionalRetouch * 15})</li>` : ''}
          </ul>
          ${bookingData.message ? `<p><strong>Message:</strong> ${bookingData.message}</p>` : ''}
          <p><strong>Total Amount:</strong> $${calculateTotalAmount(bookingData)}</p>
        `
      });

      // 고객에게도 확인 이메일 전송
      await resend.emails.send({
        from: 'Emotional Studio <noreply@emotionalstudio.com>',
        to: [bookingData.email],
        subject: `Booking Confirmation #${bookingId}`,
        html: `
          <h2>Thank you for your booking!</h2>
          <p>Dear ${bookingData.name},</p>
          <p>Your booking has been confirmed. Here are the details:</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Date:</strong> ${bookingData.date}</p>
          <p><strong>Time:</strong> ${bookingData.time}</p>
          <p><strong>People:</strong> ${bookingData.shootingType}</p>
          <p><strong>Total Amount:</strong> $${calculateTotalAmount(bookingData)}</p>
          <p>We look forward to seeing you at Emotional Studio!</p>
          <p>Best regards,<br>Emotional Studio Team</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // 이메일 전송 실패해도 예약은 성공으로 처리
    }

    res.status(200).json({ 
      message: 'Booking saved successfully',
      bookingId: bookingId
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking' });
  }
}

// 총 금액 계산 함수
function calculateTotalAmount(bookingData: any) {
  let basePrice = 0;
  switch (bookingData.shootingType) {
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