'use client';

import { useEffect, useRef } from 'react';

interface SquigglyLogoProps {
  size?: number;
  className?: string;
}

export const SquigglyLogo: React.FC<SquigglyLogoProps> = ({ 
  size = 120, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const PADDING = 15;
    const ANIMATION_SIZE = size - (PADDING * 2);

    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 15;
      
      constructor() {
        this.initPoints();
      }
      
      initPoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: PADDING + Math.random() * ANIMATION_SIZE,
            y: PADDING + Math.random() * ANIMATION_SIZE,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      
      update() {
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.002 + point.offset) * 2;
          point.y += point.vy + Math.cos(Date.now() * 0.002 + point.offset) * 2;
          
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
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (this.points.length > 0) {
          ctx.moveTo(this.points[0].x, this.points[0].y);
          for (let i = 0; i < this.points.length - 1; i++) {
            const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 8;
            const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 8;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
          }
        }
        ctx.stroke();
      }
    }

    const lines: SquigglyLine[] = [];
    for (let i = 0; i < 6; i++) {
      lines.push(new SquigglyLine());
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, size, size);
      
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
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        cursor: 'pointer'
      }}
    />
  );
};

export default SquigglyLogo;
