import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TopBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#FF6100] to-[#FF8A3D] text-white py-2 px-4 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <Link 
          href="/support?tab=event&event=grand-opening"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200"
        >
          <span 
            className="text-sm font-bold tracking-wider"
            style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
          >
            GRAND OPENING EVENT 20% OFF
          </span>
          <div className="flex gap-1">
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default TopBanner;
