import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {

  return (

    <Html lang="en">

      <Head>

        <meta name="description" content="Premium self-portrait studio in North Melbourne. Private suites, professional lighting, and total creative control." />

        

        {/* Open Graph / Social Media Meta Tags */}

        <meta property="og:type" content="website" />

        <meta property="og:title" content="emotional studios | Melbourne Self-photo studio" />

        <meta property="og:description" content="Private self-portrait suites. No photographer. Just you. Located in North Melbourne." />

        <meta property="og:image" content="https://raw.githubusercontent.com/angeleo1/google-images/main/hero.jpg" />

        <meta property="og:url" content="https://emotionalstudios.com.au" />

        

        {/* Keywords */}

        <meta name="keywords" content="Self portrait, Melbourne, Photography, Self studio, North Melbourne, emotional studios, photo booth, 4-cut photo" />



        {/* Fonts */}

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />



        {/* Tailwind CDN & Configuration - Required for Next.js + CDN setup */}

        <script src="https://cdn.tailwindcss.com"></script>

        <script dangerouslySetInnerHTML={{

          __html: `

            tailwind.config = {

              darkMode: 'class',

              theme: {

                extend: {

                  colors: {

                    background: 'var(--background)',

                    foreground: 'var(--foreground)',

                  },

                  fontFamily: {

                    'valcon': ['CSValcon', 'serif'],

                    'serif': ['Playfair Display', 'serif'],

                    'sans': ['Inter', 'sans-serif'],

                  },

                  animation: {

                    'fade-in': 'fadeIn 0.5s ease-in-out',

                  },

                  keyframes: {

                    fadeIn: {

                      '0%': { opacity: '0' },

                      '100%': { opacity: '1' },

                    },

                  },

                }

              }

            }

          `

        }} />

      </Head>

      <body className="bg-white text-zinc-900 dark:bg-[#050505] dark:text-zinc-100 transition-colors duration-[1000ms]">

        <Main />

        <NextScript />

      </body>

    </Html>

  )

}
