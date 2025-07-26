import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export default function ContactPopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('chat')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: 'Hello! How can we help you today? 😊',
      timestamp: new Date()
    }
  ])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [adminConnected, setAdminConnected] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [notificationsActive, setNotificationsActive] = useState(false)
  const socketRef = useRef(null)
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
        icon: '/favicon.ico', // 사이트 아이콘
        badge: '/favicon.ico',
        tag: 'chat-notification'
      });
    }
  };

  // 소리 알림 재생 함수
  const playNotificationSound = () => {
    // 커스텀 알림음 사용
    try {
      const audio = new Audio('/pop-sound-effect-197846.mp3');
      audio.volume = 0.3; // 볼륨을 30%로 설정
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

  // Socket.IO 연결
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      // 기존 연결이 있으면 정리
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      // Socket.IO 서버 초기화
      fetch('/api/socketio')
        .then(() => {
          socketRef.current = io();
          
          socketRef.current.on('connect', () => {
            console.log('Connected to Socket.IO');
            setIsConnected(true);
            socketRef.current.emit('join-chat');
          });

          socketRef.current.on('new-message', (messageData) => {
            // timestamp를 Date 객체로 변환
            const messageWithDate = {
              ...messageData,
              timestamp: new Date(messageData.timestamp)
            };
            
            // 중복 메시지 방지
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

            // 내가 보낸 메시지가 아닌 경우에만 알림
            if (messageData.sender !== 'user') {
              // 브라우저 알림
              showNotification(
                'New Message', 
                `${messageData.sender === 'admin' ? 'Support Agent' : 'Bot'}: ${messageData.message.substring(0, 50)}${messageData.message.length > 50 ? '...' : ''}`
              );
              
              // 소리 알림
              playNotificationSound();
            }
          });

          socketRef.current.on('admin-status', (status) => {
            setAdminConnected(status.connected);
            
            // 관리자가 온라인으로 바뀌면 알림
            if (status.connected) {
              showNotification('Support Available', 'A live agent is now online and ready to help!');
            }
          });

          socketRef.current.on('disconnect', () => {
            console.log('Disconnected from Socket.IO');
            setIsConnected(false);
            setAdminConnected(false);
          });

          return () => {
            if (socketRef.current) {
              socketRef.current.disconnect();
              socketRef.current = null;
            }
          };
        })
        .catch(console.error);
    }
  }, [isOpen, activeTab, notificationsEnabled]);

  // 컴포넌트 언마운트 시 연결 정리
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // 채팅 스크롤 자동 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          type: 'email'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setMessage('')
        setEmail('')
        setName('')
        setTimeout(() => setSubmitStatus(null), 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChatSubmit = async () => {
    if (!message.trim() || !isConnected) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: message.trim(),
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    const currentMessage = message.trim()
    setMessage('')
    setIsTyping(true)

    // Socket.IO를 통해 메시지 전송
    if (socketRef.current) {
      socketRef.current.emit('send-message', { message: currentMessage });
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (activeTab === 'chat') {
        handleChatSubmit()
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-8 border-b border-white/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff6100] to-orange-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'CS Valcon Drawn, serif' }}>
                    Get in Touch
                  </h2>
                  <p className="text-gray-200 mt-1">
                    We're here to help you with any questions or concerns
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/20">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-6 text-center font-medium transition-all duration-300 relative ${
                  activeTab === 'chat'
                    ? 'text-[#ff6100]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Live Chat</span>
                  {isConnected && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                  {adminConnected && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                {activeTab === 'chat' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6100] to-orange-500"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-6 text-center font-medium transition-all duration-300 relative ${
                  activeTab === 'email'
                    ? 'text-[#ff6100]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email Us</span>
                </div>
                {activeTab === 'email' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6100] to-orange-500"
                  />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'chat' ? (
                <div className="space-y-6">
                  {/* 알림 설정 */}
                  <div className="flex items-center justify-between p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl text-yellow-200">
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

                  {/* 관리자 상태 표시 */}
                  {adminConnected && (
                    <div className="text-center p-3 bg-blue-500/20 border border-blue-500/30 rounded-2xl text-blue-200">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>Live agent is online and ready to help!</span>
                      </div>
                    </div>
                  )}
                  
                  <div 
                    ref={chatContainerRef}
                    className="h-96 overflow-y-auto p-6 bg-black/20 rounded-2xl border border-white/10"
                  >
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                        >
                          {msg.sender === 'bot' && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6100] to-orange-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold">E</span>
                            </div>
                          )}
                          {msg.sender === 'admin' && (
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold">A</span>
                            </div>
                          )}
                          <div className={`flex-1 rounded-2xl p-4 shadow-lg ${
                            msg.sender === 'user' 
                              ? 'bg-gradient-to-r from-[#ff6100] to-orange-500 text-white' 
                              : msg.sender === 'admin'
                              ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                              : 'bg-white/20 text-white border border-white/20'
                          }`}>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium opacity-70">
                                {msg.sender === 'admin' ? 'Support Agent' : msg.sender === 'bot' ? 'Bot' : 'You'}
                              </span>
                              <span className="text-xs opacity-50">
                                {msg.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                          </div>
                          {msg.sender === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6100] to-orange-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold">U</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      
                      {/* 타이핑 표시 */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6100] to-orange-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">E</span>
                          </div>
                          <div className="flex-1 rounded-2xl p-4 bg-white/20 text-white border border-white/20">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  {/* 연결 상태 표시 */}
                  {!isConnected && (
                    <div className="text-center text-yellow-300 text-sm">
                      Connecting to chat server...
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isConnected ? "Type your message..." : "Connecting..."}
                      disabled={!isConnected}
                      className="flex-1 px-6 py-4 rounded-2xl bg-white/20 border border-white/30 focus:border-[#ff6100] focus:ring-2 focus:ring-[#ff6100]/20 transition-all duration-300 text-white placeholder-gray-300 disabled:opacity-50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleChatSubmit}
                      disabled={!message.trim() || !isConnected}
                      className="px-8 py-4 bg-white/20 text-white rounded-2xl font-medium hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-white/30"
                    >
                      Send
                    </motion.button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-white/30 focus:border-[#ff6100] focus:ring-2 focus:ring-[#ff6100]/20 transition-all duration-300 text-white placeholder-gray-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-3">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-white/30 focus:border-[#ff6100] focus:ring-2 focus:ring-[#ff6100]/20 transition-all duration-300 text-white placeholder-gray-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-white/30 focus:border-[#ff6100] focus:ring-2 focus:ring-[#ff6100]/20 transition-all duration-300 text-white placeholder-gray-300 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  {/* Status Messages */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-200"
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Message sent successfully! We'll get back to you soon.</span>
                        </div>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-200"
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>Failed to send message. Please try again.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-5 bg-white/20 text-white rounded-2xl font-medium hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-white/30"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 