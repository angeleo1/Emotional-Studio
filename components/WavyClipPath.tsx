'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  originalX: number;
}

const WavyClipPath = ({ clipId }: { clipId: string }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0, moved: false });

  const stiffness = 0.025;
  const damping = 0.92;
  const idleAmplitude = 1.5;
  const idleFrequency = 0.005;

  useEffect(() => {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let centerX = screenWidth / 2;

    const numPoints = 50;
    pointsRef.current = [];
    for (let i = 0; i <= numPoints; i++) {
      pointsRef.current.push({
        x: centerX,
        y: (i / numPoints) * screenHeight,
        vx: 0,
        originalX: centerX,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mousePosRef.current.moved) {
        mousePosRef.current.moved = true;
      }
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
    };

    const handleResize = () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      centerX = screenWidth / 2;
      pointsRef.current.forEach((point, i) => {
        point.originalX = centerX;
        point.y = (i / numPoints) * screenHeight;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      if (!pathRef.current) return;
      time += idleFrequency;

      let pathData = `M ${pointsRef.current[0].originalX},0 `;

      pointsRef.current.forEach((point) => {
        const force = stiffness * (point.originalX - point.x);
        point.vx += force;

        if (mousePosRef.current.moved) {
            const dy = mousePosRef.current.y - point.y;
            const dx = mousePosRef.current.x - point.x;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
            const forceFactor = (100 - dist) / 100;
            const mouseForce = (mousePosRef.current.x - point.x) * forceFactor * 0.1;
            point.vx += mouseForce;
            }
        }
        
        point.vx *= damping;
        point.x += point.vx;
        
        // Add subtle idle oscillation
        const idleOscillation = Math.sin(time + point.y / 100) * idleAmplitude;
        const currentX = point.x + idleOscillation;
        
        pathData += `L ${currentX},${point.y} `;
      });

      pathData += `L ${screenWidth},${screenHeight} L ${screenWidth},0 Z`;
      pathRef.current.setAttribute('d', pathData);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path ref={pathRef} d="" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WavyClipPath; 