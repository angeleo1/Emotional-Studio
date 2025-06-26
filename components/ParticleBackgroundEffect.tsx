import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 38;
const COLORS = ['rgba(255,255,255,0.08)', 'rgba(200,200,200,0.10)', 'rgba(80,80,80,0.13)', 'rgba(255,255,255,0.04)', 'rgba(255,97,0,0.10)'];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const ParticleBackgroundEffect: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener('resize', resize);

    // 파티클 초기화
    particles.current = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: random(0, width),
      y: random(0, height),
      r: random(18, 48),
      dx: random(-0.18, 0.18),
      dy: random(-0.12, 0.12),
      color: COLORS[Math.floor(random(0, COLORS.length))],
    }));

    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        // 화면 밖으로 나가면 반대편에서 등장
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0" style={{ background: '#111' }}>
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.85,
          transition: 'opacity 0.5s',
        }}
      />
    </div>
  );
};

export default ParticleBackgroundEffect; 