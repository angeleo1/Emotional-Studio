import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { SquigglyLogo } from '@/components/ui/SquigglyLogo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const menuItems = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Pose Guide', href: '/pose-guide' },
    { name: 'Tips', href: '/tips' },
    { name: 'Elixirs', href: '/elixirs' },
    { name: 'Support', href: '/support' }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <>
      {/* Logo - 기존 디자인 유지하되 모바일에서만 mixBlendMode 조정 */}
      <Link href="/" legacyBehavior>
        <a 
          className="glitch-wrapper" 
          style={{ 
            position: 'fixed', 
            top: isMobile ? '1rem' : '2rem', 
            left: isMobile ? '1rem' : '4rem', 
            zIndex: 1001, 
            mixBlendMode: isMobile ? 'normal' : 'difference', 
            color: '#ffffff', 
            textDecoration: 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
            borderRadius: isMobile ? '8px' : '0',
            padding: isMobile ? '8px' : '0'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.4))';
              e.currentTarget.style.mixBlendMode = 'screen';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
              e.currentTarget.style.mixBlendMode = 'difference';
            }
          }}
        >
          <SquigglyLogo size={isMobile ? 80 : 120} />
        </a>
      </Link>

      {/* Menu Button - 기존 디자인 유지하되 모바일에서만 mixBlendMode 조정 */}
      <header 
        className={`fixed top-0 right-0 z-[1001] ${isMobile ? 'p-4' : 'p-12'}`} 
        style={{ 
          mixBlendMode: isMobile ? 'normal' : 'difference',
          backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          borderRadius: isMobile ? '8px' : '0'
        }}
      >
        <motion.div
          animate={{
            scale: isOpen ? 1.5 : 1,
            x: isOpen ? "-5vw" : 0,
            y: isOpen ? "5vh" : 0,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={`relative flex items-center justify-center ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}>
            {/* 외부 초점 링 */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* 중간 초점 링 */}
            <motion.div
              className="absolute inset-1 rounded-full border border-white/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, -180]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            {/* 내부 초점 링 */}
            <motion.div
              className="absolute inset-2 rounded-full border border-white/40"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 90]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            {/* 펄스 효과 */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative flex items-center justify-center bg-transparent focus:outline-none rounded-full ${isMobile ? 'w-16 h-16' : 'w-16 h-16'}`}
              style={{
                minWidth: isMobile ? '48px' : '48px',
                minHeight: isMobile ? '48px' : '48px',
                touchAction: 'manipulation'
              }}
              whileHover={{ 
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label="Menu"
            >
              <div className={`relative ${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`}>
                <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '25%', right: 0, width: '80%' }}
                  animate={{ y: isOpen ? 6 : 0, rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '50%', right: 0, width: '80%' }}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.span
                  className="block absolute h-0.5 bg-white rounded-full"
                  style={{ top: '75%', right: 0, width: '80%' }}
                  animate={{ y: isOpen ? -6 : 0, rotate: isOpen ? -45 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Menu Overlay - 기존 디자인 유지 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#111]/80 backdrop-blur-md"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex items-center justify-center min-h-screen p-8">
              <motion.div
                className="text-center space-y-6"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {menuItems.map((item, index) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link href={item.href} legacyBehavior>
                      <a
                        className={`text-white font-serif tracking-widest hover:text-orange-500 transition-colors duration-300 ${isMobile ? 'text-3xl' : 'text-5xl'}`}
                        style={{ 
                          fontFamily: 'CS-Valcon-Drawn-akhr7k',
                          minHeight: isMobile ? '48px' : 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: isMobile ? '12px 0' : '0',
                          touchAction: 'manipulation'
                        }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;