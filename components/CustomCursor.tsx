import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringEmotional, setIsHoveringEmotional] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    
    if (!cursorDot || !cursorRing) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // 초기 마우스 위치 설정 (페이지 중앙)
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
    ringX = mouseX;
    ringY = mouseY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // 작은 점 커서는 즉시 이동
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    // 부드러운 애니메이션을 위한 함수
    const animateRing = () => {
      // 원형 커서가 마우스를 부드럽게 따라가도록 계산
      const deltaX = mouseX - ringX;
      const deltaY = mouseY - ringY;
      
      ringX += deltaX * 0.15;
      ringY += deltaY * 0.15;
      
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      
      requestAnimationFrame(animateRing);
    };

    animateRing(); // 애니메이션 시작

    // 호버 상태 감지
    const handleLinkHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // emotional-studio-text 클래스를 가진 요소 또는 그 자식 요소인 경우
      if (target.classList.contains('emotional-studio-text') || 
          target.closest('.emotional-studio-text')) {
        setIsHoveringEmotional(true);
      } 
      // 버튼, 링크 등 클릭 가능한 요소인 경우
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

    document.addEventListener('mousemove', moveCursor);
    
    // 모든 링크와 버튼에 호버 이벤트 추가
    const links = document.querySelectorAll('a, button, .hover-effect, .emotional-studio-text');
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
    <div className="cursor-wrapper">
      <div 
        ref={cursorDotRef} 
        className="cursor-dot"
        style={{
          transform: `translate(-50%, -50%)`
        }}
      />
      <div 
        ref={cursorRingRef} 
        className={`cursor-ring ${isHovering || isHoveringEmotional ? 'expanded' : ''}`}
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      >
        {(isHovering || isHoveringEmotional) && (
          <div className="cursor-logo">
            <span className="font-herr-von">e.st</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCursor; 