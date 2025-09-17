import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FloatingBookButton = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // booking 페이지에서는 버튼 숨기기
  useEffect(() => {
    if (router.pathname === '/booking' || router.pathname === '/mobile-booking') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [router.pathname]);

  // SimplyBook.me 위젯이 로드된 후 버튼을 표시
  useEffect(() => {
    const checkWidget = () => {
      if (typeof window !== 'undefined' && window.SimplybookWidget) {
        setIsVisible(true);
      } else {
        setTimeout(checkWidget, 100);
      }
    };
    checkWidget();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '15rem',
        left: '3rem',
        zIndex: 9999
      }}
    >
      {/* SimplyBook.me 위젯 버튼이 자동으로 여기에 렌더링됩니다 */}
      <div id="sb-widget-button"></div>
    </div>
  );
};

export default FloatingBookButton;
