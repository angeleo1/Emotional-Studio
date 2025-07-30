import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MobileNavbar from '../components/MobileNavbar';

const sections = [
  {
    title: 'Clothing Store',
    images: [
      '/images/alanding.png',
      '/images/friend1.jpg',
      '/images/friend2.jpg',
      '/images/friend3.jpg',
      '/images/friend4.jpg',
      '/images/friend5.jpg',
      '/images/friend6.jpg',
    ],
    description: 'Professional fashion photography for clothing stores and brands.',
  },
  {
    title: 'Dog Shelter',
    images: [
      '/images/Pet (1).jpg',
      '/images/Pet (2).jpg',
      '/images/Pet (3).jpg',
      '/images/family1.jpg',
      '/images/family2.jpg',
      '/images/family3.jpg',
      '/images/family4.jpg',
    ],
    description: 'Heartwarming photography for pet shelters and animal welfare organizations.',
  },
  {
    title: 'Bakery',
    images: [
      '/images/Whisk_8436ac3945.jpg',
      '/images/friend7.jpg',
      '/images/friend8.jpg',
      '/images/friend9.jpg',
      '/images/friend10.jpg',
      '/images/friend11.jpg',
      '/images/friend12.jpg',
    ],
    description: 'Delicious food photography for bakeries and culinary businesses.',
  },
];

const MobileCollaboration: NextPage = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<any>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 모달이 열렸을 때만 스크롤을 막음
      if (modalOpen) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, [modalOpen]);

  const handleImageClick = (image: string) => {
    const section = sections.find(s => s.images?.includes(image));
    setCurrentSection(section);
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handlePrevious = () => {
    if (!selectedImage || !currentSection?.images) return;
    const currentIndex = currentSection.images.indexOf(selectedImage);
    const previousIndex = (currentIndex - 1 + currentSection.images.length) % currentSection.images.length;
    setSelectedImage(currentSection.images[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage || !currentSection?.images) return;
    const currentIndex = currentSection.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % currentSection.images.length;
    setSelectedImage(currentSection.images[nextIndex]);
  };

  // 터치 이벤트 핸들러
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !currentSection?.images) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // 왼쪽으로 스와이프 - 다음 이미지
      handleNext();
    } else if (isRightSwipe) {
      // 오른쪽으로 스와이프 - 이전 이미지
      handlePrevious();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // 모달 클릭 핸들러
  const handleModalClick = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Collaboration | Emotional Studio</title>
        <meta name="description" content="Explore our collaboration projects at Emotional Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            Collaboration
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="pb-20">
          {sections.map((section, idx) => (
            <div key={section.title}>
              {/* 섹션 간 구분선 */}
              {idx > 0 && (
                <div className="h-10 bg-[#0a0a0a] w-full shadow-inner" />
              )}
              
              <section className="py-8 px-4">
                {/* 섹션 제목 */}
                <div className="text-center mb-6">
                  <h2 
                    className="text-3xl font-bold mb-3"
                    style={{
                      fontFamily: 'CS-Valcon-Drawn-akhr7k',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {section.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
                    {section.description}
                  </p>
                </div>

                {/* 이미지 그리드 */}
                <div className="grid grid-cols-2 gap-3">
                  {section.images.map((image, imageIdx) => (
                    <motion.div
                      key={imageIdx}
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleImageClick(image)}
                    >
                      <Image
                        src={image}
                        alt={`${section.title} - Image ${imageIdx + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          ))}
        </div>

        {/* 이미지 모달 */}
        <AnimatePresence>
          {modalOpen && selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClick}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative w-full h-full flex items-center justify-center p-4" onClick={handleModalClick}>
                {/* 이미지 */}
                <motion.div
                  className="relative w-full h-full max-w-4xl max-h-[80vh]"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <Image
                    src={selectedImage}
                    alt="Selected collaboration image"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* 네비게이션 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* 이미지 정보 */}
                {currentSection && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: 'CS-Valcon-Drawn-akhr7k',
                      }}
                    >
                      {currentSection.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {currentSection.description}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MobileCollaboration; 