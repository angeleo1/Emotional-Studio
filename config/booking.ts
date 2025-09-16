// 예약 시스템 활성화/비활성화 설정
export function isBookingEnabled(): boolean {
  // 환경변수에서 예약 활성화 여부 확인
  const bookingEnabled = process.env.NEXT_PUBLIC_BOOKING_ENABLED;
  
  // 기본값은 false (비활성화)
  if (bookingEnabled === undefined) {
    return false;
  }
  
  // 문자열을 boolean으로 변환
  return bookingEnabled.toLowerCase() === 'true';
}

// 예약 비활성화 메시지 설정
export const BOOKING_CONFIG = {
  DISABLED_MESSAGE: {
    en: "We're currently updating our booking system to provide you with a better experience. Please check back soon or contact us directly for immediate assistance.",
    ko: "더 나은 서비스를 위해 예약 시스템을 업데이트 중입니다. 곧 다시 확인해 주시거나 직접 문의해 주세요.",
    zh: "我们正在更新预订系统以提供更好的体验。请稍后再查看或直接联系我们以获得即时帮助。"
  }
};