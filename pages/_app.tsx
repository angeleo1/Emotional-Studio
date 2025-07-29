import '../styles/globals.css'
import '../styles/glass.css'
import type { AppProps } from 'next/app'
import { Rock_Salt, Playfair_Display } from 'next/font/google'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router' 
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ClientOnly from '@/components/ClientOnly'
import CustomCursor from '@/components/CustomCursor'
import ContactPopup from '@/components/ContactPopup'
import Layout from '../components/layout/Layout'
import PusherBeams from '@/components/PusherBeams'

const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rock-salt',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

// 모바일 감지 함수
const isMobileDevice = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  // 화면 크기 기반 감지
  const isMobileBySize = window.innerWidth < 768;
  
  // User-Agent 기반 감지
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobileByUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  
  // 터치 지원 여부 확인
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobileBySize || isMobileByUserAgent || isTouchDevice;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      try {
        setIsMobile(isMobileDevice());
      } catch (error) {
        console.error('Mobile detection error:', error);
        setIsMobile(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일에서는 최소한의 컴포넌트만 렌더링
  if (isClient && isMobile) {
    return (
      <>
        <Head>
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
        </Head>
        <div className={`${rockSalt.variable} ${playfairDisplay.variable}`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
      </>
    );
  }

  // 데스크탑용 전체 기능
  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <div className={`${rockSalt.variable} ${playfairDisplay.variable}`}>
        {isClient && (
          <>
            <ClientOnly>
              <CustomCursor />
              <Navbar />
              <PusherBeams />
            </ClientOnly>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            <div className="fixed bottom-8 right-8 z-50" style={{ mixBlendMode: 'difference' }}>
              <button
                className="w-16 h-16 rounded-full svg-glitch-wrapper text-white"
                onClick={() => setIsContactOpen(true)}
              >
                <div className="base-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <text x="32" y="42" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" fill="currentColor">?</text>
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
          </>
        )}
      </div>
    </>
  )
} 