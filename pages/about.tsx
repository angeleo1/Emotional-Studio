import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import VideoCarousel from '../components/ui/VideoCarousel';
import AboutLoadingScreen from '@/components/ui/AboutLoadingScreen';

const SectionWrapper = ({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const FloatingImage = ({ src, position, showText }: { src: string; position: { x: number; y: number; rotate: number; scale: number }; showText: boolean }) => {
  const startPosition = () => {
    const angle = Math.random() * Math.PI * 2
    const distance = 2500
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    }
  }

  const start = startPosition()

  return (
    <motion.div
      className="absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        left: '50%',
        top: '50%',
        x: position.x,
        y: position.y,
        perspective: 1000
      }}
      initial={{ 
        x: start.x,
        y: start.y,
        scale: 0.2,
        rotateX: 45,
        rotateY: -45,
        rotate: position.rotate - 90,
      }}
      animate={{ 
        x: position.x,
        y: position.y,
        scale: position.scale,
        rotateX: 0,
        rotateY: 0,
        rotate: position.rotate,
      }}
      transition={{
        duration: 2.8,
        delay: Math.random() * 1.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ 
        scale: position.scale * 1.1,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: position.scale * 0.95,
        transition: { duration: 0.2 }
      }}
    >
      <Image
        src={src}
        alt="Floating gallery"
        fill
        className={`object-cover transition-all duration-300 ${showText ? 'grayscale hover:grayscale-0 blur-sm opacity-50' : ''}`}
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 0.7 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black"
      />
    </motion.div>
  )
}

const HeroScrollDemo = dynamic(() => import("@/components/ui/demo").then(mod => mod.HeroScrollDemo), { ssr: false });

