'use client'

import { ChromeGrid } from "@/components/ui/chrome-grid";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

interface DemoOneProps {
  scrollProgress?: number;
}

const DemoOne: React.FC<DemoOneProps> = ({ scrollProgress }) => {
  return (
    <div className="h-screen relative flex items-center justify-center">
      {/* Layer 1: ChromeGrid (always present) */}
      <div className="absolute inset-0 z-0">
          <ChromeGrid />
      </div>

      {/* Layer 2: Text with mix-blend-mode */}
      <div className="relative z-20 mix-blend-difference px-5">
        <h1 
            className="text-3xl md:text-5xl font-bold lowercase text-white"
            style={{
                letterSpacing: '1em',
                userSelect: 'none',
            }}
        >
            <span>emotional studios</span>
        </h1>
      </div>

      {/* Layer 3: Buttons */}
      <div
        className="absolute left-0 right-0 bottom-16 md:bottom-20 lg:bottom-[100px] z-30 flex justify-center"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-16 lg:gap-[100px]">
          <Link href="/support#events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-button px-8 py-3 sm:px-10 md:px-12 sm:py-4 md:py-5 bg-transparent border-2 border-white text-white rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 relative overflow-hidden group w-48 sm:w-52 md:w-56 whitespace-nowrap"
            >
              <span className="relative z-10">
                View Events
              </span>
            </motion.button>
          </Link>
          <Link href="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-button px-8 py-3 sm:px-10 md:px-12 sm:py-4 md:py-5 bg-transparent border-2 border-white text-white rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 relative overflow-hidden group w-48 sm:w-52 md:w-56 whitespace-nowrap"
            >
              <span className="relative z-10">
                Book Now
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: white; }
        }
        .border-button::before {
          content: '';
          position: absolute;
          width: 150%;
          height: 150%;
          top: 50%;
          left: 50%;
          background: conic-gradient(from 180deg at 50% 50%, transparent 0deg, white 5deg, transparent 10deg);
          animation: rotate 4s linear infinite;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .border-button:hover::before {
          opacity: 1;
        }
        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export { DemoOne };

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[500px] pt-[1000px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
