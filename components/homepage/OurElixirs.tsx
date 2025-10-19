import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import FloatingBookButton from '@/components/common/FloatingBookButton';

  const cocktails = [
    {
      name: "Passion Red",
      description: "A vibrant elixir of hibiscus, rose, and ginger, with bittersweet vanilla and clarified grapefruit. Bold, warming, and enticing—crafted to awaken desire, ignite the senses, and stir a lingering sense of passion."
    },
    {
      name: "Ecstasy Glow",
      description: "A curated blend of clarified banana and golden honey, naturally packed with mood-lifting compounds to uplift spirits and ease stress. Bright citrus and a whisper of lemon oil complete this smooth, radiant elixir—crafted to leave you glowing from within."
    },
    {
      name: "Aura Relief",
      description: "A soothing mix of blueberries, lavender, and butterfly pea tea, with a touch of pink Himalayan salt and agave. Balanced and restorative—crafted to calm the senses, refresh the spirit, and bring a comforting sense of relief."
    }
  ];

export default function OurElixirs() {
  const [selectedCocktail, setSelectedCocktail] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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
      <div className="min-h-screen bg-[#111] text-white">
        <section className="w-full min-h-screen py-0 bg-[#111] flex flex-col items-center justify-center relative overflow-hidden px-0"
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
          
          <div className="w-full h-full flex flex-col items-center justify-center select-none z-10 relative" style={{gap: isMobile ? '5px' : '0', height: 'calc(100vh - 80px)'}}>
            {/* 1st cocktail */}
            <div className="w-full flex items-center justify-center overflow-hidden" style={{padding: 0, height: isMobile ? 'calc((100vh - 80px - 20px) / 3)' : 'calc((100vh - 80px) / 3)'}}>
              <div className={`w-full flex ${isMobile ? 'animate-slideRightFaster' : 'animate-slideRight'}`}>
                {[...Array(isMobile ? 1 : 2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: isMobile ? 'calc(100vh / 6)' : 'calc(100vh / 3.2)',
                      color: '#c2185b',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                    }}
                    onClick={()=>handleCocktailClick(cocktails[0])}
                  >
                    {cocktails[0].name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 2nd cocktail */}
            <div className="w-full flex items-center justify-center overflow-hidden" style={{padding: 0, height: isMobile ? 'calc((100vh - 80px - 20px) / 3)' : 'calc((100vh - 80px) / 3)'}}>
              <div className={`w-full flex ${isMobile ? 'animate-slideLeftFaster' : 'animate-slideLeft'}`}>
                {[...Array(isMobile ? 1 : 2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: isMobile ? 'calc(100vh / 6)' : 'calc(100vh / 3.2)',
                      color: '#ffcd4a',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                    }}
                    onClick={()=>handleCocktailClick(cocktails[1])}
                  >
                    {cocktails[1].name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 3rd cocktail */}
            <div className="w-full flex items-center justify-center overflow-hidden" style={{padding: 0, height: isMobile ? 'calc((100vh - 80px - 20px) / 3)' : 'calc((100vh - 80px) / 3)'}}>
              <div className={`w-full flex ${isMobile ? 'animate-slideRightFaster' : 'animate-slideRight'}`}>
                {[...Array(isMobile ? 1 : 2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: isMobile ? 'calc(100vh / 6)' : 'calc(100vh / 3.2)',
                      color: '#8a2be2',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                    }}
                    onClick={()=>handleCocktailClick({...cocktails[2], name:'AURA RELIEF'})}
                  >
                    {'AURA RELIEF'}
                  </span>
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
            <div className="relative w-full max-w-4xl mx-4 bg-[#111] rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                {/* 이미지 섹션 */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden">
                    <img
                      src={`/images/Elixir/${selectedCocktail.name === 'Passion Red' ? 'Passion Red.jpeg' :
                             selectedCocktail.name === 'Ecstasy Glow' ? 'Ecstasy Glow.png' :
                             selectedCocktail.name === 'AURA RELIEF' ? 'Aura relief.png' : ''}`}
                      alt={selectedCocktail.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* 텍스트 섹션 */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 
                    className="text-2xl md:text-4xl font-bold mb-4"
                    style={{
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                      color: selectedCocktail.name === 'Passion Red' ? '#c2185b' :
                             selectedCocktail.name === 'Ecstasy Glow' ? '#ffcd4a' : '#8a2be2'
                    }}
                  >
                    {selectedCocktail.name}
                  </h3>
                  <p className="text-white text-base md:text-lg leading-relaxed">{selectedCocktail.description}</p>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                onClick={() => setSelectedCocktail(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
    </>
  );
} 