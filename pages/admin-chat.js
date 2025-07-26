import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminChat() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [adminStatus, setAdminStatus] = useState('disconnected')
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
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'admin-chat-notification'
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
    // 기존 연결이 있으면 정리
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    fetch('/api/socketio')
      .then(() => {
        socketRef.current = io();
        
        socketRef.current.on('connect', () => {
          console.log('Admin connected to Socket.IO');
          setIsConnected(true);
        });

        socketRef.current.on('admin-authenticated', () => {
          setIsAuthenticated(true);
          setAdminStatus('connected');
        });

        socketRef.current.on('admin-auth-failed', () => {
          alert('Authentication failed. Please check your password.');
        });

        socketRef.current.on('user-message', (messageData) => {
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
          
          // 새 고객 메시지 알림
          showNotification(
            'New Customer Message', 
            `${messageData.userName || 'Guest'}: ${messageData.message.substring(0, 50)}${messageData.message.length > 50 ? '...' : ''}`
          );
          playNotificationSound();
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
          
          // 내가 보낸 메시지가 아닌 경우에만 알림
          if (messageData.sender !== 'admin') {
            showNotification(
              'New Message', 
              `${messageData.sender === 'user' ? (messageData.userName || 'Guest') : 'Bot'}: ${messageData.message.substring(0, 50)}${messageData.message.length > 50 ? '...' : ''}`
            );
            playNotificationSound();
          }
        });

        socketRef.current.on('disconnect', () => {
          console.log('Admin disconnected from Socket.IO');
          setIsConnected(false);
          setAdminStatus('disconnected');
        });

        return () => {
          if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
          }
        };
      })
      .catch(console.error);
  }, [notificationsEnabled]);

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

  const handleAuth = (e) => {
    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit('admin-auth', { password });
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !isAuthenticated) return;

    if (socketRef.current) {
      socketRef.current.emit('admin-message', { message: message.trim() });
    }
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Chat</h1>
            <p className="text-gray-300">Enter password to access admin chat</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-white/30 focus:border-[#ff6100] focus:ring-2 focus:ring-[#ff6100]/20 transition-all duration-300 text-white placeholder-gray-300"
                placeholder="Enter admin password"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!isConnected}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#ff6100] to-orange-500 text-white rounded-2xl font-medium hover:from-[#ff6100]/90 hover:to-orange-500/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isConnected ? 'Login' : 'Connecting...'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Chat Dashboard</h1>
              <p className="text-gray-300 mt-1">Real-time customer support</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                adminStatus === 'connected' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {adminStatus === 'connected' ? '🟢 Online' : '🔴 Offline'}
              </div>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword('');
                  setChatMessages([]);
                }}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Notifications</h2>
              <p className="text-gray-300">
                {notificationsEnabled 
                  ? 'Enable or disable notifications for new customer messages.' 
                  : 'Enable notifications to get alerts for new customer messages.'
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsActive}
                  onChange={toggleNotifications}
                  className="sr-only"
                  disabled={!notificationsEnabled}
                />
                <div className="relative">
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
                  {notificationsActive ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div 
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-6"
          >
            <div className="space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p>No messages yet. Waiting for customer inquiries...</p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start space-x-3 ${msg.sender === 'admin' ? 'justify-end' : ''}`}
                  >
                    {msg.sender === 'user' && (
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">U</span>
                      </div>
                    )}
                    <div className={`flex-1 rounded-2xl p-4 shadow-lg ${
                      msg.sender === 'admin' 
                        ? 'bg-gradient-to-r from-[#ff6100] to-orange-500 text-white' 
                        : msg.sender === 'bot'
                        ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30'
                        : 'bg-white/20 text-white border border-white/20'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium opacity-70">
                          {msg.sender === 'admin' ? 'You' : msg.sender === 'bot' ? 'Bot' : msg.userName || 'Guest'}
                        </span>
                        <span className="text-xs opacity-50">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    {msg.sender === 'admin' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6100] to-orange-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">A</span>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-white/20">
            <div className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your response..."
                className="flex-1 px-6 py-4 rounded-2xl bg-white/20 border border-white/30 focus:border-[#ff6100] focus:ring-2 focus:ring-[#ff6100]/20 transition-all duration-300 text-white placeholder-gray-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-8 py-4 bg-gradient-to-r from-[#ff6100] to-orange-500 text-white rounded-2xl font-medium hover:from-[#ff6100]/90 hover:to-orange-500/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Send
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 