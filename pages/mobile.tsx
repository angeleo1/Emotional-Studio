import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';

// 데스크탑과 동일한 SquigglyLogo 컴포넌트 (크기만 조정)
const MobileSquigglyLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 80; // 모바일용 크기
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;

    const PADDING = 10;
    const ANIMATION_SIZE = SIZE - (PADDING * 2);

    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 12;
      
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
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (this.points.length > 0) {
          ctx.moveTo(this.points[0].x, this.points[0].y);
          for (let i = 0; i < this.points.length - 1; i++) {
            const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 5;
            const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 5;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
          }
        }
        ctx.stroke();
      }
    }

    const lines: SquigglyLine[] = [];
    for (let i = 0; i < 4; i++) {
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
      width: 80, 
      height: 80, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative', 
      pointerEvents: 'none' 
    }}>
      <canvas 
        ref={canvasRef} 
        width={80} 
        height={80} 
        style={{ 
          display: 'block', 
          background: 'transparent', 
          pointerEvents: 'none', 
          width: 80, 
          height: 80,
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

export default function MobilePage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactMode, setContactMode] = useState<'chat' | 'email'>('chat');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로딩 완료 후 로딩 상태 해제
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  // 로딩 중일 때 로딩 화면 표시
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Emotional Studios - Mobile</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4 font-fallback" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}>
              emotional studios
            </div>
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Emotional Studios - Mobile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* 폰트 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400&family=Borel&display=swap" rel="stylesheet" />
        
        {/* CS-Valcon-Drawn 폰트 preload */}
        <link 
          rel="preload" 
          href="/fonts/CS-Valcon-Drawn-akhr7k/CS%20Valcon%20Drawn/CSValconDrawn-Regular.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/CS-Valcon-Drawn-akhr7k/CS%20Valcon%20Drawn/CSValconDrawn-Regular.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
      </Head>
      <div className="min-h-screen bg-[#111] text-white relative overflow-hidden">
        {/* 좌상단 SquigglyLogo - 데스크탑과 동일 */}
        <Link href="/" legacyBehavior>
          <a className="glitch-wrapper" style={{ 
            position: 'fixed', 
            top: '0.5rem', 
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
        <header className="fixed top-0 right-0 p-6 z-[1001]" style={{ mixBlendMode: 'difference' }}>
          <motion.div
            animate={{
              scale: isOpen ? 1.5 : 1,
              x: isOpen ? "-5vw" : 0,
              y: isOpen ? "5vh" : 0,
            }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
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
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex items-center justify-center bg-transparent focus:outline-none rounded-full"
                whileHover={{ 
                  scale: 1.1
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                aria-label="Menu"
              >
                <div className="w-4 h-4 relative">
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
                          className="text-white text-2xl font-serif tracking-widest hover:text-orange-500 transition-colors duration-300 font-fallback"
                          style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", "Impact", sans-serif' }}
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
        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="w-10 h-10 rounded-full svg-glitch-wrapper text-white"
            onClick={() => setIsContactOpen(true)}
          >
            <div className="base-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="2"/>
                <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white">?</text>
              </svg>
            </div>
            <div className="glitch-layer one">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="2"/>
                <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white">?</text>
              </svg>
            </div>
            <div className="glitch-layer two">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="2"/>
                <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white">?</text>
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
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6100]"
                    />
                    <button
                      onClick={() => {
                        if (message.trim()) {
                          console.log('Message sent:', message);
                          setMessage('');
                        }
                      }}
                      className="px-4 py-2 bg-[#FF6100] text-white rounded hover:bg-[#e55a00] transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 메인 컨텐츠 */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white text-center leading-none tracking-wider select-none mb-8 px-4 font-fallback"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", "Impact", sans-serif',
              letterSpacing: '0.08em',
              wordBreak: 'break-word',
              hyphens: 'auto',
              textRendering: 'optimizeLegibility'
            }}
          >
            emotional studios
          </h1>
        </div>



        {/* 버튼 영역 - 하단으로 이동, 겹침 완전 해결 */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 px-4 w-full max-w-sm sm:max-w-md">
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            {/* 첫 번째 줄: Pose Guide, Our Elixirs - 작은 크기 */}
            <div className="flex gap-3 sm:gap-4">
              <span className="glitch-button-wrapper flex-1">
              <button
                  className="glitch-button w-full"
                  style={{
                    background: 'none',
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.75em 1em',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    height: '2.5rem',
                    minHeight: '2.5rem',
                    maxHeight: '2.5rem',
                  }}
                  onClick={() => { router.push('/mobile-pose-guide'); }}
                >
                  <span className="glitch" data-text="Pose Guide" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", "Impact", sans-serif', fontSize: '0.875rem' }}>Pose Guide</span>
              </button>
              </span>
              <span className="glitch-button-wrapper flex-1">
              <button
                  className="glitch-button w-full"
                  style={{
                    background: 'none',
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.75em 1em',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    height: '2.5rem',
                    minHeight: '2.5rem',
                    maxHeight: '2.5rem',
                  }}
                  onClick={() => { router.push('/mobile-elixirs'); }}
                >
                  <span className="glitch" data-text="Our Elixirs" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", "Impact", sans-serif', fontSize: '0.875rem' }}>Our Elixirs</span>
              </button>
              </span>
            </div>
              
            {/* 두 번째 줄: Collaboration, Booking - 중간 크기 */}
            <div className="flex gap-3 sm:gap-4">
              <span className="glitch-button-wrapper" style={{ width: 'calc(50% - 0.375rem)' }}>
              <button
                  className="glitch-button w-full"
                  style={{
                    background: 'none',
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.75em 0.75em',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    height: '2.5rem',
                    minHeight: '2.5rem',
                    maxHeight: '2.5rem',
                    minWidth: '120px',
                  }}
                  onClick={() => { router.push('/mobile-collaboration'); }}
                >
                  <span className="glitch" data-text="Collaboration" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", "Impact", sans-serif', fontSize: '0.875rem' }}>Collaboration</span>
              </button>
              </span>
              <span className="glitch-button-wrapper" style={{ width: 'calc(50% - 0.375rem)' }}>
              <button
                  className="glitch-button w-full"
                  style={{
                    background: 'none',
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.75em 0.75em',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    height: '2.5rem',
                    minHeight: '2.5rem',
                    maxHeight: '2.5rem',
                    minWidth: '120px',
                  }}
                  onClick={() => { router.push('/mobile-booking'); }}
                >
                  <span className="glitch" data-text="Booking" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", "Impact", sans-serif', fontSize: '0.875rem' }}>Booking</span>
              </button>
              </span>
            </div>
              
            {/* 세 번째 줄: emotional Moments (중앙 정렬) - 큰 크기 */}
            <div className="flex justify-center">
              <span className="glitch-button-wrapper">
              <button
                  className="glitch-button"
                  style={{
                    background: 'none',
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.75em 2em',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    height: '2.5rem',
                    minHeight: '2.5rem',
                    maxHeight: '2.5rem',
                  }}
                  onClick={() => { router.push('/mobile-gallery-landing'); }}
                >
                  <span className="glitch" data-text="emotional Moments" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", "Impact", sans-serif', fontSize: '0.875rem' }}>emotional Moments</span>
              </button>
              </span>
            </div>
          </div>
          </div>

        {/* 상단 우측: since Oct.2025 - 햄버거 메뉴 밑으로 이동 */}
        <div className="absolute top-20 right-2 sm:right-4 text-xs sm:text-sm font-normal tracking-wider select-none pointer-events-none z-10 flex flex-col items-end gap-1 px-2">
          <span className="text-[#FF6100] opacity-100">since </span>
          <span className="text-gray-400 opacity-100">Oct.2025</span>
          <span className="text-white opacity-100 font-bold text-sm sm:text-base tracking-tight">
            The First Project of emotional
          </span>
        </div>

        {/* 하단 중앙: Private Self-Studio in Melbourne - 살짝 위로 이동 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-normal tracking-wider z-10 select-none pointer-events-none px-4 text-center">
          Private Self-Studio in Melbourne
          </div>

        {/* SNS 아이콘 */}
        <div className="absolute bottom-4 left-4 flex gap-3 z-10">
          <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
            <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer one" style={{ color: '#00ffff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
          </a>

        </div>
      </div>

      <MobileContactButton />
      
      {/* Floating Book Button */}
      
    </>
  );
} 