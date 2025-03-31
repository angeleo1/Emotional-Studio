import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ColorAwareTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function ColorAwareText({ children, className = '' }: ColorAwareTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState<string>('rgb(255, 255, 255)');
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 초기 설정
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // WebGL 렌더러 설정
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
    rendererRef.current.setSize(1, 1); // 1x1 픽셀만 필요
    container.appendChild(rendererRef.current.domElement);
    rendererRef.current.domElement.style.position = 'absolute';
    rendererRef.current.domElement.style.top = '0';
    rendererRef.current.domElement.style.left = '0';
    rendererRef.current.domElement.style.pointerEvents = 'none';
    rendererRef.current.domElement.style.opacity = '0';

    // 카메라 설정
    cameraRef.current = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    cameraRef.current.position.z = 1;

    // 씬 설정
    sceneRef.current = new THREE.Scene();

    // 색상 감지 함수
    const detectBackgroundColor = () => {
      if (!containerRef.current || !rendererRef.current) return;

      const { x, y } = containerRef.current.getBoundingClientRect();
      const centerX = Math.floor(x + window.scrollX);
      const centerY = Math.floor(y + window.scrollY);

      // 스크린샷 캡처
      rendererRef.current.domElement.style.display = 'block';
      rendererRef.current.render(sceneRef.current!, cameraRef.current!);
      
      try {
        const pixel = new Uint8Array(4);
        rendererRef.current.getContext().readPixels(
          0, 0, 1, 1,
          rendererRef.current.getContext().RGBA,
          rendererRef.current.getContext().UNSIGNED_BYTE,
          pixel
        );

        // 배경색의 밝기 계산
        const brightness = (pixel[0] + pixel[1] + pixel[2]) / (3 * 255);
        
        // 배경색 기반으로 텍스트 색상 결정
        if (brightness > 0.5) {
          // 어두운 배경
          const r = Math.floor(255 * (1 - brightness));
          const g = Math.floor(255 * (1 - brightness));
          const b = Math.floor(255 * (1 - brightness));
          setTextColor(`rgb(${r}, ${g}, ${b})`);
        } else {
          // 밝은 배경
          const r = Math.floor(255 * brightness);
          const g = Math.floor(255 * brightness);
          const b = Math.floor(255 * brightness);
          setTextColor(`rgb(${255 - r}, ${255 - g}, ${255 - b})`);
        }
      } catch (error) {
        console.error('Error reading pixels:', error);
      }

      rendererRef.current.domElement.style.display = 'none';
    };

    // 스크롤 및 리사이즈 이벤트에 대한 감지
    const handleUpdate = () => {
      requestAnimationFrame(detectBackgroundColor);
    };

    window.addEventListener('scroll', handleUpdate);
    window.addEventListener('resize', handleUpdate);
    
    // 초기 감지
    handleUpdate();

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
      
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ color: textColor, transition: 'color 0.3s' }}>
      {children}
    </div>
  );
} 