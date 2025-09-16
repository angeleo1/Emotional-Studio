import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Pusher from 'pusher-js';

interface MobileContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileContactModal({ isOpen, onClose }: MobileContactModalProps) {
  const [contactMode, setContactMode] = useState<'chat' | 'email'>('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' });
  const [isConnected, setIsConnected] = useState(false);
  const [adminConnected, setAdminConnected] = useState(false);
  const pusherRef = useRef<any>(null);
  const channelRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Pusher 연결
  useEffect(() => {
    if (isOpen && contactMode === 'chat') {
      console.log('Initializing Pusher connection...');
      
      // 기존 연결이 있으면 정리
      if (pusherRef.current) {
        console.log('Disconnecting existing Pusher connection...');
        pusherRef.current.disconnect();
        pusherRef.current = null;
      }

      try {
        // Pusher 클라이언트 초기화
        console.log('Creating new Pusher instance...');
        pusherRef.current = new Pusher('d3e0b683cba4fc0f7708', {
          cluster: 'ap1',
          forceTLS: true
        });

        console.log('Subscribing to channel...');
        // 채널 구독
        channelRef.current = pusherRef.current.subscribe('emotional-studios-chat');

        // 연결 상태 확인
        pusherRef.current.connection.bind('connected', () => {
          console.log('✅ Connected to Pusher successfully!');
          setIsConnected(true);
        });

        pusherRef.current.connection.bind('disconnected', () => {
          console.log('❌ Disconnected from Pusher');
          setIsConnected(false);
          setAdminConnected(false);
        });

        pusherRef.current.connection.bind('error', (error: any) => {
          console.error('❌ Pusher connection error:', error);
          setIsConnected(false);
        });

        // 새 메시지 수신
        channelRef.current.bind('new-message', (messageData: any) => {
          console.log('📨 Received new message:', messageData);
          const messageWithDate = {
            ...messageData,
            timestamp: new Date(messageData.timestamp)
          };

          setChatMessages(prev => {
            const isDuplicate = prev.some(msg =>
              msg.id === messageWithDate.id ||
              (msg.message === messageWithDate.message &&
               msg.sender === messageWithDate.sender &&
               Math.abs(new Date(msg.timestamp).getTime() - new Date(messageWithDate.timestamp).getTime()) < 1000)
            );

            if (isDuplicate) {
              console.log('Duplicate message detected, skipping:', messageWithDate);
              return prev;
            }

            return [...prev, messageWithDate];
          });
        });

        // 관리자 상태 업데이트
        channelRef.current.bind('admin-status', (status: any) => {
          console.log('👨‍💼 Admin status update:', status);
          setAdminConnected(status.connected);
        });

        console.log('Pusher setup completed');
      } catch (error) {
        console.error('❌ Error setting up Pusher:', error);
        setIsConnected(false);
      }

      return () => {
        if (pusherRef.current) {
          console.log('Cleaning up Pusher connection...');
          pusherRef.current.disconnect();
          pusherRef.current = null;
        }
      };
    }
  }, [isOpen, contactMode]);

  // 컴포넌트 언마운트 시 연결 정리
  useEffect(() => {
    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect();
        pusherRef.current = null;
      }
    };
  }, []);

  // 채팅 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      message: chatMessage,
      sender: 'user',
      userName: 'Guest',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');

    // API 호출
    try {
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      if (response.ok) {
        // 봇 응답 시뮬레이션
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            message: 'Your message has been received. Our team will contact you soon with more information.',
            sender: 'bot',
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, botMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...emailForm,
          type: 'email'
        }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setEmailForm({ name: '', email: '', message: '' });
        onClose();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Email error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Contact Us</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex p-4 gap-2">
              <button
                onClick={() => setContactMode('chat')}
                className={`flex-1 py-3 px-6 text-sm font-medium transition-all duration-300 rounded-full border-2 ${
                  contactMode === 'chat'
                    ? 'text-white border-orange-500 shadow-lg'
                    : 'text-gray-300 hover:text-white border-gray-500/50 hover:border-orange-500'
                }`}
              >
                Live Chat
              </button>
              <button
                onClick={() => setContactMode('email')}
                className={`flex-1 py-3 px-6 text-sm font-medium transition-all duration-300 rounded-full border-2 ${
                  contactMode === 'email'
                    ? 'text-white border-orange-500 shadow-lg'
                    : 'text-gray-300 hover:text-white border-gray-500/50 hover:border-orange-500'
                }`}
              >
                Email Us
              </button>
            </div>

            {/* 컨텐츠 */}
            <div className="p-4">
              {contactMode === 'chat' ? (
                <div className="space-y-4">
                  {/* 연결 상태 */}
                  <div className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                      {isConnected ? 'Connected' : 'Connecting...'}
                    </span>
                    {adminConnected ? (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-[#FF6100]">Admin: Live agent available</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">Admin: Offline</span>
                      </>
                    )}
                  </div>

                  {/* 채팅 메시지 */}
                  <div className="h-64 overflow-y-auto space-y-3 p-4 bg-black/20 rounded-2xl border border-white/10" ref={chatContainerRef}>
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p>Start a conversation!</p>
                      </div>
                    ) : (
                      chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-2xl ${
                              msg.sender === 'user'
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-600 text-white'
                            }`}
                          >
                            <div className="text-xs opacity-75 mb-1">
                              {msg.sender === 'user' ? (msg.userName || 'You') : 'Bot'}
                            </div>
                            <div>{msg.message}</div>
                            <div className="text-xs opacity-75 mt-1">
                              {msg.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* 메시지 입력 */}
                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!chatMessage.trim()}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-2xl font-medium transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={emailForm.message}
                      onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-2xl font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 