import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { NextPage } from 'next';
import Head from 'next/head';
import MobileNavbar from '../components/MobileNavbar';

const cocktails = [
  {
    name: "PASSIONATE ORANGE",
    description: "A vibrant blend of fresh orange juice, passion fruit, and premium vodka, topped with a hint of mint. This refreshing cocktail captures the essence of summer in every sip.",
    image: "/images/elixir4.jpeg"
  },
  {
    name: "ECSTASY GLOW",
    description: "An enchanting mix of blue curacao, pineapple juice, and coconut rum, creating a mesmerizing purple hue. Served with a sugar rim and a slice of lime for the perfect balance of sweet and tangy.",
    image: "/images/elixir2.png"
  },
  {
    name: "RELIEF AURA",
    description: "A soothing combination of cucumber, mint, and gin, with a splash of elderflower liqueur. This refreshing cocktail is perfect for unwinding after a long day.",
    image: "/images/elixir3.png"
  }
];

const MobileElixirs: NextPage = () => {
  const [selectedCocktail, setSelectedCocktail] = useState<{
    name: string;
    description: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, []);

  const handleCocktailClick = (cocktail: typeof cocktails[0]) => {
    setSelectedCocktail(cocktail);
  };

  return (
    <>
      <Head>
        <title>Our Elixirs | Emotional Studio</title>
        <meta name="description" content="Discover our signature elixirs at Emotional Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MobileNavbar />
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-4 flex justify-center items-center border-b border-white/10">
          <h1 
            className="text-2xl font-medium"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Our Elixirs
          </h1>
        </header>

        <section className="w-full min-h-[calc(100vh-80px)] py-0 bg-[#111] flex flex-col items-center justify-center relative overflow-hidden px-0"
          style={{ overflow: 'hidden', paddingTop: 0, paddingBottom: 0 }}
        >
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255, 77, 0, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 77, 0, 0.25) 1px, transparent 1px)',
              backgroundSize: '4rem 4rem',
              maskImage: 'linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)',
              filter: 'drop-shadow(0 0 8px rgba(255, 77, 0, 0.6))'
            }}
          ></div>
          
          <div className="w-full h-full flex items-center justify-center select-none z-10 relative" style={{height: 'calc(100vh - 80px)'}}>
            {/* 왼쪽 줄 - PASSIONATE ORANGE */}
            <div className="w-1/3 h-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex flex-col animate-slideDownFaster">
                {[...Array(5)].map((_, repeatIndex) => (
                  <div key={repeatIndex} className="flex flex-col items-center" style={{marginBottom: '3rem'}}>
                    {'Passionate Orange'.split('').map((letter, index) => (
                      <span
                        key={`${repeatIndex}-${index}`}
                        className="font-extrabold leading-none cursor-pointer transition-transform duration-500 hover:scale-105"
                        style={{
                          fontSize: 'calc(100vh / 15)',
                          color: '#ff2222',
                          letterSpacing: '0.01em',
                          fontFamily: 'CS-Valcon-Drawn-akhr7k',
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                        }}
                        onClick={()=>handleCocktailClick(cocktails[0])}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 중앙 줄 - ECSTASY GLOW */}
            <div className="w-1/3 h-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex flex-col animate-slideUpFaster">
                {[...Array(5)].map((_, repeatIndex) => (
                  <div key={repeatIndex} className="flex flex-col items-center" style={{marginBottom: '3rem'}}>
                    {'Ecstasy Glow'.split('').map((letter, index) => (
                      <span
                        key={`${repeatIndex}-${index}`}
                        className="font-extrabold leading-none cursor-pointer transition-transform duration-500 hover:scale-105"
                        style={{
                          fontSize: 'calc(100vh / 15)',
                          color: '#ff00b8',
                          letterSpacing: '0.01em',
                          fontFamily: 'CS-Valcon-Drawn-akhr7k',
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                        }}
                        onClick={()=>handleCocktailClick(cocktails[1])}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 오른쪽 줄 - AURA RELIEF */}
            <div className="w-1/3 h-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex flex-col animate-slideDownFaster">
                {[...Array(5)].map((_, repeatIndex) => (
                  <div key={repeatIndex} className="flex flex-col items-center" style={{marginBottom: '3rem'}}>
                    {'Aura Relief'.split('').map((letter, index) => (
                      <span
                        key={`${repeatIndex}-${index}`}
                        className="font-extrabold leading-none cursor-pointer transition-transform duration-500 hover:scale-105"
                        style={{
                          fontSize: 'calc(100vh / 15)',
                          color: '#7cffb2',
                          letterSpacing: '0.01em',
                          fontFamily: 'CS-Valcon-Drawn-akhr7k',
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                        }}
                        onClick={()=>handleCocktailClick({...cocktails[2], name:'AURA RELIEF'})}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cocktail Description Modal */}
        {selectedCocktail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedCocktail(null)}
            />
            <div 
              className="relative w-full max-w-4xl mx-4 bg-[#111] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
              onClick={() => setSelectedCocktail(null)}
            >
              <div className="relative w-full h-[320px] flex items-center justify-center bg-black">
                <Image
                  src={selectedCocktail.image}
                  alt={selectedCocktail.name}
                  fill
                  className="object-contain rounded-t-2xl"
                  priority
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: 'CS-Valcon-Drawn-akhr7k',
                    color: selectedCocktail.name === 'PASSIONATE ORANGE' ? '#ff2222' :
                           selectedCocktail.name === 'ECSTASY GLOW' ? '#ff00b8' : '#7cffb2'
                  }}
                >
                  {selectedCocktail.name}
                </h3>
                <p className="text-white text-base leading-relaxed">{selectedCocktail.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileElixirs; 