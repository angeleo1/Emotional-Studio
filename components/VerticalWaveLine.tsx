import React, { useRef, useEffect } from 'react';

const VerticalWaveLine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = 80; // 세로선이므로 폭은 얇게
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function onMouseMove(e: MouseEvent) {
      mouseX.current = e.clientX;
    }
    window.addEventListener('mousemove', onMouseMove);

    function drawLine() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#FF6100';
      ctx.lineWidth = 3;

      const amplitude = 60;
      const frequency = 0.012;
      const dynamicPhase = (mouseX.current / window.innerWidth) * Math.PI * 4;

      ctx.moveTo(canvas.width / 2 + Math.sin(dynamicPhase) * amplitude, 0);
      for (let y = 0; y <= canvas.height; y += 4) {
        const x = canvas.width / 2 + Math.sin(y * frequency + dynamicPhase) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      requestAnimationFrame(drawLine);
    }
    drawLine();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
        width: '80px',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10,
        background: 'transparent',
      }}
    />
  );
};

export default VerticalWaveLine; 