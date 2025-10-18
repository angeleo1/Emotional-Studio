'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navItems = [
  { name: 'ABOUT US', href: '/about' },
  { name: 'SERVICES', href: '/services' },
  { name: 'GALLERY', href: '/gallery-landing' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'SUPPORT', href: '/support' },
];

const menuImages = [
  '/images/menu1.png',
  '/images/menu2.png',
  '/images/menu3.png',
  '/images/menu11.png',
  '/images/menu12.png',
  '/images/menu13.png',
];

const menuVariants = {
  open: {
    clipPath: 'circle(150% at 50% 0%)',
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  closed: {
    clipPath: 'circle(0% at 50% 0%)',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const navLinkVariants = {
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05 + 0.15,
      duration: 0.2,
      ease: "easeOut"
    },
  }),
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.15
    }
  },
};

// 주황색 SquigglyLine 로고 컴포넌트 (어바웃어스 페이지와 동일)
const SquigglyLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 어바웃어스 페이지와 동일한 방식으로 구현
    const SIZE = 160; // 네비바에 적합한 크기
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;

    // 애니메이션 영역을 줄여서 잘림 방지
    const PADDING = 20; // 경계에서 20px 여백
    const ANIMATION_SIZE = SIZE - (PADDING * 2); // 실제 애니메이션 영역

    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 12; // 8에서 12로 늘림
      
      constructor() {
        this.initPoints();
      }
      
      initPoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: PADDING + Math.random() * ANIMATION_SIZE, // 여백을 고려한 시작 위치
            y: PADDING + Math.random() * ANIMATION_SIZE,
            vx: (Math.random() - 0.5) * 2, // 속도를 줄임
            vy: (Math.random() - 0.5) * 2,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      
      update() {
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.003 + point.offset) * 2; // 움직임을 줄임
          point.y += point.vy + Math.cos(Date.now() * 0.003 + point.offset) * 2;
          
          // 경계 처리 - 여백을 고려한 경계
          if (point.x < PADDING) { point.x = PADDING; point.vx *= -1; }
          else if (point.x > PADDING + ANIMATION_SIZE) { point.x = PADDING + ANIMATION_SIZE; point.vx *= -1; }
          if (point.y < PADDING) { point.y = PADDING; point.vy *= -1; }
          else if (point.y > PADDING + ANIMATION_SIZE) { point.y = PADDING + ANIMATION_SIZE; point.vy *= -1; }
        });
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = '#FF6100'; // 흰색에서 주황색으로 변경
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (this.points.length > 0) {
          ctx.moveTo(this.points[0].x, this.points[0].y);
          for (let i = 0; i < this.points.length - 1; i++) {
            const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 10; // 곡선 정도를 줄임
            const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 10;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
          }
        }
        ctx.stroke();
      }
    }

    const lines: SquigglyLine[] = [];
    for (let i = 0; i < 4; i++) { // 3에서 4로 늘림
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
      width: 160, 
      height: 160, 
      margin: '0 auto', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative', 
      pointerEvents: 'none' 
    }}>
      <canvas 
        ref={canvasRef} 
        width={160} 
        height={160} 
        style={{ 
          display: 'block', 
          background: 'transparent', 
          pointerEvents: 'none', 
          width: 160, 
          height: 160,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          // mixBlendMode 제거
        }} 
      />
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

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
      <Link href="/" legacyBehavior>
        <a className="glitch-wrapper" style={{ 
          position: 'fixed', 
          top: '2rem', 
          left: '4rem', 
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
          <SquigglyLogo />
        </a>
      </Link>

      <header className="fixed top-0 right-0 p-12 z-[1001]" style={{ mixBlendMode: 'difference' }}>
        <motion.div
          animate={{
            scale: isOpen ? 1.5 : 1,
            x: isOpen ? "-5vw" : 0,
            y: isOpen ? "5vh" : 0,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative w-20 h-20 flex items-center justify-center">
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
              className="relative w-16 h-16 flex items-center justify-center bg-transparent focus:outline-none rounded-full"
              whileHover={{ 
                  scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label="Menu"
            >
              <div className="w-6 h-6 relative">
                {/* Top Line */}
              <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '25%', right: 0, width: '80%' }}
                  animate={{ y: isOpen ? 6 : 0, rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
              />
                {/* Middle Line */}
              <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '50%', right: 0, width: '80%' }}
                animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
              />
                {/* Bottom Line */}
              <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '75%', right: 0, width: '80%' }}
                  animate={{ 
                      y: isOpen ? -6 : 0, 
                      rotate: isOpen ? -45 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
            </motion.button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-[#111]/80 backdrop-blur-md"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="fixed left-48 top-1/2 -translate-y-1/2 w-[25vw] h-[70vh] pointer-events-none">
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
                      src={shuffledImages[currentImageIndex] || '/images/menu1.png'}
                      alt="Creative menu display"
                      layout="fill"
                      objectFit="cover"
                      priority
                      onError={(e) => {
                        console.error('Image failed to load:', shuffledImages[currentImageIndex]);
                        e.currentTarget.src = '/images/menu1.png';
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full h-full flex items-center justify-end pr-[20%]">
              <nav className="flex flex-col items-start space-y-6" onClick={(e) => e.stopPropagation()}>
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
                        className="text-white text-5xl font-serif tracking-widest hover:text-orange-500 transition-colors duration-300"
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
      
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
        
        .font-serif {
          font-family: 'Libre Baskerville', serif;
        }
        .glitch-wrapper, .glitch {
          transition: color 0.1s;
        }
        .glitch-wrapper:hover .glitch {
          color: transparent;
        }
      `}</style>
    </>
  );
} 