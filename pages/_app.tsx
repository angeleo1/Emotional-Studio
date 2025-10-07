import '../styles/globals.css'
import '../styles/glass.css'
import type { AppProps } from 'next/app'
import { Rock_Salt, Playfair_Display } from 'next/font/google'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router' 
import React, { useState, useEffect, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ClientOnly from '@/components/ClientOnly'
import CustomCursor from '@/components/CustomCursor'
import ContactPopup from '@/components/ContactPopup'
import Layout from '../components/layout/Layout'
import PusherBeams from '@/components/PusherBeams'

// 전역 상태 컨텍스트 생성
const NavbarContext = createContext<{ isDesktopNavbarActive: boolean }>({ isDesktopNavbarActive: false });

export const useNavbarContext = () => useContext(NavbarContext);

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

// 모바일 감지 함수 (iPad Pro 포함)
const isMobileDevice = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  // iPad Pro (1024px)까지 모바일로 인식
  return window.innerWidth <= 1024;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isDesktopNavbarActive, setIsDesktopNavbarActive] = useState(false)

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      try {
        const mobile = isMobileDevice();
        setIsMobile(mobile);
        setIsDesktopNavbarActive(!mobile); // 데스크탑일 때만 true
      } catch (error) {
        console.error('Mobile detection error:', error);
        setIsMobile(true);
        setIsDesktopNavbarActive(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일에서는 최소한의 컴포넌트만 렌더링
  if (isClient && isMobile) {
    return (
      <NavbarContext.Provider value={{ isDesktopNavbarActive: false }}>
        <Head>
          <title>emotional studios</title>
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <div className={`${rockSalt.variable} ${playfairDisplay.variable}`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </NavbarContext.Provider>
    );
  }

  // 데스크탑용 전체 기능
  return (
    <NavbarContext.Provider value={{ isDesktopNavbarActive: true }}>
      <Head>
        <title>emotional studios</title>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
            {/* 모바일 페이지가 아닐 때만 문의하기 버튼 렌더링 */}
            {router.pathname !== '/mobile' && (
              <div className="fixed bottom-8 right-8 z-50">
                <button
                  className="w-16 h-16 rounded-full text-white"
                  onClick={() => setIsContactOpen(true)}
                >
                  <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeWidth="2"/>
                    <text x="32" y="42" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" fill="white">?</text>
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </NavbarContext.Provider>
  )
} 