const About: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showText, setShowText] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, (windowHeight - top) / (height + windowHeight)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기값 설정

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // useTransform 대신 직접 계산
  const y = scrollProgress * 200

  useEffect(() => {
    // 페이지 로드 시 초기 상태 설정
    setIsVisible(false)
    setShowText(false)
    
    // 약간의 지연 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true)
      // 3초 후에 텍스트가 나타나도록 설정
      const textTimer = setTimeout(() => {
        setShowText(true)
      }, 3000)
      
      return () => clearTimeout(textTimer)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  const imagePositions = [
    { x: -900, y: -300, rotate: -15, scale: 0.65 },
    { x: -800, y: 200, rotate: 10, scale: 0.75 },
    { x: -700, y: -400, rotate: -8, scale: 0.7 },
    { x: -600, y: 300, rotate: 12, scale: 0.8 },
    { x: -400, y: -200, rotate: -20, scale: 0.85 },
    { x: -200, y: 100, rotate: 15, scale: 0.9 },
    { x: 0, y: -300, rotate: -5, scale: 0.95 },
    { x: 200, y: 200, rotate: 8, scale: 0.9 },
    { x: 400, y: -150, rotate: -12, scale: 0.85 },
    { x: 600, y: 300, rotate: 18, scale: 0.7 },
    { x: 700, y: -400, rotate: -25, scale: 0.75 },
    { x: 800, y: 100, rotate: 15, scale: 0.8 },
    { x: 900, y: -200, rotate: -10, scale: 0.65 },
    { x: 500, y: 400, rotate: 20, scale: 0.7 },
    { x: -300, y: 400, rotate: -15, scale: 0.75 }
  ]

  const images = [
    '/images/Elegant Cocktail Close-Up.jpeg',
    '/images/Elegant Orange Cocktail.jpeg',
    '/images/Springtime Cocktail Delight.jpeg',
    '/images/Sophisticated Sips Trio.jpeg',
    '/images/Vibrant Purple Cocktail.jpeg',
    '/images/Dynamic Mojito Moment.jpeg',
    '/images/Elegant Cocktail Presentation.jpeg',
    '/images/Photography Studio Setup.jpeg',
    '/images/Summertime Refreshment Elegance.jpeg',
    '/images/Tropical Frozen Beverage.jpeg',
    '/images/Festive Strawberry Margarita with Blue Salt Rim.jpeg',
    '/images/Elegant Cocktails on Light Surface.jpeg',
    '/images/Photography Studio Setup (1).jpeg',
    '/images/Elegant Cocktail Close-Up.jpeg',
    '/images/Springtime Cocktail Delight.jpeg'
  ]

  return (
    <>
      <Head>
        <title>About Us | Emotional Studio</title>
        <meta name="description" content="Learn more about Emotional Studio and our photography services" />
      </Head>

      <AnimatePresence onExitComplete={() => setIsContentLoaded(true)}>
        {isLoading && <AboutLoadingScreen />}
      </AnimatePresence>

      {isContentLoaded && (
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
      <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
        <main className="relative z-10 flex flex-col gap-0">
          <section className="w-full min-h-[600px]" style={{background: 'linear-gradient(90deg, #ffe066 0%, #b2ff59 100%)'}}>
            <ContainerScroll
              titleComponent={
                <h1 className="text-6xl md:text-8xl font-extrabold text-[#22223b] mb-14 text-center drop-shadow-lg">
                      Self Photo Studio
                </h1>
              }
            >
              <div className="group relative w-full h-full flex justify-center items-center">
                <img
                  src="/images/aboutus1.png"
                  alt="aboutus1"
                  className="object-cover w-full h-full rounded-2xl transition duration-500 group-hover:filter group-hover:invert"
                />
              </div>
            </ContainerScroll>
          </section>
          <section className="w-full min-h-[600px]" style={{background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)'}}>
            <ContainerScroll
              titleComponent={
                    <h1 className="text-6xl md:text-8xl font-extrabold text-[#ffe066] mb-14 text-center drop-shadow-lg">Why emotional?</h1>
              }
            >
              <div className="group relative w-full h-full">
                <img
                  src="/images/aboutus2.png"
                  alt="aboutus2"
                  className="object-cover w-full h-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-10">
                  <div className="w-full flex flex-col items-center">
                    <p className="block text-white text-xl md:text-3xl text-center mx-auto max-w-2xl whitespace-normal break-words drop-shadow-lg !leading-[3.5rem] mb-4">
                      Our studio is not just a photography space – it's a sanctuary where artistry meets comfort.
                    </p>
                    <p className="block text-white text-xl md:text-3xl text-center mx-auto max-w-2xl whitespace-normal break-words drop-shadow-lg !leading-[3.5rem] mb-4">
                      We've created an environment where photographers and clients can engage in meaningful conversations while capturing unforgettable moments.
                    </p>
                    <p className="block text-white text-xl md:text-3xl text-center mx-auto max-w-2xl whitespace-normal break-words drop-shadow-lg !leading-[3.5rem]">
                      From our welcoming main studio with its warm ambiance to our specialized beverage photography setup, every corner is designed to inspire creativity and foster connection.
                    </p>
                  </div>
                </div>
              </div>
            </ContainerScroll>
          </section>
          <section className="w-full min-h-[600px]" style={{background: 'linear-gradient(90deg, #fc00ff 0%, #00dbde 100%)'}}>
            <ContainerScroll
              titleComponent={
                <h1 className="text-6xl md:text-8xl font-extrabold text-[#64ffda] mb-14 text-center drop-shadow-lg">The Records</h1>
              }
            >
              <div className="group relative w-full h-full">
                <img
                  src="/images/aboutus3.png"
                  alt="aboutus3"
                  className="object-cover w-full h-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-10">
                  <div className="w-full flex flex-col items-center">
                    <p className="block text-white text-xl md:text-3xl text-center mx-auto max-w-2xl whitespace-normal break-words drop-shadow-lg !leading-[3.5rem] mb-4">
                      Every photograph we capture becomes part of a larger narrative. As these images accumulate, they form a visual diary of moments, emotions, and artistic evolution.
                    </p>
                    <p className="block text-white text-xl md:text-3xl text-center mx-auto max-w-2xl whitespace-normal break-words drop-shadow-lg !leading-[3.5rem] mb-4">
                      Our archive is more than just a collection of photographs – it's a testament to the stories we've helped tell, the emotions we've captured, and the connections we've fostered through our work.
                    </p>
                    <p className="block text-white text-xl md:text-3xl text-center mx-auto max-w-2xl whitespace-normal break-words drop-shadow-lg !leading-[3.5rem]">
                      Each drawer in our records holds countless memories, and as one fills up, another opens, ready to embrace new stories and preserve them for generations to come.
                    </p>
                  </div>
                </div>
              </div>
            </ContainerScroll>
          </section>
          <section className="w-full min-h-[600px]" style={{background: 'linear-gradient(90deg, #f953c6 0%, #b91d73 100%)'}}>
            <ContainerScroll
              titleComponent={
                <h1 className="text-6xl md:text-8xl font-extrabold text-[#ffb6d5] mb-14 text-center drop-shadow-lg">Our Projects</h1>
              }
            >
              <div className="group relative w-full h-full">
                <img
                  src="/images/aboutus4.png"
                  alt="aboutus4"
                  className="object-cover w-full h-full rounded-2xl transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10" />
                <div className="absolute inset-0 flex items-center justify-center p-10 pointer-events-none z-20">
                  <div className="w-full h-full flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <VideoCarousel />
                  </div>
                </div>
              </div>
            </ContainerScroll>
          </section>
          <section className="w-full min-h-[600px]" style={{background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)'}}>
            <ContainerScroll
              titleComponent={
                <h1 className="text-6xl md:text-8xl font-extrabold text-[#0d3f2c] mb-14 text-center drop-shadow-lg">Connect with Us</h1>
              }
            >
              <div className="group relative w-full h-full flex justify-center items-center">
                <img
                  src="/images/aboutus5.png"
                  alt="aboutus5"
                  className="object-cover w-full h-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-10 h-full w-full">
                  <div className="w-full flex flex-col items-center">
                    <div className="text-white text-3xl md:text-4xl text-center max-w-3xl leading-loose drop-shadow-lg mb-12">
                      Follow Our Journey throguh social media
                    </div>
                    <div className="flex justify-center items-center gap-8 mt-8">
                      {/* Instagram SVG */}
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256"><path fill="#fff" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                      </a>
                      {/* Facebook SVG */}
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="64" width="64"><circle cx="18" cy="18" r="18" fill="#fff"/><path fill="#222" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                      </a>
                      {/* YouTube SVG */}
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <svg viewBox="0 0 256 180" width="64" height="64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="#fff"/><path fill="#222" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ContainerScroll>
          </section>
        </main>
      </div>
        </motion.div>
      )}

      <style jsx global>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1200px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.3);
          }
        }

        @keyframes pulse-slow-delayed {
          0%, 100% {
            opacity: 0.5;
            transform: translate(50%, 50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(50%, 50%) scale(1.3);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 12s ease-in-out infinite;
          animation-delay: 4s;
        }

        .bg-grid-pattern {
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        /* Custom Scrollbar Styles */
        .scrollbar-hide::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb {
          background-color: rgba(44, 23, 17, 0.3);
          border-radius: 3px;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background-color: rgba(44, 23, 17, 0.5);
        }

        .animate-slide {
          animation: slide 8s linear infinite;
          will-change: transform;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scrollLeft 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 20s linear infinite;
        }

        /* All rows hover effect */
        .group:hover h3 {
          --text-color: #ffffff;
        }
      `}</style>
    </>
  )
}

export default About 