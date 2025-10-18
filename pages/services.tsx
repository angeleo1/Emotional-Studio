import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import FloatingBookButton from '@/components/common/FloatingBookButton';
import PackagesContent from '@/components/PackagesContent';
import AddOnsContent from '@/components/AddOnsContent';

export default function Services() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [loadingType, setLoadingType] = useState<'packages' | 'addons' | null>(null);
  const [showContent, setShowContent] = useState(false);
  const numOfPages = 3; // pages 배열 길이
  const animTime = 1000;
  const scrolling = useRef(false);

  const handlePackagesClick = () => {
    setLoadingType('packages');
    setShowContent(true);
    // Navbar와 TopBanner 숨기기
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }
    // 주황색 배너 숨기기
    const topBanner = document.querySelector('.fixed.top-0.bg-gradient-to-r');
    if (topBanner) {
      (topBanner as HTMLElement).style.display = 'none';
    }
  };

  const handleAddOnsClick = () => {
    setLoadingType('addons');
    setShowContent(true);
    // Navbar와 TopBanner 숨기기
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }
    // 주황색 배너 숨기기
    const topBanner = document.querySelector('.fixed.top-0.bg-gradient-to-r');
    if (topBanner) {
      (topBanner as HTMLElement).style.display = 'none';
    }
  };

  const handleBackToMain = () => {
    setShowContent(false);
    setLoadingType(null);
    // Navbar와 TopBanner 다시 표시
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = '';
    }
    // 주황색 배너 다시 표시
    const topBanner = document.querySelector('.fixed.top-0.bg-gradient-to-r');
    if (topBanner) {
      (topBanner as HTMLElement).style.display = '';
    }
  };

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
    // 3. Packages & Add-ons
    {
      text: (
        <div className="space-y-10 text-white pt-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Choose Your Experience</h3>
            <p className="text-lg text-white/70">Select the perfect package for your photography needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Packages 버튼 */}
            <button 
              onClick={handlePackagesClick}
              className="group relative p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Packages</h4>
                <p className="text-white/70 text-sm">Complete photography packages with everything included</p>
              </div>
            </button>

            {/* Add-ons 버튼 */}
            <button 
              onClick={handleAddOnsClick}
              className="group relative p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Add-ons</h4>
                <p className="text-white/70 text-sm">Additional services to enhance your experience</p>
              </div>
            </button>
          </div>
        </div>
      ),
      title: 'Packages & Add-ons',
    },

  ];

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
    <div className="relative w-full min-h-screen overflow-hidden" style={{ background: '#111111' }}>
      {/* 로딩된 내용 표시 */}
      {showContent && (
        <div className="fixed inset-0 z-40 flex flex-col" style={{ background: '#111' }}>
          {/* 뒤로가기 버튼 - 우측 하단 (중앙보다 왼쪽) */}
          <div className="fixed bottom-8 right-32 z-50">
            <button
              onClick={handleBackToMain}
              className="flex items-center justify-center w-14 h-14 bg-white hover:bg-white/90 backdrop-blur-sm rounded-full transition-all duration-300 shadow-lg hover:scale-110"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>
          
          {/* 내용 */}
          <div className="flex-1 overflow-y-auto">
            {loadingType === 'packages' && <PackagesContent />}
            {loadingType === 'addons' && <AddOnsContent />}
          </div>
        </div>
      )}
      {/* 좌측 하단 스크롤(화살표+텍스트) UI - 데스크톱에서만 표시 */}
      <div className="hidden md:flex fixed left-6 bottom-[20rem] flex-col items-center z-20 select-none pointer-events-none">
        {currentPage === 3 ? (
          <>
            {/* 위쪽 화살표 */}
            <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-up mb-8">
              <path d="M14 44V4" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M6 12L14 4L22 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="mt-2 text-white text-[1.1rem] tracking-widest font-semibold" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>
              Scroll
            </span>
          </>
        ) : (
          <>
            {/* 아래쪽 화살표 */}
            <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-down mb-8">
              <path d="M14 4V44" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M6 36L14 44L22 36" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="mt-2 text-white text-[1.1rem] tracking-widest font-semibold" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>
              Scroll
            </span>
          </>
        )}
      </div>
      {(() => {
        const page = pages[currentPage - 1];
        return (
          <div key={currentPage} className="absolute inset-0">
            {/* PC: 좌/우 반반, 교차 배치 */}
            <div className="hidden md:flex w-full h-full">
              {/* Provided(1): 이미지 왼쪽, 텍스트 오른쪽 */}
              {/* Session(2): 텍스트 왼쪽, 이미지 오른쪽 */}
              {/* Packages & Add-ons(3): 전체 화면 중앙 배치 */}
              {currentPage === 1 ? (
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
                      {/* Packages & Add-ons: 중앙에 큰 이미지 */}
                      {currentPage === 3 && (
                        <div className="relative w-full h-[90vh] max-w-4xl mx-auto flex items-center justify-center">
                          <div className="relative w-full h-full max-w-none flex items-center justify-center m-0 p-0">
                            <Image src={page.images[0]} alt="section image" fill style={{objectFit:'contain'}} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Right: 텍스트 (검정 배경) */}
                  <div className="w-1/2 h-full flex flex-col items-center justify-center px-8" style={{background:'#111'}}>
                    <div className="text-5xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className="pt-16 w-full max-w-xl mx-auto">
                      {currentPage === 1 ? getAccordionText() : page.text}
                    </div>
                  </div>
                </>
              ) : currentPage === 2 ? (
                <>
                  {/* Left: 텍스트 (검정 배경) */}
                  <div className="w-1/2 h-full flex flex-col items-center justify-center px-8" style={{background:'#111'}}>
                    <div className="text-5xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className="pt-16 w-full max-w-xl mx-auto">{page.text}</div>
                  </div>
                  {/* Right: 이미지 (먹색 배경) */}
                  <div className="w-1/2 h-full flex items-center justify-center" style={{background:'#111111'}}>
                    <div className="w-full px-8 flex flex-row gap-10 items-center justify-center">
                      {/* Shooting Type: 한 장씩 표시하고 좌우 버튼으로 넘기기 */}
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
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Packages & Add-ons: 전체 화면 중앙 배치 */}
                  <div className="w-full h-full flex flex-col items-center justify-center px-8" style={{background:'#111'}}>
                    <div className="text-5xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full max-w-4xl mx-auto mb-8" />
                    <div className="w-full max-w-4xl mx-auto">
                      {page.text}
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
                {/* Session 페이지의 이미지들 */}
                {currentPage === 2 && page.images && page.images.map((img, j) => (
                  <div key={j} className="relative w-full h-64 max-w-md shadow-lg rounded-xl overflow-hidden bg-transparent flex items-center justify-center m-0 p-0">
                    <Image src={typeof img === 'string' ? img : img.src} alt={typeof img === 'string' ? `${page.title} ${j + 1}` : img.alt} fill style={{objectFit:'cover'}} className="rounded-xl" />
                  </div>
                ))}
              </div>
              {/* 텍스트: 검정 배경 */}
              <div className={`flex flex-col items-center justify-center flex-1 px-4 pb-8 ${currentPage === 3 ? 'min-h-screen' : ''}`} style={{background:'#111'}}>
                <h2 className="text-5xl font-bold uppercase mb-4 text-white text-center tracking-widest" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>{page.title}</h2>
                <div className="border-b-2 border-white/30 w-full max-w-md mx-auto mb-4" />
                <div className="w-full max-w-md mx-auto">
                  {currentPage === 1 ? getAccordionText() : page.text}
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
  );
} 