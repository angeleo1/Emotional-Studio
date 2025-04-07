import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'
import { FaQuestion } from 'react-icons/fa6'
import Head from 'next/head'
import ContactPopup from '../components/ContactPopup'
import { FaCamera, FaHeart, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import CloudinaryImage from '../components/common/CloudinaryImage'
import dynamic from 'next/dynamic'
import React from 'react'

const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  { suspense: false }
)

const Home: NextPage = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const heroContents = [
    {
      image: 'v1/hero-main-1_ob1dny',
      title: 'emotional studios',
      subtitle: 'Creating Timeless Moments',
      showBookNow: true
    },
    {
      image: 'v1/service-studio-2_x3hfuh',
      title: 'emotional studios',
      subtitle: 'Elevate Your Memories and the Studio Preserves Your Emotions',
      showViewEvents: true
    },
    {
      image: 'v1/IMG_0190_z0su9m',
      title: 'emotional studios',
      subtitle: 'Photographer in Action',
      showBookNow: true
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroContents.length)
      setIsImageLoaded(false)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const galleryImages = [
    'v1/jimmy-fermin-bqe0J0b26RQ-unsplash_tpyzo4',
    'v1/aiony-haust-3TLl_97HNJo-unsplash_vda4od',
    'v1/leon-elldot-f6HbVnGtNnY-unsplash_vt63we',
    'v1/olena-bohovyk-XttWKETqCCQ-unsplash_wryqhq',
    'v1/jessica-felicio-QS9ZX5UnS14-unsplash_fdjyaf',
    'v1/ivana-cajina-dnL6ZIpht2s-unsplash_o1zsv1',
    'v1/blake-carpenter-9ooMr_r7BlY-unsplash_u04ne2',
    'v1/prince-akachi-4Yv84VgQkRM-unsplash_mczh7g',
    'v1/IMG_0190_z0su9m',
    'v1/IMG_0241_zxbg10'
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-8 h-8" />,
      url: 'https://instagram.com',
      color: 'hover:text-pink-500'
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-8 h-8" />,
      url: 'https://youtube.com',
      color: 'hover:text-red-500'
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF className="w-8 h-8" />,
      url: 'https://facebook.com',
      color: 'hover:text-blue-500'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Head>
        <title>Emotional Studio - Professional Photography</title>
        <meta name="description" content="Professional photography services for your special moments" />
      </Head>

      {/* Main Content */}
      <div>
        {/* Contact Button */}
        <div className="fixed bottom-8 right-8 z-50 group">
          <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="text-sm text-[#2C1711] font-medium">Contact Us</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-white transform rotate-45 translate-y-1/2"></div>
          </div>
          <button
            onClick={() => setIsContactOpen(true)}
            className="bg-[#524e4a] text-white w-14 h-14 rounded-full shadow-lg border-2 border-white hover:bg-[#ff6100] hover:border-[#ff6100] transition-all duration-300 hover:scale-105 flex items-center justify-center relative"
          >
            <div className="relative flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Contact Popup */}
        <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <CloudinaryImage
              src={heroContents[currentImage].image}
              alt={heroContents[currentImage].title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover grayscale"
              onLoad={handleImageLoad}
            />
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-beau-rivage mb-4 sm:mb-8 text-white hover:text-[#ff6100] transition-colors duration-300 leading-none"
              >
                {heroContents[currentImage].title}
              </motion.h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {heroContents[currentImage].showBookNow && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                  >
                    <Link href="/booking">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-[#ff6100] hover:border-[#ff6100] transition-all duration-300"
                      >
                        Book Now
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
                {heroContents[currentImage].showViewEvents && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                  >
                    <Link href="/support?tab=event">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-[#ff6100] hover:border-[#ff6100] transition-all duration-300"
                      >
                        View Events
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Our Elixirs Section */}
        <section className="relative py-32 sm:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80 z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff6100_0%,transparent_100%)] opacity-[0.03] z-0"></div>
          <div className="relative z-10 w-full">
            <div className="text-center mb-24">
              <div className="w-full h-[1px] bg-white/30 mb-8"></div>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-[8vw] font-bold leading-none tracking-tighter text-white relative"
              >
                <motion.span
                  className="inline-block"
                  animate={{ 
                    color: [
                      '#ffffff',
                      '#ff6100',
                      '#ffd700',
                      '#ff8c42',
                      '#ff4d4d',
                      '#ffa066',
                      '#ff1493',
                      '#ff6100',
                      '#ff2400',
                      '#ff00ff',
                      '#98FF98',
                      '#ffffff'
                    ],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  OUR ELIXIRS
                </motion.span>
              </motion.h2>
              <div className="w-full h-[1px] bg-white/30 mt-8"></div>
            </div>
            <div className="w-full overflow-hidden">
              {/* First row - moving left */}
              <div 
                className="relative whitespace-nowrap animate-scroll-left group h-[12vw] cursor-pointer"
                onClick={() => setSelectedImage("/images/Elegant Orange Cocktail.jpeg")}
              >
                <div className="inline-flex w-full relative z-10">
                  <div className="relative inline-block">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF2400)' }}>
                      PASSIONATE ORANGE
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF2400)' }}>
                      PASSIONATE ORANGE
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF2400)' }}>
                      PASSIONATE ORANGE
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF2400)' }}>
                      PASSIONATE ORANGE
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                  <div className="relative w-[400%] h-full">
                    <Image
                      src="/images/Elegant Orange Cocktail.jpeg"
                      alt="Passionate Orange"
                      fill
                      className="object-cover mix-blend-screen"
                      priority
                      sizes="400vw"
                    />
                  </div>
                </div>
              </div>

              {/* Second row - moving right */}
              <div 
                className="relative whitespace-nowrap animate-scroll-right my-4 group h-[12vw] cursor-pointer"
                onClick={() => setSelectedImage("/images/Vibrant Purple Cocktail.jpeg")}
              >
                <div className="inline-flex w-full relative z-10">
                  <div className="relative inline-block">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF00FF)' }}>
                      ECSTASY GLOW
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF00FF)' }}>
                      ECSTASY GLOW
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF00FF)' }}>
                      ECSTASY GLOW
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #FF00FF)' }}>
                      ECSTASY GLOW
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                  <div className="relative w-[400%] h-full">
                    <Image
                      src="/images/Vibrant Purple Cocktail.jpeg"
                      alt="Ecstasy Glow"
                      fill
                      className="object-cover mix-blend-screen"
                      priority
                      sizes="400vw"
                    />
                  </div>
                </div>
              </div>

              {/* Third row - moving left */}
              <div 
                className="relative whitespace-nowrap animate-scroll-left group h-[12vw] cursor-pointer"
                onClick={() => setSelectedImage("/images/Springtime Cocktail Delight.jpeg")}
              >
                <div className="inline-flex w-full relative z-10">
                  <div className="relative inline-block">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #98FF98)' }}>
                      RELIEF AURA
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #98FF98)' }}>
                      RELIEF AURA
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #98FF98)' }}>
                      RELIEF AURA
                    </h3>
                  </div>
                  <div className="relative inline-block ml-8">
                    <h3 className="text-[12vw] font-bold leading-none tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-color, #98FF98)' }}>
                      RELIEF AURA
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                  <div className="relative w-[400%] h-full">
                    <Image
                      src="/images/Springtime Cocktail Delight.jpeg"
                      alt="Relief Aura"
                      fill
                      className="object-cover mix-blend-screen"
                      priority
                      sizes="400vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Modal with Description */}
            {selectedImage && (
              <div 
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
                onClick={() => setSelectedImage(null)}
              >
                <div className="relative w-[90vw] h-[80vh] max-w-7xl flex gap-8">
                  {/* Image Container */}
                  <div className="w-1/2 h-full relative">
                    <Image
                      src={selectedImage}
                      alt="Selected Elixir"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  
                  {/* Description Container */}
                  <div className="w-1/2 h-full flex flex-col justify-center text-white">
                    <h3 className="text-5xl font-bold mb-6">
                      {selectedImage.includes("Orange") ? "PASSIONATE ORANGE" :
                       selectedImage.includes("Purple") ? "ECSTASY GLOW" :
                       "RELIEF AURA"}
                    </h3>
                    <p className="text-2xl mb-8 leading-relaxed">
                      {selectedImage.includes("Orange") ? 
                        "A vibrant blend of citrus and spice, this elixir embodies passion and energy. Perfect for those seeking an invigorating experience that awakens the senses." :
                       selectedImage.includes("Purple") ? 
                        "A mystical fusion of berries and herbs, creating an enchanting experience. This elixir brings a sense of euphoria and wonder to every sip." :
                        "A refreshing harmony of mint and citrus, designed to soothe and revitalize. This elixir offers a moment of tranquility and renewal."}
                    </p>
                    <div className="flex flex-col gap-3">
                      <p className="text-xl opacity-80">Ingredients:</p>
                      <p className="text-xl">
                        {selectedImage.includes("Orange") ? 
                          "Fresh oranges, ginger, cinnamon, and a hint of chili" :
                         selectedImage.includes("Purple") ? 
                          "Blueberries, lavender, vanilla, and sparkling water" :
                          "Mint leaves, lime, cucumber, and elderflower"}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    className="absolute top-4 right-4 text-white text-4xl hover:text-[#ff6100] transition-colors duration-300"
                    onClick={() => setSelectedImage(null)}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Emotional Moment Section */}
        <section className="relative py-12 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff6100_0%,transparent_70%)] opacity-5"></div>
          <div className="relative z-10 w-full">
            <div className="overflow-hidden w-full">
              <div className="flex whitespace-nowrap">
                {Array(20).fill("Emotional Moments").map((text, index) => (
                  <Link 
                    href="/gallery-landing" 
                    key={index} 
                    className="ml-4 sm:ml-8 first:ml-0 flex-none cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dm-serif ${[3, 8, 13, 18].includes(index) ? 'text-[#ff6100]' : 'text-white'}`}>
                      {text}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="relative overflow-hidden -mx-4 sm:-mx-[10%] md:-mx-[20%]">
              <div className="flex animate-slideLeft">
                {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={index}
                    className="flex-none w-[150px] sm:w-[200px] md:w-[280px] h-[200px] sm:h-[300px] md:h-[400px] relative mx-1 sm:mx-2 group"
                  >
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#ff6100]/3 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <CloudinaryImage
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      width={280}
                      height={400}
                      className="object-cover rounded-xl sm:rounded-2xl transition-all duration-700 group-hover:scale-[1.02] grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl sm:rounded-2xl" />
                    <div className="absolute inset-0 border border-[#ff6100]/5 rounded-xl sm:rounded-2xl group-hover:border-[#ff6100]/20 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#ff6100]/5" />
                    <div className="absolute -bottom-4 inset-x-4 h-12 bg-[#1a1a1a]/5 blur-xl rounded-full transform scale-x-[0.85] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="relative py-8 sm:py-16 bg-[#524e4a]">
          <div className="container mx-auto px-4 relative z-10">
            {/* Logo */}
            <div className="absolute -left-[120px] sm:-left-[180px] md:-left-[232px] top-1/2 -translate-y-1/2 hidden lg:block">
              <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-herr-von text-[#ff6100]">e.st</span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                  <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="text-sm sm:text-base md:text-xl">📍</span>
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">123 Collins Street, Melbourne</div>
                </div>

                <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                  <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="text-sm sm:text-base md:text-xl">📞</span>
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">+61 3 1234 5678</div>
                </div>

                <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                  <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="text-sm sm:text-base md:text-xl">✉️</span>
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">info@emotionalstudio.com</div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-white/10"></div>

              {/* Social Media */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="text-white group-hover:text-[#ff6100] transition-colors duration-300">
                        {React.cloneElement(social.icon, { className: "w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" })}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-white/60 tracking-wider">© 2024-2025 Emotional Studio. All rights reserved.</p>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  )
}

export default Home 