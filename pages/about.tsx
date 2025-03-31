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
        className="object-cover"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 0.7 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[#2c1711]"
      />
    </motion.div>
  )
}

const About: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showText, setShowText] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

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

      <div ref={containerRef} className="relative min-h-screen overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5C3A21]/60 via-[#5C3A21]/60 to-[#5C3A21]/60 backdrop-blur-[4px]"></div>
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 left-0 w-[1400px] h-[1400px] bg-gradient-to-br from-[#ff6100]/20 via-[#ff8500]/15 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-[1400px] h-[1400px] bg-gradient-to-tl from-[#ff6100]/20 via-[#ff8500]/15 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-slow-delayed"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay"></div>
          
          {/* Diagonal Lines */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" className="opacity-[0.08]">
              <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M-10,10 l20,-20 M0,40 l40,-40 M30,50 l20,-20" stroke="#ff6100" strokeWidth="1" fill="none"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#diagonalLines)"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/image_fx_ (3).jpg"
                alt="Hero Background"
                fill
                className="object-cover"
                priority
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showText ? 0.7 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-[#2c1711]"
              />
            </div>

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
                  className="relative z-10 text-center"
                >
                  <div className="relative inline-block">
                    <motion.h1 
                      className="text-6xl font-rock-salt relative z-10 text-white mb-6 [text-shadow:0_0_2px_rgba(0,0,0,0.3),0_0_4px_rgba(0,0,0,0.2)]"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, delay: 3 }}
                    >
                      Capture the moment,<br/>sip the magic
                    </motion.h1>
                  </div>
                  <motion.p 
                    className="text-2xl font-light max-w-2xl mx-auto mt-6 tracking-wide text-white [text-shadow:0_0_2px_rgba(0,0,0,0.3)]"
                    transition={{ duration: 1, delay: 3.2 }}
                  >
                    Where emotions meet memories
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Our Elixirs Section */}
          <section className="py-32 relative overflow-hidden bg-[#2c1711]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/image_fx_ (6).jpg"
                alt="Elixirs Background"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#2c1711]/70 via-[#2c1711]/60 to-[#2c1711]/70 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20 py-8">
                  <h2 className="text-5xl font-rock-salt text-[#fff0c6] mb-6 drop-shadow-lg relative">
                    Our Elixirs
                  </h2>
                  <p className="text-xl text-[#fff0c6] max-w-2xl mx-auto drop-shadow">
                    Every drink tells a story, every moment captures an emotion
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      image: '/images/Elegant Orange Cocktail.jpeg',
                      name: 'Passionate',
                      description: 'A burst of citrus warmth in every sip'
                    },
                    { 
                      image: '/images/Vibrant Purple Cocktail.jpeg',
                      name: 'Ecstasy',
                      description: 'Mystical moments in deep purple hues'
                    },
                    { 
                      image: '/images/Springtime Cocktail Delight.jpeg',
                      name: 'Relief',
                      description: 'Sweet serenity of spring in a glass'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <div className="aspect-square rounded-3xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A21] via-[#5C3A21]/90 to-[#5C3A21]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-2xl font-rock-salt text-[#fff0c6] mb-2 drop-shadow-lg">
                            {item.name}
                          </h3>
                          <p className="text-[#fff0c6]/90 drop-shadow">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Studio Section */}
          <section className="py-32 relative text-[#fff0c6] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/Photography Studio Setup.jpeg"
                alt="Studio Background"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-[#5C3A21]/60 backdrop-blur-sm"></div>
            </div>

            <div className="container mx-auto px-4 py-32 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Text Content */}
                  <div className="space-y-8">
                    <h2 className="text-5xl font-rock-salt mb-6 relative">
                      Our Studio
                    </h2>
                    <div className="space-y-6 text-lg opacity-90">
                      <p>
                        Our studio is not just a photography space – it's a sanctuary where artistry meets comfort. 
                        We've created an environment where photographers and clients can engage in meaningful conversations 
                        while capturing unforgettable moments.
                      </p>
                      <p>
                        From our welcoming main studio with its warm ambiance to our specialized beverage photography setup, 
                        every corner is designed to inspire creativity and foster connection.
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-[600px] rounded-3xl overflow-hidden group">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/videos/1 (5).mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A21] via-transparent to-transparent opacity-30" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Link href="/videos/studio-tour" className="absolute inset-0" />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Records Section */}
          <section className="py-32 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/424.jpg"
                alt="Records Background"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#5C3A21]/50 via-[#5C3A21]/40 to-[#5C3A21]/50 backdrop-blur-[2px]"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff6100]/10 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <h2 className="text-5xl font-rock-salt text-[#fff0c6] mb-6 relative">
                    The Records
                  </h2>
                  <p className="text-xl text-[#fff0c6]/80 max-w-2xl mx-auto">
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
                        viewport={{ once: true }}
                        className="relative aspect-square rounded-xl overflow-hidden group"
                      >
                        <Image
                          src={src}
                          alt="Record"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A21] via-[#5C3A21]/90 to-[#5C3A21]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Text Content */}
                  <div className="space-y-6 text-lg text-[#fff0c6]/80">
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
          <section className="py-32 relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/image_fx_ (8)1.jpg"
                alt="Projects Background"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#5C3A21]/60 via-[#5C3A21]/50 to-[#5C3A21]/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <h2 className="text-5xl font-rock-salt text-[#fff0c6] mb-6 relative">
                    Our Projects
                  </h2>
                  <p className="text-xl text-[#fff0c6]/80 max-w-2xl mx-auto">
                    Creating moments that matter
                  </p>
                </div>

                {/* Main Video */}
                <div className="mb-32">
                  <div className="relative aspect-video rounded-3xl overflow-hidden group">
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
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Timeline Section with Videos */}
                <div className="relative w-full overflow-hidden">
                  {/* Timeline Images */}
                  <div className="absolute top-0 right-0 -translate-y-1/2 flex space-x-8 opacity-20">
                    <Image src="/images/Elegant Cocktail Close-Up.jpeg" alt="Cocktail 1" width={120} height={120} className="rounded-full" />
                    <Image src="/images/Springtime Cocktail Delight.jpeg" alt="Cocktail 2" width={100} height={100} className="rounded-full" />
                    <Image src="/images/Sophisticated Sips Trio.jpeg" alt="Cocktail 3" width={140} height={140} className="rounded-full" />
                  </div>

                  {/* Scrolling Timeline with Videos */}
                  <div className="relative overflow-x-auto pb-8 no-scrollbar">
                    <div className="flex whitespace-nowrap min-w-max gap-x-8 px-4">
                      <div className="flex items-center space-x-8">
                        {[
                          { src: '/videos/1 (1).mp4', text: 'RECORD YOUR MOMENTS', href: '/videos/record-moments' },
                          { src: '/videos/1 (2).mp4', text: 'SINCE 2024', href: '/videos/since-2024' },
                          { src: '/videos/1 (9).mp4', text: 'RECORDERS', href: '/videos/recorders' },
                          { src: '/videos/1 (8).mp4', text: 'FROM RECORD TO HISTORY', href: '/videos/record-to-history' },
                          { src: '/videos/1 (6).mp4', text: 'FROM HISTORY TO CULTURE', href: '/videos/history-to-culture' },
                          { src: '/videos/1 (4).mp4', text: 'FREE SHOOTING EVENT IN SEOUL', href: '/videos/seoul-event' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="relative w-[300px] aspect-video rounded-xl overflow-hidden group cursor-pointer">
                              <video
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                              >
                                <source src={item.src} type="video/mp4" />
                              </video>
                              <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A21] via-[#5C3A21]/50 to-transparent" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[#fff0c6]/70 text-sm tracking-wider whitespace-nowrap">{item.text}</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff6100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <Link href={item.href} className="absolute inset-0" />
                            </div>
                            {index < 5 && <span className="text-[#ff6100]/70">•</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Path */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#fff0c6]/20">
                      <div className="absolute top-0 left-0 h-full w-24 bg-[#ff6100]/40"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>

      <style jsx global>{`
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
          background-image: radial-gradient(#2c1711 1px, transparent 1px);
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
      `}</style>
    </>
  )
}

export default About 