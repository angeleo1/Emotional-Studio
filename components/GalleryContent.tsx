import { useState } from 'react';

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');

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

      {/* 이미지 갤러리 영역 - 나중에 이미지 추가 예정 */}
      <div className="px-8 pb-20">
        <div className="text-center py-20">
          <h2 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
          >
            Coming Soon
          </h2>
          <p className="text-xl text-gray-300">
            Gallery images will be added soon
          </p>
        </div>
      </div>
    </div>
  );
} 