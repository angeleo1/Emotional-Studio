import { useState, useEffect, useRef } from 'react'
import Pusher from 'pusher-js'
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
        tag: 'admin-chat-notification'
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
    // 기존 연결이 있으면 정리
    if (pusherRef.current) {
      pusherRef.current.disconnect();
      pusherRef.current = null;
    }

    // Pusher 클라이언트 초기화 (실제 키 사용)
    pusherRef.current = new Pusher('d3e0b683cba4fc0f7708', {
      cluster: 'ap1',
      forceTLS: true
    });

    // 채널 구독
    channelRef.current = pusherRef.current.subscribe('emotional-studios-chat');

    // 연결 상태 확인
    pusherRef.current.connection.bind('connected', () => {
      console.log('Admin connected to Pusher');
      setIsConnected(true);
    });

    pusherRef.current.connection.bind('disconnected', () => {
      console.log('Admin disconnected from Pusher');
      setIsConnected(false);
      setAdminStatus('disconnected');
    });

    // 새 메시지 수신
    channelRef.current.bind('new-message', (messageData) => {
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

      // 내가 보낸 메시지가 아닌 경우에만 알림
      if (messageData.sender !== 'admin') {
        showNotification(
          'New Message',
          `${messageData.sender === 'user' ? (messageData.userName || 'Guest') : 'Bot'}: ${messageData.message.substring(0, 50)}${messageData.message.length > 50 ? '...' : ''}`
        );
        playNotificationSound();
      }
    });

    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect();
        pusherRef.current = null;
      }
    };
  }, [notificationsEnabled]);

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setAdminStatus('connected');
    } else {
      alert('Authentication failed. Please check your password.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !isConnected) return;

    const adminMessage = {
      message: message,
      sender: 'admin',
      type: 'chat',
      adminName: 'Emotional Studios Support'
    };

    try {
      const response = await fetch('/api/pusher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminMessage),
      });

      if (response.ok) {
        setMessage('');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-300">Enter your password to access the admin panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
            >
              Login
            </button>
          </form>
        </div>
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
              <h1 className="text-3xl font-bold text-white mb-2">Admin Chat Panel</h1>
              <p className="text-gray-300">Manage customer conversations in real-time</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className={isConnected ? 'text-green-400' : 'text-red-400'} text-sm>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-blue-400 text-sm">Admin Online</span>
              </div>
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
                <span className="ml-3 text-sm font-medium text-white">
                  {notificationsActive ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-6 space-y-4"
          >
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg">No messages yet</p>
                <p className="text-sm">Customer messages will appear here</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.sender === 'admin'
                        ? 'bg-blue-500 text-white'
                        : msg.sender === 'user'
                        ? 'bg-gray-600 text-white'
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    <div className="text-xs opacity-75 mb-1">
                      {msg.sender === 'admin' ? 'You' : 
                       msg.sender === 'user' ? (msg.userName || 'Customer') : 'Bot'}
                    </div>
                    <div className="text-sm">{msg.message}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isConnected ? "Type your response..." : "Connecting..."}
                disabled={!isConnected}
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!message.trim() || !isConnected}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-2xl font-medium transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 