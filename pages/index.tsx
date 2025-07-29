import { useState, useEffect } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import MobileIntro from '@/components/MobileIntro';
import { isMobileDevice } from '@/utils/deviceDetection';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) {
    return null; // SSR 중에는 아무것도 렌더링하지 않음
  }

  return isMobile ? (
    <MobileIntro onFinish={() => {}} />
  ) : (
    <IntroAnimation onFinish={() => {}} />
  );
} 