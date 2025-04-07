import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AnimatePresence } from 'framer-motion'

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

const About: NextPage = () => {
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

      <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
            {/* Floating Images */}
            <div className="absolute inset-0">
              {isVisible && images.map((src, index) => (
                <FloatingImage
                  key={`${src}-${index}`}
                  src={src}
                  position={imagePositions[index]}
                  showText={showText}
                />
              ))}
            </div>

            {/* Text with Glass Effect */}
            <AnimatePresence>
              {showText && (
                <motion.div 
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  exit={{ y: 50 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 text-center w-full px-4 flex flex-col items-center justify-center h-full"
                >
                  <motion.h1 
                    className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-herr-von relative z-10 text-white mb-6 hover:text-[#ff6100] transition-colors duration-300"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                  >
                    Capture the moment, sip the magic
                  </motion.h1>
                  <motion.p 
                    className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-herr-von text-white hover:text-[#ff6100] transition-colors duration-300"
                    transition={{ duration: 1, delay: 3.2 }}
                  >
                    turn emotions into memories
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Studio Section */}
          <section className="py-16 sm:py-32 relative text-white overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
            <div className="container mx-auto px-4 py-16 sm:py-32 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-100px" }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                  {/* Text Content */}
                  <div className="space-y-6 sm:space-y-8">
                    <motion.h2 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ margin: "-100px" }}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-herr-von mb-4 sm:mb-6 relative text-white hover:text-[#ff6100] transition-colors duration-300"
                    >
                      emotional studios
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ margin: "-100px" }}
                      className="text-base sm:text-lg md:text-xl text-white/80"
                    >
                      We are a creative studio specializing in capturing the essence of your special moments through photography and videography.
                    </motion.p>
                  </div>

                  {/* Image Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ margin: "-100px" }}
                    className="relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <Image
                      src="/images/about.jpg"
                      alt="About Emotional Studio"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Records Section */}
          <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-100px" }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <h2 className="text-6xl sm:text-7xl md:text-8xl font-herr-von text-white mb-6 relative hover:text-[#ff6100] transition-colors duration-300">
                    The Records
                  </h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto hover:text-[#ff6100] transition-colors duration-300">
                    From person to culture, from culture to history
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  {/* Image Gallery */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      '/images/Elegant Cocktail Close-Up.jpeg',
                      '/images/Elegant Orange Cocktail.jpeg',
                      '/images/Springtime Cocktail Delight.jpeg',
                      '/images/Sophisticated Sips Trio.jpeg'
                    ].map((src, index) => (
                      <motion.div
                        key={src}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ margin: "-100px" }}
                        className="relative aspect-square rounded-xl overflow-hidden group"
                      >
                        <Image
                          src={src}
                          alt="Record"
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Text Content */}
                  <div className="space-y-6 text-lg text-white/80 hover:text-[#ff6100] transition-colors duration-300">
                    <p className="leading-relaxed">
                      Every photograph we capture becomes part of a larger narrative. As these images accumulate, 
                      they form a visual diary of moments, emotions, and artistic evolution.
                    </p>
                    <p className="leading-relaxed">
                      Our archive is more than just a collection of photographs – it's a testament to the stories 
                      we've helped tell, the emotions we've captured, and the connections we've fostered through our work.
                    </p>
                    <p className="leading-relaxed">
                      Each drawer in our records holds countless memories, and as one fills up, another opens, 
                      ready to embrace new stories and preserve them for generations to come.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Project Section */}
          <section className="py-16 sm:py-32 relative bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-100px" }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12 sm:mb-20">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-herr-von text-white mb-4 sm:mb-6 relative hover:text-[#ff6100] transition-colors duration-300">
                    Our Projects
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto hover:text-[#ff6100] transition-colors duration-300">
                    Creating moments that matter
                  </p>
                </div>

                {/* Main Video */}
                <div className="mb-16 sm:mb-32">
                  <div className="relative aspect-video rounded-xl sm:rounded-3xl overflow-hidden group">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/videos/1 (7).mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A21] via-[#5C3A21]/30 to-transparent" />
                    <div className="absolute -top-2 -right-2 w-3 sm:w-4 h-3 sm:h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Video Carousel */}
                <div className="relative overflow-hidden">
                  <div className="flex whitespace-nowrap gap-x-8">
                    <div className="flex items-center space-x-8 animate-slide">
                      {[
                        '/videos/1 (1).mp4',
                        '/videos/1 (2).mp4',
                        '/videos/1 (3).mp4',
                        '/videos/1 (4).mp4',
                        '/videos/1 (5).mp4',
                        '/videos/1 (6).mp4',
                        '/videos/1 (7).mp4',
                        '/videos/1 (8).mp4',
                        '/videos/1 (9).mp4',
                        '/videos/1 (10).mp4'
                      ].map((src, index) => (
                        <div key={src} className="relative w-[400px] aspect-video rounded-xl overflow-hidden group">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          >
                            <source src={src} type="video/mp4" />
                          </video>
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer Section */}
          <section className="py-32 relative bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-6xl sm:text-7xl md:text-8xl font-herr-von text-white mb-6 relative hover:text-[#ff6100] transition-colors duration-300">
                    Connect With Us
                  </h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto hover:text-[#ff6100] transition-colors duration-300">
                    Follow our journey through social media
                  </p>
                </div>

                <div className="flex justify-center items-center space-x-12">
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <div className="text-white hover:text-[#ff6100] transition-colors duration-300">
                      <FaInstagram size={48} />
                    </div>
                  </Link>
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <div className="text-white hover:text-[#ff6100] transition-colors duration-300">
                      <FaFacebook size={48} />
                    </div>
                  </Link>
                  <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <div className="text-white hover:text-[#ff6100] transition-colors duration-300">
                      <FaYoutube size={48} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

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