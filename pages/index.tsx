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
            className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110"
            style={{ mixBlendMode: 'difference' }}
            onClick={() => setIsContactOpen(true)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;