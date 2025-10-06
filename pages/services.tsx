import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const pages = [
  // 1. Provided as Standard
  {
    images: ['/images/dlsus.png'],
    title: 'Provided as Standard',
  },
  // 2. Shooting Type
  {
    images: [
        { src: '/images/Gallery/Customer Album/Studio (8).jpg', alt: 'Emotional Kit', label: 'emotional Kit' },
        { src: '/images/Jay test 0826,-(1 of 1).jpg', alt: 'Warm', label: 'Warm tone' },
      { src: '/images/Gallery/COOL/018.png', alt: 'Cool', label: 'Cool tone' },
      { src: '/images/Gallery/BW/0921 (4).jpg', alt: 'B/W', label: 'B/W' },
      { src: '/images/007.png', alt: 'Moodboard', label: 'Moodboard photo' },
      { src: '/images/001.png', alt: 'Moodboard', label: 'Moodboard photo' },
      { src: '/images/Studio (3).jpg', alt: 'Elixir', label: 'Elixir concentrate' }
    ],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div className="text-center mb-6">
            <div className="text-white mb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold w-64">1 - Person Session</span>
                  <span className="text-2xl font-bold">$65</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold w-64 ml-2">2 - People Session</span>
                  <span className="text-2xl font-bold">$120</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold w-64">Add person</span>
                  <span className="text-2xl font-bold">$30</span>
                </div>
              </div>
            </div>
                     <p className="text-sm text-white mb-6">Children under 5 and pets are welcome free of charge!</p>
                     <p className="text-sm text-white/70 mb-6">Intro - 10 minutes, Photo shoot - 20 minutes, Selection - 20 minutes</p>
           <div className="space-y-2 text-2xl font-bold text-white mt-16">
             <div className="text-5xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>emotional Kit</div>
             <div className="border-b-2 border-white/30 w-full mx-auto mb-6" />
             <p>Moodboard photo</p>
             <p>Elixir concentrate</p>
             <p>Timelapse video original file</p>
             <p>4x6'' prints of 2 selected photos</p>
             <p className="text-sm text-white/70 font-normal">provided per person</p>
           </div>
           <p className="text-lg text-white/70 text-center mt-8 italic">Provided with your session</p>
          </div>

      </div>
    ),
    title: 'Session',
  },
  // 3. Other Goods
  {
    images: ['/images/BW.jpg', '/images/frame.png (1).png', '/images/frame.png', '/images/frame.png (2).png'],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-3xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M6 7V3h12v4"/><path d="M6 17h12v4H6z"/></svg>
              </span>
              <span>Extra 4x6'' Print</span>
            </div>
            <span className="text-3xl font-bold text-right ml-4">$10</span>
          </div>
          <p className="text-lg mt-1 mb-4">High quality prints on premium paper</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-3xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
              </span>
              <span>Frame</span>
            </div>
            <span className="text-3xl font-bold text-right ml-4">$15</span>
          </div>
          <p className="text-lg mt-1 mb-4">Elegant frames to display your memories</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-3xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </span>
              <span>Digital original film</span>
            </div>
            <span className="text-3xl font-bold text-right ml-4">$20</span>
          </div>
          <p className="text-lg mt-1 mb-4">High resolution digital files for uploading SNS or download</p>
        </div>

      </div>
    ),
    title: 'Other Goods',
  },

];

