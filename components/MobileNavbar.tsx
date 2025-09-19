'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navItems = [
  { name: 'ABOUT US', href: '/mobile-about' },
  { name: 'SERVICES', href: '/mobile-services' },
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

// 모바일용 SquigglyLine 로고 컴포넌트
const MobileSquigglyLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 80; // 모바일에 적합한 크기
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;

    const PADDING = 10;
    const ANIMATION_SIZE = SIZE - (PADDING * 2);

    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 8;
      
      constructor() {
        this.initPoints();
      }
      
      initPoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: PADDING + Math.random() * ANIMATION_SIZE,
            y: PADDING + Math.random() * ANIMATION_SIZE,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      
      update() {
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.003 + point.offset) * 1.5;
          point.y += point.vy + Math.cos(Date.now() * 0.003 + point.offset) * 1.5;
          
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
            const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 8;
            const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 8;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
          }
        }
        ctx.stroke();
      }
    }

    const lines: SquigglyLine[] = [];
    for (let i = 0; i < 3; i++) {
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
      margin: '0 auto', 
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

export default function MobileNavbar() {
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
      {/* 좌상단 SquigglyLogo */}
      <Link href="/mobile" legacyBehavior>
        <a className="glitch-wrapper" style={{ 
          position: 'fixed', 
          top: '0.5rem', 
          left: '0.5rem', 
          zIndex: 9999, 
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

      {/* 우상단 햄버거 메뉴 */}
      <header className="fixed top-0 right-0 p-4 z-[9999]">
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

      {/* 메뉴 오버레이 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9998] bg-[#111]/80 backdrop-blur-md"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* 모바일용 이미지 영역 */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] pointer-events-none">
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

            {/* 네비게이션 링크들 */}
            <div className="w-full h-full flex items-center justify-end pr-8">
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
                        className="text-3xl font-serif tracking-widest transition-colors duration-300 text-white hover:text-orange-500"
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