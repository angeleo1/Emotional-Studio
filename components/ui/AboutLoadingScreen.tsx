import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutLoadingScreen = () => {
  const text = "About Us";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: text.length * 0.08 + 0.5, // Start after text animation
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FF4D00]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.h1
        className="text-white text-5xl md:text-7xl font-bold flex mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
      </motion.h1>
      <motion.div
        className="relative w-64 h-80 md:w-80 md:h-96"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/aboutus0.png"
          alt="Loading image for About Us page"
          fill
          style={{ objectFit: 'cover', filter: 'grayscale(1) brightness(100)' }}
          className="rounded-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutLoadingScreen; 