import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const FloatingBookButton = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // booking 페이지에서는 버튼 숨기기
  useEffect(() => {
    if (router.pathname === '/booking' || router.pathname === '/mobile-booking') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [router.pathname]);

  const handleBookNow = () => {
    // 데스크탑인지 모바일인지 확인하여 적절한 페이지로 이동
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      router.push('/mobile-booking');
    } else {
      router.push('/booking');
    }
  };

  if (!isVisible || isMobile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '15rem',
        left: '3rem',
        zIndex: 9999
      }}
    >
      <button
        onClick={handleBookNow}
        className="floating-book-btn"
        style={{
          fontSize: '1.9rem',
          padding: '1.12rem 3.08rem',
          minWidth: '240px'
        }}
      >
        Book Now
      </button>
    </motion.div>
  );
};

export default FloatingBookButton;
