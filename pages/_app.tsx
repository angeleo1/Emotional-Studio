import '../styles/globals.css'
import '../styles/glass.css'
import type { AppProps } from 'next/app'
import { Rock_Salt, Playfair_Display } from 'next/font/google'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router' 
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ClientOnly from '@/components/ClientOnly'
import CustomCursor from '@/components/CustomCursor'
import ContactPopup from '@/components/ContactPopup'
import Layout from '../components/layout/Layout'

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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <div className={`${rockSalt.variable} ${playfairDisplay.variable}`}>
        <ClientOnly>
          <CustomCursor />
          <Navbar />
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
      </div>
    </>
  )
} 