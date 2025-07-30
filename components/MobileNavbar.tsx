import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useNavbarContext } from '../pages/_app';

// 데스크탑과 동일한 SquigglyLogo 컴포넌트 (크기만 조정)
const MobileSquigglyLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 60; // 모바일용 크기를 더 작게 조정
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;

    const PADDING = 8; // 패딩도 줄임
    const ANIMATION_SIZE = SIZE - (PADDING * 2);

    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 12; // 데스크탑과 동일
      
      constructor() {
        this.initPoints();
      }
      
      initPoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: PADDING + Math.random() * ANIMATION_SIZE,
            y: PADDING + Math.random() * ANIMATION_SIZE,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      
      update() {
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.003 + point.offset) * 2;
          point.y += point.vy + Math.cos(Date.now() * 0.003 + point.offset) * 2;
          
          // 경계 처리 - 데스크탑과 동일
          if (point.x < PADDING) { point.x = PADDING; point.vx *= -1; }
          else if (point.x > PADDING + ANIMATION_SIZE) { point.x = PADDING + ANIMATION_SIZE; point.vx *= -1; }
          if (point.y < PADDING) { point.y = PADDING; point.vy *= -1; }
          else if (point.y > PADDING + ANIMATION_SIZE) { point.y = PADDING + ANIMATION_SIZE; point.vy *= -1; }
        });
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = '#FF6100';
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (this.points.length > 0) {
          ctx.moveTo(this.points[0].x, this.points[0].y);
          for (let i = 0; i < this.points.length - 1; i++) {
            const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 6;
            const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 6;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
          }
        }
        ctx.stroke();
      }
    }

    const lines: SquigglyLine[] = [];
    for (let i = 0; i < 4; i++) { // 데스크탑과 동일
      lines.push(new SquigglyLine());
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      
      lines.forEach((line) => {
        line.update();
        line.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div style={{ 
      width: 60, 
      height: 60, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative', 
      pointerEvents: 'none' 
    }}>
      <canvas 
        ref={canvasRef} 
        width={60} 
        height={60} 
        style={{ 
          display: 'block', 
          background: 'transparent', 
          pointerEvents: 'none', 
          width: 60, 
          height: 60,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }} 
      />
    </div>
  );
};

const navItems = [
  { name: 'ABOUT US', href: '/mobile-about' },
  { name: 'SERVICES', href: '/mobile-services' },
  { name: 'BOOKING', href: '/mobile-booking' },
  { name: 'GALLERY', href: '/mobile-gallery-landing' },
  { name: 'CONTACT', href: '/mobile-contact' },
  { name: 'SUPPORT', href: '/mobile-support' },
];

const menuImages = [
  '/images/menu1.png',
  '/images/menu2.png',
  '/images/menu3.png',
  '/images/menu4.png',
  '/images/menu5.png',
];

const menuVariants = {
  open: {
    clipPath: 'circle(150% at 50% 0%)',
    transition: {
      duration: 1.2,
      ease: [0.83, 0, 0.17, 1],
    },
  },
  closed: {
    clipPath: 'circle(0% at 50% 0%)',
    transition: {
      duration: 1.2,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const navLinkVariants = {
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.4,
      ease: "easeOut"
    },
  }),
  closed: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.2
    }
  },
};

