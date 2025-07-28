import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import rough from 'roughjs/bundled/rough.esm.js';
import { motion } from 'framer-motion';

export default function GalleryLanding() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 스크롤 방지
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class SquigglyLine {
      points: { x: number; y: number; vx: number; vy: number; offset: number }[] = [];
      numPoints = 15;
      constructor() {
        this.initPoints();
      }
      initPoints() {
        if (!canvas) return;
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
      update() {
        if (!canvas) return;
        this.points.forEach((point) => {
          point.x += point.vx + Math.sin(Date.now() * 0.003 + point.offset) * 4;
          point.y += point.vy + Math.cos(Date.now() * 0.003 + point.offset) * 4;
          if (point.x < 0) { point.x = 0; point.vx *= -1; }
          else if (point.x > canvas.width) { point.x = canvas.width; point.vx *= -1; }
          if (point.y < 0) { point.y = 0; point.vy *= -1; }
          else if (point.y > canvas.height) { point.y = canvas.height; point.vy *= -1; }
        });
      }
      draw() {
        if (!canvas || !ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = '#FF6100'; // 주황색
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 0; i < this.points.length - 1; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2 + (Math.random() - 0.5) * 20;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2 + (Math.random() - 0.5) * 20;
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        ctx.stroke();
      }
    }
    const lines: SquigglyLine[] = [];
    for (let i = 0; i < 5; i++) {
      lines.push(new SquigglyLine());
    }
    let animationId: number;
    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((line) => {
        line.update();
        line.draw();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleEnter = useCallback(() => {
    router.push('/gallery');
  }, [router]);

  return (
    <div className="gallery-landing-root">
      {/* SVG 여성 옆얼굴 */}
      <svg className="gallery-landing-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1594.3 1600">
        <path fill="#000" d="M1065.13,10.93c79.78-31.48,156.45,10.24,225.45,59.14,81.7,38.18,205.16,101.1,185.91,183.49,6.22,14.94,12.5,29.85,18.74,44.78,28.98,9.52,54.06,16,55.46,23.73,6.76,22.1,9.91,45.09,12.73,67.98.65,6.02,4.28,11.08,6.1,16.75,2.24,6.56-1.39,6.67-15.55,22.41,34.59,75.97,52.86,150.13,30.56,259.14-35.19,194.12-72.7,350.67-185.45,409.76,40.36-27.2,78.1-60.9,110.89-137.91,18.74-44.24,39.19-110.73,53.06-217.92-13.97,26.28-33.96,48.76-55.49,69.08,16.8-19.06,32.13-39.66,43.14-62.65,20.84-42.78,29.55-106.74,23.55-154.19-1.78-15.11-5.3-29.95-9.24-44.62-13.27,128.14-53.72,248.01-136.56,347.35,1.8,7.04,9.25,14.3-7.46,25.83-8.85,5.81-19.14,9.15-29.54,10.8-13.6,2.2-26.33-5.24-36.88-4.06-13.57,1.6-10.3,13.39-16.73,50.97-7.72,14.62-21.84,20.44-38.64,20.01-4.65.82-6.03-5.51-10.67-5.21,2.91,4.94,5.4,10.31,5.84,16.11,1.31,12.38-5.87,24.8-16.69,30.66-8.91-1.19-18.82-2.65-26.98,2.06-12.85,8.19-9.29,32.16-16.04,43.66-11.52,20.42-46.4,32.33-87.01,20.82-20.22-5.44-93.26-40.7-147.36-90.75-72.73,23.96-119.41,90.33-147.16,162.44,14.28,11.91,28.57,23.8,42.82,35.75,61.32,3.08,98.24,34.39,132.56,84.34,11.65,17.3-9.61-20.8,156.22,299.33-113.18-.38-1105.41-3.58-1184.69-3.74,50.44-201.67,144.76-374.68,308.86-500.85,129.46-99.79,180.59-88.87,254.73-162.47,43.33-42.82,70.41-95,89.81-152.23-22.7-18.07-35.78-40.45-36.43-70.09-44.37-22.16-75.14-60.37-86.81-117.03-26.27-14.53-52.45-29.21-78.75-43.67-19.73-3.77-34.67-11.65-47.14-30.65-5.76,19.47-11.23,39.04-15.78,58.83,1.88-22.28,6.43-44.27,11.66-65.99-2.43-5.01-5.09-10.07-6.27-15.52-9.11,32.08-16.96,64.55-22.79,97.39.8-11.04,8.82-54.34,20.62-102.94-2.44-9.07-4.44-18.27-5.63-27.58-6.51,29.37-11.89,59.03-15.82,88.86.48-21.25,4.31-62.35,13.63-112.92-.74-19.69-.02-39.4,1.51-59.03-11.01,36.89-20,74.46-25.36,112.61-5.47,37.87-8.89,85.76-8.82,93.56-.52-4.36-.18-8.76.06-13.12,4.84-125.9,28.52-199.13,31.62-213.49-7.19-80.78,50.15-128.25,62.74-149.18-84.21,72-99.35,164.98-108.11,275.62-.99,12.79-6.33,89.24-6.42,94.76-.4-2.51-.39-5.07-.32-7.6,11.43-281.96,35.85-329.55,177.48-414.01,7.26-3.9,16.37-95.93,224.62-1.48,1.39.66,62.29-2.96,63.29-3.02,55.75-49.7,123.2-102.88,196.77-115.86,9.72-4.67,19.45-9.31,29.28-13.76-73.05,9.18-141.73,40.88-206.6,76.23,2.22-1.61,92.35-58.68,225.41-85.71,8.01-1.71,16.12-2.98,24.06-4.98M997.41,38.48c7.39-1,14.87-1.22,22.29-1.63,6.35-4.68,12.87-9.13,19.6-13.25-14.54,3.18-28.25,9.1-41.89,14.89M1511.7,546.29c1.1,21.83-5.24,43.19-12.95,63.37-2.49,5.48-2.75,11.58-4.1,17.37-15.41,79.07-41.14,156.19-77.27,228.21,2.8,13.9,6.22,27.69,10.72,41.15,35.67-47.51,56.12-85.56,74.98-134.78,26.68-69.31,43.44-145.49,48.07-207.92-22.04,105.34-57.38,219.39-123.77,304.18,63.22-112.71,89.37-203.05,105.22-334.38-6.72,7.82-13.96,15.19-20.89,22.81M1454.88,707.6c-9.84,40.72-22.59,81.04-42.07,118.26.75,8.98,2.44,17.97,4.12,26.86,22.71-50.03,41.01-102.79,46.72-157.7-2.64,4.43-8.3,7.02-8.78,12.58M1410.45,760.24c-2.08,15.88-.65,42.48,1.31,57.35,12.55-33.03,23.2-66.78,32.61-100.82-36.44,41.17-32.34,34.66-33.92,43.47Z" />
      </svg>
      {/* Squiggly line 애니메이션 캔버스 */}
      <canvas ref={canvasRef} className="gallery-landing-canvas" />
      {/* SVG 필터 기반 붓터치 효과 */}
      {/* 글리치 버튼 위치 이동: 상단 30rem, 좌측 15rem */}
      <div className="glitch-button-wrapper" style={{ position: 'absolute', top: 'calc(50% - 1rem)', left: 'calc(50% - 11.8rem)', transform: 'translate(-50%, -50%)', zIndex: 20 }}>
        <button
          className="gallery-landing-btn contact-style-glitch-button"
          data-text="Enter Gallery"
          onClick={handleEnter}
          style={{ border: '2px solid #fff', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
        >
          <span className="relative z-10 whitespace-nowrap" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>Enter Gallery</span>
        </button>
      </div>
      {/* 우측 감성 타이포그래피 */}
      <style jsx>{`
        .gallery-landing-root {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          min-width: 100vw;
          width: 100vw;
          height: 100vh;
          background: #111;
          position: relative;
          overflow: hidden;
        }
        .gallery-landing-svg {
          display: block;
          width: 100vw;
          height: 100vh;
          max-width: 100vh;
          max-height: 100vw;
          object-fit: contain;
          fill: white;
          z-index: 2;
          position: relative;
          left: 20rem;
        }
        .gallery-landing-canvas {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(calc(-50% + 6rem + 20rem));
          width: 40vmin;
          height: 40vmin;
          overflow: visible;
          z-index: 3;
          pointer-events: none;
        }
        .gallery-landing-brush {
          position: absolute;
          top: 50%;
          left: 6rem;
          transform: translateY(-50%) scale(1.18) rotate(-9deg);
          width: 18rem;
          height: 5.5rem;
          z-index: 9;
          pointer-events: none;
          opacity: 0.96;
          filter: drop-shadow(0 2px 16px #0008);
        }
        .gallery-landing-btn {
          position: absolute;
          top: calc(50% + 2rem);
          left: calc(32% - 28rem + 2rem);
          transform: translate(0, -50%);
          background: none;
          color: #fff;
          font-size: 2.25rem;
          padding: 1rem 3rem;
          border: none;
          border-radius: 2rem;
          opacity: 0.92;
          box-shadow: none;
          transition: opacity 0.2s;
          z-index: 10;
        }
        .orange-outline-btn {
          position: absolute !important;
          background: transparent !important;
          color: #FF6100 !important;
          border: 2.5px solid #FF6100 !important;
          font-size: 2.1rem !important;
          font-weight: 600 !important;
          padding: 0.9rem 2.5rem !important;
          border-radius: 2rem !important;
          z-index: 9999 !important;
          box-shadow: 0 2px 12px #0002 !important;
          transition: background 0.2s, color 0.2s, border 0.2s !important;
          display: block !important;
          pointer-events: auto !important;
        }
        .orange-outline-btn:hover {
          background: #FF6100 !important;
          color: #fff !important;
          border: 2.5px solid #fff !important;
        }
        .gallery-landing-typo {
          position: absolute;
          top: calc(22vh + 9rem);
          right: 2.5vw;
          font-size: clamp(1.65rem, 3vw, 3.3rem);
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 900;
          color: #2a2a2a;
          line-height: 1.13;
          letter-spacing: 0.01em;
          text-align: right;
          opacity: 0.92;
          z-index: 30;
          pointer-events: auto;
          user-select: none;
          transform: rotateZ(8deg);
          text-shadow:
            1.5px 1.5px 3px #1118,
            -1.5px -1.5px 2px #4446,
            0.5px 0.5px 0 #bdbdbd88;
          filter: brightness(1.01) contrast(1.04);
        }
        .gallery-landing-typo:hover {
          text-shadow:
            0 8px 24px #2228,
            0 0 0 #1118,
            1.5px 1.5px 3px #1118,
            -1.5px -1.5px 2px #4446,
            0.5px 0.5px 0 #bdbdbd88;
          transform: scale(1.07) translateY(-4px) rotateZ(8deg);
          filter: brightness(1.12) contrast(1.12);
          transition: all 0.22s cubic-bezier(.4,1.2,.6,1.0);
        }
      `}</style>
    </div>
  );
} 