import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const INTRO_TEXT = 'emotional studios';
const TYPING_SPEED = 93; // ms per character (1.5배 빠르게)
const INTRO_DURATION_AFTER_TYPING = 600; // ms to stay after typing

interface IntroAnimationProps {
  onFinish: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinish }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayedText.length < INTRO_TEXT.length) {
      timeout = setTimeout(() => {
        setDisplayedText(INTRO_TEXT.slice(0, displayedText.length + 1));
      }, TYPING_SPEED);
    } else {
      setTypingDone(true);
    }
    return () => clearTimeout(timeout);
  }, [displayedText]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="relative w-full bg-[#111] overflow-hidden"
        style={{ minHeight: '100vh', zIndex: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
      >
        <div style={{ marginTop: '8rem' }}>
          {/* 1. emotional studios */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'relative',
              fontSize: '4.9vw',
              fontWeight: 450,
              color: '#FF6100',
              fontFamily: 'Melodrama-Regular',
              letterSpacing: '0.08em',
              lineHeight: 1,
              marginLeft: '4vw',
              userSelect: 'none',
              marginTop: '8rem',
            }}
          >
            emotional studios
          </motion.div>
          {/* 2. Our Elixirs, 화살표, Elevate/Every 묶음 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
            style={{
              marginLeft: '4vw',
              marginTop: '16rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: 'fit-content',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 400,
              lineHeight: 1.5,
              userSelect: 'none',
              zIndex: 9000,
            }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', margin: '0.7rem 0' }}>
              <svg width="36" height="36" viewBox="0 0 36 36"><polygon points="8,6 28,18 8,30" fill="#FF6100" /></svg>
              <svg width="36" height="36" viewBox="0 0 36 36"><polygon points="8,6 28,18 8,30" fill="#FF6100" /></svg>
              <svg width="36" height="36" viewBox="0 0 36 36"><polygon points="8,6 28,18 8,30" fill="#FF6100" /></svg>
            </div>
            <span style={{ display: 'block', textAlign: 'left', marginLeft: 0, letterSpacing: '0.08em', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Elevate Your Emotions, Frame Your Memories</span>
            <span style={{ display: 'block', textAlign: 'left', marginLeft: 0, color: '#aaa', fontSize: '1.2rem', fontWeight: 400, marginTop: '0.5rem', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>Every Photo Tells a Story, Every Elixir Completes It</span>
            <span style={{ display: 'block', textAlign: 'left', marginLeft: 0, color: '#fff', opacity: 0.18, fontSize: '1.2rem', fontWeight: 400, letterSpacing: '0.08em', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Emotional studio is what makes two elements a unified experience</span>
          </motion.div>
          {/* Private Self-Studio in Melbourne 우측 하단 아이콘 왼쪽에 위치 */}
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: '7.5rem',
              bottom: '4vh',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 400,
              opacity: 1,
              letterSpacing: '0.12em',
              zIndex: 9000,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            Private Self-Studio in Melbourne
          </motion.span>
          {/* 상단 우측: since Oct.2025 */}
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '4vh',
              right: '5vw',
              fontSize: '1.05rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              zIndex: 9000,
              userSelect: 'none',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.3rem',
            }}
          >
            <span style={{ color: '#fff', opacity: 1 }}>since Oct.2025</span>
            <span style={{ color: '#fff', opacity: 1, fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.01em' }}>The First Project of emotional</span>
          </motion.span>
          {/* 중앙~하단 우측: 감각적 문구 */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: '5vw',
              top: '38vh',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 600,
              opacity: 1,
              letterSpacing: '0.04em',
              zIndex: 9000,
              userSelect: 'none',
              pointerEvents: 'none',
              textAlign: 'right',
              lineHeight: 1.3,
              maxWidth: '18vw',
            }}
          >
            Branded UI<br />
            Experiment<br />
            <span style={{fontWeight: 400, fontSize: '1.1rem', opacity: 1}}>
              Feel the Vibe<br />
              <span style={{fontWeight: 700, fontSize: '1.2rem', color: '#FF6100', opacity: 1}}>e.st</span>
            </span>
          </motion.span>
          {/* 버튼 영역: Pose Guide, Our Elixirs, Collaboration, emotional Moments */}
          <div style={{
            position: 'absolute',
            left: 'calc(2vw + 47rem)',
            top: 'calc(58vh + 3rem)',
            display: 'flex',
            flexDirection: 'row',
            gap: '1.2rem',
            zIndex: 9000,
          }}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5, ease: 'backOut' }}
              style={{
                background: 'none',
                border: '2px solid #FF6100',
                color: '#FF6100',
                borderRadius: '999px',
                padding: '0.9em 1.7em',
                fontWeight: 700,
                fontSize: '1.35rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                opacity: 1,
                pointerEvents: 'auto',
                width: 'fit-content',
                minWidth: 0,
                boxSizing: 'border-box',
                boxShadow: '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 #FF6100cc, 0 2px 8px 0 #0008'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006'}
              onClick={() => { router.push('/pose-guide'); }}
            >
              <span style={{ color: '#FF6100' }}>Pose Guide</span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3, duration: 0.5, ease: 'backOut' }}
              style={{
                background: 'none',
                border: '2px solid #FF6100',
                color: '#FF6100',
                borderRadius: '999px',
                padding: '0.9em 1.7em',
                fontWeight: 700,
                fontSize: '1.35rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                opacity: 1,
                pointerEvents: 'auto',
                width: 'fit-content',
                minWidth: 0,
                boxSizing: 'border-box',
                boxShadow: '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 #FF6100cc, 0 2px 8px 0 #0008'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006'}
              onClick={() => { router.push('/elixirs'); }}
            >
              <span style={{ color: '#FF6100' }}>Our Elixirs</span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.4, duration: 0.5, ease: 'backOut' }}
              style={{
                background: 'none',
                border: '2px solid #FF6100',
                color: '#FF6100',
                borderRadius: '999px',
                padding: '0.9em 1.7em',
                fontWeight: 700,
                fontSize: '1.35rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                opacity: 1,
                pointerEvents: 'auto',
                width: 'fit-content',
                minWidth: 0,
                boxSizing: 'border-box',
                boxShadow: '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 #FF6100cc, 0 2px 8px 0 #0008'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006'}
              onClick={() => {}}
            >
              <span style={{ color: '#FF6100' }}>Collaboration</span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.5, ease: 'backOut' }}
              style={{
                background: 'none',
                border: '2px solid #FF6100',
                color: '#FF6100',
                borderRadius: '999px',
                padding: '0.9em 1.7em',
                fontWeight: 700,
                fontSize: '1.35rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                opacity: 1,
                pointerEvents: 'auto',
                width: 'fit-content',
                minWidth: 0,
                boxSizing: 'border-box',
                boxShadow: '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 #FF6100cc, 0 2px 8px 0 #0008'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006'}
              onClick={() => {}}
            >
              <span style={{ color: '#FF6100' }}>emotional Moments</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
