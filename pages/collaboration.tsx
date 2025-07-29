import React, { useEffect, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

const ChromeGrid = dynamic(() => import('@/components/ui/chrome-grid').then(mod => mod.ChromeGrid), { ssr: false });

const sections = [
  {
    type: 'chrome',
  },
  {
    title: 'Clothing Store',
    images: [
      '/images/alanding.png',
      '/images/friend1.jpg',
      '/images/friend2.jpg',
      '/images/friend3.jpg',
      '/images/friend4.jpg',
      '/images/friend5.jpg',
      '/images/friend6.jpg',
    ],
    description: 'Professional fashion photography for clothing stores and brands.',
  },
  {
    title: 'Dog Shelter',
    images: [
      '/images/Pet (1).jpg',
      '/images/Pet (2).jpg',
      '/images/Pet (3).jpg',
      '/images/family1.jpg',
      '/images/family2.jpg',
      '/images/family3.jpg',
      '/images/family4.jpg',
    ],
    description: 'Heartwarming photography for pet shelters and animal welfare organizations.',
  },
  {
    title: 'Bakery',
    images: [
      '/images/Whisk_8436ac3945.jpg',
      '/images/friend7.jpg',
      '/images/friend8.jpg',
      '/images/friend9.jpg',
      '/images/friend10.jpg',
      '/images/friend11.jpg',
      '/images/friend12.jpg',
    ],
    description: 'Delicious food photography for bakeries and culinary businesses.',
  },
];

function OrangeAppleSpinner({ fadeOut }: { fadeOut?: boolean }) {
  // Apple 스타일(12개 막대, fade, 주황색, 부드러운 회전)
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#111',
        position: 'fixed', inset: 0, zIndex: 100,
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
        transition: 'opacity 350ms cubic-bezier(.4,0,.2,1)'
      }}
    >
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 28,
              top: 4,
              width: 8,
              height: 16,
              borderRadius: 4,
              background: 'linear-gradient(180deg, #FF6100 80%, #ffb380 100%)',
              opacity: (i + 1) / 12,
              transform: `rotate(${i * 30}deg) translateY(-4px)`,
              transformOrigin: '4px 28px',
              boxShadow: '0 1px 4px #0002',
            }}
          />
        ))}
        <style jsx>{`
          div[style*='position: relative'] {
            animation: apple-spin 1s linear infinite;
          }
          @keyframes apple-spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

function preloadImages(imageUrls: string[]): Promise<void> {
  return Promise.all(
    imageUrls.map(
      src => new Promise<void>(resolve => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      })
    )
  ).then(() => {});
}

function InfiniteSlider({ images, speed = 30, reverse = false, onImageClick, isMobile }: { 
  images: string[]; 
  speed?: number; 
  reverse?: boolean;
  onImageClick?: (image: string) => void;
  isMobile?: boolean;
}) {
  const repeatedImages = [...images, ...images, ...images];
  return (
    <div style={{ overflow: 'hidden', width: '100%', background: '#181818', padding: isMobile ? '1rem 0' : '1.5rem 0' }}>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${reverse ? 'slide-right' : 'slide-left'} ${speed}s linear infinite`,
        }}
      >
        {repeatedImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="slide-img"
            style={{
              width: isMobile ? 200 : 320,
              height: isMobile ? 125 : 200,
              objectFit: 'cover',
              borderRadius: isMobile ? 12 : 20,
              marginRight: isMobile ? 16 : 24,
              boxShadow: '0 4px 20px #0008',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}
            onClick={() => onImageClick?.(img)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes slide-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function CollaborationPage() {
  const [imagesReady, setImagesReady] = useState(false);
  const [chromeGridReady, setChromeGridReady] = useState(false);
  const [minDelayDone, setMinDelayDone] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const allImages = sections.flatMap(s => s.images || []);
    let isMounted = true;
    preloadImages(allImages).then(() => {
      if (isMounted) setImagesReady(true);
    });
    const timer = setTimeout(() => setMinDelayDone(true), 700); // 최소 0.7초 스피너 보장
    
    return () => { 
      isMounted = false; 
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (imagesReady && chromeGridReady && minDelayDone) {
      setShowSpinner(false);
      setTimeout(() => setShowContent(true), 350); // 스피너 페이드아웃 후 콘텐츠 페이드인
    }
  }, [imagesReady, chromeGridReady, minDelayDone]);

  const handleImageClick = (image: string) => {
    const section = sections.find(s => s.images?.includes(image));
    setCurrentSection(section);
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handlePrevious = () => {
    if (!selectedImage || !currentSection?.images) return;
    const currentIndex = currentSection.images.indexOf(selectedImage);
    const previousIndex = (currentIndex - 1 + currentSection.images.length) % currentSection.images.length;
    setSelectedImage(currentSection.images[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage || !currentSection?.images) return;
    const currentIndex = currentSection.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % currentSection.images.length;
    setSelectedImage(currentSection.images[nextIndex]);
  };

  const goBack = () => {
    router.push('/mobile');
  };

  return (
    <>
      {showSpinner && <OrangeAppleSpinner fadeOut={!showSpinner} />}
      <div
        style={{
          minHeight: 0, background: 'linear-gradient(135deg, #111 0%, #1a1a1a 50%, #111 100%)', color: '#fff', padding: 0, margin: 0,
          opacity: showContent ? 1 : 0,
          transition: 'opacity 350ms cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* 모바일 헤더 */}
        {isMobile && (
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
              Collaboration
            </h1>
            
            <div className="w-8"></div> {/* 균형을 위한 빈 공간 */}
          </header>
        )}

        {sections.map((section, idx) => (
          <div key={section.title || section.type}>
            {/* 섹션 간 구분선 - 첫 번째 섹션(chrome) 이후부터 */}
            {idx > 0 && (
              <div style={{
                height: isMobile ? '40px' : '60px',
                background: '#0a0a0a',
                width: '100%',
                margin: '0',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
              }} />
            )}
            
            <div style={{ 
              margin: section.type === 'chrome' ? 0 : isMobile ? '2rem 0' : '3rem 0', 
              padding: section.type === 'chrome' ? 0 : isMobile ? '2rem 0' : '4rem 0',
              position: 'relative'
            }}>
              {section.type === 'chrome' ? (
                <>
                  <div style={{ 
                    width: '100vw', 
                    height: isMobile ? 'calc(100vh - 80px)' : '100vh', 
                    minHeight: isMobile ? 'calc(100vh - 80px)' : '100vh', 
                    minWidth: '100vw', 
                    background: '#000', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: 0, 
                    padding: 0, 
                    borderRadius: 0, 
                    position: 'relative' 
                  }}>
                    <ChromeGrid onReady={() => setChromeGridReady(true)} />
                    {/* 좌측 하단 스크롤(화살표+텍스트) UI - Our Collaboration 섹션에만 */}
                    {!isMobile && (
                      <div className="absolute left-6 bottom-[9.25rem] flex flex-col items-center z-20 select-none pointer-events-none">
                        <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-down mb-8">
                          <path d="M14 4V44" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                          <path d="M6 36L14 44L22 36" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="mt-2 text-white text-[1.1rem] tracking-widest font-semibold" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>
                          Scroll
                        </span>
                        <style jsx>{`
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
                        `}</style>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <h2 style={{
                      fontSize: isMobile ? 'clamp(1.2rem, 3.5vw, 2rem)' : 'clamp(3rem, 8vw, 6rem)',
                      fontWeight: 400,
                      marginBottom: isMobile ? '1.5rem' : '2.2rem',
                      textAlign: 'center',
                      letterSpacing: '0.18em',
                      color: '#ffffff',
                      opacity: 0.92,
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                      textShadow: '0 1px 12px #ff610055, 0 0.75px 3px #0003',
                      lineHeight: 1.1,
                      display: 'block',
                      padding: isMobile ? '0 1rem' : '0 2rem',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      overflow: 'visible',
                      textOverflow: 'unset',
                      maxWidth: '100vw'
                    }}>
                      {section.title === 'Our Collaboration' && isMobile ? (
                        <>
                          Our<br />Collaboration
                        </>
                      ) : (
                        section.title
                      )}
                    </h2>
                  </div>
                  <InfiniteSlider 
                    images={section.images || []} 
                    speed={28 + idx * 6} 
                    reverse={idx === 2} 
                    onImageClick={handleImageClick}
                    isMobile={isMobile}
                  />
                </>
              )}
            </div>
          </div>
        ))}

        {/* 모달 */}
        <Transition.Root show={modalOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={() => setModalOpen(false)}>
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" onClick={() => setModalOpen(false)} />
            <Dialog.Panel as="div" className="relative flex flex-col items-center justify-center w-full h-full mx-4 p-4 z-[9999]">
              {selectedImage && currentSection && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Previous 화살표 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    aria-label="Previous"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 border-none rounded-full w-10 h-10 flex items-center justify-center z-20 cursor-pointer shadow-lg"
                  >
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <img
                    src={selectedImage}
                    alt="collaboration modal"
                    className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl z-11 relative object-contain"
                  />

                  {/* Next 화살표 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 border-none rounded-full w-10 h-10 flex items-center justify-center z-20 cursor-pointer shadow-lg"
                  >
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </button>

                  {/* 닫기 버튼 */}
                  <button
                    onClick={() => setModalOpen(false)}
                    className="absolute top-4 right-4 bg-black/50 border-none rounded-full w-10 h-10 flex items-center justify-center z-20 cursor-pointer"
                  >
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
              
              {currentSection && (
                <div 
                  className="text-center mt-4 px-4 py-3 rounded-lg border-2"
                  style={{
                    maxWidth: '90vw',
                    color: '#ff6100',
                    border: '2px solid #ff6100',
                    background: 'rgba(17,17,17,0.9)',
                    fontWeight: 700,
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                >
                  {currentSection.description}
                </div>
              )}
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
} 