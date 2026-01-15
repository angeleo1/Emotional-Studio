import { useEffect, useRef } from 'react';
import { BOOKING_CONFIG } from '../config/booking';

interface SquareBookingWidgetProps {
  className?: string;
}

export default function SquareBookingWidget({ className = '' }: SquareBookingWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Square 위젯 스크립트 로드
    const scriptUrl = BOOKING_CONFIG.SQUARE.WIDGET_SCRIPT_URL;

    // 실제 URL이 설정되지 않았거나 플레이스홀더인 경우 경고
    if (scriptUrl.includes('YOUR_SQUARE_WIDGET_ID')) {
      console.warn('Square Widget Script URL is not configured properly in config/booking.ts');
      return;
    }

    const scriptId = 'square-booking-widget-script';

    // 스크립트가 이미 있는지 확인
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.id = scriptId;
      script.async = true;
      script.onload = () => {
        console.log('Square booking widget loaded');
      };
      script.onerror = () => {
        console.error('Failed to load Square booking widget');
      };

      // widgetRef가 가리키는 요소에 추가하거나 body에 추가
      // Square 위젯은 보통 스크립트가 로드된 위치에 렌더링되거나 특정 클래스를 찾음
      if (widgetRef.current) {
        widgetRef.current.appendChild(script);
      }
    }

    return () => {
      // 필요한 경우 정리
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      className={`square-booking-widget ${className}`}
      style={{ minHeight: '50px' }}
    >
      {/* 설정이 안되어 있을 때 표시할 내용 (개발용) */}
      {BOOKING_CONFIG.SQUARE.WIDGET_SCRIPT_URL.includes('YOUR_SQUARE_WIDGET_ID') && (
        <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">
          Square Booking Widget ID not configured. Please check config/booking.ts
        </div>
      )}
    </div>
  );
}
