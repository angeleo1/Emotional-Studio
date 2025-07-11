import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';

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

function InfiniteSlider({ images, speed = 30, reverse = false }: { images: string[]; speed?: number; reverse?: boolean }) {
  const repeatedImages = [...images, ...images, ...images];
  return (
    <div style={{ overflow: 'hidden', width: '100%', background: '#181818', padding: '1.5rem 0' }}>
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
              width: 220,
              height: 140,
              objectFit: 'cover',
              borderRadius: 16,
              marginRight: 18,
              boxShadow: '0 2px 12px #0005',
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

  useEffect(() => {
    const allImages = sections.flatMap(s => s.images || []);
    let isMounted = true;
    preloadImages(allImages).then(() => {
      if (isMounted) setImagesReady(true);
    });
    const timer = setTimeout(() => setMinDelayDone(true), 700); // 최소 0.7초 스피너 보장
    return () => { isMounted = false; clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (imagesReady && chromeGridReady && minDelayDone) {
      setShowSpinner(false);
      setTimeout(() => setShowContent(true), 350); // 스피너 페이드아웃 후 콘텐츠 페이드인
    }
  }, [imagesReady, chromeGridReady, minDelayDone]);

  return (
    <>
      {showSpinner && <OrangeAppleSpinner fadeOut={!showSpinner} />}
      <div
        style={{
          minHeight: 0, background: '#111', color: '#fff', padding: 0, margin: 0,
          opacity: showContent ? 1 : 0,
          transition: 'opacity 350ms cubic-bezier(.4,0,.2,1)',
        }}
      >
        {sections.map((section, idx) => (
          <div key={section.title || section.type} style={{ margin: section.type === 'chrome' ? 0 : '3rem 0', padding: 0, position: 'relative' }}>
            {section.type === 'chrome' ? (
              <>
                <div style={{ width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, borderRadius: 0, position: 'relative' }}>
                  <ChromeGrid onReady={() => setChromeGridReady(true)} />
                  {/* 좌측 하단 스크롤(화살표+텍스트) UI - Our Collaboration 섹션에만 */}
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
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    marginBottom: '2.2rem',
                    textAlign: 'center',
                    letterSpacing: '0.18em',
                    color: '#FF6100',
                    opacity: 0.92,
                    fontFamily: 'Open Sans, sans-serif',
                    textShadow: '0 2px 24px #ff610055, 0 1.5px 6px #0006',
                    lineHeight: 1.13,
                    display: 'block',
                  }}>{section.title}</h2>
                </div>
                <InfiniteSlider images={section.images || []} speed={28 + idx * 6} reverse={idx === 2} />
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
} 