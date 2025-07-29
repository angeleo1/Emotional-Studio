import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const INTRO_TEXT = 'emotional studios';
const TYPING_SPEED = 93;

interface MobileIntroProps {
  onFinish: () => void;
}

const MobileIntro: React.FC<MobileIntroProps> = ({ onFinish }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 페이지 로드 시 페이드인 효과
    setTimeout(() => setFadeIn(true), 100);

    let timeout: NodeJS.Timeout;
    if (displayedText.length < INTRO_TEXT.length) {
      timeout = setTimeout(() => {
        setDisplayedText(INTRO_TEXT.slice(0, displayedText.length + 1));
      }, TYPING_SPEED);
    } else {
      setTypingDone(true);
      // 타이핑 완료 후 1초 뒤에 onFinish 호출
      setTimeout(() => {
        onFinish();
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, onFinish]);

  return (
    <div 
      className={`relative w-full bg-[#111] overflow-hidden min-h-screen flex flex-col transition-opacity duration-1000 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 메인 타이틀 */}
      <div className="flex-1 flex items-center justify-center px-4 pt-16 pb-8">
        <h1
          className="text-4xl sm:text-6xl font-medium text-white text-center leading-none tracking-wider select-none"
          style={{
            fontFamily: 'CS Valcon Drawn',
            letterSpacing: '0.08em',
          }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>

      {/* 상단 우측: since Oct.2025 */}
      <div className="absolute top-4 right-4 text-sm font-normal tracking-wider select-none pointer-events-none z-10 flex flex-col items-end gap-1 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        <span className="text-white opacity-100">since Oct.2025</span>
        <span className="text-white opacity-100 font-bold text-base tracking-tight">
          The First Project of emotional
        </span>
      </div>

      {/* 중앙~하단 우측: 감각적 문구 */}
      <div className="absolute right-4 text-white text-lg font-semibold tracking-wide select-none pointer-events-none z-10 text-right leading-relaxed max-w-32 top-1/2 transform -translate-y-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        Branded UI<br />
        Experiment<br />
        <span className="font-normal text-base opacity-100">
          Feel the Vibe<br />
          <span className="font-bold text-lg text-[#FF6100] opacity-100">e.st</span>
        </span>
      </div>

      {/* 하단 우측: Private Self-Studio in Melbourne */}
      <div className="absolute bottom-4 right-24 text-white text-xs font-normal tracking-wider z-10 select-none pointer-events-none opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
        Private Self-Studio in Melbourne
      </div>

      {/* SNS 아이콘 */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
        <a
          href="https://www.instagram.com/emotionalstudios.au"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#FF6100] transition-colors duration-300"
          style={{ fontSize: '1.5rem' }}
        >
          📸
        </a>
        <a
          href="https://www.tiktok.com/@emotionalstudios.au"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#FF6100] transition-colors duration-300"
          style={{ fontSize: '1.5rem' }}
        >
          🎵
        </a>
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="flex flex-col items-center justify-center px-4 pb-8 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
        <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
          <button
            className="glitch-button w-full hover:bg-white hover:text-black transition-all duration-300"
            style={{
              background: 'none',
              border: '2px solid #fff',
              color: '#fff',
              borderRadius: '999px',
              padding: '0.8em 1.2em',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
              pointerEvents: 'auto',
              boxSizing: 'border-box',
            }}
            onClick={() => { router.push('/pose-guide'); }}
          >
            <span className="glitch" data-text="Pose Guide" style={{ color: 'inherit', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>Pose Guide</span>
          </button>
          
          <button
            className="glitch-button w-full hover:bg-white hover:text-black transition-all duration-300"
            style={{
              background: 'none',
              border: '2px solid #fff',
              color: '#fff',
              borderRadius: '999px',
              padding: '0.8em 1.2em',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
              pointerEvents: 'auto',
              boxSizing: 'border-box',
            }}
            onClick={() => { router.push('/elixirs'); }}
          >
            <span className="glitch" data-text="Our Elixirs" style={{ color: 'inherit', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>Our Elixirs</span>
          </button>
          
          <button
            className="glitch-button w-full hover:bg-white hover:text-black transition-all duration-300"
            style={{
              background: 'none',
              border: '2px solid #fff',
              color: '#fff',
              borderRadius: '999px',
              padding: '0.8em 1.2em',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
              pointerEvents: 'auto',
              boxSizing: 'border-box',
            }}
            onClick={() => { router.push('/gallery-landing'); }}
          >
            <span className="glitch" data-text="emotional Moments" style={{ color: 'inherit', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>emotional Moments</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .glitch-button:hover .glitch {
          color: inherit !important;
        }
      `}</style>
    </div>
  );
};

export default MobileIntro; 