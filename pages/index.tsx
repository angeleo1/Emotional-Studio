import { useState, useEffect } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ContactPopup from '../components/ContactPopup'
import IntroAnimation from '../components/IntroAnimation'

const DynamicDemoOne = dynamic(() => import("@/components/ui/demo").then(mod => mod.DemoOne), {
  ssr: false,
})

const OurElixirs = dynamic(() => import('../components/homepage/OurElixirs'), {
  ssr: false,
});

const EmotionalMoments = dynamic(() => import('../components/homepage/EmotionalMoments'), {
  ssr: false,
});

const CollaborationGallery = dynamic(() => import('../components/homepage/CollaborationGallery'), {
  ssr: false,
});

const Footer = dynamic(() => import('../components/homepage/Footer'), {
  ssr: false,
});

const Home: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [colorizedImages, setColorizedImages] = useState<{ [key: number]: boolean }>({})
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const galleryImages = [
    'v1/jimmy-fermin-bqe0J0b26RQ-unsplash_tpyzo4', 'v1/aiony-haust-3TLl_97HNJo-unsplash_vda4od', 'v1/leon-elldot-f6HbVnGtNnY-unsplash_vt63we',
    'v1/olena-bohovyk-XttWKETqCCQ-unsplash_wryqhq', 'v1/jessica-felicio-QS9ZX5UnS14-unsplash_fdjyaf', 'v1/ivana-cajina-dnL6ZIpht2s-unsplash_o1zsv1',
    'v1/blake-carpenter-9ooMr_r7BlY-unsplash_u04ne2', 'v1/prince-akachi-4Yv84VgQkRM-unsplash_mczh7g', 'v1/IMG_0190_z0su9m', 'v1/IMG_0241_zxbg10'
  ]

  useEffect(() => {
    if (!isIntroDone) return;
    const randomizeColor = () => {
      const numImages = Math.floor(Math.random() * 3) + 1
      const newColorizedImages: { [key: number]: boolean } = {}
      for (let i = 0; i < numImages; i++) {
        const randomIndex = Math.floor(Math.random() * galleryImages.length)
        newColorizedImages[randomIndex] = true
      }
      setColorizedImages(prev => ({ ...prev, ...newColorizedImages }))
      const randomDuration = Math.random() * 1500 + 1500
      const id = setTimeout(() => {
        setColorizedImages(prev => {
          const updated = { ...prev }
          Object.keys(newColorizedImages).forEach(key => { delete updated[parseInt(key)] })
          return updated
        })
      }, randomDuration)
      setTimeoutId(id)
    }
    const randomInterval = () => {
      const nextInterval = Math.random() * 2000 + 2000
      const id = setTimeout(() => { randomizeColor(); randomInterval(); }, nextInterval)
      setTimeoutId(id)
    }
    randomInterval()
    return () => { if (timeoutId) { clearTimeout(timeoutId) } }
  }, [isIntroDone, galleryImages.length, timeoutId])


  return (
    <div className="relative overflow-hidden bg-black">
      <Head>
        <title>e.st - emotional studios</title>
        <meta name="description" content="A creative space for emotional expression." />
      </Head>

      <AnimatePresence>
        {!isIntroDone && isMounted && (
          <IntroAnimation onComplete={() => setIsIntroDone(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: isIntroDone ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10"
      >
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end h-20">
                <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white" style={{mixBlendMode: 'difference'}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
                </div>
            </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-black bg-opacity-90 absolute top-20 left-0 right-0"
                    >
                    <nav className="flex flex-col items-center space-y-4 py-8">
                        <button onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }} className="text-2xl font-medium text-white hover:text-orange-500 transition-colors">Contact</button>
                    </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
        
        <main>
            <Suspense fallback={<div className="h-screen w-full bg-black" />}>
              <DynamicDemoOne />
            </Suspense>

            <section className="w-full h-screen relative bg-black flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/4214.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Link href="/pose-guide">
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80vw',
                    height: '40vh',
                    borderRadius: '2.5rem',
                    background: '#fff',
                    mixBlendMode: 'difference',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5vw',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: '3.5rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1em',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                      color: 'black'
                    }}
                  >
                    POSE
                  </span>
                  <span
                    style={{
                      fontSize: '3.5rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1em',
                      marginLeft: '1em',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                      color: 'black'
                    }}
                  >
                    GUIDE
                  </span>
                </div>
              </Link>
            </section>

            <EmotionalMoments colorizedImages={colorizedImages} />
            <CollaborationGallery />
            <OurElixirs />
            <Footer />
        </main>
        
        <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </motion.div>
    </div>
  )
}

export default Home; 