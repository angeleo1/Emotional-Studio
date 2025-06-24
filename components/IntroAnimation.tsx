import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_TEXT = 'emotional studios';
const TYPING_SPEED = 80; // ms per character
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
      timeout = setTimeout(() => {
        onFinish();
      }, INTRO_DURATION_AFTER_TYPING);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111]"
        style={{ pointerEvents: 'none' }}
      >
        <span
          style={{
            color: '#FF7A00',
            fontSize: '3.2rem',
            fontFamily: 'PP Neue Montreal, \'Cinzel Decorative\', \"TheGoodMonolith\", sans-serif',
            letterSpacing: '0.95em',
            whiteSpace: 'pre',
            borderRight: typingDone ? 'none' : '2px solid #FF7A00',
            paddingRight: '0.2em',
            transition: 'border-right 0.2s',
            fontWeight: 700,
          }}
        >
          {displayedText}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
