import { useState, useEffect } from 'react';

export const useBackgroundColor = () => {
  const [textColor, setTextColor] = useState<'black' | 'white'>('white');

  useEffect(() => {
    const checkBackgroundColor = () => {
      // 현재 스크롤 위치에서 약간 아래 지점의 배경색을 체크
      const y = window.scrollY + 60;
      const elements = document.elementsFromPoint(window.innerWidth / 2, y);
      
      // 가장 위에 있는 실제 배경색을 가진 요소 찾기
      for (const element of elements) {
        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        
        // rgba(0, 0, 0, 0) 또는 transparent는 건너뛰기
        if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
          continue;
        }

        const rgb = backgroundColor.match(/\d+/g);
        if (!rgb) continue;

        // Convert RGB to YIQ to determine brightness
        const yiq = ((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000;
        setTextColor(yiq >= 128 ? 'black' : 'white');
        break;
      }
    };

    // 스크롤 이벤트에 throttle 적용
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkBackgroundColor();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    checkBackgroundColor(); // Initial check

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return textColor;
}; 