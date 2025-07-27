import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('=== EMAIL TEST DEBUG ===');
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length);
  console.log('RESEND_API_KEY first 10 chars:', process.env.RESEND_API_KEY?.substring(0, 10));

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ 
      message: 'Resend API key not configured',
      error: 'RESEND_API_KEY environment variable is missing'
    });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    console.log('Attempting to send test email...');
    
    // 두 개의 이메일 주소로 테스트 전송
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['admin@emotionalstudios.com.au', 'angeleo9691@gmail.com'], // Gmail도 추가
      subject: 'Test Email from Emotional Studios',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6100;">Test Email</h2>
          <p>This is a test email to verify email functionality.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>If you receive this email, the email system is working correctly.</p>
          <p><strong>API Key:</strong> ${process.env.RESEND_API_KEY ? 'Configured' : 'Missing'}</p>
        </div>
      `,
      text: `
Test Email

This is a test email to verify email functionality.
Time: ${new Date().toLocaleString()}
API Key: ${process.env.RESEND_API_KEY ? 'Configured' : 'Missing'}

If you receive this email, the email system is working correctly.
      `,
    });

    console.log('Test email response:', { data, error });

    if (error) {
      console.error('Test email error:', error);
      return res.status(500).json({ 
        message: 'Failed to send test email', 
        error: error.message,
        details: error
      });
    }

    console.log('Test email sent successfully:', data);
    return res.status(200).json({ 
      message: 'Test email sent successfully', 
      data,
      note: 'Check both admin@emotionalstudios.com.au and angeleo9691@gmail.com inboxes'
    });

  } catch (error) {
    console.error('Test email exception:', error);
    return res.status(500).json({ 
      message: 'Failed to send test email', 
      error: error.message,
      stack: error.stack
    });
  }
} 