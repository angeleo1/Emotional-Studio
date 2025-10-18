import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import MobileNavbar from '../components/MobileNavbar';
import Image from 'next/image';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';
import PackagesContent from '@/components/PackagesContent';
import AddOnsContent from '@/components/AddOnsContent';

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
      { src: '/images/007.png', alt: 'Moodboard', label: 'Moodboard photo' },
      { src: '/images/001.png', alt: 'Moodboard', label: 'Moodboard photo' },
      { src: '/images/Studio (3).jpg', alt: 'Elixir', label: 'Elixirs' }
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
            <p className="text-sm text-white mb-6">Children under 5 and pets are welcome free of charge!</p>
            <p className="text-sm text-white/70 mb-6">Intro - 10 minutes, Photo shoot - 20 minutes, Selection - 20 minutes</p>
           <div className="space-y-2 text-xl font-bold text-white mt-16">
             <div className="text-4xl font-bold uppercase text-white text-center tracking-widest mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>emotional Kit</div>
             <div className="border-b-2 border-white/30 w-full mx-auto mb-6" />
             <p>Moodboard photo</p>
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
    title: 'Packages & Add-ons',
    text: (
      <div className="space-y-10 text-white pt-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Choose Your Experience</h3>
          <p className="text-base text-white/70">Select the perfect package for your photography needs</p>
        </div>
        
        <div className="space-y-4">
          {/* Packages 버튼 */}
          <button 
            onClick={handlePackagesClick}
            className="group relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 w-full"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Packages</h4>
              <p className="text-white/70 text-sm">Complete photography packages with everything included</p>
            </div>
          </button>

          {/* Add-ons 버튼 */}
          <button 
            onClick={handleAddOnsClick}
            className="group relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 w-full"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Add-ons</h4>
              <p className="text-white/70 text-sm">Additional services to enhance your experience</p>
            </div>
          </button>
        </div>
      </div>
    )
  }
];

const MobileServices: NextPage = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; label: string } | null>(null);
  const [loadingType, setLoadingType] = useState<'packages' | 'addons' | null>(null);
  const [showContent, setShowContent] = useState(false);

  const handlePackagesClick = () => {
    setLoadingType('packages');
    setShowContent(true);
    // MobileNavbar와 TopBanner 숨기기
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }
    // 주황색 배너 숨기기
    const topBanner = document.querySelector('.fixed.top-0.bg-gradient-to-r');
    if (topBanner) {
      (topBanner as HTMLElement).style.display = 'none';
    }
  };

  const handleAddOnsClick = () => {
    setLoadingType('addons');
    setShowContent(true);
    // MobileNavbar와 TopBanner 숨기기
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }
    // 주황색 배너 숨기기
    const topBanner = document.querySelector('.fixed.top-0.bg-gradient-to-r');
    if (topBanner) {
      (topBanner as HTMLElement).style.display = 'none';
    }
  };

  const handleBackToMain = () => {
    setShowContent(false);
    setLoadingType(null);
    // MobileNavbar와 TopBanner 다시 표시
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = '';
    }
    // 주황색 배너 다시 표시
    const topBanner = document.querySelector('.fixed.top-0.bg-gradient-to-r');
    if (topBanner) {
      (topBanner as HTMLElement).style.display = '';
    }
  };

  return (
    <>
      <Head>
        <title>Services | Emotional Studio</title>
        <meta name="description" content="Our photography services and packages" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileNavbar />
      
      {/* 로딩된 내용 표시 */}
      {showContent && (
        <div className="fixed inset-0 z-40 flex flex-col" style={{ background: '#111' }}>
          {/* 뒤로가기 버튼 - 우측 하단 (중앙보다 왼쪽) */}
          <div className="fixed bottom-6 right-20 z-50">
            <button
              onClick={handleBackToMain}
              className="flex items-center justify-center w-12 h-12 bg-white hover:bg-white/90 backdrop-blur-sm rounded-full transition-all duration-300 shadow-lg active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>
          
          {/* 내용 */}
          <div className="flex-1 overflow-y-auto pt-16">
            {loadingType === 'packages' && <PackagesContent />}
            {loadingType === 'addons' && <AddOnsContent />}
          </div>
        </div>
      )}
      
      {/* 기본 페이지 내용 - showContent가 false일 때만 표시 */}
      {!showContent && (
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
                  {service.image && (
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {service.images && (
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                      {/* Session 섹션인 경우 특별한 레이아웃 적용 */}
                      {service.title === 'Session' ? (
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
                    )}
                    {/* 이미지 오버레이 그라데이션 */}
                    {service.images && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                    )}
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
        </div>
      )}
      
    </>
  );
};

export default MobileServices; 