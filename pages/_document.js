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
        
        {/* 구글 검색 최적화 */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="description" content="Self photo studio in Melbourne - Professional photography without a photographer. Capture timeless moments at Emotional Studio with our premium self-service photo booths and professional lighting." />
        <meta name="keywords" content="self photo studio, Melbourne, photography, emotional studio, self service photo booth, professional photography, headshots, portrait photography, Melbourne photo studio" />
        
        {/* Open Graph 메타 태그 */}
        <meta property="og:title" content="Emotional Studio - Self Photo Studio in Melbourne" />
        <meta property="og:description" content="Self photo studio in Melbourne - Professional photography without a photographer. Capture timeless moments with our premium self-service photo booths." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emotionalstudio.com.au" />
        <meta property="og:site_name" content="Emotional Studio" />
        <meta property="og:locale" content="en_AU" />
        
        {/* Twitter Card 메타 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Emotional Studio - Self Photo Studio in Melbourne" />
        <meta name="twitter:description" content="Self photo studio in Melbourne - Professional photography without a photographer. Capture timeless moments with our premium self-service photo booths." />
        
        {/* 캐노니컬 URL 설정 */}
        <link rel="canonical" href="https://emotionalstudio.com.au" />
        
        {/* 모바일 우선순위 조정 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        {/* 파비콘 설정 - 구글 최적화 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-icon-192x192.png" />
        
        {/* 구글 검색 최적화를 위한 추가 파비콘 설정 */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon-180x180.png" />
        
        {/* Apple 터치 아이콘 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        
        {/* Windows 타일 */}
        <meta name="msapplication-TileColor" content="#ff6100" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/ms-icon-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/ms-icon-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/ms-icon-310x310.png" />
        <meta name="msapplication-square310x310logo" content="/ms-icon-310x310.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
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
        
        {/* 구조화된 데이터 (JSON-LD) - 사이트 링크를 위한 스키마 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Emotional Studio",
              "description": "Self photo studio in Melbourne - Professional photography without a photographer. Capture timeless moments with our premium self-service photo booths.",
              "url": "https://emotionalstudio.com.au",
              "logo": "https://emotionalstudio.com.au/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Melbourne",
                "addressCountry": "AU"
              },
              "sameAs": [
                "https://www.instagram.com/emotionalstudio",
                "https://www.facebook.com/emotionalstudio"
              ],
              "potentialAction": [
                {
                  "@type": "SearchAction",
                  "target": "https://emotionalstudio.com.au/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              ]
            })
          }}
        />
        
        {/* 웹사이트 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Emotional Studio",
              "description": "Self photo studio in Melbourne - Professional photography without a photographer",
              "url": "https://emotionalstudio.com.au",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://emotionalstudio.com.au/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "Emotional Studio",
                "description": "Self photo studio in Melbourne offering professional photography services without a photographer"
              }
            })
          }}
        />
        
        {/* 사이트 링크를 위한 내비게이션 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "name": "Main Navigation",
              "url": "https://emotionalstudio.com.au",
              "hasPart": [
                {
                  "@type": "SiteNavigationElement",
                  "name": "Gallery",
                  "description": "View our stunning photography gallery from Emotional Studio",
                  "url": "https://emotionalstudio.com.au/gallery"
                },
                {
                  "@type": "SiteNavigationElement", 
                  "name": "Services",
                  "description": "Professional self photo studio services in Melbourne",
                  "url": "https://emotionalstudio.com.au/services"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "About",
                  "description": "Learn about Emotional Studio - Melbourne's premier self photo studio",
                  "url": "https://emotionalstudio.com.au/about"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Elixirs",
                  "description": "Premium elixir concentrates for your photo session",
                  "url": "https://emotionalstudio.com.au/elixirs"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Pose Guide",
                  "description": "Professional posing tips for your self photo session",
                  "url": "https://emotionalstudio.com.au/pose-guide"
                }
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 