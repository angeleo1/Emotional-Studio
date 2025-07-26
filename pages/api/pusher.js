import Pusher from 'pusher';

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
    const { message, sender, type, userName } = req.body;

    if (!message || !sender) {
      return res.status(400).json({ message: 'Message and sender are required' });
    }

    const messageData = {
      id: Date.now(),
      sender,
      message,
      timestamp: new Date(),
      userName: userName || 'Guest'
    };

    // 채팅 메시지 전송
    if (type === 'chat') {
      await pusher.trigger('emotional-studios-chat', 'new-message', messageData);
      
      // 관리자가 연결되어 있지 않으면 봇 응답
      if (sender === 'user') {
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
      // 이메일 전송 로직 (기존 contact.js와 동일)
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      try {
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: [process.env.CONTACT_EMAIL || 'angeleo9691@gmail.com'],
          subject: 'New Contact Form Submission - Emotional Studios',
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${req.body.name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${req.body.email || 'Not provided'}</p>
            <p><strong>Message:</strong> ${req.body.message}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          `
        });

        if (error) {
          console.error('Resend error:', error);
          return res.status(500).json({ message: 'Failed to send email' });
        }

        return res.status(200).json({ message: 'Email sent successfully', data });
      } catch (emailError) {
        console.error('Email error:', emailError);
        return res.status(500).json({ message: 'Failed to send email' });
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