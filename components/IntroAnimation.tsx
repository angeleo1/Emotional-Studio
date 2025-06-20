import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const text = "emotional studios";
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Animate text typing
      await controls.start("visible");
      // Wait a bit
      await new Promise(res => setTimeout(res, 800));
      // Trigger completion callback
      onComplete();
    };
    sequence();
  }, [controls, onComplete]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-3xl md:text-5xl font-bold lowercase text-orange-500"
          style={{
            letterSpacing: '1em',
            userSelect: 'none',
            display: 'inline-flex',
            whiteSpace: 'nowrap'
          }}
        >
          {text.split('').map((char, index) => (
            <motion.span variants={childVariants} key={index}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>
    </motion.div>
  );
};

export default IntroAnimation; 