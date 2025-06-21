'use client'

import { ChromeGrid } from "@/components/ui/chrome-grid";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

interface DemoOneProps {
  scrollProgress?: number;
  onReady?: () => void;
}

const DemoOne: React.FC<DemoOneProps> = ({ scrollProgress, onReady }) => {
  const [isGridReady, setIsGridReady] = useState(false);
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTypingFinished(true);
    }, 2500); // CSS animation duration

    return () => clearTimeout(typingTimer);
  }, []);

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="h-screen relative flex items-center justify-center">
      {/* Layer 1: ChromeGrid (always present) */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTypingFinished ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {isTypingFinished && (
          <ChromeGrid onReady={() => {
            if (onReady) onReady();
            setIsGridReady(true);
          }} />
        )}
      </motion.div>

      {/* Layer 2: Text with mix-blend-mode */}
      <div className={`relative z-20 px-5 ${isTypingFinished && isGridReady ? 'animation-done mix-blend-difference' : ''}`}>
        <h1
            className="typing-text text-3xl md:text-5xl font-bold lowercase"
            style={{
                letterSpacing: '1em',
                userSelect: 'none',
            }}
        >
            emotional studios
        </h1>
      </div>

      {/* Layer 3: Buttons */}
      <motion.div
        className="absolute left-0 right-0 bottom-16 md:bottom-20 lg:bottom-[100px] z-30 flex justify-center"
        variants={buttonContainerVariants}
        initial="hidden"
        animate={isTypingFinished && isGridReady ? "visible" : "hidden"}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-16 lg:gap-[100px]">
          <Link href="/support#events" className="glitch-button-wrapper">
            <button
              data-text="View Events"
              className="contact-style-glitch-button px-8 py-3 sm:px-10 md:px-12 sm:py-4 md:py-5 rounded-full text-sm sm:text-base md:text-lg font-semibold w-48 sm:w-52 md:w-56 whitespace-nowrap"
            >
              View Events
            </button>
          </Link>
          <Link href="/booking" className="glitch-button-wrapper">
            <button
              data-text="Book Now"
              className="contact-style-glitch-button px-8 py-3 sm:px-10 md:px-12 sm:py-4 md:py-5 rounded-full text-sm sm:text-base md:text-lg font-semibold w-48 sm:w-52 md:w-56 whitespace-nowrap"
            >
              Book Now
            </button>
          </Link>
        </div>
      </motion.div>
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