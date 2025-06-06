// [삭제됨] CustomCursor.jsx는 tsx 버전과 중복되어 삭제되었습니다.

import { useRef, useState, useEffect } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorCircleRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringEmotional, setIsHoveringEmotional] = useState(false);
  const [isCursorOverlap, setIsCursorOverlap] = useState(false);
  const [invertedColor, setInvertedColor] = useState('#fff');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
  // 브라우저 환경에서만 중앙 위치로 초기화
  setMousePos({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
    // Remove all direct DOM manipulation. Use state only.
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = window.innerWidth / 2;
    let circleY = window.innerHeight / 2;

    // Helper: sample color under cursor using canvas
    function getInvertedColorAtCursor(x, y) {
      // Try to find the hero video or main background element
      const video = document.querySelector('video');
      if (video) {
        // Create an offscreen canvas
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Map window coords to video coords
        const rect = video.getBoundingClientRect();
        const relX = Math.round(((x - rect.left) / rect.width) * canvas.width);
        const relY = Math.round(((y - rect.top) / rect.height) * canvas.height);
        try {
          const pixel = ctx.getImageData(relX, relY, 1, 1).data;
          const [r, g, b] = pixel;
          // Invert
          return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
        } catch {
          return '#fff';
        }
      }
      // fallback: white
      return '#fff';
    }

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setMousePos({ x: mouseX, y: mouseY });
      // Sample color and update state
      const color = getInvertedColorAtCursor(mouseX, mouseY);
      setInvertedColor(color);
    };

    // Overlap detection logic
    const checkOverlap = () => {
      if (isHoveringEmotional) return;
      const smallRadius = 8; // 16px/2
      const bigRadius = isHovering ? 80 : 24;
      const dx = mouseX - circleX;
      const dy = mouseY - circleY;
      const distance = Math.sqrt(dx*dx + dy*dy);
      setIsCursorOverlap(distance < (bigRadius - smallRadius));
      requestAnimationFrame(checkOverlap);
    };
    checkOverlap();

    // Remove animateCircle and all DOM movement (no trailing animation for now)
    // If you want trailing, implement with state only.
    // 즉시 애니메이션 시작 (삭제됨)
    // animateCircle();
    document.addEventListener('mousemove', moveCursor);

    // 호버 상태 감지
    const handleLinkHoverStart = (e) => {
      const target = e.target;
      
      if (target.classList.contains('watch-video-btn') || 
          target.closest('.watch-video-btn')) {
        setIsHoveringEmotional(true);
      } 
      else if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.classList.contains('hover-effect') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.hover-effect')
      ) {
        setIsHovering(true);
      }
    };

    const handleLinkHoverEnd = () => {
      setIsHovering(false);
      setIsHoveringEmotional(false);
    };

    // 모든 링크와 버튼에 호버 이벤트 추가
    const links = document.querySelectorAll('a, button, .hover-effect, .watch-video-btn');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Small solid cursor */}
      {/* Small solid cursor */}
      {/* Small solid cursor (hide on e.st hover) */}
      {isHoveringEmotional ? (
        <div
          className="custom-cursor fixed pointer-events-none z-[9999] flex items-center justify-center"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: '320px',
            height: '320px',
            background: 'none',
            border: 'none',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="font-herr-von text-[48rem]" style={{ color: '#fff', mixBlendMode: 'difference' }}>e.st</span>
        </div>
      ) : (
        <>
          <div 
            className="custom-cursor fixed pointer-events-none z-[9999]"
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: invertedColor,
              left: mousePos.x,
              top: mousePos.y,
              transform: 'translate(-50%, -50%)',
              opacity: 1,
              transition: 'transform 0.15s cubic-bezier(0.4,0,0.2,1), background-color 0.15s cubic-bezier(0.4,0,0.2,1)'
            }}
          />
          <div 
            className="custom-cursor fixed pointer-events-none z-[9998]"
            style={{
              width: isHovering ? '160px' : '48px',
              height: isHovering ? '160px' : '48px',
              borderRadius: '50%',
              border: `2px solid ${invertedColor}`,
              backgroundColor: 'transparent',
              left: mousePos.x,
              top: mousePos.y,
              transform: 'translate(-50%, -50%)',
              opacity: 1,
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s'
            }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;