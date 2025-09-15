import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { generateBookingEmail, generateCustomerConfirmationEmail } from '../../utils/emailTemplates';

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
