import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const INTRO_TEXT = 'emotional studios';
const TYPING_SPEED = 93; // ms per character (1.5배 빠르게)
const INTRO_DURATION_AFTER_TYPING = 600; // ms to stay after typing

interface IntroAnimationProps {
  onFinish: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinish }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // 모바일용 단순화된 애니메이션 설정
  const mobileAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  };

  const desktopAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.7, ease: 'easeOut' }
  };

  // 모바일에서는 일반 div 사용, 데스크탑에서는 motion.div 사용
  const MotionWrapper = isMobile ? 'div' : motion.div;
  const MotionSpan = isMobile ? 'span' : motion.span;
  const MotionButton = isMobile ? 'button' : motion.button;

  if (!isClient) {
    return null; // SSR 중에는 아무것도 렌더링하지 않음
  }

  return (
    <AnimatePresence>
      <MotionWrapper
        key="intro"
        className="relative w-full bg-[#111] overflow-hidden min-h-screen flex flex-col"
        style={{ zIndex: 0 }}
        {...(isMobile ? {} : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        })}
      >
        {/* 메인 타이틀 */}
        <MotionWrapper
          {...(isMobile ? {} : (isMobile ? mobileAnimation : desktopAnimation))}
          className="flex-1 flex items-center justify-center px-4 pt-16 pb-8"
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-medium text-white text-center leading-none tracking-wider select-none whitespace-nowrap"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            emotional studios
          </h1>
        </MotionWrapper>



        {/* 중앙~하단 우측: since Oct.2025와 The First 문장 */}
        <MotionSpan
          {...(isMobile ? {} : (isMobile ? mobileAnimation : {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1.8, duration: 0.7, ease: 'easeOut' }
          }))}
          className={`absolute right-4 md:right-8 bottom-48 md:bottom-48 text-white text-sm md:text-base font-normal tracking-wider select-none pointer-events-none z-10 text-right leading-relaxed max-w-32 md:max-w-48 lg:max-w-64`}
        >
          <span className="text-[#FF6100] opacity-100">since </span>
          <span className="text-gray-400 opacity-100">Oct.2025</span>
          <br />
          <span className="text-white opacity-100 font-bold text-base md:text-lg tracking-tight">
            The First Project of emotional
          </span>
        </MotionSpan>

        {/* 하단 우측: Private Self-Studio in Melbourne */}
        <MotionSpan
          {...(isMobile ? {} : (isMobile ? mobileAnimation : {
            initial: { opacity: 0, x: 40 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 1.2, duration: 0.7, ease: 'easeOut' }
          }))}
          className="absolute bottom-4 right-24 md:bottom-8 md:right-32 text-white text-xs md:text-sm font-normal tracking-wider z-10 select-none pointer-events-none"
        >
          Private Self-Studio in Melbourne
        </MotionSpan>

        {/* SNS 아이콘 */}
        <MotionWrapper
          {...(isMobile ? {} : (isMobile ? mobileAnimation : {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.7, duration: 0.7, ease: 'easeOut' }
          }))}
          className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex gap-3 md:gap-4 z-10"
        >
          <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8 md:w-12 md:h-12" style={{ color: '#FF6100' }}>
            <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer one" style={{ color: '#00ffff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
          </a>


        </MotionWrapper>

        {/* 버튼 영역 */}
        <div className="flex flex-col items-center justify-center px-4 pb-8 md:pb-12 gap-4 md:gap-6">
          {/* 모바일에서는 세로 배치, 데스크탑에서는 가로 배치 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl">
            <span className="glitch-button-wrapper">
              <MotionButton
                className="glitch-button w-full"
                {...(isMobile ? {} : (isMobile ? mobileAnimation : {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 2.2, duration: 0.5, ease: 'backOut' }
                }))}
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
                  transition: 'background 0.2s, color 0.2s',
                  opacity: 1,
                  pointerEvents: 'auto',
                  boxSizing: 'border-box',
                }}
                onClick={() => { router.push('/pose-guide'); }}
              >
                <span className="glitch" data-text="Pose Guide" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>Pose Guide</span>
              </MotionButton>
            </span>
            <span className="glitch-button-wrapper">
              <MotionButton
                className="glitch-button w-full"
                {...(isMobile ? {} : (isMobile ? mobileAnimation : {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 2.3, duration: 0.5, ease: 'backOut' }
                }))}
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
                  transition: 'background 0.2s, color 0.2s',
                  opacity: 1,
                  pointerEvents: 'auto',
                  boxSizing: 'border-box',
                }}
                onClick={() => { router.push('/elixirs'); }}
              >
                <span className="glitch" data-text="Our Elixirs" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>Our Elixirs</span>
              </MotionButton>
            </span>
            <span className="glitch-button-wrapper">
              <MotionButton
                className="glitch-button w-full"
                {...(isMobile ? {} : (isMobile ? mobileAnimation : {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 2.4, duration: 0.5, ease: 'backOut' }
                }))}
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
                  transition: 'background 0.2s, color 0.2s',
                  opacity: 1,
                  pointerEvents: 'auto',
                  boxSizing: 'border-box',
                }}
                onClick={() => { router.push('/collaboration'); }}
              >
                <span className="glitch" data-text="Collaboration" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>Collaboration</span>
              </MotionButton>
            </span>
            <span className="glitch-button-wrapper">
              <MotionButton
                className="glitch-button w-full"
                {...(isMobile ? {} : (isMobile ? mobileAnimation : {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 2.5, duration: 0.5, ease: 'backOut' }
                }))}
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
                  transition: 'background 0.2s, color 0.2s',
                  opacity: 1,
                  pointerEvents: 'auto',
                  boxSizing: 'border-box',
                }}
                onClick={() => { router.push('/gallery-landing'); }}
              >
                <span className="glitch" data-text="emotional Moments" style={{ color: '#fff', whiteSpace: 'nowrap', lineHeight: 1, display: 'block', fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>emotional Moments</span>
              </MotionButton>
            </span>
          </div>
        </div>
        
        {/* Floating Book Button */}
        <FloatingBookButton />
        
      </MotionWrapper>
    </AnimatePresence>
  );
};

export default IntroAnimation;
