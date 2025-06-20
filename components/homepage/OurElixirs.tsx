import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

  const handleCocktailClick = (cocktail: typeof cocktails[0]) => {
    setSelectedCocktail(cocktail);
  };

  return (
    <>
      <section className="w-full min-h-screen py-32 bg-[#111] flex flex-col items-center justify-center relative overflow-hidden px-0">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 77, 0, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 77, 0, 0.25) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
            maskImage: 'linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)',
            filter: 'drop-shadow(0 0 8px rgba(255, 77, 0, 0.6))'
          }}
        ></div>
        <h2 className="text-6xl sm:text-8xl font-extrabold text-center mb-8 tracking-widest neon-title z-10 relative" style={{letterSpacing:'0.08em', color: '#FFE8D6', textShadow: '0 0 10px #FF4D00, 0 0 20px #FF4D00, 0 0 30px #FF4D00'}}>OUR ELIXIRS</h2>
        <div className="w-full flex flex-col items-center justify-center space-y-0 select-none z-10 relative" style={{height:'calc(100vh - 120px)'}}>
          {/* 1st cocktail */}
          <div className="w-full overflow-hidden flex justify-start" style={{height:'24vw', minHeight:'180px', maxHeight:'340px', marginBottom:'-2vw'}}>
            <div className="w-full animate-slideRight flex">
              {[...Array(2)].map((_,i)=>(
                <span
                  key={i}
                  className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                  style={{
                    fontSize: 'clamp(4rem, 18vw, 15rem)',
                    color: '#ff2222',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={()=>handleCocktailClick(cocktails[0])}
                >
                  {cocktails[0].name}
                </span>
              ))}
            </div>
          </div>
          {/* 2nd cocktail */}
          <div className="w-full overflow-hidden flex justify-end" style={{height:'24vw', minHeight:'180px', maxHeight:'340px', marginBottom:'-2vw'}}>
            <div className="w-full animate-slideLeft flex">
              {[...Array(2)].map((_,i)=>(
                <span
                  key={i}
                  className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                  style={{
                    fontSize: 'clamp(4rem, 18vw, 15rem)',
                    color: '#ff00b8',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={()=>handleCocktailClick(cocktails[1])}
                >
                  {cocktails[1].name}
                </span>
              ))}
            </div>
          </div>
          {/* 3rd cocktail */}
          <div className="w-full overflow-hidden flex justify-start" style={{height:'24vw', minHeight:'180px', maxHeight:'340px'}}>
            <div className="w-full animate-slideRight flex">
              {[...Array(2)].map((_,i)=>(
                <span
                  key={i}
                  className="font-extrabold uppercase leading-none cursor-pointer transition-transform duration-500 hover:scale-105 px-2 md:px-8"
                  style={{
                    fontSize: 'clamp(4rem, 18vw, 15rem)',
                    color: '#7cffb2',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={()=>handleCocktailClick({...cocktails[2], name:'AURA RELIEF'})}
                >
                  {'AURA RELIEF'}
                </span>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          .neon-title {
            color: #ff2222;
          }
          @keyframes slideRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          @keyframes slideLeft {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-slideRight {
            animation: slideRight 12s linear infinite;
          }
          .animate-slideLeft {
            animation: slideLeft 12s linear infinite;
          }
        `}</style>
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
            <div className="p-8 flex-1 flex flex-col justify-center">
              <h3 className="text-4xl font-bold text-white mb-4">{selectedCocktail.name}</h3>
              <p className="text-white/80 text-lg leading-relaxed">{selectedCocktail.description}</p>
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
    </>
  );
} 