import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useMemo, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import MobileNavbar from '../components/MobileNavbar';

const GALLERY_IMAGES = {
  Cute: [
    ...Array.from({ length: 15 }, (_, i) => `/images/friend${i + 1}.jpg`),
  ],
  Lovely: [
    ...Array.from({ length: 16 }, (_, i) => `/images/Couple${i + 1}.jpg`),
  ],
  Dynamic: [
    ...Array.from({ length: 11 }, (_, i) => `/images/Fun1 (${i + 1}).jpg`),
  ],
  'with Pet': [
    '/images/Pet (1).jpg',
    '/images/Pet (2).jpg',
    '/images/Pet (3).jpg',
  ],
};

function MobilePoseGallerySection() {
  const [category, setCategory] = useState<'Cute'|'Lovely'|'Dynamic'|'with Pet'>('Cute');
  const images = useMemo(() => GALLERY_IMAGES[category], [category]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  
  const description = {
    Cute: 'This pose creates a cute and natural vibe.',
    Lovely: 'This pose emphasizes a lovely and soft mood.',
    Dynamic: 'This pose gives an energetic and dynamic impression.',
    'with Pet': 'This pose captures special moments with your pet.',
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* 헤더 - 제목만 중앙에 */}
      <header className="p-4 flex justify-center items-center border-b border-white/10">
        <h1 
          className="text-2xl font-medium"
          style={{
            fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
            letterSpacing: '0.08em',
          }}
        >
          Pose Guide
        </h1>
      </header>

      <section className="w-full px-4 pt-6 pb-10 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* 카테고리 버튼들 - 모바일에서 가로 스크롤, 중앙정렬 */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide justify-center">
            {['Cute', 'Lovely', 'Dynamic', 'with Pet'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as any)}
                className="flex-shrink-0 px-4 py-2 rounded-full font-bold transition-all duration-200 border-2"
                style={{
                  fontSize: '0.9rem',
                  letterSpacing: '0.03em',
                  fontWeight: 'bold',
                  background: 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: category === cat ? '#FF6100' : '#fff',
                  cursor: 'pointer',
                  outline: 'none',
                  fontFamily: 'CS-Valcon-Drawn-akhr7k',
                  minWidth: 'auto',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 이미지 그리드 - 모바일에서 2열 */}
          <div className="grid gap-3 grid-cols-2">
            {images.map((src, idx) => (
              <div 
                key={src} 
                className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-800 flex items-center justify-center cursor-pointer" 
                onClick={() => { setSelected(src); setOpen(true); }}
              >
                <img 
                  src={src} 
                  alt={category+idx} 
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* 확대 모달 */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={() => setOpen(false)}>
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" onClick={() => setOpen(false)} />
            <Dialog.Panel as="div" className="relative flex flex-col items-center justify-center w-full h-full mx-4 p-4 z-[9999]">
              {selected && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Previous 화살표 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = images.findIndex(img => img === selected);
                      const prevIdx = (idx - 1 + images.length) % images.length;
                      setSelected(images[prevIdx]);
                    }}
                    aria-label="Previous"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 border-none rounded-full w-10 h-10 flex items-center justify-center z-20 cursor-pointer shadow-lg"
                  >
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <img
                    src={selected}
                    alt="gallery modal"
                    className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl z-11 relative object-contain"
                  />

                  {/* Next 화살표 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = images.findIndex(img => img === selected);
                      const nextIdx = (idx + 1) % images.length;
                      setSelected(images[nextIdx]);
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
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 bg-black/50 border-none rounded-full w-10 h-10 flex items-center justify-center z-20 cursor-pointer"
                  >
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
              
              <div 
                className="text-center mt-4 px-4 py-3 rounded-lg border-2"
                style={{
                  maxWidth: '90vw',
                  color: '#ff6100',
                  border: '2px solid #ff6100',
                  background: 'rgba(17,17,17,0.9)',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                {description[category]}
              </div>
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      </section>
    </div>
  );
}

const MobilePoseGuide: NextPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>e.st - Pose Guide</title>
        <meta name="description" content="Pose Guide for e.st photography" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MobileNavbar />
      <MobilePoseGallerySection />
    </div>
  );
};

export default MobilePoseGuide; 