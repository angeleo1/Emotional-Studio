import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useMemo, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const GALLERY_IMAGES = {
  Cute: [
    '/images/Pose Guide/cute/005.png',
    '/images/Pose Guide/cute/006.png',
    '/images/Pose Guide/cute/007.png',
    '/images/Pose Guide/cute/008.png',
    '/images/Pose Guide/cute/009.png',
  ],
  Lovely: [
    '/images/Pose Guide/lovely/010.png',
    '/images/Pose Guide/lovely/011.png',
    '/images/Pose Guide/lovely/012.png',
    '/images/Pose Guide/lovely/013.png',
  ],
  Dynamic: [
    '/images/Pose Guide/dynamic/014.png',
    '/images/Pose Guide/dynamic/015.png',
    '/images/Pose Guide/dynamic/016.png',
    '/images/Pose Guide/dynamic/017.png',
    '/images/Pose Guide/dynamic/018.png',
    '/images/Pose Guide/dynamic/019.png',
  ],
  'with Pet': [
    '/images/Pose Guide/pet/016.png',
    '/images/Pose Guide/pet/017.png',
    '/images/Pose Guide/pet/018.png',
    '/images/Pose Guide/pet/019.png',
    '/images/Pose Guide/pet/020.png',
  ],
};

function PoseGallerySection() {
  const [category, setCategory] = useState<'Cute'|'Lovely'|'Dynamic'|'with Pet'>('Cute');
  const images = useMemo(() => GALLERY_IMAGES[category], [category]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <section className="w-full px-4 pt-6 pb-10 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* 카테고리 버튼들 - 모바일에서 세로 스크롤, 중앙정렬 */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide justify-center">
            {['Cute', 'Lovely', 'Dynamic', 'with Pet'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as any)}
                className="flex-shrink-0 px-4 py-2 rounded-full font-bold transition-all duration-200 border-2"
                style={{
                  fontSize: isMobile ? '0.9rem' : '1.15rem',
                  letterSpacing: '0.03em',
                  fontWeight: 'bold',
                  background: 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: category === cat ? '#FF6100' : '#fff',
                  cursor: 'pointer',
                  outline: 'none',
                  fontFamily: 'CS-Valcon-Drawn-akhr7k',
                  minWidth: isMobile ? 'auto' : 130,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 이미지가 없을 때 표시할 메시지 */}
          {images.length === 0 && (
            <div className="flex items-center justify-center min-h-screen -mt-20">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight md:whitespace-nowrap px-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                  The adventure begins soon.
                </h2>
              </div>
            </div>
          )}

          {/* 이미지 그리드 - 모바일에서 2열, 데스크탑에서 3열 */}
          {images.length > 0 && (
            <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
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
          )}
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
              
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      </section>
    </div>
  );
}

const PoseGuide: NextPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>e.st - Pose Guide</title>
        <meta name="description" content="Pose Guide for e.st photography" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PoseGallerySection />
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
    </div>
  );
};

export default PoseGuide; 