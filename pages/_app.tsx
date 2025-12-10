import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Playfair_Display } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>emotional studios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Preconnect to SimplyBook.net */}
        <link rel="preconnect" href="https://widget.simplybook.net" />
        <link rel="preconnect" href="https://emotionalstudios.simplybook.net" />
        {/* SimplyBook.net Widget Script */}
        <script src="//widget.simplybook.net/v2/widget/widget.js" async />
      </Head>
      <div className={`${inter.variable} ${playfairDisplay.variable}`}>
              <Component {...pageProps} />
      </div>
    </>
  )
} 
