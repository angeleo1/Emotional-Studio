import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Rock_Salt } from 'next/font/google'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rock-salt',
})

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
      <div className={`${rockSalt.variable}`}>
        <Navbar />
        {mounted ? (
          <AnimatePresence mode="wait">
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </>
  )
} 