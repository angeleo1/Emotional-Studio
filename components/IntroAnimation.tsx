import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const INTRO_TEXT = 'emotional studios';
const TYPING_SPEED = 93;
const INTRO_DURATION_AFTER_TYPING = 600;

interface IntroAnimationProps {
  onFinish: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinish }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
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

  useEffect(() => {
    if (typingDone) {
      const timer = setTimeout(() => {
        onFinish();
      }, INTRO_DURATION_AFTER_TYPING);
      return () => clearTimeout(timer);
    }
  }, [typingDone, onFinish]);

  if (!isClient) {
    return null;
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: 'backOut',
        delay: 0.2
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        delay: 0.4
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#111111] z-50 flex flex-col items-center justify-center p-4">
      {/* Main Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-widest"
          style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
        >
          {displayedText}
          <motion.span
            className="inline-block w-1 h-12 md:h-16 lg:h-20 bg-orange-500 ml-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          </h1>
      </motion.div>

      {/* Desktop-only additional info */}
      {!isMobile && (
        <motion.div
          className="absolute right-8 bottom-48 text-white text-base font-normal tracking-wider text-right leading-relaxed max-w-48 lg:max-w-64"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7, ease: 'easeOut' }}
        >
          <span className="text-orange-500">since </span>
          <span className="text-gray-400">Oct.2025</span>
          <br />
          <span className="text-white font-bold text-lg tracking-tight">
            The First Project of emotional
          </span>
        </motion.div>
      )}

      {/* Desktop-only bottom info */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 right-8 text-white text-base font-semibold tracking-wider bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
        >
          Private Self-Studio in Melbourne
        </motion.div>
      )}

      {/* SNS Icons */}
      <motion.div
        className="flex gap-3 md:gap-4 mb-8"
        variants={socialVariants}
        initial="hidden"
        animate="visible"
      >
        <a 
          href="https://www.instagram.com/emotional_studios/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-8 h-8 md:w-12 md:h-12 text-orange-500 hover:text-orange-400 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256">
            <path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/>
          </svg>
        </a>

        <a 
          href="https://www.facebook.com/profile.php?id=61580301939061" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-8 h-8 md:w-12 md:h-12 text-orange-500 hover:text-orange-400 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
            <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>

        <a 
          href="https://www.xiaohongshu.com/user/profile/5f8b8b8b8b8b8b8b8b8b8b8b" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-8 h-8 md:w-12 md:h-12 text-orange-500 hover:text-orange-400 transition-colors duration-300"
        >
          <img 
            src="/images/rednote.png" 
            alt="小红书" 
            className="w-full h-full object-contain"
                style={{
              filter: 'brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(2000%) hue-rotate(15deg) brightness(1.2) contrast(1.5)'
            }}
          />
        </a>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 w-full max-w-4xl"
        variants={{
          hidden: { opacity: 0 },
          visible: {
                  opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.6
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Pose Guide', href: '/pose-guide' },
          { label: 'Our Elixirs', href: '/elixirs' },
          { label: 'Events', href: '/support?tab=event' },
          { label: 'Tips', href: '/tips' },
          { label: 'emotional Moments', href: '/gallery' }
        ].map((button, index) => (
          <motion.button
            key={button.label}
            className="bg-transparent border-2 border-white text-white rounded-full px-4 py-3 md:px-6 md:py-4 font-semibold text-sm md:text-base hover:bg-white hover:text-black transition-all duration-300 min-h-[44px] md:min-h-[56px]"
            variants={buttonVariants}
            onClick={() => router.push(button.href)}
                style={{
              touchAction: 'manipulation',
              userSelect: 'none'
            }}
          >
            {button.label}
          </motion.button>
        ))}
      </motion.div>

        <FloatingBookButton />
                </div>
  );
};

export default IntroAnimation;