export default function Services() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const numOfPages = pages.length;
  const animTime = 1000;
  const scrolling = useRef(false);

  // 아코디언 텍스트를 동적으로 생성하는 함수
  const getAccordionText = () => (
    <div className="space-y-10 text-white pt-8">
      <div>
        <div 
          className="flex items-center gap-3 text-3xl font-bold mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              setOpenSections(prev => 
                prev.includes(0) ? prev.filter(i => i !== 0) : [...prev, 0]
              );
            }
          }}
        >
          <span>🍸</span>
          <span>Elevate your emotions</span>
          {typeof window !== 'undefined' && window.innerWidth < 768 && (
            <span className="text-lg ml-auto">
              {openSections.includes(0) ? '−' : '+'}
            </span>
          )}
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${
          typeof window !== 'undefined' && window.innerWidth < 768 ? (openSections.includes(0) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0') : 'max-h-96 opacity-100'
        }`}>
          <p className="text-lg mt-1 mb-4">Relax and immerse yourself in the atmosphere, with our curated elixirs setting the tone for a unique photography experience.</p>
        </div>
      </div>
      <div>
        <div 
          className="flex items-center gap-3 text-3xl font-bold mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              setOpenSections(prev => 
                prev.includes(1) ? prev.filter(i => i !== 1) : [...prev, 1]
              );
            }
          }}
        >
          <span>📸</span>
          <span>The Photo Session</span>
          {typeof window !== 'undefined' && window.innerWidth < 768 && (
            <span className="text-lg ml-auto">
              {openSections.includes(1) ? '−' : '+'}
            </span>
          )}
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${
          typeof window !== 'undefined' && window.innerWidth < 768 ? (openSections.includes(1) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0') : 'max-h-96 opacity-100'
        }`}>
          <p className="text-lg mt-1 mb-4">Enjoy your 20-minute private session, solo or with loved ones, in a space designed for stunning, professional-quality photos.</p>
        </div>
      </div>
      <div>
        <div 
          className="flex items-center gap-3 text-3xl font-bold mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              setOpenSections(prev => 
                prev.includes(2) ? prev.filter(i => i !== 2) : [...prev, 2]
              );
            }
          }}
        >
          <span>🖼️</span>
          <span>Selection</span>
          {typeof window !== 'undefined' && window.innerWidth < 768 && (
            <span className="text-lg ml-auto">
              {openSections.includes(2) ? '−' : '+'}
            </span>
          )}
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${
          typeof window !== 'undefined' && window.innerWidth < 768 ? (openSections.includes(2) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0') : 'max-h-96 opacity-100'
        }`}>
          <p className="text-lg mt-1 mb-4">Choose two favourite shots in our private selection zone. Our team will refine them with meticulous retouching and premium printing, turning your images into visual memories.</p>
        </div>
      </div>
      <div>
        <div 
          className="flex items-center gap-3 text-3xl font-bold mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              setOpenSections(prev => 
                prev.includes(3) ? prev.filter(i => i !== 3) : [...prev, 3]
              );
            }
          }}
        >
          <span>🎬</span>
          <span>Timelapse Video</span>
          {typeof window !== 'undefined' && window.innerWidth < 768 && (
            <span className="text-lg ml-auto">
              {openSections.includes(3) ? '−' : '+'}
            </span>
          )}
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${
          typeof window !== 'undefined' && window.innerWidth < 768 ? (openSections.includes(3) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0') : 'max-h-96 opacity-100'
        }`}>
          <p className="text-lg mt-1 mb-4">Receive a highlight timelapse that beautifully captures the energy and moments of your session.</p>
        </div>
      </div>
    </div>
  );

  // Other Goods 텍스트를 동적으로 생성하는 함수
  const getOtherGoodsText = () => (
    <div className="space-y-10 text-white pt-8">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span className="w-8 h-8 inline-block align-middle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M6 7V3h12v4"/><path d="M6 17h12v4H6z"/></svg>
            </span>
            <span>Extra 4x6'' Print</span>
          </div>
          <span className="text-3xl font-bold text-right ml-4">$10</span>
        </div>
        <p className="text-lg mt-1 mb-4">High quality prints on premium paper</p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span className="w-8 h-8 inline-block align-middle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
            </span>
            <span>Frame</span>
          </div>
          <span className="text-3xl font-bold text-right ml-4">$15</span>
        </div>
        <p className="text-lg mt-1 mb-4">Elegant frames to display your memories</p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span className="w-8 h-8 inline-block align-middle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </span>
            <span>Additional Retouch</span>
          </div>
          <span className="text-3xl font-bold text-right ml-4">$10</span>
        </div>
        <p className="text-lg mt-1 mb-4">We will professionally enhance your selected images to ensure you look your absolute best</p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span className="w-8 h-8 inline-block align-middle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </span>
            <span>Digital original film</span>
          </div>
          <span className="text-3xl font-bold text-right ml-4">$20</span>
        </div>
        <p className="text-lg mt-1 mb-4">High resolution digital files for uploading SNS or download</p>
      </div>
    </div>
  );

  const navigateUp = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
      setCurrentImageIndex(0);
    }
  };

  const navigateDown = () => {
    if (currentPage < numOfPages) {
      setCurrentPage(p => p + 1);
      setCurrentImageIndex(0);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (scrolling.current) return;
    scrolling.current = true;
    e.deltaY > 0 ? navigateDown() : navigateUp();
    setTimeout(() => (scrolling.current = false), animTime);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (scrolling.current) return;
    if (e.key === 'ArrowUp') {
      scrolling.current = true;
      navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    } else if (e.key === 'ArrowDown') {
      scrolling.current = true;
      navigateDown();
      setTimeout(() => (scrolling.current = false), animTime);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>Services | Emotional Studio - Self Photo Studio in Melbourne</title>
        <meta name="description" content="Professional self photo studio services in Melbourne. Book your session at Emotional Studio - professional photography without a photographer. Starting from $65." />
        <meta name="keywords" content="self photo studio services, Melbourne photography, professional photo session, Emotional Studio services, photo booth rental, headshot photography" />
        <link rel="canonical" href="https://emotionalstudio.com.au/services" />
      </Head>
      <div className="relative w-full min-h-screen overflow-hidden" style={{ background: '#111111' }}>
      {/* 좌측 하단 스크롤(화살표+텍스트) UI - 데스크톱에서만 표시 */}
      <div className="hidden md:flex fixed left-6 bottom-[20rem] flex-col items-center z-20 select-none pointer-events-none">
        {currentPage === 3 ? (
          // Other Goods 페이지일 때 위쪽 화살표
          <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-up mb-8">
            <path d="M14 4V44" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            <path d="M6 12L14 4L22 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          // 다른 페이지일 때 아래쪽 화살표
          <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-down mb-8">
            <path d="M14 4V44" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            <path d="M6 36L14 44L22 36" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <span className="mt-2 text-white text-[1.1rem] tracking-widest font-semibold" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>
          Scroll
        </span>
      </div>
      {(() => {
        const page = pages[currentPage - 1];
        return (
          <div key={currentPage} className="absolute inset-0">
            {/* PC: 좌/우 반반, 교차 배치 */}
            <div className="hidden md:flex w-full h-full">
              {/* Provided(1), Other Goods(3): 이미지 왼쪽, 텍스트 오른쪽 */}
              {/* Shooting Type(2), Special(4): 텍스트 왼쪽, 이미지 오른쪽 */}
              {([1, 3].includes(currentPage)) ? (
                <>
                  {/* Left: 이미지 (먹색 배경) */}
                  <div className="w-1/2 h-full flex items-center justify-center" style={{background:'#111111'}}>
                    <div className={`w-full px-8 flex flex-col gap-4 items-center justify-center`}>
                      {/* Provided: 세로로 더 크게 */}
                      {currentPage === 1 && (
                        <div className="relative w-full h-[90vh] max-w-4xl mx-auto flex items-center justify-center">
                          <div className="relative w-full h-full max-w-none flex items-center justify-center m-0 p-0">
                            <Image src={page.images[0]} alt="section image" fill style={{objectFit:'contain'}} />
                          </div>
                        </div>
                      )}
                      {/* Other Goods: 세로 배치 */}
                      {currentPage === 3 && (
                        <div className="h-[90vh] w-full max-w-md overflow-hidden relative">
                          <div className="animate-infinite-slide">
                            {[...page.images, ...page.images].map((img, j) => (
                              <div key={`${j}-${img}`} className="relative w-full h-[40vh] shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center mb-4">
                          <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                        </div>
                      ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Right: 텍스트 (검정 배경) */}
                  <div className={`w-1/2 h-full flex flex-col items-center ${currentPage === 4 ? 'justify-start' : 'justify-center'} px-8`} style={{background:'#111'}}>
                    <div className="text-5xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className={`pt-16 w-full max-w-xl mx-auto ${currentPage === 4 ? 'flex-grow flex flex-col' : ''}`}>
                      {currentPage === 1 ? getAccordionText() : 
                       currentPage === 3 ? getOtherGoodsText() : page.text}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left: 텍스트 (검정 배경) */}
                  <div className="w-1/2 h-full flex flex-col items-center justify-center px-8" style={{background:'#111'}}>
                    <div className="text-5xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className="pt-16 w-full max-w-xl mx-auto">{page.text}</div>
                  </div>
                  {/* Right: 이미지 (먹색 배경) */}
                  <div className="w-1/2 h-full flex items-center justify-center" style={{background:'#111111'}}>
                    <div className={`w-full px-8 flex ${currentPage === 2 ? 'flex-row gap-10 items-center justify-center' : 'flex-col gap-4 items-center justify-center'}`}>
                      {/* Shooting Type: 한 장씩 표시하고 좌우 버튼으로 넘기기 */}
                      {currentPage === 2 && (
                        <div className="flex flex-row items-center gap-6 w-full justify-center">
                          {/* 왼쪽 버튼 */}
                          <button 
                            onClick={() => {
                              const newIndex = currentImageIndex === 0 ? page.images.length - 1 : currentImageIndex - 1;
                              setCurrentImageIndex(newIndex);
                            }}
                            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          
                          {/* 현재 이미지와 설명 */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-[500px] h-[70vh] shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center m-0 p-0">
                              <Image 
                                src={page.images[currentImageIndex].src || page.images[currentImageIndex]} 
                                alt={page.images[currentImageIndex].alt || "section image"} 
                                fill 
                                style={{
                                  objectFit: page.images[currentImageIndex].alt === 'Elixir' ? 'contain' : 'cover'
                                }} 
                                className="rounded-xl" 
                              />
                            </div>
                            <span 
                              className="text-white text-xl font-semibold mt-4"
                              style={page.images[currentImageIndex].label === 'emotional Kit' ? { fontFamily: 'CS-Valcon-Drawn-akhr7k' } : {}}
                            >
                              {page.images[currentImageIndex].label || ''}
                            </span>
                          </div>
                          
                          {/* 오른쪽 버튼 */}
                          <button 
                            onClick={() => {
                              const newIndex = currentImageIndex === page.images.length - 1 ? 0 : currentImageIndex + 1;
                              setCurrentImageIndex(newIndex);
                            }}
                            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {/* Special: 가로로 2장, 큼직하게 예쁘게 */}
                      {currentPage === 4 && (
                        <div className="flex flex-row gap-10 w-full h-full justify-center items-center">
                          <div className="relative w-[70%] h-[70vh] max-w-4xl shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center m-0 p-0">
                            <Image src={page.images[0]} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                          </div>
                          <div className="relative w-full h-[70vh] max-w-2xl shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center m-0 p-0">
                            <Image src={page.images[1]} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* 모바일: 한 컬럼 */}
            <div className="md:hidden flex flex-col w-full h-full">
              {/* 이미지: 흰 배경 */}
              <div className={`flex flex-col gap-4 w-full px-4 pt-8 items-center`} style={{background:'#111111'}}>
                {/* Provided: 세로로 크게 */}
                {currentPage === 1 && (
                  <div className="relative w-full h-80 max-w-md mx-auto flex items-center justify-center">
                    <div className="relative w-full h-full max-w-none flex items-center justify-center m-0 p-0">
                      <Image src={page.images[0]} alt="section image" fill style={{objectFit:'contain'}} />
                    </div>
                  </div>
                )}
                {/* Shooting Type: 한 장씩 표시하고 좌우 버튼으로 넘기기 */}
                {currentPage === 2 && (
                  <div className="flex flex-row items-center gap-4 w-full justify-center">
                    {/* 왼쪽 버튼 */}
                    <button 
                      onClick={() => {
                        const newIndex = currentImageIndex === 0 ? page.images.length - 1 : currentImageIndex - 1;
                        setCurrentImageIndex(newIndex);
                      }}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* 현재 이미지와 설명 */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-[280px] h-64 shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center m-0 p-0">
                        <Image 
                          src={page.images[currentImageIndex].src || page.images[currentImageIndex]} 
                          alt={page.images[currentImageIndex].alt || "section image"} 
                          fill 
                          style={{
                            objectFit: page.images[currentImageIndex].alt === 'Elixir' ? 'contain' : 'cover'
                          }} 
                          className="rounded-xl" 
                        />
                      </div>
                      <span 
                        className="text-white text-lg font-semibold mt-3"
                        style={page.images[currentImageIndex].label === 'emotional Kit' ? { fontFamily: 'CS-Valcon-Drawn-akhr7k' } : {}}
                      >
                        {page.images[currentImageIndex].label || ''}
                      </span>
                    </div>
                    
                    {/* 오른쪽 버튼 */}
                    <button 
                      onClick={() => {
                        const newIndex = currentImageIndex === page.images.length - 1 ? 0 : currentImageIndex + 1;
                        setCurrentImageIndex(newIndex);
                      }}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
                {/* Other Goods, Special: 기존대로(세로 배치) */}
                {(currentPage !== 1 && currentPage !== 2 && currentPage !== 3) && page.images.map((img, j) => (
                  <div key={j} className="relative w-full h-64 max-w-md shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center m-0 p-0">
                    <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                  </div>
                ))}
                {/* Other Goods: Mobile */}
                {currentPage === 3 && (
                  <div className="w-full max-w-md space-y-4">
                    {page.images.map((img, j) => (
                      <div key={j} className="relative w-full h-64 shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center">
                        <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                      </div>
                    ))}
                  </div>
                )}
                {/* Special: 가로로 2장, 큼직하게 예쁘게 (모바일) */}
                {currentPage === 4 && (
                  <div className="flex flex-col gap-6 w-full justify-center items-center">
                    {page.images.map((img, j) => (
                      <div key={j} className="relative w-full h-64 max-w-md shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center m-0 p-0">
                        <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* 텍스트: 검정 배경 */}
              <div className="flex flex-col items-center justify-center flex-1 px-4 pb-8" style={{background:'#111'}}>
                <h2 className="text-5xl font-bold uppercase mb-4 text-white text-center tracking-widest" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>{page.title}</h2>
                <div className="border-b-2 border-white/30 w-full max-w-md mx-auto mb-4" />
                <div className="w-full max-w-md mx-auto">
                  {currentPage === 1 ? getAccordionText() : 
                   currentPage === 3 ? getOtherGoodsText() : page.text}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      <style jsx>{`
        @keyframes infinite-slide {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-infinite-slide {
          display: flex;
          flex-direction: column;
          animation: infinite-slide 30s linear infinite;
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(8px); }
          40% { transform: translateY(16px); }
          60% { transform: translateY(8px); }
          80% { transform: translateY(0); }
        }
        .animate-bounce-down {
          animation: bounce-down 1.5s infinite;
        }
        @keyframes bounce-up {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-8px); }
          40% { transform: translateY(-16px); }
          60% { transform: translateY(-8px); }
          80% { transform: translateY(0); }
        }
        .animate-bounce-up {
          animation: bounce-up 1.5s infinite;
        }
      `}      </style>
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
      </div>
    </>
  );
} 