import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import MobileNavbar from '../components/MobileNavbar';
import Image from 'next/image';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const services = [
  {
    title: 'Provided as Standard',
    image: '/images/dlsus.png',
    items: [
      {
        icon: '🍸',
        name: 'Elevate your emotions',
        description: 'Relax and immerse yourself in the atmosphere, with our curated elixirs setting the tone for a unique photography experience.'
      },
      {
        icon: '📸',
        name: 'The Photo Session',
        description: 'Enjoy your 20-minute private session, solo or with loved ones, in a space designed for stunning, professional-quality photos.'
      },
      {
        icon: '🖼️',
        name: 'Selection',
        description: 'Choose two favourite shots in our private selection zone. Our team will refine them with meticulous retouching and premium printing, turning your images into visual memories.'
      },
      {
        icon: '🎬',
        name: 'Timelapse Video',
        description: 'Receive a highlight timelapse that beautifully captures the energy and moments of your session.'
      }
    ]
  },
  {
    title: 'Session',
    images: [
        { src: '/images/Gallery/Customer Album/Studio (8).jpg', alt: 'Emotional Kit', label: 'emotional Kit' },
        { src: '/images/Jay test 0826,-(1 of 1).jpg', alt: 'Warm', label: 'Warm tone' },
      { src: '/images/Gallery/COOL/018.png', alt: 'Cool', label: 'Cool tone' },
      { src: '/images/Gallery/BW/0921 (4).jpg', alt: 'B/W', label: 'B/W' },
      { src: '/images/007.png', alt: 'Moodboard', label: 'Moodboard Photo' },
      { src: '/images/001.png', alt: 'Moodboard', label: 'Moodboard Photo' },
      { src: '/images/Gallery/STUDIO/Studio (3).jpg', alt: 'Elixir', label: 'Elixirs' }
    ],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div className="text-center mb-6">
            <div className="text-white mb-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold w-56 mobile-text-responsive">1 - Person Session</span>
                  <span className="text-xl font-bold mobile-text-responsive">$65</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold w-56 ml-1 mobile-text-responsive">2 - People Session</span>
                  <span className="text-xl font-bold mobile-text-responsive">$120</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold w-56 mobile-text-responsive">Add person</span>
                  <span className="text-xl font-bold mobile-text-responsive">$30</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-6">Intro - 10 minutes, Photo shoot - 20 minutes, Selection - 10 minutes</p>
           <div className="space-y-2 text-xl font-bold text-white mt-16">
             <div className="text-4xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>emotional Kit</div>
             <div className="border-b-2 border-white/30 w-full mx-auto mb-6" />
             <p>Moodboard Photo</p>
             <p>Elixirs</p>
             <p>Timelapse video original file</p>
             <p className="whitespace-nowrap">4x6'' prints of 2 selected photos</p>
             <p className="text-sm text-white/70 font-normal">provided per person</p>
           </div>
           <p className="text-lg text-white/70 text-center mt-8 italic">Provided with your session</p>
          </div>
      </div>
    )
  },
  {
    title: 'Other Goods',
    images: ['/images/BW.jpg', '/images/frame.png (1).png', '/images/frame.png', '/images/frame.png (2).png'],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M6 7V3h12v4"/><path d="M6 17h12v4H6z"/></svg>
              </span>
              <span>Extra 4x6'' Print</span>
            </div>
            <span className="text-base font-bold text-right ml-2">$10</span>
          </div>
          <p className="text-lg mt-1 mb-4">High quality prints on premium paper</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
              </span>
              <span>Frame</span>
            </div>
            <span className="text-base font-bold text-right ml-2">$15</span>
          </div>
          <p className="text-lg mt-1 mb-4">Elegant frames to display your memories</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </span>
              <span>Additional Retouch</span>
            </div>
            <span className="text-base font-bold text-right ml-2">$10</span>
          </div>
          <p className="text-lg mt-1 mb-4">We will professionally enhance your selected images to ensure you look your absolute best</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </span>
              <span>Digital original film</span>
            </div>
            <span className="text-base font-bold text-right ml-2">$20</span>
          </div>
          <p className="text-lg mt-1 mb-4">High resolution digital files for uploading SNS or download</p>
        </div>
      </div>
    )
  }
];

