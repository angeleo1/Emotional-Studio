import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  res.socket.server.io = io;

  // 관리자 연결 상태 추적
  let adminConnected = false;
  let adminSocket = null;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // 관리자 인증
    socket.on('admin-auth', (data) => {
      if (data.password === 'admin123') { // 간단한 비밀번호 (실제로는 더 안전하게)
        adminSocket = socket;
        adminConnected = true;
        socket.emit('admin-authenticated');
        console.log('Admin authenticated:', socket.id);
        
        // 기존 대기 중인 메시지들 전송
        socket.emit('admin-status', { connected: true });
      } else {
        socket.emit('admin-auth-failed');
      }
    });

    // 일반 사용자 채팅방 참여
    socket.on('join-chat', () => {
      socket.join('emotional-studios-chat');
      console.log('User joined chat room');
      
      // 관리자 연결 상태 알림
      socket.emit('admin-status', { connected: adminConnected });
    });

    // 일반 사용자 메시지 전송
    socket.on('send-message', (messageData) => {
      console.log('User message received:', messageData);
      
      const userMessage = {
        id: Date.now(),
        sender: 'user',
        message: messageData.message,
        timestamp: new Date(),
        userId: socket.id,
        userName: messageData.userName || 'Guest'
      };

      // 같은 방의 모든 사용자에게 메시지 전송
      io.to('emotional-studios-chat').emit('new-message', userMessage);

      // 관리자에게도 메시지 전송
      if (adminSocket) {
        adminSocket.emit('user-message', userMessage);
      }

      // 관리자가 연결되어 있지 않으면 봇 응답
      if (!adminConnected) {
        setTimeout(() => {
          const botResponse = getBotResponse(messageData.message);
          const botMessage = {
            id: Date.now() + 1,
            sender: 'bot',
            message: botResponse,
            timestamp: new Date()
          };
          io.to('emotional-studios-chat').emit('new-message', botMessage);
        }, 1000);
      }
    });

    // 관리자 메시지 전송
    socket.on('admin-message', (messageData) => {
      if (socket === adminSocket) {
        console.log('Admin message received:', messageData);
        
        const adminMessage = {
          id: Date.now(),
          sender: 'admin',
          message: messageData.message,
          timestamp: new Date(),
          adminName: 'Emotional Studios Support'
        };

        // 모든 채팅방 사용자에게 관리자 메시지 전송
        io.to('emotional-studios-chat').emit('new-message', adminMessage);
      }
    });

    // 연결 해제
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      // 관리자 연결 해제 처리
      if (socket === adminSocket) {
        adminConnected = false;
        adminSocket = null;
        console.log('Admin disconnected');
        
        // 다른 사용자들에게 관리자 연결 해제 알림
        io.to('emotional-studios-chat').emit('admin-status', { connected: false });
      }
    });
  });

  res.end();
};

// 간단한 봇 응답 로직
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

export default SocketHandler; 