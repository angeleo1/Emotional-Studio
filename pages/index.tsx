import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'
import { FaQuestion } from 'react-icons/fa6'
import Head from 'next/head'
import ContactPopup from '../components/ContactPopup'
import Navbar from '../components/Navbar'
import { FaCamera, FaHeart, FaUsers } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const Home: NextPage = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  const heroContents = [
    {
      image: '/images/KakaoTalk_20250105_095011387.jpg',
      title: 'Emotional Studio',
      subtitle: 'Creating Timeless Moments',
      showBookNow: true
    },
    {
      image: '/images/gallery-event-1.jpg',
      title: 'Our Elixirs',
      subtitle: 'Elevate Your Memories and the Studio Preserves Your Emotions',
      showViewEvents: true
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroContents.length)
      setIsImageLoaded(false)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const galleryImages = [
    '/images/gallery-event-1.jpg',
    '/images/gallery-event-2.jpg',
    '/images/gallery-event-3.jpg',
    '/images/gallery-studio-1.jpg',
    '/images/gallery-studio-2.jpg',
    '/images/gallery-studio-3.jpg',
    '/images/service-studio-1.jpg',
    '/images/service-studio-2.jpg',
    '/images/service-mocktail-1.jpg',
    '/images/hero-main-1.jpg'
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Head>
        <title>Emotional Studio - Professional Photography</title>
        <meta name="description" content="Professional photography services for your special moments" />
      </Head>

      {/* Event Banner - Only on Home Page */}
      {isHomePage && (
        <div className={`fixed top-0 left-0 right-0 bg-[#ff6100] text-white h-10 text-center text-sm font-medium z-[100] transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <Link href="/support?tab=event" className="flex items-center justify-center gap-2 hover:opacity-90 transition-opacity group">
              <span className="animate-jello-diagonal-2 text-xl">🎉</span>
              <span className="font-bold">Ongoing Event</span>
              <span className="text-[#fff0c6] animate-jello-diagonal-2 text-lg">▶▶▶</span>
            </Link>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-20">
        {/* Contact Button */}
        <div className="fixed bottom-8 right-8 z-50 group">
          <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="text-sm text-[#2C1711] font-medium">문의하기</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-white transform rotate-45 translate-y-1/2"></div>
          </div>
          <button
            onClick={() => setIsContactOpen(true)}
            className="bg-[#ff6100] text-white w-14 h-14 rounded-full shadow-lg hover:bg-[#ff6100]/90 transition-all duration-300 hover:scale-105 flex items-center justify-center relative"
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
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
          <AnimatePresence initial={false}>
            {heroContents.map((content, index) => (
              currentImage === index && (
                <motion.div
                  key={content.image}
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '-100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={content.image}
                      alt={`Hero Background ${index + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-[#5C3A21]/50" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center text-[#fff0c6]">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                        className="text-5xl md:text-7xl font-rock-salt mb-4 relative">
                        <span className="relative inline-block text-[#fff0c6] [text-shadow:0_0_2px_#fff,0_0_4px_#fff]">
                          {content.title}
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        className="text-xl md:text-2xl font-noto-sans mb-8 text-[#fff0c6] [text-shadow:0_0_2px_#fff]"
                      >
                        {content.subtitle}
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
                        className="space-y-4"
                      >
                        {content.showBookNow && (
                          <Link
                            href="/booking"
                            className="inline-block bg-[#ff6100] text-[#fff0c6] px-10 py-4 rounded-full font-noto-sans text-lg font-semibold hover:bg-transparent hover:text-[#ff6100] hover:border-2 hover:border-[#ff6100] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#ff6100]/20"
                          >
                            Book Now
                          </Link>
                        )}
                        {content.showViewEvents && (
                          <Link
                            href="/support?tab=event"
                            className="inline-block bg-[#ff6100] text-[#fff0c6] px-10 py-4 rounded-full font-noto-sans text-lg font-semibold hover:bg-transparent hover:text-[#ff6100] hover:border-2 hover:border-[#ff6100] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#ff6100]/20"
                          >
                            View Events
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </section>

        {/* Emotional Moment Section */}
        <section className="relative py-20 bg-[#fff0c6] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 animate-kenburns transform-gpu">
              <Image
                src="/images/Outdoor Photography Tips to Improve Your Skills _ OPG.jpg"
                alt="Emotional Moment Background"
                fill
                className="object-cover transform-gpu"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-[#fff0c6]/0" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-rock-salt text-[#fff0c6] mb-6 relative group">
                <span className="relative inline-block">
                  <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:animate-focus-in-expand">
                    Emotional Moment
                  </span>
                  <span className="absolute inset-0 bg-[#ff6100]/20 blur-[2px] -z-10 transition-all duration-300 group-hover:blur-[4px]"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#ff6100]/10 via-[#ff6100]/20 to-[#ff6100]/10 animate-pulse -z-10 transition-all duration-300 group-hover:opacity-50"></span>
                  <span className="absolute -inset-1 bg-[#ff6100]/10 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-20"></span>
                  <span className="absolute -inset-2 bg-[#ff6100]/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-30"></span>
                </span>
              </h2>
            </div>

            {/* Gallery */}
            <div className="relative overflow-hidden -mx-[20%]">
              <div className="flex animate-slideLeft">
                {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={index}
                    className="flex-none w-[280px] h-[400px] relative mx-2 group"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#ff6100]/3 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl transition-all duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                    <div className="absolute inset-0 border border-[#ff6100]/5 rounded-2xl group-hover:border-[#ff6100]/20 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#ff6100]/5" />
                    {/* Enhanced shadow effect */}
                    <div className="absolute -bottom-4 inset-x-4 h-12 bg-[#1a1a1a]/5 blur-xl rounded-full transform scale-x-[0.85] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                ))}
              </div>
              
              {/* Enhanced gradient overlays */}
              <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-[#1a1a1a]/30 to-transparent z-10" />
              <div className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-l from-[#1a1a1a]/30 to-transparent z-10" />
            </div>
          </div>
        </section>

        {/* SNS & Contact Section */}
        <section className="relative py-16 bg-gradient-to-br from-[#5C3A21] via-[#6B4A2E] to-[#7A5A3B]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#ff6100]/10 to-transparent mix-blend-soft-light"></div>
            <div className="absolute inset-0 bg-[#ff6100]/5 mix-blend-overlay"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 via-[#ff6100]/5 to-transparent
              backdrop-blur-md border border-white/10
              shadow-[0_8px_32px_rgba(255,97,0,0.1)]
              hover:shadow-[0_16px_48px_rgba(255,97,0,0.15)]
              transition-all duration-500 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Contact Info */}
                <div className="flex items-center gap-6">
                  <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6100]/20 to-white/5 flex items-center justify-center
                      shadow-[0_4px_16px_rgba(255,97,0,0.1)]
                      group-hover:shadow-[0_8px_24px_rgba(255,97,0,0.2)]
                      group-hover:bg-gradient-to-br group-hover:from-[#ff6100]/30 group-hover:to-white/10
                      group-hover:scale-110 transition-all duration-500">
                      <span className="text-xl">📍</span>
                    </div>
                    <div className="text-sm text-white/80 group-hover:text-[#ff6100]/90 transition-colors duration-500">123 Collins Street, Melbourne</div>
                  </div>

                  <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6100]/20 to-white/5 flex items-center justify-center
                      shadow-[0_4px_16px_rgba(255,97,0,0.1)]
                      group-hover:shadow-[0_8px_24px_rgba(255,97,0,0.2)]
                      group-hover:bg-gradient-to-br group-hover:from-[#ff6100]/30 group-hover:to-white/10
                      group-hover:scale-110 transition-all duration-500">
                      <span className="text-xl">📞</span>
                    </div>
                    <div className="text-sm text-white/80 group-hover:text-[#ff6100]/90 transition-colors duration-500">+61 3 1234 5678</div>
                  </div>

                  <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6100]/20 to-white/5 flex items-center justify-center
                      shadow-[0_4px_16px_rgba(255,97,0,0.1)]
                      group-hover:shadow-[0_8px_24px_rgba(255,97,0,0.2)]
                      group-hover:bg-gradient-to-br group-hover:from-[#ff6100]/30 group-hover:to-white/10
                      group-hover:scale-110 transition-all duration-500">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div className="text-sm text-white/80 group-hover:text-[#ff6100]/90 transition-colors duration-500">info@emotionalstudio.com</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-gradient-to-b from-[#ff6100]/20 via-white/10 to-[#ff6100]/20"></div>

                {/* Social Media */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-3 rounded-xl bg-gradient-to-br from-[#ff6100]/20 to-white/5
                        backdrop-blur-sm border border-white/10
                        shadow-[0_4px_16px_rgba(255,97,0,0.1)]
                        hover:shadow-[0_8px_24px_rgba(255,97,0,0.2)]
                        hover:bg-gradient-to-br hover:from-[#ff6100]/30 hover:to-white/10
                        transition-all duration-500`}
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="transform group-hover:scale-110 transition-transform duration-500 text-white group-hover:text-[#ff6100]">
                          {social.icon}
                        </div>
                        <div className="absolute -inset-3 bg-[#ff6100]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/60 tracking-wider">© 2024-2025 Emotional Studio. All rights reserved.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home 