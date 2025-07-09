'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navItems = [
  { name: 'ABOUT US', href: '/about' },
  { name: 'SERVICES', href: '/services' },
  { name: 'BOOKING', href: '/booking' },
  { name: 'GALLERY', href: '/gallery-landing' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'SUPPORT', href: '/support' },
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
        <a className="glitch-wrapper" style={{ position: 'fixed', top: '-5rem', left: '4rem', zIndex: 1001, mixBlendMode: 'difference', color: '#ffffff', textDecoration: 'none' }}>
          <span 
            className="glitch"
            data-text="e.st"
            style={{ fontFamily: 'Herr Von Muellerhoff, cursive', fontSize: '13.61rem', fontWeight: '500', padding: '0 4rem', transition: 'color 0.1s' }}
          >
            e.st
          </span>
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