'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  originalX: number;
}

interface WavyClipPathProps {
  clipId: string;
  showLine?: boolean;
  lineClassName?: string;
  lineStrokeWidth?: number;
  lineStrokeColor?: string;
  stiffness?: number;
  damping?: number;
  idleAmplitude?: number;
  idleFrequency?: number;
}

const WavyClipPath = ({
  clipId,
  showLine = false,
  lineClassName = '',
  lineStrokeWidth = 2,
  lineStrokeColor = '#fff',
  stiffness = 0.025,
  damping = 0.92,
  idleAmplitude = 1.5,
  idleFrequency = 0.005,
}: WavyClipPathProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0, moved: false });

  // 화면 크기 상태 관리
  const [dimensions, setDimensions] = useState({ width: 0, height: 48 });

  // 호버 상태 관리
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: 48 });
    }
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: 48 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 마우스 인터랙션 웨이브 효과 (hover 시에만 동작)
  useEffect(() => {
    // 웨이브 포인트 초기화
    const width = dimensions.width;
    const numPoints = 50;
    pointsRef.current = [];
    for (let i = 0; i <= numPoints; i++) {
      pointsRef.current.push({
        x: (i / numPoints) * width,
        y: 24,
        vx: 0,
        originalX: (i / numPoints) * width,
      });
    }
    let animationFrameId: number;
    let time = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.moved = true;
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    const animate = () => {
      if (!pathRef.current) return;
      time += idleFrequency;
      let pathData = `M 0,24 `;
      let linePathData = `M 0,24 `;
      pointsRef.current.forEach((point, i) => {
        const force = stiffness * (point.originalX - point.x);
        point.vx += force;
        if (isHovered && mousePosRef.current.moved) {
          // 가로선: y축 거리만 사용, x축 움직임이 힘으로 적용
          const distY = Math.abs(mousePosRef.current.y - 24);
          if (distY < 32) {
            const forceFactor = (32 - distY) / 32;
            const mouseForce = (mousePosRef.current.x - point.x) * forceFactor * 0.45;
            point.vx += mouseForce;
          }
        }
        point.vx *= damping;
        point.x += point.vx;
        // idle 웨이브(hover 중에도 subtle하게 움직임)
        const idleOscillation = Math.sin(time * 2 + point.x / 100) * idleAmplitude;
        const currentY = 24 + idleOscillation;
        pathData += `L ${point.x},${currentY} `;
        linePathData += `L ${point.x},${currentY} `;
      });
      pathRef.current.setAttribute('d', pathData);
      if (linePathRef.current) {
        linePathRef.current.setAttribute('d', linePathData);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, dimensions.width]);

  // 고정된 웨이브 실선 path 계산 함수
  function getStaticLinePath(width: number, numPoints = 50) {
    let pathData = `M 0,24 `;
    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * width;
      pathData += `L ${x},24 `;
    }
    return pathData;
  }

  return (
    <>
      {/* clipPath용 SVG (보이지 않음) */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path ref={pathRef} d="" />
          </clipPath>
        </defs>
      </svg>
      {/* 중앙 웨이브 실선용 SVG */}
      {showLine && typeof window !== 'undefined' && dimensions.width > 0 && dimensions.height > 0 && (
        <div
          style={{ width: dimensions.width, height: 48, position: 'absolute', top: 0, left: 0 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            width={dimensions.width}
            height={48}
            viewBox={`0 0 ${dimensions.width} 48`}
            style={{
              width: dimensions.width,
              height: 48,
              pointerEvents: 'none',
              zIndex: 2,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <path
              ref={linePathRef}
              d={''}
              className={`wavy-divider-line${isHovered ? ' wavy-divider-line--hover' : ''} ${lineClassName}`}
              strokeWidth={lineStrokeWidth}
              fill="none"
              style={{
                pointerEvents: 'auto',
                stroke: isHovered ? '#fff' : '#ff6100',
                filter: 'none',
                transition: 'stroke 0.3s',
                cursor: 'pointer',
              }}
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default WavyClipPath; 