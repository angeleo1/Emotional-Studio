import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Pusher from 'pusher-js'

export default function ContactPopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('chat')
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' })
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [adminConnected, setAdminConnected] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [notificationsActive, setNotificationsActive] = useState(false)
  const pusherRef = useRef(null)
  const channelRef = useRef(null)
  const chatContainerRef = useRef(null)

  // 알림 권한 요청
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationsEnabled(permission === 'granted');
          setNotificationsActive(permission === 'granted');
        });
      } else {
        setNotificationsEnabled(Notification.permission === 'granted');
        setNotificationsActive(Notification.permission === 'granted');
      }
    }
  }, []);

  // 브라우저 알림 표시 함수
  const showNotification = (title, body) => {
    if (notificationsEnabled && notificationsActive && document.hidden) {
      new Notification(title, {
        body: body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'chat-notification'
      });
    }
  };

  // 소리 알림 재생 함수
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/pop-sound-effect-197846.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio notification failed:', error);
    }
  };

  // 알림 토글 함수
  const toggleNotifications = () => {
    if (notificationsEnabled) {
      setNotificationsActive(!notificationsActive);
    } else {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
        setNotificationsActive(permission === 'granted');
      });
    }
  };

  // Pusher 연결
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      console.log('Initializing Pusher connection...');
      
      // 기존 연결이 있으면 정리
      if (pusherRef.current) {
        console.log('Disconnecting existing Pusher connection...');
        pusherRef.current.disconnect();
        pusherRef.current = null;
      }

      try {
        // Pusher 클라이언트 초기화 (실제 키 사용)
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

        pusherRef.current.connection.bind('error', (error) => {
          console.error('❌ Pusher connection error:', error);
          setIsConnected(false);
        });

        // 새 메시지 수신
        channelRef.current.bind('new-message', (messageData) => {
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
               Math.abs(new Date(msg.timestamp) - new Date(messageWithDate.timestamp)) < 1000)
            );

            if (isDuplicate) {
              console.log('Duplicate message detected, skipping:', messageWithDate);
              return prev;
            }

            return [...prev, messageWithDate];
          });

          setIsTyping(false);

          if (messageData.sender !== 'user') {
            showNotification(
              'New Message',
              `${messageData.sender === 'admin' ? 'Support Agent' : 'Bot'}: ${messageData.message.substring(0, 50)}${messageData.message.length > 50 ? '...' : ''}`
            );
            playNotificationSound();
          }
        });

        // 관리자 상태 업데이트
        channelRef.current.bind('admin-status', (status) => {
          console.log('👨‍💼 Admin status update:', status);
          setAdminConnected(status.connected);
          if (status.connected) {
            showNotification('Support Available', 'A live agent is now online and ready to help!');
          }
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
  }, [isOpen, activeTab, notificationsEnabled]);

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

  const handleEmailSubmit = async (e) => {
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
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || !isConnected) return;

    const userMessage = {
      message: chatMessage,
      sender: 'user',
      type: 'chat',
      userName: 'Guest'
    };

    try {
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      if (response.ok) {
        setChatMessage('');
        setIsTyping(true);
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
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
            initial={{ 
              clipPath: 'circle(0% at 50% 50%)',
              scale: 0.8,
              opacity: 0 
            }}
            animate={{ 
              clipPath: 'circle(150% at 50% 50%)',
              scale: 1,
              opacity: 1 
            }}
            exit={{ 
              clipPath: 'circle(0% at 50% 50%)',
              scale: 0.6,
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: [0.83, 0, 0.17, 1],
              }
            }}
            transition={{
              duration: 1.2,
              ease: [0.83, 0, 0.17, 1],
            }}
            className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-end">
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex p-4 gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 px-6 text-sm font-medium transition-all duration-300 rounded-full border-2 ${
                  activeTab === 'chat'
                    ? 'text-white border-orange-500 shadow-lg'
                    : 'text-gray-300 hover:text-white border-gray-500/50 hover:border-orange-500'
                }`}
              >
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-3 px-6 text-sm font-medium transition-all duration-300 rounded-full border-2 ${
                  activeTab === 'email'
                    ? 'text-white border-orange-500 shadow-lg'
                    : 'text-gray-300 hover:text-white border-gray-500/50 hover:border-orange-500'
                }`}
              >
                Email Us
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'chat' ? (
                <div className="space-y-6">
                  {/* 알림 설정 */}
                  <div className="flex items-center justify-between p-3 border border-yellow-500/30 rounded-2xl text-yellow-200">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 0 0 4 6v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H8a4 4 0 0 0-3.81 2.19z" />
                      </svg>
                      <span className="text-sm">
                        {notificationsEnabled
                          ? 'Notifications are available'
                          : 'Enable notifications to get alerts for new messages'
                        }
                      </span>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={notificationsActive}
                          onChange={toggleNotifications}
                          disabled={!notificationsEnabled}
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${
                          notificationsActive
                            ? 'bg-green-500'
                            : notificationsEnabled
                              ? 'bg-gray-400'
                              : 'bg-gray-600'
                        }`}></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-md ${
                            notificationsActive ? 'translate-x-4' : ''
                          }`}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-white">
                        {notificationsActive ? 'On' : 'Off'}
                      </span>
                    </label>
                  </div>

                  {/* 연결 상태 */}
                  <div className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                      {isConnected ? 'Connected' : 'Connecting...'}
                    </span>
                    {adminConnected ? (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-green-400">Live agent available</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-purple-400">Bot assistant active</span>
                      </>
                    )}
                  </div>

                  {/* 채팅 메시지 */}
                  <div
                    ref={chatContainerRef}
                    className="h-96 overflow-y-auto space-y-3 p-4 bg-black/20 rounded-2xl border border-white/10"
                  >
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
                                : msg.sender === 'admin'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-600 text-white'
                            }`}
                          >
                            <div className="text-xs opacity-75 mb-1">
                              {msg.sender === 'user' ? (msg.userName || 'You') : 
                               msg.sender === 'admin' ? 'Support Agent' : 'Bot'}
                            </div>
                            <div>{msg.message}</div>
                            <div className="text-xs opacity-75 mt-1">
                              {msg.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-600 text-white px-4 py-2 rounded-2xl">
                          <div className="text-xs opacity-75 mb-1">Bot</div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 메시지 입력 */}
                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder={isConnected ? "Type your message..." : "Connecting..."}
                      disabled={!isConnected}
                      className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!chatMessage.trim() || !isConnected}
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
  )
} 