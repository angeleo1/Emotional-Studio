import { useState, useEffect } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ClientOnly from '@/components/ClientOnly'
import { useRouter } from 'next/router'
import { ChromeGrid } from '@/components/ui/chrome-grid'
import IntroAnimation from '@/components/IntroAnimation'
import InquiryButton from '@/components/common/InquiryButton'
import CustomCursor from '@/components/CustomCursor'
import Spinner from '@/components/ui/Spinner'

// 간단한 로딩 스피너 컴포넌트 교체 (variant4 default)
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}>
    <Spinner size={48} className="" color="#FF7A00" />
  </div>
);

const DynamicDemoOne = dynamic(() => import("@/components/ui/demo").then(mod => mod.DemoOne), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

const OurElixirs = dynamic(() => import('@/components/homepage/OurElixirs'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const EmotionalMoments = dynamic(() => import('@/components/homepage/EmotionalMoments'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const CollaborationGallery = dynamic(() => import('@/components/homepage/CollaborationGallery'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Footer = dynamic(() => import('@/components/homepage/Footer'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const PoseGuideSection = dynamic(() => import('@/components/homepage/PoseGuideSection'), { 
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const DynamicChromeGrid = dynamic(() => import('@/components/ui/chrome-grid').then(mod => mod.ChromeGrid), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Home: NextPage = () => {
  const router = useRouter();
  const [colorizedImages, setColorizedImages] = useState<{ [key: number]: boolean }>({})
  // 상태를 세 가지로 단순화
  const [showIntro, setShowIntro] = useState(true);      // 인트로 애니메이션
  const [showMain, setShowMain] = useState(false);       // 메인페이지
  const [showMainGrid, setShowMainGrid] = useState(false); // 3D, PoseGuideSection 렌더 타이밍
  const [showLoading, setShowLoading] = useState(false); // LOADING... 오버레이

  // ENTER 클릭 시 인트로 종료, 3D 그리드 바로 렌더
  const handleIntroFinish = () => {
    setShowIntro(false);
    setShowMainGrid(true); // 인트로 끝나면 바로 3D 그리드 렌더
    setShowLoading(true);  // 3D 그리드 준비 전까지 LOADING... 표시
  };

  // ChromeGrid 준비 완료 시 LOADING... 종료, 메인페이지 시작
  const handleGridReady = () => {
    setShowLoading(false); // LOADING... 숨김
    setShowMain(true);     // 메인 컨텐츠 표시
  };

  // 이미지 컬러 이펙트 등 기존 로직 유지
  useEffect(() => {
    const galleryImages = [
      'v1/jimmy-fermin-bqe0J0b26RQ-unsplash_tpyzo4', 'v1/aiony-haust-3TLl_97HNJo-unsplash_vda4od', 'v1/leon-elldot-f6HbVnGtNnY-unsplash_vt63we',
      'v1/olena-bohovyk-XttWKETqCCQ-unsplash_wryqhq', 'v1/jessica-felicio-QS9ZX5UnS14-unsplash_fdjyaf', 'v1/ivana-cajina-dnL6ZIpht2s-unsplash_o1zsv1',
      'v1/blake-carpenter-9ooMr_r7BlY-unsplash_u04ne2', 'v1/prince-akachi-4Yv84VgQkRM-unsplash_mczh7g', 'v1/IMG_0190_z0su9m', 'v1/IMG_0241_zxbg10'
    ];
    let intervalId: NodeJS.Timeout;
    const allTimers: NodeJS.Timeout[] = [];
    const randomizeColor = () => {
      const numImages = Math.floor(Math.random() * 3) + 1;
      const newColorizedImages: { [key: number]: boolean } = {};
      for (let i = 0; i < numImages; i++) {
        const randomIndex = Math.floor(Math.random() * galleryImages.length);
        newColorizedImages[randomIndex] = true;
      }
      setColorizedImages(prev => ({ ...prev, ...newColorizedImages }));
      const randomDuration = Math.random() * 1500 + 1500;
      const id = setTimeout(() => {
        setColorizedImages(prev => {
          const updated = { ...prev };
          Object.keys(newColorizedImages).forEach(key => {
            delete updated[parseInt(key, 10)];
          });
          return updated;
        });
      }, randomDuration);
      allTimers.push(id);
    };
    const startInterval = () => {
      randomizeColor();
      intervalId = setInterval(randomizeColor, Math.random() * 2000 + 2000);
    };
    startInterval();
    return () => {
      clearInterval(intervalId);
      allTimers.forEach(clearTimeout);
    };
  }, []);

  // LOADING... fallback 타이머 (중복 방지)
  useEffect(() => {
    if (showLoading) {
      const fallback = setTimeout(() => {
        setShowLoading(prev => {
          if (prev) setShowMain(true);
          return false;
        });
      }, 3000);
      return () => clearTimeout(fallback);
    }
  }, [showLoading]);

  return (
    <>
      {/* 1. 인트로 애니메이션만 보임 */}
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onFinish={handleIntroFinish} />
        )}
      </AnimatePresence>
      {/* 2. LOADING... 오버레이: 3D 그리드 준비 중에만 보임 */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            key="loading-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 3. 메인페이지만 보임 (메인 렌더 구조는 절대 건드리지 않음) */}
      {(showMainGrid || showMain) && (
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="relative overflow-hidden bg-black">
              <Head>
                <title>e.st - emotional studios</title>
                <meta name="description" content="A creative space for emotional expression." />
              </Head>
              <div className="relative z-10">
                <main>
                  <ClientOnly>
                    <div key={router.pathname}>
                      <div style={{ position: 'relative', zIndex: 0, width: '100vw', height: '100vh', background: '#111' }}>
                        {/* 3D Grid와 PoseGuideSection은 showMainGrid가 true일 때만 렌더 */}
                        {showMainGrid && <DynamicChromeGrid onReady={handleGridReady} />}
                        {/* emotional studios 텍스트 바로 아래 버튼 */}
                        <div className="absolute left-1/2 bottom-[7rem] flex flex-row items-center gap-32 -translate-x-1/2 z-50">
                          <div className="glitch-button-wrapper">
                            <a
                              href="/support#events"
                              className="contact-style-glitch-button px-10 py-4 rounded-full border-2 font-bold text-lg relative overflow-hidden"
                              data-text="View Events"
                              style={{backdropFilter:'blur(2px)'}}
                            >
                              <span className="relative z-10 whitespace-nowrap">View Events</span>
                            </a>
                          </div>
                          <div className="glitch-button-wrapper">
                            <a
                              href="/booking"
                              className="contact-style-glitch-button px-10 py-4 rounded-full border-2 font-bold text-lg relative overflow-hidden"
                              data-text="Book Now"
                              style={{backdropFilter:'blur(2px)'}}
                            >
                              <span className="relative z-10 whitespace-nowrap">Book Now</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* PoseGuideSection도 showMainGrid가 true일 때만 렌더 */}
                      {showMainGrid && <PoseGuideSection />}
                    </div>
                  </ClientOnly>
                  {/* showMain이 true일 때만 나머지 메인 컨텐츠 렌더 */}
                  {showMain && <EmotionalMoments colorizedImages={colorizedImages} />}
                  {showMain && <CollaborationGallery />}
                  {showMain && <OurElixirs />}
                  {showMain && <Footer />}
                </main>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}

export default Home;