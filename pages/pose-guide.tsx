import { NextPage } from 'next';
import Head from 'next/head';
import ParticleTextEffect from "@/components/ParticleTextEffect";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import { ParticleBackgroundEffect } from "@/components/ParticleTextEffect";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const CUTE_SOLO = [
  "화면 캡처 2025-06-25 213158.jpg",
  "화면 캡처 2025-06-25 212839.jpg",
  "화면 캡처 2025-06-25 212828.jpg",
  "화면 캡처 2025-06-25 212731.jpg",
  "화면 캡처 2025-06-25 212127.jpg",
];
const CUTE_FAMILY = [
  "화면 캡처 2025-06-25 213349.jpg",
  "화면 캡처 2025-06-25 213340.jpg",
  "화면 캡처 2025-06-25 213325.jpg",
  "화면 캡처 2025-06-25 212318.jpg",
  "화면 캡처 2025-06-25 212304.jpg",
];
const LOVELY_COUPLE = [
  "화면 캡처 2025-06-25 213131.jpg",
  "화면 캡처 2025-06-25 212647.jpg",
  "화면 캡처 2025-06-25 212513.jpg",
  "화면 캡처 2025-06-25 212502.jpg",
  "화면 캡처 2025-06-25 212432.jpg",
  "화면 캡처 2025-06-25 212415.jpg",
  "화면 캡처 2025-06-25 212220.jpg",
  "화면 캡처 2025-06-25 212209.jpg",
  "화면 캡처 2025-06-25 212145.jpg",
  "화면 캡처 2025-06-25 212031.jpg",
  "화면 캡처 2025-06-25 212018.jpg",
  "화면 캡처 2025-06-25 211959.jpg",
  "화면 캡처 2025-06-25 211950.jpg",
  "화면 캡처 2025-06-25 211940.jpg",
  "화면 캡처 2025-06-25 211930.jpg",
  "화면 캡처 2025-06-25 211913.jpg",
];
const DYNAMIC_FUN = [
  "화면 캡처 2025-06-25 213702.jpg",
  "화면 캡처 2025-06-25 213623.jpg",
  "화면 캡처 2025-06-25 213608.jpg",
  "화면 캡처 2025-06-25 213528.jpg",
  "화면 캡처 2025-06-25 213518.jpg",
  "화면 캡처 2025-06-25 213507.jpg",
  "화면 캡처 2025-06-25 213449.jpg",
  "화면 캡처 2025-06-25 213309.jpg",
  "화면 캡처 2025-06-25 213149.jpg",
  "화면 캡처 2025-06-25 213118.jpg",
  "화면 캡처 2025-06-25 213059.jpg",
];

const GALLERY_IMAGES = {
  Cute: [
    ...CUTE_SOLO.map(f => `/images/pose guide/solo/${f}`),
    ...CUTE_FAMILY.map(f => `/images/pose guide/family/${f}`),
  ],
  Lovely: LOVELY_COUPLE.map(f => `/images/pose guide/Couple/${f}`),
  Dynamic: DYNAMIC_FUN.map(f => `/images/pose guide/fun/${f}`),
};

function PoseGallerySection() {
  const [category, setCategory] = useState<"Cute"|"Lovely"|"Dynamic">("Cute");
  const images = useMemo(() => GALLERY_IMAGES[category], [category]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const description = {
    Cute: "This pose creates a cute and natural vibe.",
    Lovely: "This pose emphasizes a lovely and soft mood.",
    Dynamic: "This pose gives an energetic and dynamic impression."
  };
  return (
    <section
      className="w-full px-2 md:px-0 pt-12 pb-10 relative z-10 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #18181b 0%, #23234a 100%)' }}
    >
      {/* WebGL 배경 효과 */}
      <ParticleBackgroundEffect />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-center gap-4 mb-8">
          {[
            "Cute", "Lovely", "Dynamic"
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-7 py-2.5 rounded-full font-bold text-lg transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-white shadow-md ${category===cat ? 'bg-[#ff6100] text-white border-[#ff6100]' : 'bg-white/80 text-black border-white/50 hover:bg-[#ff6100] hover:text-white'}`}
              style={{ minWidth: 130, fontSize: '1.15rem', letterSpacing: '0.03em' }}
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
        <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center" onClose={() => setOpen(false)}>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative bg-[#18181b] rounded-2xl shadow-2xl flex flex-col md:flex-row items-center max-w-3xl w-full mx-4 p-6 z-50 border border-[#ff6100]" style={{borderWidth: '2px'}}>
            {selected && (
              <img src={selected} alt="확대 이미지" className="w-full md:w-80 h-96 object-cover rounded-lg mb-4 md:mb-0 md:mr-8" />
            )}
            <div className="flex-1 text-white text-lg font-semibold">
              {description[category]}
            </div>
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-[#ff6100]">×</button>
          </div>
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
    <div className="relative min-h-screen bg-black flex flex-col">
      <Head>
        <title>e.st - Pose Guide</title>
        <meta name="description" content="Pose Guide for e.st photography" />
      </Head>
      {/* 파티클 애니메이션 영역 - 모바일에서는 숨김 */}
      {!isMobile && (
        <div className="relative min-h-[400px] w-full" style={{height: 'auto'}}>
          <ParticleTextEffect
            text={"Capture the moment\nSip the Magic"}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}
      {/* 반응형 사진 갤러리 영역 */}
      <PoseGallerySection />
    </div>
  );
};

export default PoseGuide; 