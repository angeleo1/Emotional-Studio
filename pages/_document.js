import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aladdin&family=Noto+Sans+TC:wght@400;500;700&family=Mrs+Sheppards&family=Inter:wght@400;500;600;700&family=DM+Serif+Text&family=Eagle+Lake&family=Herr+Von+Muellerhoff&family=Beau+Rivage&family=Mr+De+Haviland&display=swap"
          rel="stylesheet"
        />
        {/* Pusher Beams SDK */}
        <script src="https://js.pusher.com/beams/2.1.0/push-notifications-cdn.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 