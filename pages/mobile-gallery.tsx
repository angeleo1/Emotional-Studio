import React, { useState, useMemo } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';
import { sortGalleryImagesByCreationTime, sortAllImagesByCreationTime } from '../utils/gallerySorting';

// 카테고리 리스트
const CATEGORY_LIST = [
  "All",
  "B&W",
  "Cool tone",
  "Warm tone",
  "Studio",
  "Customer Album",
];

// 갤러리 이미지 데이터 (실제 폴더의 사진들만 사용)
const galleryImages = {
  'B&W': [
    '/images/Gallery/BW/optimized/020.webp',
    '/images/Gallery/BW/optimized/021.webp',
    '/images/Gallery/BW/optimized/022.webp',
    '/images/Gallery/BW/optimized/0921%20(2).webp',
    '/images/Gallery/BW/optimized/0921%20(3).webp',
    '/images/Gallery/BW/optimized/0921%20(4).webp',
    '/images/Gallery/BW/optimized/0921%20(5).webp',
    '/images/Gallery/BW/optimized/BW%20(1).webp',
    '/images/Gallery/BW/optimized/BW%20(2).webp',
    '/images/Gallery/BW/optimized/BW%20(3).webp',
    '/images/Gallery/BW/optimized/BW%20(4).webp',
    '/images/Gallery/BW/optimized/BW%20(5).webp',
    '/images/Gallery/BW/optimized/BW%20(6).webp',
    '/images/Gallery/BW/optimized/BW%20(7).webp',
    '/images/Gallery/BW/optimized/BW.webp',
  ],
  'Cool tone': [
    '/images/Gallery/COOL/optimized/GAGA-(1%20of%202).webp',
    '/images/Gallery/COOL/optimized/GAGA-(2%20of%202).webp',
    '/images/Gallery/COOL/optimized/017.webp',
    '/images/Gallery/COOL/optimized/018.webp',
    '/images/Gallery/COOL/optimized/019(1).webp',
    '/images/Gallery/COOL/optimized/0921%20(1).webp',
    '/images/Gallery/COOL/optimized/0921%20(6).webp',
    '/images/Gallery/COOL/optimized/COOL%20(2).webp',
    '/images/Gallery/COOL/optimized/COOL%20(3).webp',
    '/images/Gallery/COOL/optimized/COOL%20(4).webp',
    '/images/Gallery/COOL/optimized/COOL%20(5).webp',
    '/images/Gallery/COOL/optimized/COOL.webp',
  ],
  'Warm tone': [
    '/images/Gallery/WARM/optimized/WARM.webp',
    '/images/Gallery/WARM/optimized/WARM%20(2).webp',
  ],
  'Studio': [
    '/images/Gallery/STUDIO/optimized/Studio%20(11).webp',
    '/images/Gallery/STUDIO/optimized/Studio%20(12).webp',
    '/images/Gallery/STUDIO/optimized/Studio%20(13).webp',
    '/images/Gallery/STUDIO/optimized/Studio%20(14).webp',
    '/images/Gallery/STUDIO/optimized/Studio%20(4).webp',
    '/images/Gallery/STUDIO/optimized/Studio%20(5).webp',
    '/images/Gallery/STUDIO/optimized/Studio%20(9).webp',
  ],
  'Customer Album': [
    '/images/Gallery/Customer%20Album/optimized/Studio%20(1).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(2).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(3).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(6).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(7).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(8).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(10).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(15).webp',
    '/images/Gallery/Customer%20Album/optimized/Studio%20(16).webp',
  ],
};

