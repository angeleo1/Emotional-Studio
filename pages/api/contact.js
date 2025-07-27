import { Resend } from 'resend';

// 환경변수 디버깅
console.log('RESEND_API_KEY:', process.env.Resend_API_KEY);
console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

// 직접 API 키 설정 (테스트용)
const apiKey = process.env.Resend_API_KEY || 're_6nW7eXkK_JwQHw7MiTwVwNYqgDRFHQJFu';
const contactEmail = process.env.CONTACT_EMAIL || 'admin@emotionalstudios.com.au'; // 이메일 주소 변경

console.log('Using API Key:', apiKey);
console.log('Using Contact Email:', contactEmail);

const resend = new Resend(apiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message, type } = req.body;

  try {
    if (type === 'email') {
      // 이메일 문의 처리
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const emailData = await resend.emails.send({
        from: 'admin@emotionalstudios.com.au', // 발신자 이메일 변경
        to: [contactEmail],
        subject: `[Emotional Studios] New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ff6100; border-bottom: 2px solid #ff6100; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff6100;">${email}</a></p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: #fff; padding: 20px; border-left: 4px solid #ff6100; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                This message was sent from the Emotional Studios contact form.
              </p>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission

Contact Information:
- Name: ${name}
- Email: ${email}
- Date: ${new Date().toLocaleString()}

Message:
${message}

---
This message was sent from the Emotional Studios contact form.
        `,
      });

      console.log('Email sent successfully:', emailData);
      res.status(200).json({ message: 'Email sent successfully' });

    } else if (type === 'chat') {
      // 채팅 메시지 처리
      if (!message) {
        return res.status(400).json({ message: 'Message is required' });
      }

      // 채팅 메시지를 관리자에게 이메일로 전송
      const chatEmailData = await resend.emails.send({
        from: 'admin@emotionalstudios.com.au', // 발신자 이메일 변경
        to: [contactEmail],
        subject: `[Emotional Studios] New Chat Message`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ff6100; border-bottom: 2px solid #ff6100; padding-bottom: 10px;">
              New Chat Message
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Chat Details</h3>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Source:</strong> Live Chat</p>
            </div>
            
            <div style="background: #fff; padding: 20px; border-left: 4px solid #ff6100; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                This message was sent from the Emotional Studios live chat.
              </p>
            </div>
          </div>
        `,
        text: `
New Chat Message

Chat Details:
- Time: ${new Date().toLocaleString()}
- Source: Live Chat

Message:
${message}

---
This message was sent from the Emotional Studios live chat.
        `,
      });

      console.log('Chat notification sent successfully:', chatEmailData);
      res.status(200).json({ message: 'Chat message processed successfully' });

    } else {
      return res.status(400).json({ message: 'Invalid type parameter' });
    }

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
} 