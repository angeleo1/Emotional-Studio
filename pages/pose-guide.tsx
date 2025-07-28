import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useMemo, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

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

function PoseGallerySection() {
  const [category, setCategory] = useState<'Cute'|'Lovely'|'Dynamic'|'with Pet'>('Cute');
  const images = useMemo(() => GALLERY_IMAGES[category], [category]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const description = {
    Cute: 'This pose creates a cute and natural vibe.',
    Lovely: 'This pose emphasizes a lovely and soft mood.',
    Dynamic: 'This pose gives an energetic and dynamic impression.',
    'with Pet': 'This pose captures special moments with your pet.',
  };
  return (
    <section className="w-full px-2 md:px-0 pt-12 pb-10 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-center gap-4 mb-8">
          {['Cute', 'Lovely', 'Dynamic', 'with Pet'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              style={{
                minWidth: 130,
                fontSize: '1.15rem',
                letterSpacing: '0.03em',
                padding: '0.625rem 1.75rem',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: category === cat ? '#FF6100' : '#fff',
                cursor: 'pointer',
                outline: 'none',
                fontFamily: 'CS-Valcon-Drawn-akhr7k',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <div key={src} className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-800 flex items-center justify-center cursor-pointer" onClick={() => { setSelected(src); setOpen(true); }}>
              <img src={src} alt={category+idx} className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      {/* 확대 모달 */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={() => setOpen(false)}>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" onClick={() => setOpen(false)} />
          <Dialog.Panel as="div" className="relative flex flex-col items-center justify-center max-w-3xl w-full mx-4 p-0 z-[9999]">
            {selected && (
              <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Previous 화살표 */}
                <button
                  onClick={() => {
                    const idx = images.findIndex(img => img === selected);
                    const prevIdx = (idx - 1 + images.length) % images.length;
                    setSelected(images[prevIdx]);
                  }}
                  aria-label="Previous"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(30,30,30,0.5)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #0006',
                  }}
                >
                  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <img
                  src={selected}
                  alt="gallery modal"
                  style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '1.5rem', boxShadow: '0 8px 32px #000a', zIndex: 11, position: 'relative' }}
                />
                {/* Next 화살표 */}
                <button
                  onClick={() => {
                    const idx = images.findIndex(img => img === selected);
                    const nextIdx = (idx + 1) % images.length;
                    setSelected(images[nextIdx]);
                  }}
                  aria-label="Next"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(30,30,30,0.5)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #0006',
                  }}
                >
                  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                </button>
              </div>
            )}
            <div className="flex-1 text-lg font-semibold mt-6 mb-4 text-center"
              style={{
                maxWidth: '90vw',
                color: '#ff6100',
                border: '2px solid #ff6100',
                borderRadius: '1.2rem',
                padding: '1.2rem 2rem',
                background: 'rgba(17,17,17,0.85)',
                display: 'inline-block',
                fontWeight: 700
              }}
            >
              {description[category]}
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition.Root>
    </section>
  );
}

const PoseGuide: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>e.st - Pose Guide</title>
        <meta name="description" content="Pose Guide for e.st photography" />
      </Head>
      {/* 반응형 사진 갤러리 영역 */}
      <PoseGallerySection />
    </div>
  );
};

export default PoseGuide; 