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
        
        {/* SimplyBook.me Widget */}
        <script src="//widget.simplybook.net/v2/widget/widget.js" type="text/javascript"></script>
        <script type="text/javascript">
          var widget = new SimplybookWidget({"widget_type":"button","url":"https:\/\/emotionalstudios.simplybook.net","theme":"concise","theme_settings":{"timeline_hide_unavailable":"1","hide_past_days":"0","timeline_show_end_time":"0","timeline_modern_display":"as_slots","light_font_color":"#ffffff","sb_secondary_base":"#111111","sb_base_color":"#ff6100","display_item_mode":"block","booking_nav_bg_color":"#ffffff","sb_review_image":"1","sb_review_image_preview":"\/uploads\/emotionalstudios\/image_files\/preview\/5f40b1513e7cf31e3115abd5fcb117a8.jpg","dark_font_color":"#111111","btn_color_1":"#ff6100","sb_company_label_color":"#ff6100","hide_img_mode":"0","show_sidebar":"1","sb_busy":"#c7b3b3","sb_available":"#ff6100"},"timeline":"modern","datepicker":"inline_datepicker","is_rtl":false,"app_config":{"clear_session":0,"allow_switch_to_ada":0,"predefined":[]},"button_title":"Book now","button_background_color":"#ff6100","button_text_color":"#ffffff","button_position":"right","button_position_offset":"55%"});
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 