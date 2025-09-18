import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isBookingEnabled } from '../../config/booking';
import SimplyBookWidget from '../SimplyBookWidget';

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
    if (router.pathname === '/booking' || router.pathname === '/mobile-booking' || router.pathname === '/booking-backup') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [router.pathname]);

  // booking이 비활성화된 경우 버튼을 숨김
  if (!isVisible || !isBookingEnabled()) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '0.5rem',
        zIndex: 9999
      }}
    >
      <SimplyBookWidget />
    </div>
  );
};

export default FloatingBookButton;
