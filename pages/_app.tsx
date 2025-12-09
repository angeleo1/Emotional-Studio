import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
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
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div className={`${inter.variable} ${playfairDisplay.variable}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  )
}
