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
            <div className="text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[10rem] md:text-[16rem] lg:text-[24rem] font-beau-rivage mb-8 text-white hover:text-[#ff6100] transition-colors duration-300 leading-none"
              >
                {heroContents[currentImage].title}
              </motion.h1>
              {heroContents[currentImage].showBookNow && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full hover:bg-[#ff6100] hover:border-[#ff6100] transition-all duration-300"
                  >
                    Book Now
                  </motion.button>
                </motion.div>
              )}
              {heroContents[currentImage].showViewEvents && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full hover:bg-[#ff6100] hover:border-[#ff6100] transition-all duration-300"
                  >
                    View Events
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Emotional Moment Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff6100_0%,transparent_70%)] opacity-5"></div>
          <div className="relative z-10 w-full">
            <div className="overflow-hidden w-full">
              <div className="flex whitespace-nowrap">
                {Array(20).fill("Emotional Moments").map((text, index) => (
                  <Link 
                    href="/gallery-landing" 
                    key={index} 
                    className="ml-8 first:ml-0 flex-none cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <h2 className={`text-4xl md:text-5xl font-dm-serif ${[3, 8, 13, 18].includes(index) ? 'text-[#ff6100]' : 'text-white'}`}>
                      {text}
                    </h2>
                  </Link>
                ))}
              </div>
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
                    <CloudinaryImage
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      width={280}
                      height={400}
                      className="object-cover rounded-2xl transition-all duration-700 group-hover:scale-[1.02] grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                    <div className="absolute inset-0 border border-[#ff6100]/5 rounded-2xl group-hover:border-[#ff6100]/20 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#ff6100]/5" />
                    <div className="absolute -bottom-4 inset-x-4 h-12 bg-[#1a1a1a]/5 blur-xl rounded-full transform scale-x-[0.85] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                ))}
              </div>
              
              <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-[#1a1a1a]/30 to-transparent z-10" />
              <div className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-l from-[#1a1a1a]/30 to-transparent z-10" />
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="relative py-16 bg-[#524e4a]">
          <div className="container mx-auto px-4 relative z-10">
            {/* Logo */}
            <div className="absolute -left-[232px] top-1/2 -translate-y-1/2">
              <span className="text-[16rem] font-herr-von text-[#ff6100]">e.st</span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Contact Info */}
              <div className="flex items-center gap-6">
                <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div className="text-sm text-white/80">123 Collins Street, Melbourne</div>
                </div>

                <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <div className="text-sm text-white/80">+61 3 1234 5678</div>
                </div>

                <div className="group flex items-center gap-3 hover:translate-x-2 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div className="text-sm text-white/80">info@emotionalstudio.com</div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-white/10"></div>

              {/* Social Media */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="text-white group-hover:text-[#ff6100] transition-colors duration-300">
                        {social.icon}
                      </div>
                    </div>
                  </a>
                ))}
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