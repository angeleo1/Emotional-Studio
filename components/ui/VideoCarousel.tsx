import React, { useState, useRef, useEffect } from 'react';

const videoFiles = [
  '/videos/4214.mp4',
  '/videos/215512.mp4',
  '/videos/234241.mp4',
  '/videos/1 (2).mp4',
  '/videos/1 (4).mp4',
  '/videos/1 (5).mp4',
  '/videos/1 (9).mp4',
  '/videos/1 (8).mp4',
  '/videos/1 (1).mp4',
  '/videos/dsadasasdsa.mp4',
  '/videos/1 (6).mp4',
  '/videos/1 (7).mp4',
];

export default function VideoCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const reqRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // 자동 슬라이드
  useEffect(() => {
    if (hoveredIndex !== null || playingIndex !== null) return;
    let last = performance.now();
    const animate = (now: number) => {
      const dt = now - last;
      last = now;
      setOffset(prev => {
        let next = prev - dt * 0.12;
        const total = (containerRef.current?.scrollWidth ?? 0) / 2;
        if (Math.abs(next) > total) return 0;
        return next;
      });
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [hoveredIndex, playingIndex]);

  return (
    <div className="relative w-full max-w-4xl overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-6 min-w-[200%]"
        style={{
          transform: `translateX(${offset}px)`,
          willChange: 'transform'
        }}
      >
        {[...videoFiles, ...videoFiles].map((src, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-64 md:w-80 aspect-square relative ${hoveredIndex === idx ? 'z-20' : ''}`}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              zIndex: hoveredIndex === idx ? 20 : 1,
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), z-index 0.2s',
              transform: hoveredIndex === idx ? 'scale(1.12)' : 'scale(1)'
            }}
          >
            <video
              src={src}
              controls
              className="w-full h-full object-cover rounded-2xl border-8 border-white shadow-lg bg-black"
              style={{ pointerEvents: 'auto' }}
              onPlay={() => setPlayingIndex(idx)}
              onPause={() => setPlayingIndex(null)}
              onEnded={() => setPlayingIndex(null)}
            />
            {hoveredIndex === idx && (
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl border-8 border-[#ff9800]"
                style={{
                  boxShadow: '0 0 0 6px #ff9800, 0 0 24px 0 #ff9800',
                  borderColor: '#ff9800',
                  transition: 'box-shadow 0.3s, border-color 0.3s',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 