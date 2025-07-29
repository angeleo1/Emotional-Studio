"use client"

import * as React from "react"
import { useState, useCallback, useEffect } from "react"
import {
  HTMLMotionProps,
  MotionValue,
  Variants,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"
import Image from 'next/image';
import Link from 'next/link';
import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll";
import GlassContainer from '@/components/ui/GlassContainer';
import { Dialog, Transition as DialogTransition } from "@headlessui/react";
import { Fragment } from "react";
import ParticleBackgroundEffect from "@/components/ParticleBackgroundEffect";
import WavyClipPath from '@/components/WavyClipPath';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

// 새로운 카테고리 리스트
const CATEGORY_LIST = [
  "All",
  "Black & White",
  "Color",
  "Collaboration",
  "Studio",
];

// 실제 파일이제 어바웃어스 로딩페이지 수정할거야. 지금 스피너위에 이미지있는걸 aboutvideo.mp4로 교체해줘 사이즈는 더 크게해서명 (60장 이하, 7~8장씩 분배)
const FILES = [
  "service5.png", "intro1.png", "booking.png", "leobom_Design_a_simple_minimalist_graphic_for_the_library_PHO_782fa258-1025-42ed-bea8-53a1ce96f579_0.png", "leobom_surreal_scene_of_a_lifelike_human_face_sculpted_entire_45885c7d-4c92-4b21-a440-9410ab1e777a_2.png", "intro2.png", "supporta.png", "leobom_A_photo_of_a_human_where_if_one_survives_themselves_th_45622cc7-2a7b-404f-9ad6-6f3b1d3af619_2.png", "supportb.png", "booking2.png", "leobom_top_view_a_person_lying_peacefully_on_a_donation_bed_I_d3a13cca-7e3e-4059-85e5-38b6549038e5_2.png", "landing.png", "leobom_top_view_a_person_lying_peacefully_on_a_donation_bed_I_d3a13cca-7e3e-4059-85e5-38b6549038e5_3.png", "leobom_develops_a_tube_of_orange_acrylic_paint_realistic_phot_10e5a4a2-4d36-4e1a-b44b-d0296e1ac1ec_2.png", "leobom_Create_an_eye-catching_modern_editorial_full-body_port_b52a2481-a30b-4615-b7f4-72e3966369d1_1.png", "leobom_Create_a_hyper-realistic_three-dimensional_technical_s_a5821456-fb62-450a-bcb7-4bd900a2a1c6_1.png", "leobom_Create_a_hyper-realistic_three-dimensional_technical_s_a5821456-fb62-450a-bcb7-4bd900a2a1c6_3.png", "leobom_Create_a_hyper-realistic_three-dimensional_technical_s_74959602-f2db-469c-ab0f-ca43a3e23bfc_3.png", "leobom_Isometric_minimalist_cozy_workspace_of_a_photographer__583dc11d-a46c-434a-b43c-2b61e6164b32_3.png", "leobom_Isometric_minimalist_cozy_workspace_of_a_photographer__143176b6-4810-4899-864a-7afeede1cf0b_3.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_4bb549d3-5794-4102-9978-a3bf0f88c860_1.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_4bb549d3-5794-4102-9978-a3bf0f88c860_0.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_10a7dcf3-a019-43e3-8d4c-02fdd93705ab_3.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_10a7dcf3-a019-43e3-8d4c-02fdd93705ab_2.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_10a7dcf3-a019-43e3-8d4c-02fdd93705ab_0.png", "elixir1.png", "elixir2.png", "elixir3.png", "Service3-2.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_4438a1ae-d112-4bdd-914c-dec8f851433b_0.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_29de6bcf-a100-429b-b711-7ec9dfff1901_2.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_29de6bcf-a100-429b-b711-7ec9dfff1901_1.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_29de6bcf-a100-429b-b711-7ec9dfff1901_0.png" ];

// 카테고리별 이미지 분배 (예시: Black & White, Color, Collaboration, e.st)
const perCat = Math.ceil(FILES.length / 4);
const IMAGES_BW = FILES.slice(0, perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_COLOR = FILES.slice(perCat, 2*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_COLLAB = FILES.slice(2*perCat, 3*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_EST = FILES.slice(3*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_ALL = [
  ...IMAGES_BW,
  ...IMAGES_COLOR,
  ...IMAGES_COLLAB,
  ...IMAGES_EST,
];
const CATEGORY_MAP: Record<string, string[]> = {
  All: IMAGES_ALL,
  "Black & White": IMAGES_BW,
  "Color": IMAGES_COLOR,
  "Collaboration": IMAGES_COLLAB,
  "Studio": IMAGES_EST,
};

const SPRING_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
};
const blurVariants: Variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
  },
};

const ContainerScrollContext = React.createContext<{ scrollYProgress: MotionValue<number> } | undefined>(undefined);
function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error("useContainerScrollContext must be used within a ContainerScroll Component");
  }
  return context;
}
export const ContainerScroll: React.FC<React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>> = ({ children, className = "", style = {}, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={"relative min-h-[120vh] " + className}
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center top",
          transformStyle: "preserve-3d",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};
export const ContainerSticky: React.FC<React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>> = ({ children, className = "", style = {}, ...props }) => {
  return (
    <div
      className={"left-0 top-0 min-h-[30rem] w-full overflow-visible " + className}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "center top",
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
export const GalleryContainer: React.FC<React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>> = ({ children, className = "", style = {}, ...props }) => {
  const { scrollYProgress } = useContainerScrollContext();
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [75, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 0.9], [1.2, 1]);
  return (
    <motion.div
      className={"relative grid size-full grid-cols-3 gap-2 rounded-2xl " + className}
      style={{
        rotateX,
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Masonry 느낌의 컬럼 분배 (이미지 부족 시 반복, 고유 key/alt 부여)
function splitMasonryRepeat(images: GalleryImage[], colCount: number, minPerCol: number) {
  const total = colCount * minPerCol;
  const repeated: (GalleryImage & { _key: string })[] = Array.from({ length: total }, (_, i) => {
    const base = images[i % images.length];
    return {
      ...base,
      alt: `${base.alt}-${i}`,
      _key: `${base.src}-${i}`,
    };
  });
  const cols: (GalleryImage & { _key: string })[][] = Array.from({ length: colCount }, () => []);
  repeated.forEach((img, i) => {
    cols[i % colCount].push(img);
  });
  return cols;
}

export default function GalleryPage() {
  const [category, setCategory] = useState("All");
  const images = CATEGORY_MAP[category] || IMAGES_ALL;
  const [modalImg, setModalImg] = useState<string | null>(null);

  // ESC로 닫기
  useEffect(() => {
    if (!modalImg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImg(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalImg]);

  // 이미지 클릭 핸들러를 ParallaxScrollSecond에 전달
  const handleImageClick = useCallback((src: string) => setModalImg(src), []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ background: '#111' }}>
      {/* 주요 컨텐츠를 z-10으로 감싸기 */}
      <div className="relative z-10">
        {/* 새 카테고리 메뉴 */}
        <div className="flex justify-center items-center py-10" style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
          {/* 메뉴 버튼 영역 */}
          <div style={{ display: 'flex', gap: '1.2rem', position: 'relative', zIndex: 2 }}>
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  fontFamily: 'CS-Valcon-Drawn-akhr7k',
                  fontWeight: category === cat ? 700 : 400,
                  fontSize: '1.25rem',
                  background: '#111',
                  border: '1px solid #222',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.18s',
                  color: category === cat ? '#FF6100' : '#fff',
                  letterSpacing: '0.01em',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '1.2rem',
                  width: 'auto',
                  minWidth: 0,
                  boxSizing: 'border-box',
                  display: 'inline-block',
                  boxShadow: 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* 카테고리 메뉴 하단 웨이비 실선 구분선 */}
        <div style={{ width: '100vw', height: 48, position: 'relative', margin: 0, padding: 0 }}>
          <WavyClipPath
            clipId="gallery-wavy-divider"
            showLine={true}
            lineStrokeWidth={2.5}
            stiffness={0.045}
            damping={0.89}
            idleAmplitude={3.2}
            idleFrequency={0.008}
          />
        </div>
        {/* Parallax 갤러리 */}
        <div style={{ position: 'relative', zIndex: 1, minHeight: '60vh', width: '100%' }}>
          <ParallaxScrollSecond images={images} onImageClick={handleImageClick} />
        </div>
        {/* 이미지 확대 모달 */}
        <DialogTransition.Root show={!!modalImg} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={() => setModalImg(null)}>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
            <Dialog.Panel as="div" className="relative flex flex-col items-center justify-center max-w-3xl w-full mx-4 p-0 z-[9999]">
              {modalImg && (
                <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Previous 화살표 */}
                  <button
                    onClick={() => {
                      const idx = images.findIndex(img => img === modalImg);
                      const prevIdx = (idx - 1 + images.length) % images.length;
                      setModalImg(images[prevIdx]);
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
                    src={modalImg}
                    alt="gallery modal"
                    style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '1.5rem', boxShadow: '0 8px 32px #000a', zIndex: 11, position: 'relative' }}
                  />
                  {/* Next 화살표 */}
                  <button
                    onClick={() => {
                      const idx = images.findIndex(img => img === modalImg);
                      const nextIdx = (idx + 1) % images.length;
                      setModalImg(images[nextIdx]);
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
              <button onClick={() => setModalImg(null)} className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-[#ff6100] z-[10000]">×</button>
            </Dialog.Panel>
          </Dialog>
        </DialogTransition.Root>
      </div>
    </div>
  );
}

// GalleryCol에서 key를 _key로 지정
export const GalleryCol: React.FC<{ className?: string; style?: React.CSSProperties; yRange?: [string, string]; images: (GalleryImage & { onClick?: () => void; _key?: string })[] }> = ({ className = "", style = {}, yRange = ["0%", "-10%"], images }) => {
  const { scrollYProgress } = useContainerScrollContext();
  const y = useTransform(scrollYProgress, [0.5, 1], yRange);
  return (
    <motion.div
      className={"relative flex w-full flex-col gap-2 " + className}
      style={{ y, ...style }}
    >
      {images.map((img, idx) => (
        <img
          key={img._key || idx}
          className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow cursor-zoom-in transition-transform hover:scale-105"
          src={img.src}
          alt={img.alt}
          onClick={img.onClick}
        />
      ))}
    </motion.div>
  );
}; 