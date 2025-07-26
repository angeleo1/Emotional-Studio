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
              fontSize: '8vw',
              fontWeight: 450,
              color: '#ffffff',
              fontFamily: 'CS Valcon Drawn',
              letterSpacing: '0.08em',
              lineHeight: 1,
              textAlign: 'center',
              width: '100%',
              userSelect: 'none',
              marginTop: '20vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            emotional studios
          </motion.div>
          {/* 2. SNS 아이콘만 남기고 나머지 삭제 */}
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
            <div style={{ display: 'flex', gap: '1.5rem', margin: '0.7rem 0', alignItems: 'center' }}>
              {/* SNS 아이콘 영역만 유지 */}
              <div style={{ display: 'flex', gap: '1.2rem', marginLeft: '1.2rem' }}>
                <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper w-12 h-12" style={{ color: '#FF6100' }}>
                  <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                  </div>
                  <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                  </div>
                  <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                  </div>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper w-12 h-12" style={{ color: '#FF6100' }}>
                  <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                  </div>
                  <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                  </div>
                  <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                  </div>
                </a>
                <a href="https://www.youtube.com/channel/UCiD4_8JWUt24lkJwYMum8NA" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper w-12 h-12" style={{ color: '#FF6100' }}>
                  <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                    <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                  </div>
                  <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                    <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                  </div>
                  <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                    <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                  </div>
                </a>
              </div>
            </div>
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
            flexDirection: 'column', // 버튼+SNS 세로 배치
            gap: '2.2rem',
            zIndex: 9000,
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1.2rem' }}>
              <span className="glitch-button-wrapper">
                <motion.button
                  className="glitch-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.5, ease: 'backOut' }}
                  style={{
                    background: 'none',
                    border: '2px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.9em 1.7em',
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0,
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    width: 'fit-content',
                    minWidth: 0,
                    boxSizing: 'border-box',
                  }}
                  onClick={() => { router.push('/pose-guide'); }}
                >
                  <span className="glitch" data-text="Pose Guide" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block' }}>Pose Guide</span>
                </motion.button>
              </span>
              <span className="glitch-button-wrapper">
                <motion.button
                  className="glitch-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.3, duration: 0.5, ease: 'backOut' }}
                  style={{
                    background: 'none',
                    border: '2px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.9em 1.7em',
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0,
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    width: 'fit-content',
                    minWidth: 0,
                    boxSizing: 'border-box',
                  }}
                  onClick={() => { router.push('/elixirs'); }}
                >
                  <span className="glitch" data-text="Our Elixirs" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block' }}>Our Elixirs</span>
                </motion.button>
              </span>
              <span className="glitch-button-wrapper">
                <motion.button
                  className="glitch-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.4, duration: 0.5, ease: 'backOut' }}
                  style={{
                    background: 'none',
                    border: '2px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.9em 1.7em',
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0,
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    width: 'fit-content',
                    minWidth: 0,
                    boxSizing: 'border-box',
                  }}
                  onClick={() => { router.push('/collaboration'); }}
                >
                  <span className="glitch" data-text="Collaboration" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block' }}>Collaboration</span>
                </motion.button>
              </span>
              <span className="glitch-button-wrapper">
                <motion.button
                  className="glitch-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5, duration: 0.5, ease: 'backOut' }}
                  style={{
                    background: 'none',
                    border: '2px solid #fff',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.9em 1.7em',
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0,
                    transition: 'background 0.2s, color 0.2s',
                    opacity: 1,
                    pointerEvents: 'auto',
                    width: 'fit-content',
                    minWidth: 0,
                    boxSizing: 'border-box',
                  }}
                  onClick={() => { router.push('/gallery-landing'); }}
                >
                  <span className="glitch" data-text="emotional Moments" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block' }}>emotional Moments</span>
                </motion.button>
              </span>
            </div>
            {/* SNS 아이콘 영역 완전 삭제 */}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
