import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Rock_Salt } from 'next/font/google'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router' 
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ClientOnly from '@/components/ClientOnly'

const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rock-salt',
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <div className={`${rockSalt.variable}`}>
        <ClientOnly>
          <Navbar />
        </ClientOnly>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
} 