export default function MobileNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactMode, setContactMode] = useState<'chat' | 'email'>('chat');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const { isDesktopNavbarActive } = useNavbarContext();

  // 데스크탑용 네비바가 활성화되어 있으면 렌더링하지 않음 (하지만 모바일에서는 항상 렌더링)
  if (isDesktopNavbarActive && typeof window !== 'undefined' && window.innerWidth > 768) {
    return null;
  }

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const shuffled = [...menuImages].sort(() => Math.random() - 0.5);
      setShuffledImages(shuffled);
      setCurrentImageIndex(0);

      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % menuImages.length);
      }, 3000);

      router.events.on('routeChangeStart', handleRouteChange);

      return () => {
        clearInterval(intervalId);
        document.body.style.overflow = 'auto';
        router.events.off('routeChangeStart', handleRouteChange);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, router.events]);

  return (
    <>
      {/* 좌상단 SquigglyLogo - 데스크탑과 동일 */}
      <Link href="/" legacyBehavior>
        <a className="glitch-wrapper" style={{ 
          position: 'fixed', 
          top: '0.3rem', 
          left: '0.5rem', 
          zIndex: 1001, 
          mixBlendMode: 'difference', 
          color: '#ffffff', 
          textDecoration: 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.4))';
          e.currentTarget.style.mixBlendMode = 'screen';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.filter = 'none';
          e.currentTarget.style.mixBlendMode = 'difference';
        }}
        >
          <MobileSquigglyLogo />
        </a>
      </Link>

      {/* 우상단 햄버거 메뉴 - 데스크탑과 동일 */}
      <header className="fixed top-0 right-0 p-4 z-[1001]" style={{ mixBlendMode: 'difference' }}>
        <motion.div
          animate={{
            scale: isOpen ? 1.5 : 1,
            x: isOpen ? "-5vw" : 0,
            y: isOpen ? "5vh" : 0,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <motion.div
              className="absolute w-full h-full border border-white/80"
              style={{ borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute w-[95%] h-[95%] border-2 border-white"
              style={{ borderRadius: "60% 40% 55% 45% / 45% 55% 60% 40%" }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 6.67,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            />
            <motion.button
              data-menu-button
              data-menu-open={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center bg-transparent focus:outline-none rounded-full"
              whileHover={{ 
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label="Menu"
            >
              <div className="w-3 h-3 relative">
                <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '25%', right: 0, width: '80%' }}
                  animate={{ y: isOpen ? 4 : 0, rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '50%', right: 0, width: '80%' }}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '75%', right: 0, width: '80%' }}
                  animate={{ 
                    y: isOpen ? -4 : 0, 
                    rotate: isOpen ? -45 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* 메뉴 오버레이 - 데스크탑과 동일 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-[#111]/80 backdrop-blur-md"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* 이미지 슬라이드쇼 - 모바일용 크기 조정 */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 w-[40vw] h-[50vh] pointer-events-none">
              <AnimatePresence>
                {shuffledImages.length > 0 && (
                  <motion.div
                    key={currentImageIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  >
            <Image
                        src={shuffledImages[currentImageIndex]}
                        alt="Creative menu display"
                        layout="fill"
                        objectFit="cover"
              priority
            />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full h-full flex items-center justify-end pr-[10%]">
              <nav className="flex flex-col items-start space-y-4" onClick={(e) => e.stopPropagation()}>
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={navLinkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ overflow:'hidden' }}
                  >
                    <Link href={item.href} legacyBehavior>
                      <a
                        className="text-white text-2xl font-serif tracking-widest hover:text-orange-500 transition-colors duration-300"
                        style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 우하단 문의하기 아이콘 - 데스크탑과 동일 */}
      <div className="fixed bottom-4 right-4 z-50" style={{ mixBlendMode: 'difference' }}>
        <button
          className="w-10 h-10 rounded-full svg-glitch-wrapper text-white"
          onClick={() => setIsContactOpen(true)}
        >
          <div className="base-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
              <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="currentColor">?</text>
            </svg>
          </div>
          <div className="glitch-layer one">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
              <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="currentColor">?</text>
            </svg>
          </div>
          <div className="glitch-layer two">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
              <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="currentColor">?</text>
            </svg>
          </div>
        </button>
      </div>

      {/* 문의하기 모달 - 데스크탑 버전 */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            className="fixed inset-0 z-[1002] bg-black/80 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-lg mx-4 max-w-md w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* 헤더 */}
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">Contact Us</h3>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* 컨택트 옵션 */}
              <div className="flex p-4 border-b border-gray-700">
                <button
                  onClick={() => setContactMode('chat')}
                  className={`flex-1 py-2 px-4 rounded mr-2 font-medium transition-colors ${
                    contactMode === 'chat'
                      ? 'bg-gray-600 text-white border border-orange-500'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Live Chat
                </button>
                <button
                  onClick={() => setContactMode('email')}
                  className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
                    contactMode === 'email'
                      ? 'bg-gray-600 text-white border border-orange-500'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Email Us
                </button>
              </div>

              {/* 알림 설정 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm">Notifications are available</span>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* 상태 표시 */}
              <div className="flex items-center space-x-4 p-4 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-white text-sm">Connected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-white text-sm">Bot assistant active</span>
                </div>
              </div>

              {/* 채팅 영역 */}
              <div className="flex-1 p-4 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg">Start a conversation!</p>
                </div>
          </div>
          
              {/* 메시지 입력 */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (message.trim()) {
                        console.log('Message sent:', message);
                        setMessage('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 