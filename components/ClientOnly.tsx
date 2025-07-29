'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/utils/deviceDetection';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일에서는 fallback 렌더링 (더 안전함)
  if (!hasMounted || isMobile) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ClientOnly; 