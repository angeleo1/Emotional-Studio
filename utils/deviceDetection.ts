export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // 서버 사이드에서는 false 반환
  }

  // 화면 크기 기반 감지
  const isMobileBySize = window.innerWidth < 768;
  
  // User-Agent 기반 감지
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobileByUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  
  // 터치 지원 여부 확인
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // 세 가지 조건 중 하나라도 만족하면 모바일로 판단
  return isMobileBySize || isMobileByUserAgent || isTouchDevice;
};

export const isTabletDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /ipad|android(?=.*\b(?!.*mobile))/i.test(userAgent.toLowerCase());
};

export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (isMobileDevice()) {
    return isTabletDevice() ? 'tablet' : 'mobile';
  }
  return 'desktop';
}; 