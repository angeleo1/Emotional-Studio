'use client'

import { ChromeGrid } from "@/components/ui/chrome-grid";
import Link from "next/link";
import { motion } from "framer-motion";

const DemoOne = () => {
  const text1 = "emotional";
  const text2 = "studios";

  return (
    <div className="h-screen relative">
      <ChromeGrid/>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          width: 'auto',
          whiteSpace: 'nowrap',
          padding: '0 20px',
        }}
      >
        <span
          className="transparent-text emotional-studio-text"
          style={{
            fontSize: '2.8rem',
            fontWeight: 700,
            textTransform: 'lowercase',
            letterSpacing: '1em',
            userSelect: 'none',
            pointerEvents: 'none',
            color: 'white',
          }}
        >
          emotional
        </span>
        <span
          className="transparent-text emotional-studio-text"
          style={{
            fontSize: '2.8rem',
            fontWeight: 700,
            textTransform: 'lowercase',
            letterSpacing: '1em',
            marginLeft: '1em',
            userSelect: 'none',
            pointerEvents: 'none',
            color: 'white',
          }}
        >
          studios
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '20px',
          transform: 'none',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'flex-start',
        }}
      >
        <Link href="/support#events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hologram-button px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-base font-medium hover:border-transparent transition-all duration-300 relative overflow-hidden group block w-48 whitespace-nowrap"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              View Events
            </span>
          </motion.button>
        </Link>
        <Link href="/booking">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hologram-button px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-base font-medium hover:border-transparent transition-all duration-300 relative overflow-hidden group block w-48 whitespace-nowrap"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Book Now
            </span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export { DemoOne };