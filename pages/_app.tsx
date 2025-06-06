import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import CustomCursor from '../components/CustomCursor.jsx'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <div className={inter.className}>
        <Navbar />
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ zIndex: 1 }}
            >
              <Component key={router.asPath} {...pageProps} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      {/* RCA-style custom cursor always above all content */}
      <CustomCursor />
    </>
  )
} 