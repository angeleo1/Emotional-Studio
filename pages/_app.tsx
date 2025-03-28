import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Rock_Salt } from 'next/font/google'
import Head from 'next/head'
import Navbar from '../components/Navbar'

const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rock-salt',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <div className={`${rockSalt.variable}`}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  )
} 