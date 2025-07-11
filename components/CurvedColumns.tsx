import React, { useRef, useEffect } from 'react';

const LINE_COLOR = '#FF6100'; // 주황색
const LINE_WIDTH = 2.5;
const SPRING = 0.18;
const DAMPING = 0.75;
const HOVER_RADIUS = 120;
const DISTORTION = 90;

const CurvedColumns: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const point = useRef<number>(0);
  const velocity = useRef<number>(0);
  const mouse = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function onMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    window.addEventListener('mousemove', onMouseMove);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      let target = 0;
      if (Math.abs(mouse.current.x - centerX) < HOVER_RADIUS) {
        const dist = mouse.current.x - centerX;
        target = (dist / HOVER_RADIUS) * DISTORTION;
      }
      velocity.current += (target - point.current) * SPRING;
      velocity.current *= DAMPING;
      point.current += velocity.current;

      const x = centerX + point.current;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = LINE_WIDTH;
      ctx.stroke();
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10,
        background: 'transparent',
      }}
    />
  );
};

export default CurvedColumns; 