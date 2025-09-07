// Booking 모듈 활성화/비활성화 설정
export const BOOKING_CONFIG = {
  // 이 값을 false로 설정하면 booking 모듈이 비활성화됩니다
  ENABLED: true,
  
  // 비활성화 시 표시할 메시지
  DISABLED_MESSAGE: {
    ko: '현재 예약 서비스가 일시적으로 중단되었습니다. 문의사항이 있으시면 연락주세요.',
    en: 'Booking service is temporarily unavailable. Please contact us for inquiries.',
    zh: '预订服务暂时不可用。如有疑问请联系我们。'
  }
};

// 환경 변수로도 제어 가능하도록 설정
export const isBookingEnabled = () => {
  // 환경 변수가 있으면 환경 변수 우선, 없으면 설정 파일 값 사용
  const envEnabled = process.env.NEXT_PUBLIC_BOOKING_ENABLED;
  if (envEnabled !== undefined) {
    return envEnabled === 'true';
  }
  return BOOKING_CONFIG.ENABLED;
};
