'use client';

import { useEffect, useRef } from 'react';

// 주황색 SquigglyLine 로고 컴포넌트 (네비바와 동일)
const SquigglyLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 커서에 적합한 크기로 조정
    const SIZE = 80; // 커서용으로 작게 조정
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;

    // 애니메이션 영역을 줄여서 잘림 방지
    const PADDING = 10; // 경계에서 10px 여백
    const ANIMATION_SIZE = SIZE - (PADDING * 2); // 실제 애니메이션 영역

    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 12; // 8에서 12로 늘림
      
      constructor() {
        this.initPoints();
      }
      
      initPoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: PADDING + Math.random() * ANIMATION_SIZE,
            y: PADDING + Math.random() * ANIMATION_SIZE,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      
      update() {
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.003 + point.offset) * 1.5;
          point.y += point.vy + Math.cos(Date.now() * 0.003 + point.offset) * 1.5;
          
          // 경계 처리
          if (point.x < PADDING) { point.x = PADDING; point.vx *= -1; }
          else if (point.x > PADDING + ANIMATION_SIZE) { point.x = PADDING + ANIMATION_SIZE; point.vx *= -1; }
          if (point.y < PADDING) { point.y = PADDING; point.vy *= -1; }
          else if (point.y > PADDING + ANIMATION_SIZE) { point.y = PADDING + ANIMATION_SIZE; point.vy *= -1; }
        });
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = '#FF6100';
        ctx.lineWidth = 1.5; // 커서용으로 얇게
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (this.points.length > 0) {
          ctx.moveTo(this.points[0].x, this.points[0].y);
          for (let i = 0; i < this.points.length - 1; i++) {
            const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 5;
            const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 5;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
          }
        }
        ctx.stroke();
      }
    }

    const lines: SquigglyLine[] = [];
    for (let i = 0; i < 5; i++) { // 3에서 5로 늘림
      lines.push(new SquigglyLine());
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      
      lines.forEach((line) => {
        line.update();
        line.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOuterRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const cursorLogoRef = useRef<HTMLDivElement>(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
        };
        
        const addClickClass = () => cursorRef.current?.classList.add('click');
        const removeClickClass = () => cursorRef.current?.classList.remove('click');
        const hideCursor = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
        };
        const showCursor = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = '1';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', addClickClass);
        document.addEventListener('mouseup', removeClickClass);
        document.documentElement.addEventListener('mouseleave', hideCursor);
        document.documentElement.addEventListener('mouseenter', showCursor);

        let outerX = 0, outerY = 0;
        let innerX = 0, innerY = 0;
        
        const loop = () => {
            innerX = mousePos.current.x;
            innerY = mousePos.current.y;
            outerX += (mousePos.current.x - outerX) * 0.15;
            outerY += (mousePos.current.y - outerY) * 0.15;

            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.left = `${innerX}px`;
                cursorInnerRef.current.style.top = `${innerY}px`;
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.left = `${outerX}px`;
                cursorOuterRef.current.style.top = `${outerY}px`;
            }
            if (cursorLogoRef.current) {
                cursorLogoRef.current.style.left = `${outerX}px`;
                cursorLogoRef.current.style.top = `${outerY}px`;
            }

            if (cursorRef.current) {
                const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
                let currentEl = el;
                let isHovering = false;
                
                while(currentEl) {
                    if (window.getComputedStyle(currentEl).cursor === 'pointer') {
                        isHovering = true;
                        break;
                    }
                    currentEl = currentEl.parentElement;
                }

                if (isHovering) {
                    cursorRef.current.classList.add('hover');
                } else {
                    cursorRef.current.classList.remove('hover');
                }
            }
            
            requestRef.current = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', addClickClass);
            document.removeEventListener('mouseup', removeClickClass);
            document.documentElement.removeEventListener('mouseleave', hideCursor);
            document.documentElement.removeEventListener('mouseenter', showCursor);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div className="cursor" ref={cursorRef}>
            <div className="cursor-outer" ref={cursorOuterRef}></div>
            <div className="cursor-inner" ref={cursorInnerRef}></div>
            <div className="cursor-logo" ref={cursorLogoRef}>
                <SquigglyLogo />
            </div>
        </div>
    );
};

export default CustomCursor; 