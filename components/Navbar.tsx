'use client';

import { useState, useEffect, useRef } from 'react';
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  const menuImages = [
    '/images/menu1.png',
    '/images/menu2.png',
    '/images/menu3.png',
    '/images/menu4.png',
    '/images/menu5.png',
  ];

  // Close menu on route change for reliability
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (isOpen) {
      const shuffled = [...menuImages].sort(() => Math.random() - 0.5);
      setShuffledImages(shuffled);
      setCurrentImageIndex(0);

      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % menuImages.length);
      }, 3000); // Change image every 3 seconds

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isOpen]);

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.2,
        duration: 0.3,
      },
    }),
  };

  const xButtonVariants = {
    rest: { scale: 1, boxShadow: '0 0 0px rgba(0,0,0,0)' },
    hover: {
      scale: 1.1,
      boxShadow: '0 0 15px rgba(0, 255, 255, 0.9), 0 0 30px rgba(255, 0, 255, 0.9)',
      transition: { duration: 0.2 },
    },
  };
  const baseIconVariants = {
    rest: { opacity: 1 },
    hover: { opacity: 0, transition: { duration: 0.1 } },
  };
  const glitchLayer1Variants = {
    rest: { opacity: 0, x: 0 },
    hover: {
      opacity: 1,
      x: [-5, 5, -5, 5, -5, -2],
      transition: { duration: 0.4, ease: 'linear' },
    },
  };
  const glitchLayer2Variants = {
    rest: { opacity: 0, x: 0 },
    hover: {
      opacity: 1,
      x: [5, -5, 5, -5, 5, 2],
      transition: { duration: 0.4, ease: 'linear' },
    },
  };

  const XIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <>
      <Link href="/" legacyBehavior>
        <a className="glitch-wrapper" style={{ position: 'fixed', top: '-8rem', left: '4rem', zIndex: 1001, mixBlendMode: 'difference', color: '#ffffff', textDecoration: 'none' }}>
          <span 
            className="glitch" 
            data-text="e.st"
            style={{ fontFamily: 'Herr Von Muellerhoff, cursive', fontSize: '20rem', fontWeight: '500', padding: '0 4rem' }}
          >
            e.st
          </span>
        </a>
      </Link>

      <header className="fixed top-0 left-0 right-0 z-[999] py-16 pl-8 pr-24 flex justify-end items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex flex-col items-center justify-center group focus:outline-none"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div className="relative w-8 h-8 hamburger-glitch-wrapper" style={{ mixBlendMode: 'difference' }}>
            {/* Base Icon - always visible unless open */}
            <div className="base-icon">
              <motion.span
                className="block absolute h-1 w-full bg-white rounded-full"
                style={{ top: '25%' }}
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block absolute h-1 w-full bg-white rounded-full"
                style={{ top: '50%' }}
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block absolute h-1 w-full bg-white rounded-full"
                style={{ top: '75%', transform: 'translateY(-100%)' }}
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Glitch Layers - visible only on hover */}
            <div className="hamburger-glitch-layer-1 absolute inset-0" style={{ color: '#00ffff' }}>
               <span className="block absolute h-1 w-full bg-current rounded-full" style={{ top: '25%' }} />
               <span className="block absolute h-1 w-full bg-current rounded-full" style={{ top: '75%', transform: 'translateY(-100%)' }} />
            </div>
             <div className="hamburger-glitch-layer-2 absolute inset-0" style={{ color: '#ff00ff' }}>
               <span className="block absolute h-1 w-full bg-current rounded-full" style={{ top: '50%' }} />
            </div>
          </div>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[1000] bg-black/[.35] backdrop-blur-md flex items-center justify-end pr-[26rem]"
            onClick={() => setIsOpen(false)}
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

            <nav className="flex flex-col items-center space-y-8" onClick={(e) => e.stopPropagation()}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  variants={navLinkVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="glitch-wrapper">
                    <Link href={item.href} legacyBehavior>
                      <a
                        className="glitch text-white text-3xl font-semibold tracking-wider"
                        data-text={item.name}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </nav>
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-40 right-[29.5rem] w-12 h-12 rounded-full bg-transparent border border-white/20 flex items-center justify-center"
              aria-label="Close menu"
              variants={xButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  className="base-icon absolute inset-0 text-white"
                  variants={baseIconVariants}
                >
                  <XIcon />
                </motion.div>
                <motion.div
                  className="glitch-layer one absolute inset-0 text-[#00ffff]"
                  variants={glitchLayer1Variants}
                >
                  <XIcon />
                </motion.div>
                <motion.div
                  className="glitch-layer two absolute inset-0 text-[#ff00ff]"
                  variants={glitchLayer2Variants}
                >
                  <XIcon />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        /* --- Shared Glitch Logic --- */
        .glitch-wrapper, .glitch-button {
          position: relative;
        }
        
        /* --- Text Glitch --- */
        .glitch {
          position: relative;
          color: white;
          transition: color 0.1s ease-in-out;
        }
        .glitch-wrapper:hover .glitch {
          color: transparent;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          opacity: 0;
          mix-blend-mode: screen;
        }
        .glitch-wrapper:hover .glitch::before,
        .glitch-wrapper:hover .glitch::after {
          opacity: 1;
        }
        .glitch::before {
          color: rgba(0, 255, 255, 0.8);
        }
        .glitch::after {
          color: rgba(255, 0, 255, 0.8);
        }
        .glitch-wrapper:hover .glitch::before {
          animation: glitch-final-1 0.4s 1 forwards;
        }
        .glitch-wrapper:hover .glitch::after {
          animation: glitch-final-2 0.4s 1 forwards;
        }

        /* --- Button Glitch --- */
        .glitch-button {
          transition: all 0.2s ease-in-out;
        }
        .glitch-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.9), 0 0 30px rgba(255, 0, 255, 0.9);
        }
        .base-icon {
          transition: opacity 0.1s ease-in-out;
        }
        .glitch-button:hover .base-icon {
          opacity: 0;
        }
        .glitch-layer {
          opacity: 0;
          mix-blend-mode: screen;
        }
        .glitch-button:hover .glitch-layer {
          opacity: 1;
        }
        .glitch-button:hover .glitch-layer.one {
          animation: glitch-button-1 0.4s 1 forwards;
        }
        .glitch-button:hover .glitch-layer.two {
          animation: glitch-button-2 0.4s 1 forwards;
        }

        /* --- Text Keyframes --- */
        @keyframes glitch-final-1 {
          0%   { transform: translateX(0); clip-path: inset(40% 0 61% 0); }
          10%  { transform: translateX(-5px); clip-path: inset(8% 0 91% 0); }
          20%  { transform: translateX(5px); clip-path: inset(81% 0 14% 0); }
          30%  { transform: translateX(-5px); clip-path: inset(33% 0 60% 0); }
          40%  { transform: translateX(5px); clip-path: inset(40% 0 54% 0); }
          50%  { transform: translateX(-5px); clip-path: inset(92% 0 2% 0); }
          60%  { transform: translateX(5px); clip-path: inset(21% 0 72% 0); }
          70%  { transform: translateX(-5px); clip-path: inset(55% 0 37% 0); }
          80%  { transform: translateX(5px); clip-path: inset(26% 0 63% 0); }
          90%  { transform: translateX(-5px); clip-path: inset(93% 0 5% 0); }
          100% { transform: translateX(-2px); clip-path: inset(0); }
        }
        @keyframes glitch-final-2 {
          0%   { transform: translateX(0); clip-path: inset(72% 0 21% 0); }
          10%  { transform: translateX(5px); clip-path: inset(93% 0 4% 0); }
          20%  { transform: translateX(-5px); clip-path: inset(36% 0 58% 0); }
          30%  { transform: translateX(5px); clip-path: inset(21% 0 70% 0); }
          40%  { transform: translateX(-5px); clip-path: inset(88% 0 2% 0); }
          50%  { transform: translateX(5px); clip-path: inset(2% 0 95% 0); }
          60%  { transform: translateX(-5px); clip-path: inset(62% 0 31% 0); }
          70%  { transform: translateX(5px); clip-path: inset(9% 0 84% 0); }
          80%  { transform: translateX(-5px); clip-path: inset(59% 0 35% 0); }
          90%  { transform: translateX(5px); clip-path: inset(3% 0 91% 0); }
          100% { transform: translateX(2px); clip-path: inset(0); }
        }

        /* --- Button Keyframes --- */
        @keyframes glitch-button-1 {
          0%   { transform: translateX(0); }
          10%  { transform: translateX(-5px); }
          20%  { transform: translateX(5px); }
          30%  { transform: translateX(-5px); }
          40%  { transform: translateX(5px); }
          50%  { transform: translateX(-5px); }
          60%  { transform: translateX(5px); }
          70%  { transform: translateX(-5px); }
          80%  { transform: translateX(5px); }
          90%  { transform: translateX(-5px); }
          100% { transform: translateX(-2px); }
        }
        @keyframes glitch-button-2 {
          0%   { transform: translateX(0); }
          10%  { transform: translateX(5px); }
          20%  { transform: translateX(-5px); }
          30%  { transform: translateX(5px); }
          40%  { transform: translateX(-5px); }
          50%  { transform: translateX(5px); }
          60%  { transform: translateX(-5px); }
          70%  { transform: translateX(5px); }
          80%  { transform: translateX(-5px); }
          90%  { transform: translateX(5px); }
          100% { transform: translateX(2px); }
        }
      `}</style>
    </>
  );
} 