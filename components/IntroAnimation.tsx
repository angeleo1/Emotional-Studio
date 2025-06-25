import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_TEXT = 'emotional studios';
const TYPING_SPEED = 93; // ms per character (1.5배 빠르게)
const INTRO_DURATION_AFTER_TYPING = 600; // ms to stay after typing

interface IntroAnimationProps {
  onFinish: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinish }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

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
              fontSize: '7vw',
              fontWeight: 900,
              color: '#FF6100',
              fontFamily: 'murmure-main, sans-serif',
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
              marginTop: '11rem',
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
            <span style={{ fontWeight: 700, fontSize: '2.21rem', color: '#FF6100', letterSpacing: '0.13em', fontFamily: 'Gulax' }}>Our Elixirs</span>
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
          {/* Discover Us 버튼은 항상 보이게, onClick만 유지 */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.5, ease: 'backOut' }}
            style={{
              position: 'absolute',
              right: 'calc(2vw + 32rem)',
              top: 'calc(58vh + 3rem)',
              background: 'none',
              border: '2px solid #FF6100',
              color: '#FF6100',
              borderRadius: '999px',
              padding: '1.1em 2.2em',
              fontWeight: 700,
              fontSize: '1.35rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1em',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
              opacity: 1,
              pointerEvents: 'auto',
              width: 'fit-content',
              minWidth: 0,
              boxSizing: 'border-box',
              zIndex: 9000,
              boxShadow: '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 #FF6100cc, 0 2px 8px 0 #0008'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px 0 #FF610088, 0 1.5px 6px 0 #0006'}
            onClick={onFinish}
          >
            <span style={{ color: '#FF6100' }}>Discover Us</span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="90" height="36" viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 18H60" stroke="#FF6100" strokeWidth="4" strokeLinecap="round"/>
                <path d="M52 6L68 18L52 30" stroke="#FF6100" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
