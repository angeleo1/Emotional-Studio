import React, { useRef, useEffect } from "react";

const SPRING = 0.08;
const DAMPING = 0.85;
const THRESHOLD_X = 320; // 훨씬 넓게
const THRESHOLD_Y = 220; // 훨씬 넓게
const MAX_DISPLACE = 180;
const SEGMENTS = 80;

const SmoothCurvedLine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const control = useRef<{ x: number; vx: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (control.current.length !== SEGMENTS + 1) {
        control.current = Array.from({ length: SEGMENTS + 1 }, () => ({
          x: w / 2,
          vx: 0,
        }));
      }

      const baseX = w / 2;

      for (let i = 0; i <= SEGMENTS; i++) {
        const baseY = (h / SEGMENTS) * i;
        let targetX = baseX;
        const mx = mouse.current.x;
        const my = mouse.current.y;
        if (
          mx !== null &&
          my !== null &&
          Math.abs(mx - baseX) < THRESHOLD_X &&
          Math.abs(my - baseY) < THRESHOLD_Y * 2
        ) {
          // 가우시안+sin 조합으로 물결 효과
          const distY = my - baseY;
          const influenceY = Math.exp(-Math.pow(distY / THRESHOLD_Y, 2) * 0.7);
          const wave = Math.sin((distY / THRESHOLD_Y) * Math.PI) * influenceY;
          const influenceX = 1 - Math.abs(mx - baseX) / THRESHOLD_X;
          let displacement = (mx - baseX) * wave * influenceX;
          if (Math.abs(displacement) > MAX_DISPLACE) {
            displacement = Math.sign(displacement) * MAX_DISPLACE;
          }
          targetX = baseX + displacement;
        }
        const ddx = targetX - control.current[i].x;
        control.current[i].vx = control.current[i].vx * DAMPING + ddx * SPRING;
        control.current[i].x += control.current[i].vx;
      }

      ctx.strokeStyle = "#FF6100";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const y = (h / SEGMENTS) * i;
        const px = control.current[i].x;
        const py = y;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          const prevX = control.current[i - 1].x;
          const prevY = (h / SEGMENTS) * (i - 1);
          const cpx = (prevX + px) / 2;
          const cpy = (prevY + py) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpx, cpy);
        }
      }
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      control.current = Array.from({ length: SEGMENTS + 1 }, () => ({
        x: window.innerWidth / 2,
        vx: 0,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default React.memo(SmoothCurvedLine);