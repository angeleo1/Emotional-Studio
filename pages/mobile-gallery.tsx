import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';

// 카테고리 리스트
const CATEGORY_LIST = [
  "All",
  "Black & White",
  "Color",
  "Collaboration",
  "Studio",
];

// 갤러리 이미지 데이터 - 모든 이미지 제거
const GALLERY_IMAGES = {
  'Black & White': [],
  'Color': [],
  'Collaboration': [],
  'Studio': [],
};

// 카테고리별 이미지 분배 - 빈 배열
const IMAGES_BW: string[] = [];
const IMAGES_COLOR: string[] = [];
const IMAGES_COLLAB: string[] = [];
const IMAGES_EST: string[] = [];
const IMAGES_ALL: string[] = [];

const CATEGORY_MAP: Record<string, string[]> = {
  All: IMAGES_ALL,
  "Black & White": IMAGES_BW,
  "Color": IMAGES_COLOR,
  "Collaboration": IMAGES_COLLAB,
  "Studio": IMAGES_EST,
};

const MobileGallery: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const currentImages = CATEGORY_MAP[selectedCategory] || [];

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

        {/* Coming Soon 메시지 */}
        <div className="px-4 pb-20">
          {currentImages.length === 0 && (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight px-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                  The adventure begins soon.
                </h2>
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