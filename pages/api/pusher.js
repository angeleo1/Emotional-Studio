import Pusher from 'pusher';

// 관리자 상태 추적 (실제 프로덕션에서는 Redis나 데이터베이스 사용 권장)
let adminStatus = {
  isOnline: false,
  lastSeen: null
};

// Pusher 설정 (실제 키 사용)
const pusher = new Pusher({
  appId: '2027943',
  key: 'd3e0b683cba4fc0f7708',
  secret: 'c33a8af2037498602a1a',
  cluster: 'ap1',
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, sender, type, userName, action } = req.body;

    // 관리자 상태 업데이트
    if (action === 'admin-login') {
      adminStatus.isOnline = true;
      adminStatus.lastSeen = new Date();
      await pusher.trigger('emotional-studios-chat', 'admin-status', {
        connected: true,
        timestamp: new Date()
      });
      return res.status(200).json({ message: 'Admin logged in successfully' });
    }

    if (action === 'admin-logout') {
      adminStatus.isOnline = false;
      adminStatus.lastSeen = new Date();
      await pusher.trigger('emotional-studios-chat', 'admin-status', {
        connected: false,
        timestamp: new Date()
      });
      return res.status(200).json({ message: 'Admin logged out successfully' });
    }

    // 채팅 메시지 검증
    if (type === 'chat' && (!message || !sender)) {
      return res.status(400).json({ message: 'Message and sender are required for chat' });
    }

    // 이메일 메시지 검증
    if (type === 'email' && (!req.body.name || !req.body.email || !req.body.message)) {
      return res.status(400).json({ message: 'Name, email, and message are required for email submission' });
    }

    // 채팅 메시지 데이터 생성
    if (type === 'chat') {
      const messageData = {
        id: Date.now(),
        sender,
        message,
        timestamp: new Date(),
        userName: userName || 'Guest'
      };

      await pusher.trigger('emotional-studios-chat', 'new-message', messageData);
      
      // 사용자 메시지인 경우 관리자에게 이메일 알림 전송
      if (sender === 'user') {
        console.log('=== CHAT EMAIL NOTIFICATION DEBUG ===');
        console.log('Resend_API_KEY exists:', !!process.env.Resend_API_KEY);
        
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.Resend_API_KEY);
          
          console.log('Attempting to send chat notification email...');
          const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // 임시로 Resend 기본 발신자 사용
            to: ['admin@emotionalstudios.com.au'],
            subject: `[Emotional Studios] New Chat Message from ${userName || 'Guest'}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ff6100; border-bottom: 2px solid #ff6100; padding-bottom: 10px;">
                  New Chat Message
                </h2>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #333; margin-top: 0;">Chat Details</h3>
                  <p><strong>User:</strong> ${userName || 'Guest'}</p>
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
- User: ${userName || 'Guest'}
- Time: ${new Date().toLocaleString()}
- Source: Live Chat

Message:
${message}

---
This message was sent from the Emotional Studios live chat.
            `,
          });

          console.log('Chat notification email response:', { data, error });

          if (error) {
            console.error('Chat notification email error details:', error);
          } else {
            console.log('Chat notification email sent successfully, data:', data);
          }
        } catch (emailError) {
          console.error('Chat notification email error details:', emailError);
        }
      }
      
      // 관리자가 오프라인일 때만 봇 응답
      if (sender === 'user' && !adminStatus.isOnline) {
        setTimeout(async () => {
          const botResponse = getBotResponse(message);
          const botMessage = {
            id: Date.now() + 1,
            sender: 'bot',
            message: botResponse,
            timestamp: new Date()
          };
          await pusher.trigger('emotional-studios-chat', 'new-message', botMessage);
        }, 1000);
      }
    }

    // 이메일 메시지 처리
    if (type === 'email') {
      // 환경 변수 확인
      console.log('=== EMAIL SENDING DEBUG ===');
      console.log('Resend_API_KEY exists:', !!process.env.Resend_API_KEY);
      console.log('Resend_API_KEY length:', process.env.Resend_API_KEY?.length);
      
      if (!process.env.Resend_API_KEY) {
        console.log('Resend API key not configured, simulating email send');
        return res.status(200).json({ 
          message: 'Email sent successfully (simulated)', 
          note: 'Resend API key not configured'
        });
      }

      // Resend 무료 계정 제한 확인
      const adminEmail = 'admin@emotionalstudios.com.au'; // 이메일 주소 변경
      const userEmail = req.body.email.toLowerCase().trim();
      
      console.log('Email setup:', { adminEmail, userEmail });
      console.log('Request body:', req.body);
      
      // 모든 이메일을 관리자에게 전송 (Resend 무료 계정 제한으로 인해 관리자 이메일로만 전송 가능)
      console.log('Sending email to admin:', adminEmail);

      // 이메일 전송 로직 (기존 contact.js와 동일)
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.Resend_API_KEY);

      try {
        console.log('Attempting to send email...');
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // 임시로 Resend 기본 발신자 사용
          to: [adminEmail], // 항상 관리자 이메일로 전송
          subject: 'New Contact Form Submission - Emotional Studios',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ff6100; border-bottom: 2px solid #ff6100; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Message:</strong> ${req.body.message}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: #fff; padding: 20px; border-left: 4px solid #ff6100; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Customer Message</h3>
                <p style="line-height: 1.6; color: #555;">
                  ${req.body.message}
                </p>
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

Contact Details:
- Name: ${req.body.name}
- Email: ${req.body.email}
- Message: ${req.body.message}
- Date: ${new Date().toLocaleString()}

Customer Message:
${req.body.message}

---
This message was sent from the Emotional Studios contact form.
          `,
        });

        console.log('Resend response:', { data, error });

        if (error) {
          console.error('Resend error details:', error);
          return res.status(500).json({ message: 'Failed to send email', error: error.message });
        }

        console.log('Email sent successfully, data:', data);
        return res.status(200).json({ message: 'Email sent successfully', data });
      } catch (emailError) {
        console.error('Email error details:', emailError);
        return res.status(500).json({ message: 'Failed to send email', error: emailError.message });
      }
    }

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Pusher error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// 봇 응답 로직
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  if (message.includes('hello') || message.includes('hi') || message.includes('안녕')) {
    return "Hello! How can I help you today? 😊";
  }

  if (message.includes('booking') || message.includes('예약') || message.includes('reservation')) {
    return "For booking inquiries, please visit our booking page or contact us directly. We'd be happy to help you schedule your session!";
  }

  if (message.includes('price') || message.includes('cost') || message.includes('가격') || message.includes('비용')) {
    return "Our pricing varies depending on the package you choose. Please check our services page for detailed pricing information, or feel free to ask about specific packages!";
  }

  if (message.includes('location') || message.includes('address') || message.includes('위치') || message.includes('주소')) {
    return "We're located in Melbourne, Australia. For the exact address and directions, please check our contact page!";
  }

  if (message.includes('thank') || message.includes('감사') || message.includes('thanks')) {
    return "You're welcome! Is there anything else I can help you with?";
  }

  // 기본 응답
  const responses = [
    "Thank you for your message! Our team will get back to you soon.",
    "I understand your inquiry. Let me connect you with our team for a detailed response.",
    "Thanks for reaching out! We'll review your message and respond shortly.",
    "Your message has been received. Our team will contact you soon with more information."
  ];

  return responses[Math.floor(Math.random() * responses.length)];
} 