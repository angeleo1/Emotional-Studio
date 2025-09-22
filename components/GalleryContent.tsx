import { useState, useMemo } from 'react';
import Image from 'next/image';
import { sortGalleryImagesByCreationTime, sortAllImagesByCreationTime } from '../utils/gallerySorting';

// 갤러리 이미지 데이터 (최적화된 WebP 버전 사용 - 모든 이미지 포함)
const galleryImages = {
  'B&W': [
    '/images/Gallery/BW/optimized/020.webp',
    '/images/Gallery/BW/optimized/021.webp',
    '/images/Gallery/BW/optimized/022.webp',
    '/images/Gallery/BW/optimized/0921 (2).webp',
    '/images/Gallery/BW/optimized/0921 (3).webp',
    '/images/Gallery/BW/optimized/0921 (4).webp',
    '/images/Gallery/BW/optimized/0921 (5).webp',
    '/images/Gallery/BW/optimized/BW (1).webp',
    '/images/Gallery/BW/optimized/BW (2).webp',
    '/images/Gallery/BW/optimized/BW (3).webp',
    '/images/Gallery/BW/optimized/BW (4).webp',
    '/images/Gallery/BW/optimized/BW (5).webp',
    '/images/Gallery/BW/optimized/BW (6).webp',
    '/images/Gallery/BW/optimized/BW (7).webp',
    '/images/Gallery/BW/optimized/BW.webp',
  ],
  'Cool tone': [
    '/images/Gallery/COOL/optimized/017.webp',
    '/images/Gallery/COOL/optimized/018.webp',
    '/images/Gallery/COOL/optimized/019.webp',
    '/images/Gallery/COOL/optimized/019(1).webp',
    '/images/Gallery/COOL/optimized/0921 (1).webp',
    '/images/Gallery/COOL/optimized/0921 (6).webp',
    '/images/Gallery/COOL/optimized/COOL (2).webp',
    '/images/Gallery/COOL/optimized/COOL (3).webp',
    '/images/Gallery/COOL/optimized/COOL (4).webp',
    '/images/Gallery/COOL/optimized/COOL (5).webp',
    '/images/Gallery/COOL/optimized/COOL.webp',
  ],
  'Warm tone': [
    '/images/Gallery/WARM/optimized/WARM.webp',
    '/images/Gallery/WARM/optimized/WARM (2).webp',
  ],
  'Studio': [
    '/images/Gallery/STUDIO/optimized/Studio (1).webp',
    '/images/Gallery/STUDIO/optimized/Studio (2).webp',
    '/images/Gallery/STUDIO/optimized/Studio (3).webp',
    '/images/Gallery/STUDIO/optimized/Studio (4).webp',
    '/images/Gallery/STUDIO/optimized/Studio (5).webp',
    '/images/Gallery/STUDIO/optimized/Studio (6).webp',
    '/images/Gallery/STUDIO/optimized/Studio (7).webp',
    '/images/Gallery/STUDIO/optimized/Studio (8).webp',
    '/images/Gallery/STUDIO/optimized/Studio (9).webp',
    '/images/Gallery/STUDIO/optimized/Studio (10).webp',
    '/images/Gallery/STUDIO/optimized/Studio (11).webp',
    '/images/Gallery/STUDIO/optimized/Studio (12).webp',
    '/images/Gallery/STUDIO/optimized/Studio (13).webp',
    '/images/Gallery/STUDIO/optimized/Studio (14).webp',
    '/images/Gallery/STUDIO/optimized/Studio (15).webp',
    '/images/Gallery/STUDIO/optimized/Studio (16).webp',
  ],
};

// All 탭용 최신순 정렬된 이미지 배열 (최적화된 WebP 버전 사용 - 모든 이미지 포함)
const allImagesLatestFirst = [
  // 최신 추가된 이미지들 (0921 시리즈)
  '/images/Gallery/BW/optimized/0921 (2).webp',
  '/images/Gallery/BW/optimized/0921 (3).webp',
  '/images/Gallery/BW/optimized/0921 (4).webp',
  '/images/Gallery/BW/optimized/0921 (5).webp',
  '/images/Gallery/COOL/optimized/0921 (1).webp',
  '/images/Gallery/COOL/optimized/0921 (6).webp',
  // Cool tone - 019 시리즈
  '/images/Gallery/COOL/optimized/019(1).webp',
  '/images/Gallery/COOL/optimized/019.webp',
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
  '/images/Gallery/STUDIO/optimized/Studio (1).webp',
  '/images/Gallery/STUDIO/optimized/Studio (2).webp',
  '/images/Gallery/STUDIO/optimized/Studio (3).webp',
  '/images/Gallery/STUDIO/optimized/Studio (4).webp',
  '/images/Gallery/STUDIO/optimized/Studio (5).webp',
  '/images/Gallery/STUDIO/optimized/Studio (6).webp',
  '/images/Gallery/STUDIO/optimized/Studio (7).webp',
  '/images/Gallery/STUDIO/optimized/Studio (8).webp',
  '/images/Gallery/STUDIO/optimized/Studio (9).webp',
  '/images/Gallery/STUDIO/optimized/Studio (10).webp',
  '/images/Gallery/STUDIO/optimized/Studio (11).webp',
  '/images/Gallery/STUDIO/optimized/Studio (12).webp',
  '/images/Gallery/STUDIO/optimized/Studio (13).webp',
  '/images/Gallery/STUDIO/optimized/Studio (14).webp',
  '/images/Gallery/STUDIO/optimized/Studio (15).webp',
  '/images/Gallery/STUDIO/optimized/Studio (16).webp',
];

export default function GalleryContent() {
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
    <div className="min-h-screen bg-[#111] text-white">
      {/* 헤더 */}
      <header className="py-16 px-8 text-center">
        <h1 
          className="text-6xl md:text-8xl font-bold mb-8"
          style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
        >
          Gallery
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover our collection of professional photography work
        </p>
      </header>

      {/* 카테고리 필터 */}
      <div className="px-8 pb-12">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {['All', 'B&W', 'Cool tone', 'Warm tone', 'Studio'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
                selectedCategory === category
                  ? 'border-[#FF6100] text-[#FF6100] bg-[#FF6100]/10'
                  : 'border-white/20 text-white hover:border-white/40 hover:bg-white/5'
              }`}
              style={{
                fontFamily: 'CS-Valcon-Drawn-akhr7k',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 이미지 갤러리 */}
      <div className="px-8 pb-20">
        {currentImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
            >
              No images found
            </h2>
            <p className="text-xl text-gray-300">
              No images available for this category
            </p>
          </div>
        )}
      </div>

    </div>
  );
} 