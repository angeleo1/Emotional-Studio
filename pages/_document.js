import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ff6100" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* 파비콘 설정 - 여러 형식 지원 */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="128x128" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/icon-512x512.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        
        {/* Apple 터치 아이콘 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icon-192x192.png" />
        
        {/* Windows 타일 */}
        <meta name="msapplication-TileColor" content="#ff6100" />
        <meta name="msapplication-TileImage" content="/icon-192x192.png" />
        <meta name="msapplication-square70x70logo" content="/icon-192x192.png" />
        <meta name="msapplication-square150x150logo" content="/icon-192x192.png" />
        <meta name="msapplication-wide310x150logo" content="/icon-192x192.png" />
        <meta name="msapplication-square310x310logo" content="/icon-512x512.png" />
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