// All 탭용 최신순 정렬된 이미지 배열 (실제 폴더의 사진들만 사용)
const allImagesLatestFirst = [
  // 최신 추가된 GAGA 이미지들
  '/images/Gallery/COOL/optimized/GAGA-(1 of 2).webp',
  '/images/Gallery/COOL/optimized/GAGA-(2 of 2).webp',
  // 최신 추가된 이미지들 (0921 시리즈)
  '/images/Gallery/BW/optimized/0921 (2).webp',
  '/images/Gallery/BW/optimized/0921 (3).webp',
  '/images/Gallery/BW/optimized/0921 (4).webp',
  '/images/Gallery/BW/optimized/0921 (5).webp',
  '/images/Gallery/COOL/optimized/0921 (1).webp',
  '/images/Gallery/COOL/optimized/0921 (6).webp',
  // Cool tone - 019 시리즈
  '/images/Gallery/COOL/optimized/019(1).webp',
  // Cool tone - 017~018
  '/images/Gallery/COOL/optimized/017.webp',
  '/images/Gallery/COOL/optimized/018.webp',
  // BW - 020~022
  '/images/Gallery/BW/optimized/020.webp',
  '/images/Gallery/BW/optimized/021.webp',
  '/images/Gallery/BW/optimized/022.webp',
  // Cool tone - COOL 시리즈
  '/images/Gallery/COOL/optimized/COOL (2).webp',
  '/images/Gallery/COOL/optimized/COOL (3).webp',
  '/images/Gallery/COOL/optimized/COOL (4).webp',
  '/images/Gallery/COOL/optimized/COOL (5).webp',
  '/images/Gallery/COOL/optimized/COOL.webp',
  // BW - BW 시리즈
  '/images/Gallery/BW/optimized/BW (1).webp',
  '/images/Gallery/BW/optimized/BW (2).webp',
  '/images/Gallery/BW/optimized/BW (3).webp',
  '/images/Gallery/BW/optimized/BW (4).webp',
  '/images/Gallery/BW/optimized/BW (5).webp',
  '/images/Gallery/BW/optimized/BW (6).webp',
  '/images/Gallery/BW/optimized/BW (7).webp',
  '/images/Gallery/BW/optimized/BW.webp',
  // Warm tone 이미지들
  '/images/Gallery/WARM/optimized/WARM.webp',
  '/images/Gallery/WARM/optimized/WARM (2).webp',
  // Studio 이미지들
  '/images/Gallery/STUDIO/optimized/Studio (11).webp',
  '/images/Gallery/STUDIO/optimized/Studio (12).webp',
  '/images/Gallery/STUDIO/optimized/Studio (13).webp',
  '/images/Gallery/STUDIO/optimized/Studio (14).webp',
  '/images/Gallery/STUDIO/optimized/Studio (4).webp',
  '/images/Gallery/STUDIO/optimized/Studio (5).webp',
  '/images/Gallery/STUDIO/optimized/Studio (9).webp',
  // Customer Album 이미지들
  '/images/Gallery/Customer Album/optimized/Studio (1).webp',
  '/images/Gallery/Customer Album/optimized/Studio (2).webp',
  '/images/Gallery/Customer Album/optimized/Studio (3).webp',
  '/images/Gallery/Customer Album/optimized/Studio (6).webp',
  '/images/Gallery/Customer Album/optimized/Studio (7).webp',
  '/images/Gallery/Customer Album/optimized/Studio (8).webp',
  '/images/Gallery/Customer Album/optimized/Studio (10).webp',
  '/images/Gallery/Customer Album/optimized/Studio (15).webp',
  '/images/Gallery/Customer Album/optimized/Studio (16).webp',
];

const MobileGallery: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 정렬된 갤러리 이미지 (생성 시간 순)
  const sortedGalleryImages = useMemo(() => {
    return sortGalleryImagesByCreationTime(galleryImages);
  }, []);

  // 정렬된 All 탭 이미지 (생성 시간 순)
  const sortedAllImages = useMemo(() => {
    return sortAllImagesByCreationTime(allImagesLatestFirst);
  }, []);

  // 현재 선택된 카테고리에 따른 이미지 목록
  const getCurrentImages = () => {
    if (selectedCategory === 'All') {
      return sortedAllImages;
    }
    return sortedGalleryImages[selectedCategory as keyof typeof sortedGalleryImages] || [];
  };

  const currentImages = getCurrentImages();

  return (
    <>
      <Head>
        <title>Gallery | Emotional Studio</title>
        <meta name="description" content="Explore our photography gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileNavbar />
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-4 flex justify-center items-center border-b border-white/10">
          <h1 
            className="text-2xl font-medium mobile-text-responsive"
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
                    style={{ aspectRatio: '2/3' }}
                  >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight px-4 mobile-text-responsive" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
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