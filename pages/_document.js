import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.ico?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.ico?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png?v=2" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png?v=2" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png?v=2" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png?v=2" />
        <meta name="msapplication-TileImage" content="/icon-192x192.png?v=2" />
        <meta name="msapplication-TileColor" content="#ff6100" />
        <meta name="theme-color" content="#ff6100" />
        {/* PWA 설치 프롬프트 방지를 위해 manifest 제거 */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
        
        {/* CS-Valcon-Drawn 폰트 최적화 */}
        <link 
          rel="preload" 
          href="/fonts/CS-Valcon-Drawn-akhr7k/CS%20Valcon%20Drawn/CSValconDrawn-Regular.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/CS-Valcon-Drawn-akhr7k/CS%20Valcon%20Drawn/CSValconDrawn-Regular.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
        
        {/* 모바일 최적화 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
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