const MobileServices: NextPage = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; label: string } | null>(null);

  return (
    <>
      <Head>
        <title>Services | Emotional Studio</title>
        <meta name="description" content="Our photography services and packages" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileNavbar />
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-4 flex justify-center items-center border-b border-white/10">
          <h1 
            className="text-2xl font-medium"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Services
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="p-4 pb-20">
          <div className="max-w-md mx-auto space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group relative"
              >
                {/* 글래스모피즘 배경 */}
                <div className={`absolute inset-0 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl ${
                  index % 2 === 0 ? 'bg-white/15' : 'bg-white/8'
                }`}></div>
                
                {/* 컨텐츠 */}
                <div className="relative p-6">
                  {/* 이미지 컨테이너 */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    {service.image ? (
                      // 단일 이미지
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : service.images ? (
                    // Session 섹션인 경우 특별한 레이아웃 적용
                    service.title === 'Session' ? (
                      <div className="space-y-2">
                        {/* 첫 번째 행: Warm tone, Cool tone */}
                        <div className="grid grid-cols-2 gap-2">
                          {service.images.slice(0, 2).map((img, imgIndex) => (
                            <div 
                              key={imgIndex} 
                              className="relative cursor-pointer"
                              onClick={() => {
                                if (typeof img === 'object' && img.label) {
                                  setSelectedImage({
                                    src: img.src,
                                    alt: img.alt,
                                    label: img.label
                                  });
                                }
                              }}
                            >
                              <Image
                                src={typeof img === 'string' ? img : img.src}
                                alt={typeof img === 'string' ? `${service.title} ${imgIndex + 1}` : img.alt}
                                width={200}
                                height={200}
                                className="w-full h-32 object-contain transition-transform duration-700 group-hover:scale-105"
                              />
                              {typeof img === 'object' && img.label && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                                  <span style={img.label === 'emotional Kit' ? { fontFamily: 'CS-Valcon-Drawn-akhr7k' } : {}}>
                                    {img.label}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* 두 번째 행: B/W, OOTD Photo */}
                        <div className="grid grid-cols-2 gap-2">
                          {service.images.slice(2, 4).map((img, imgIndex) => (
                            <div 
                              key={imgIndex + 2} 
                              className="relative cursor-pointer"
                              onClick={() => {
                                if (typeof img === 'object' && img.label) {
                                  setSelectedImage({
                                    src: img.src,
                                    alt: img.alt,
                                    label: img.label
                                  });
                                }
                              }}
                            >
                              <Image
                                src={typeof img === 'string' ? img : img.src}
                                alt={typeof img === 'string' ? `${service.title} ${imgIndex + 3}` : img.alt}
                                width={200}
                                height={200}
                                className="w-full h-32 object-contain transition-transform duration-700 group-hover:scale-105"
                              />
                              {typeof img === 'object' && img.label && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                                  <span style={img.label === 'emotional Kit' ? { fontFamily: 'CS-Valcon-Drawn-akhr7k' } : {}}>
                                    {img.label}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* 세 번째 행: Elixirs (단독으로 전체 너비) */}
                        {service.images && service.images[4] && (
                          <div className="relative cursor-pointer">
                            <Image
                              src={service.images[4].src}
                              alt={service.images[4].alt}
                              width={200}
                              height={200}
                              className="w-full h-32 object-contain transition-transform duration-700 group-hover:scale-105"
                              onClick={() => {
                                setSelectedImage({
                                  src: service.images[4].src,
                                  alt: service.images[4].alt,
                                  label: service.images[4].label
                                });
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                              <span style={service.images[4].label === 'emotional Kit' ? { fontFamily: 'CS-Valcon-Drawn-akhr7k' } : {}}>
                                {service.images[4].label}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // 다른 섹션들은 기존 레이아웃 사용
                      <div className="grid grid-cols-2 gap-2">
                        {service.images.map((img, imgIndex) => (
                          <div 
                            key={imgIndex} 
                            className="relative cursor-pointer"
                            onClick={() => {
                              if (typeof img === 'object' && img.label) {
                                setSelectedImage({
                                  src: img.src,
                                  alt: img.alt,
                                  label: img.label
                                });
                              }
                            }}
                          >
                            <Image
                              src={typeof img === 'string' ? img : img.src}
                              alt={typeof img === 'string' ? `${service.title} ${imgIndex + 1}` : img.alt}
                              width={200}
                              height={200}
                              className="w-full h-32 object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                            {typeof img === 'object' && img.label && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                                <span style={img.label === 'emotional Kit' ? { fontFamily: 'CS-Valcon-Drawn-akhr7k' } : {}}>
                                  {img.label}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                    ) : null}
                    {/* 이미지 오버레이 그라데이션 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* 제목 */}
                  <h2 
                    className="text-3xl font-bold mb-6 text-center"
                    style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
                  >
                    {service.title}
                  </h2>
                  
                  {/* 서비스 아이템들 또는 텍스트 */}
                  {service.items ? (
                    <div className="space-y-4">
                      {service.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.15) + (itemIndex * 0.1), duration: 0.4 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              {item.description && (
                                <p className="text-sm text-white/70 mt-1">{item.description}</p>
                              )}
                            </div>
                          </div>
                          {item.price && (
                            <span className="text-lg font-bold text-[#FF6100]">{item.price}</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : service.text ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index * 0.15) + 0.3, duration: 0.4 }}
                    >
                      {service.text}
                    </motion.div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <MobileContactButton />
      
      {/* Floating Book Button */}
      <FloatingBookButton />

      {/* 이미지 모달 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-[90vw] max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={400}
                height={500}
                className="w-full h-auto object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center p-3 rounded-b-lg">
                <p 
                  className="text-lg font-semibold"
                  style={selectedImage.label === 'emotional Kit' ? { fontFamily: 'CS-Valcon-Drawn-akhr7k' } : {}}
                >
                  {selectedImage.label}
                </p>
              </div>
              <button
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </>
  );
};

export default MobileServices; 