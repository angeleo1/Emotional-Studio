import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import FloatingBookButton from '@/components/common/FloatingBookButton';

export default function TipsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로딩 완료 후 로딩 상태 해제
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 로딩 중일 때 로딩 화면 표시
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Tips - Emotional Studios</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4 font-fallback" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}>
              emotional studios
            </div>
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Tips - Emotional Studios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Tips for your studio session at Emotional Studios" />
        
        {/* 폰트 최적화 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400&family=Borel&display=swap" rel="stylesheet" />
        
        {/* CS-Valcon-Drawn 폰트 preload */}
        <link 
          rel="preload" 
          href="/fonts/CS-Valcon-Drawn-akhr7k/CS%20Valcon%20Drawn/CSValconDrawn-Regular.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/CS-Valcon-Drawn-akhr7k/CS%20Valcon%20Drawn/CSValconDrawn-Regular.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
      </Head>
      
      <div className="min-h-screen bg-[#111] text-white relative overflow-hidden">
        {/* 좌상단 로고 */}
        <Link href="/" legacyBehavior>
          <a className="glitch-wrapper" style={{ 
            position: 'fixed', 
            top: '1rem', 
            left: '1rem', 
            zIndex: 1001, 
            mixBlendMode: 'difference', 
            color: '#ffffff', 
            textDecoration: 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.4))';
            e.currentTarget.style.mixBlendMode = 'screen';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'none';
            e.currentTarget.style.mixBlendMode = 'difference';
          }}
          >
            <div className="text-2xl font-bold font-fallback" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}>
              emotional studios
            </div>
          </a>
        </Link>

        {/* 메인 컨텐츠 */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-6xl w-full"
          >
            {/* 헤더 */}
            <div className="text-center mb-16">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}
              >
                Tips for Your Studio Session
              </h1>
              <p className="text-xl text-white/80">Make the most of your 20-minute session</p>
            </div>

            {/* Tips 컨텐츠 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Left Column */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0 border border-white/30">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Perfect Positioning</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">To appear centered in your final photos, align your eyes with the camera lens.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0 border border-white/30">
                      <span className="text-3xl">⏱️</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Time Management</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">Each session is only 20 minutes! Check out our Pose Guide Page beforehand so you can maximize your photo time.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0 border border-white/30">
                      <span className="text-3xl">🍸</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Signature Elixir</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">Our signature Elixir helps boost your emotions before the shoot! It changes every season — let us know in advance if you have any allergies.</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0 border border-white/30">
                      <span className="text-3xl">🖼️</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Quick Prints</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">Same-day prints are ready in about 10 minutes after your session. (Extra print options may take a little longer.)</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0 border border-white/30">
                      <span className="text-3xl">👉</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Need More Help?</h3>
                      <p className="text-gray-300 leading-relaxed text-lg mb-6">For more questions, please refer to the Q&A section on our Support Page.</p>
                      <button
                        onClick={() => router.push('/support')}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-3 border border-white/30 text-lg"
                      >
                        <span>Visit Support</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 하단 네비게이션 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() => router.push('/pose-guide')}
                className="bg-transparent border border-white text-white rounded-full py-3 px-6 text-lg font-bold transition-all duration-200 hover:bg-white hover:text-black"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}
              >
                Pose Guide
              </button>
              <button
                onClick={() => router.push('/elixirs')}
                className="bg-transparent border border-white text-white rounded-full py-3 px-6 text-lg font-bold transition-all duration-200 hover:bg-white hover:text-black"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}
              >
                Our Elixirs
              </button>
              <button
                onClick={() => router.push('/support?tab=event')}
                className="bg-transparent border border-white text-white rounded-full py-3 px-6 text-lg font-bold transition-all duration-200 hover:bg-white hover:text-black"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}
              >
                Events
              </button>
              <button
                onClick={() => router.push('/gallery-landing')}
                className="bg-transparent border border-white text-white rounded-full py-3 px-6 text-lg font-bold transition-all duration-200 hover:bg-white hover:text-black"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k, "Arial Black", "Helvetica Black", sans-serif' }}
              >
                emotional Moments
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* 하단 정보 */}
        <div className="absolute bottom-4 right-4 text-white text-sm font-normal tracking-wider select-none pointer-events-none z-10">
          Private Self-Studio in Melbourne
        </div>

        {/* SNS 아이콘 */}
        <div className="absolute bottom-4 left-4 flex gap-3 z-10">
          <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
            <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer one" style={{ color: '#00ffff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
          </a>
        </div>
      </div>

      {/* Floating Book Button */}
      <FloatingBookButton />
    </>
  );
}
