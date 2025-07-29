import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

export default function OurElixirs() {
  const [selectedCocktail, setSelectedCocktail] = useState<{
    name: string;
    description: string;
    image: string;
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

  const goBack = () => {
    router.push('/mobile');
  };

  return (
    <>
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-4 flex justify-between items-center border-b border-white/10">
          <button
            onClick={goBack}
            className="text-2xl font-bold text-white hover:text-[#FF6100] transition-colors"
          >
            ←
          </button>
          
          <h1 
            className="text-2xl font-medium"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Our Elixirs
          </h1>
          
          <div className="w-8"></div> {/* 균형을 위한 빈 공간 */}
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
          
          <div className="w-full h-full flex flex-col items-center justify-center select-none z-10 relative" style={{gap: 0, height: 'calc(100vh - 80px)'}}>
            {/* 1st cocktail */}
            <div className="w-full flex-1 flex items-center justify-center overflow-hidden" style={{padding: 0, flex: '1 1 0%'}}>
              <div className={`w-full flex ${isMobile ? 'animate-slideRightFaster' : 'animate-slideRight'}`}>
                {[...Array(isMobile ? 1 : 2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: isMobile ? 'calc(100vh / 6)' : 'calc(100vh / 3.2)',
                      color: '#ff2222',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                      marginBottom: isMobile ? 'calc(100vh / 24)' : '0',
                    }}
                    onClick={()=>handleCocktailClick(cocktails[0])}
                  >
                    {cocktails[0].name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 2nd cocktail */}
            <div className="w-full flex-1 flex items-center justify-center overflow-hidden" style={{padding: 0, flex: '1 1 0%'}}>
              <div className={`w-full flex ${isMobile ? 'animate-slideLeftFaster' : 'animate-slideLeft'}`}>
                {[...Array(isMobile ? 1 : 2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: isMobile ? 'calc(100vh / 6)' : 'calc(100vh / 3.2)',
                      color: '#ff00b8',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                      marginBottom: isMobile ? 'calc(100vh / 24)' : '0',
                    }}
                    onClick={()=>handleCocktailClick(cocktails[1])}
                  >
                    {cocktails[1].name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 3rd cocktail */}
            <div className="w-full flex-1 flex items-center justify-center overflow-hidden" style={{padding: 0, flex: '1 1 0%'}}>
              <div className={`w-full flex ${isMobile ? 'animate-slideRightFaster' : 'animate-slideRight'}`}>
                {[...Array(isMobile ? 1 : 2)].map((_,i)=>(
                  <span
                    key={i}
                    className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                    style={{
                      fontSize: isMobile ? 'calc(100vh / 6)' : 'calc(100vh / 3.2)',
                      color: '#7cffb2',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                      marginBottom: isMobile ? 'calc(100vh / 24)' : '0',
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
            <div className="relative w-full max-w-4xl mx-4 bg-[#111] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="relative w-full md:w-1/2 h-[320px] md:h-[500px] flex items-center justify-center bg-black">
                <Image
                  src={selectedCocktail.image}
                  alt={selectedCocktail.name}
                  fill
                  className="object-contain rounded-l-2xl"
                  priority
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <h3 
                  className="text-2xl md:text-4xl font-bold mb-4"
                  style={{
                    fontFamily: 'CS-Valcon-Drawn-akhr7k',
                    color: selectedCocktail.name === 'PASSIONATE ORANGE' ? '#ff2222' :
                           selectedCocktail.name === 'ECSTASY GLOW' ? '#ff00b8' : '#7cffb2'
                  }}
                >
                  {selectedCocktail.name}
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed">{selectedCocktail.description}</p>
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
    </>
  );
} 