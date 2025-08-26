import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

// 카테고리 리스트
const CATEGORY_LIST = [
  "All",
  "Black & White",
  "Color",
  "Collaboration",
  "Studio",
];

// 새로운 이미지 업로드 예정 - 현재는 빈 배열
const FILES = [];

// 카테고리별 이미지 분배
const perCat = Math.ceil(FILES.length / 4);
const IMAGES_BW = FILES.slice(0, perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_COLOR = FILES.slice(perCat, 2*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_COLLAB = FILES.slice(2*perCat, 3*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_EST = FILES.slice(3*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_ALL = [
  ...IMAGES_BW,
  ...IMAGES_COLOR,
  ...IMAGES_COLLAB,
  ...IMAGES_EST,
];

const CATEGORY_MAP: Record<string, string[]> = {
  All: IMAGES_ALL,
  "Black & White": IMAGES_BW,
  "Color": IMAGES_COLOR,
  "Collaboration": IMAGES_COLLAB,
  "Studio": IMAGES_EST,
};

const MobileGallery: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentImages = CATEGORY_MAP[selectedCategory] || [];

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
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
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // 왼쪽으로 스와이프 - 다음 이미지
      const currentIndex = currentImages.indexOf(selectedImage!);
      const nextIndex = (currentIndex + 1) % currentImages.length;
      setSelectedImage(currentImages[nextIndex]);
    } else if (isRightSwipe) {
      // 오른쪽으로 스와이프 - 이전 이미지
      const currentIndex = currentImages.indexOf(selectedImage!);
      const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      setSelectedImage(currentImages[prevIndex]);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // 모달 클릭 핸들러
  const handleModalClick = () => {
    closeModal();
  };

  return (
    <>
      <Head>
        <title>Gallery | Emotional Studio</title>
        <meta name="description" content="Explore our photography gallery" />
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
            Gallery
          </h1>
        </header>

        {/* 카테고리 필터 */}
        <div className="px-4 py-6">
          <div className="flex flex-col gap-3">
            {/* 첫 번째 줄: All만 중앙에 */}
            <div className="flex justify-center">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full font-bold transition-all duration-200 border-2 whitespace-nowrap ${
                  selectedCategory === 'All'
                    ? 'border-[#FF6100] text-[#FF6100]'
                    : 'border-white/20 text-white hover:border-white/40'
                }`}
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'CS-Valcon-Drawn-akhr7k',
                }}
              >
                All
              </button>
            </div>
            
            {/* 두 번째 줄: 나머지 4개 버튼 */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 justify-center">
              {CATEGORY_LIST.slice(1).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-bold transition-all duration-200 border-2 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'border-[#FF6100] text-[#FF6100]'
                      : 'border-white/20 text-white hover:border-white/40'
                  }`}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'CS-Valcon-Drawn-akhr7k',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 이미지 그리드 */}
        <div className="px-4 pb-20">
          <div className="grid grid-cols-2 gap-3">
            {currentImages.map((imageSrc, index) => (
              <motion.div
                key={`${imageSrc}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal(imageSrc);
                }}
                style={{ pointerEvents: 'auto' }}
              >
                <Image
                  src={imageSrc}
                  alt={`Gallery image ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  priority={index < 4}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 이미지 모달 */}
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={closeModal}>
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" onClick={closeModal} />
            <Dialog.Panel 
              as="div" 
              className="relative flex flex-col items-center justify-center w-full h-full mx-4 p-4 z-[9999]" 
              onClick={handleModalClick}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {selectedImage && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedImage}
                    alt="Gallery modal"
                    width={800}
                    height={800}
                    className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl object-contain"
                  />
                </div>
              )}
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      </div>
      <MobileContactButton />
    </>
  );
};

export default MobileGallery; 