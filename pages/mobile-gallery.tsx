import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';

// 카테고리 리스트
const CATEGORY_LIST = [
  "All",
  "B&W",
  "Cool tone",
  "Warm tone",
  "Studio",
];

// 갤러리 이미지 데이터
const galleryImages = {
  'B&W': [
    '/images/Galllery/BW/020.png',
    '/images/Galllery/BW/021.png',
    '/images/Galllery/BW/022.png',
    '/images/Galllery/BW/BW (1).png',
    '/images/Galllery/BW/BW (2).png',
    '/images/Galllery/BW/BW (3).png',
    '/images/Galllery/BW/BW (4).png',
    '/images/Galllery/BW/BW (5).png',
    '/images/Galllery/BW/BW (6).png',
    '/images/Galllery/BW/BW (7).png',
    '/images/Galllery/BW/BW.jpg',
    '/images/Galllery/BW/BW.png',
  ],
  'Cool tone': [
    '/images/Galllery/COOL/019(1).png',
    '/images/Galllery/COOL/019.png',
    '/images/Galllery/COOL/017.png',
    '/images/Galllery/COOL/018.png',
    '/images/Galllery/COOL/COOL (2).png',
    '/images/Galllery/COOL/COOL (3).png',
    '/images/Galllery/COOL/COOL (4).png',
    '/images/Galllery/COOL/COOL (5).png',
    '/images/Galllery/COOL/COOL.png',
  ],
  'Warm tone': [
    '/images/Galllery/WARM/WARM (2).png',
    '/images/Galllery/WARM/WARM.png',
  ],
  'Studio': [
    '/images/Galllery/STUDIO/STUDIO (2).jpg',
    '/images/Galllery/STUDIO/STUDIO.jpg',
  ],
};

// All 탭용 최신순 정렬된 이미지 배열
const allImagesLatestFirst = [
  // 최신 추가된 이미지들 (Cool tone - 019(1), 019)
  '/images/Galllery/COOL/019(1).png',
  '/images/Galllery/COOL/019.png',
  // Cool tone - 017~018
  '/images/Galllery/COOL/017.png',
  '/images/Galllery/COOL/018.png',
  // BW - 020~022
  '/images/Galllery/BW/020.png',
  '/images/Galllery/BW/021.png',
  '/images/Galllery/BW/022.png',
  // 기존 Cool tone 이미지들
  '/images/Galllery/COOL/COOL (2).png',
  '/images/Galllery/COOL/COOL (3).png',
  '/images/Galllery/COOL/COOL (4).png',
  '/images/Galllery/COOL/COOL (5).png',
  '/images/Galllery/COOL/COOL.png',
  // 기존 BW 이미지들
  '/images/Galllery/BW/BW (1).png',
  '/images/Galllery/BW/BW (2).png',
  '/images/Galllery/BW/BW (3).png',
  '/images/Galllery/BW/BW (4).png',
  '/images/Galllery/BW/BW (5).png',
  '/images/Galllery/BW/BW (6).png',
  '/images/Galllery/BW/BW (7).png',
  '/images/Galllery/BW/BW.jpg',
  '/images/Galllery/BW/BW.png',
  // Warm tone 이미지들
  '/images/Galllery/WARM/WARM (2).png',
  '/images/Galllery/WARM/WARM.png',
  // Studio 이미지들
  '/images/Galllery/STUDIO/STUDIO (2).jpg',
  '/images/Galllery/STUDIO/STUDIO.jpg',
];

const MobileGallery: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 현재 선택된 카테고리에 따른 이미지 목록
  const getCurrentImages = () => {
    if (selectedCategory === 'All') {
      return allImagesLatestFirst;
    }
    return galleryImages[selectedCategory as keyof typeof galleryImages] || [];
  };

  const currentImages = getCurrentImages();

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

        {/* 이미지 갤러리 */}
        <div className="px-4 pb-20">
          {currentImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {currentImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg group hover:scale-105 transition-transform duration-300"
                    style={{ aspectRatio: 'auto' }}
                  >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={200}
                    height={300}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight px-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                  No images found
                </h2>
                <p className="text-lg text-gray-300 mt-4">
                  No images available for this category
                </p>
              </div>
            </div>
          )}
        </div>


      </div>
      <MobileContactButton />
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
    </>
  );
};

export default MobileGallery; 