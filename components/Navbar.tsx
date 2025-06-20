'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Close menu on route change for reliability
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

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

  return (
    <>
      <Link href="/" legacyBehavior>
        <a style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 1001, mixBlendMode: 'difference', color: '#ffffff', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Herr Von Muellerhoff, cursive', fontSize: '5rem', fontWeight: '500' }}>
            e.st
          </span>
        </a>
      </Link>

      <header className="fixed top-0 left-0 right-0 z-[999] p-8 flex justify-end items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex flex-col items-center justify-center group focus:outline-none"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div className="relative w-8 h-8" style={{ mixBlendMode: 'difference' }}>
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
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-md flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <nav className="flex flex-col items-center space-y-8" onClick={(e) => e.stopPropagation()}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  variants={navLinkVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href={item.href} legacyBehavior>
                    <a
                      className="text-white text-3xl font-semibold tracking-wider transition-all duration-300 hover:text-white"
                      style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.4), 0 0 16px rgba(0, 255, 255, 0.4)' }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 