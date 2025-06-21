import { useState, useEffect } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ContactPopup from '@/components/ContactPopup'
import ClientOnly from '@/components/ClientOnly'
import { useRouter } from 'next/router'

const DynamicDemoOne = dynamic(() => import("@/components/ui/demo").then(mod => mod.DemoOne), {
  ssr: false,
})

const OurElixirs = dynamic(() => import('@/components/homepage/OurElixirs'), {
  ssr: false,
});

const EmotionalMoments = dynamic(() => import('@/components/homepage/EmotionalMoments'), {
  ssr: false,
});

const CollaborationGallery = dynamic(() => import('@/components/homepage/CollaborationGallery'), {
  ssr: false,
});

const Footer = dynamic(() => import('@/components/homepage/Footer'), {
  ssr: false,
});

const PoseGuideSection = dynamic(() => import('@/components/homepage/PoseGuideSection'), { ssr: false });

const Home: NextPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [colorizedImages, setColorizedImages] = useState<{ [key: number]: boolean }>({})
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  // 3D Grid가 마운트된 후 PoseGuideSection을 렌더하기 위한 상태
  const [showPoseGuide, setShowPoseGuide] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3D Grid가 마운트된 후 1프레임 뒤에 PoseGuideSection 렌더
  useEffect(() => {
    if (isMounted) {
      const id = requestAnimationFrame(() => setShowPoseGuide(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isMounted]);

  const galleryImages = [
    'v1/jimmy-fermin-bqe0J0b26RQ-unsplash_tpyzo4', 'v1/aiony-haust-3TLl_97HNJo-unsplash_vda4od', 'v1/leon-elldot-f6HbVnGtNnY-unsplash_vt63we',
    'v1/olena-bohovyk-XttWKETqCCQ-unsplash_wryqhq', 'v1/jessica-felicio-QS9ZX5UnS14-unsplash_fdjyaf', 'v1/ivana-cajina-dnL6ZIpht2s-unsplash_o1zsv1',
    'v1/blake-carpenter-9ooMr_r7BlY-unsplash_u04ne2', 'v1/prince-akachi-4Yv84VgQkRM-unsplash_mczh7g', 'v1/IMG_0190_z0su9m', 'v1/IMG_0241_zxbg10'
  ]

  useEffect(() => {
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
      randomizeColor(); // Call once immediately
      intervalId = setInterval(randomizeColor, Math.random() * 2000 + 2000);
    };

    startInterval();

    return () => {
      clearInterval(intervalId);
      allTimers.forEach(clearTimeout);
    };
  }, [galleryImages.length]);

  return (
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
                <DynamicDemoOne />
              </div>
              <PoseGuideSection />
            </div>
          </ClientOnly>
          <EmotionalMoments colorizedImages={colorizedImages} />
          <CollaborationGallery />
          <OurElixirs />
          <Footer />
        </main>
        <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        {/* Floating Chat Icon */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            className="w-16 h-16 rounded-full svg-glitch-wrapper"
            style={{ mixBlendMode: 'difference' }}
            onClick={() => setIsContactOpen(true)}
          >
            <div className="base-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeWidth="2"/>
                <text x="32" y="42" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" fill="white">?</text>
              </svg>
            </div>
            <div className="glitch-layer one">
              <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                <text x="32" y="42" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" fill="currentColor">?</text>
              </svg>
            </div>
            <div className="glitch-layer two">
              <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                <text x="32" y="42" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" fill="currentColor">?</text>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;