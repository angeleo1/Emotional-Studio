import { useState } from 'react';
import Image from 'next/image';

// 갤러리 이미지 데이터
const galleryImages = {
  'B&W': [
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
    '/images/Galllery/STUDIO/studiosample.png',
  ],
};

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 현재 선택된 카테고리에 따른 이미지 목록
  const getCurrentImages = () => {
    if (selectedCategory === 'All') {
      return Object.values(galleryImages).flat();
    }
    return galleryImages[selectedCategory as keyof typeof galleryImages] || [];
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
                style={{ aspectRatio: 'auto' }}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={300}
                  height={400}
                  className="w-full h-auto object-contain"
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