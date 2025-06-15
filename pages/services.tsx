import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaUsers } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ContactPopup from '../components/ContactPopup'
import { useState } from 'react'

declare global {
  interface Window {
    openChatModal: () => void;
  }
}

export default function Services() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Services Menu Card */}
          <div className="max-w-5xl mx-auto p-8 md:p-12 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            
            {/* Provided as Standard Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-rock-salt text-[#fff0c6] mb-12 text-center">
                Provided as Standard
              </h2>
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#ff6100] to-[#ff8c00] rounded-full text-white font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-2 flex items-center gap-3">
                        <span className="text-2xl bg-gradient-to-br from-[#ff6100] to-[#ff8c00] p-2 rounded-lg">🍸</span>
                        Welcome Drink
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Choose according to your feelings. A sweet break for those tired of everyday life, 
                        spend a special time with Emotion Elixirs
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#ff6100] to-[#ff8c00] rounded-full text-white font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-2 flex items-center gap-3">
                        <span className="text-2xl bg-gradient-to-br from-[#ff6100] to-[#ff8c00] p-2 rounded-lg">📸</span>
                        Photo Shoot
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Create your own photo story in 20 minutes! Make special memories with a variety of props
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#ff6100] to-[#ff8c00] rounded-full text-white font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-2 flex items-center gap-3">
                        <span className="text-2xl bg-gradient-to-br from-[#ff6100] to-[#ff8c00] p-2 rounded-lg">🖼️</span>
                        Select Photos
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Select 2 Photos for 20mins. More than just photos. We add value with professional retouching and printing
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#ff6100] to-[#ff8c00] rounded-full text-white font-bold text-xl">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-2 flex items-center gap-3">
                        <span className="text-2xl bg-gradient-to-br from-[#ff6100] to-[#ff8c00] p-2 rounded-lg">🎬</span>
                        Time-lapse Video
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        Unforgettable behind-the-scenes cuts from the set, take them home as precious souvenirs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shooting Type Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-rock-salt text-[#fff0c6] mb-12 text-center">
                Shooting Type
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Solo */}
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300 overflow-hidden">
                  <div className="relative w-full h-60">
                    <Image
                      src="/images/noah-buscher-8A7fD6Y5VF8-unsplash.jpg"
                      alt="Solo"
                      fill
                      className="opacity-90 group-hover:opacity-100 transition-all duration-500 object-cover scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl text-white text-center mb-2">Solo</h3>
                    <p className="text-2xl bg-gradient-to-r from-[#ff6100] to-[#ff8c00] bg-clip-text text-transparent text-center font-bold">$55</p>
                  </div>
                </div>

                {/* Couple */}
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300 overflow-hidden">
                  <div className="relative w-full h-60">
                    <Image
                      src="/images/44 (1).jpg"
                      alt="Couple"
                      fill
                      className="opacity-90 group-hover:opacity-100 transition-all duration-500 object-cover scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl text-white text-center mb-2">Couple</h3>
                    <p className="text-2xl bg-gradient-to-r from-[#ff6100] to-[#ff8c00] bg-clip-text text-transparent text-center font-bold">$98</p>
                  </div>
                </div>

                {/* Triple */}
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300 overflow-hidden">
                  <div className="relative w-full h-60">
                    <Image
                      src="/images/44 (2).jpg"
                      alt="Triple"
                      fill
                      className="opacity-90 group-hover:opacity-100 transition-all duration-500 object-cover scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl text-white text-center mb-2">Triple</h3>
                    <p className="text-2xl bg-gradient-to-r from-[#ff6100] to-[#ff8c00] bg-clip-text text-transparent text-center font-bold">$150</p>
                  </div>
                </div>
              </div>

              {/* Color Options */}
              <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                  <div className="w-8 h-8 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-600 to-white"></div>
                  </div>
                  <span className="text-white/90">Black & White : Standard</span>
                </div>
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                  <div className="w-8 h-8 rounded-full relative overflow-hidden shadow-lg">
                    <div 
                      className="absolute inset-0 animate-spin-slow"
                      style={{
                        background: 'conic-gradient(from 0deg, #FF0000, #FF8000, #FFFF00, #00FF00, #00FFFF, #0000FF, #8000FF, #FF00FF, #FF0000)'
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/20"></div>
                  </div>
                  <span className="text-white/90">Colour : +$10</span>
                </div>
              </div>
            </motion.div>

            {/* Other Goods Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-rock-salt text-[#fff0c6] mb-12 text-center">
                Other Goods
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { 
                    name: 'A4 Print', 
                    price: '$10', 
                    image: '/images/14tkwls.jpg',
                    description: 'High quality prints on premium paper'
                  },
                  { 
                    name: 'A4 Frame', 
                    price: '$15', 
                    image: '/images/sddasd.jpg',
                    description: 'Elegant frames in various colors',
                    colors: [
                      { name: 'Black', color: '#1a1a1a' },
                      { name: 'Ivory', color: '#fff0c6' },
                      { name: 'Orange', color: '#ff6100' },
                      { name: 'Wood', color: '#8B4513' }
                    ]
                  },
                  { 
                    name: 'Original Digital Film', 
                    price: '$20', 
                    image: '/images/film.jpg',
                    description: 'Full resolution digital copies'
                  },
                  { 
                    name: 'Calendar', 
                    price: '$45', 
                    image: '/images/tkwlsekffur.jpg',
                    description: 'Personalized photo calendar'
                  },
                ].map((item) => (
                  <div key={item.name} className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300 overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-all duration-500 opacity-90 group-hover:opacity-100 scale-100 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-4 h-[160px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-white text-center mb-1">{item.name}</h3>
                        <p className="text-white/60 text-sm text-center mb-2">{item.description}</p>
                        {item.colors && Array.isArray(item.colors) && (
                          <div className="flex justify-center gap-2">
                            {item.colors.map((color) => (
                              <div 
                                key={color.name}
                                className="group/color relative"
                              >
                                <div 
                                  className="w-6 h-6 rounded-full border border-white/20 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
                                  style={{ backgroundColor: color.color }}
                                />
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap">
                                  {color.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xl bg-gradient-to-r from-[#ff6100] to-[#ff8c00] bg-clip-text text-transparent text-center font-bold mt-2">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            </motion.div>

            {/* Special Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-rock-salt text-[#fff0c6] mb-12 text-center">
                Special
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/wedding" className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300 overflow-hidden">
                  <div className="relative w-full h-60">
                    <Image
                      src="/images/231123.jpg"
                      alt="Wedding Package"
                      fill
                      className="opacity-90 group-hover:opacity-100 transition-all duration-500 object-cover scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl text-white mb-3">Wedding Package</h3>
                    <p className="text-white/70">Celebrate Your Love Story with Our Bespoke Wedding Package</p>
                  </div>
                </Link>

                <Link href="/group" className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#ff6100]/30 transition-all duration-300 overflow-hidden">
                  <div className="relative w-full h-60">
                    <Image
                      src="/images/2w1312.jpg"
                      alt="Group Package"
                      fill
                      className="opacity-90 group-hover:opacity-100 transition-all duration-500 object-cover scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl text-white mb-3">Group Package</h3>
                    <p className="text-white/70">Making Memories Together: The Ultimate Package for Large Group Celebrations</p>
                  </div>
                </Link>
              </div>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full bg-[#ff6100] text-white py-4 rounded-full font-noto-sans text-lg font-semibold hover:bg-[#ff6100]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#ff6100]/20"
              >
                Contact us for the above package
              </button>
            </motion.div>

          </div>
        </div>
      </main>

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
} 