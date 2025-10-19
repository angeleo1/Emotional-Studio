import React from 'react';
import Image from 'next/image';

const AddOnsContent: React.FC = () => {
  const addOns = [
    {
      name: '4x6" Print',
      price: '$5',
      description: 'Additional high-quality 4x6" prints',
      image: '/images/BW.jpg',
      useIcon: false
    },
    {
      name: '4x6" Frame',
      price: '$10',
      description: 'Elegant frame for 4x6" prints',
      image: '/images/frame.png%20(2).png',
      useIcon: false
    },
    {
      name: '8x10" Print',
      price: '$10',
      description: 'Large format 8x10" premium print',
      image: '/images/810.jpg',
      useIcon: false
    },
    {
      name: '8x10" Frame',
      price: '$15',
      description: 'Premium frame for 8x10" prints',
      image: '/images/Black%20frame.png',
      useIcon: false
    },
    {
      name: 'Photo Book A',
      price: '$40',
      description: 'Premium photo book with your selected images',
      image: '/images/A.jpg',
      useIcon: false
    },
    {
      name: 'Photo Book B',
      price: '$100',
      description: 'Deluxe photo book with slip case',
      image: '/images/B.jpg',
      useIcon: false
    },
    {
      name: 'Photo Calendar',
      price: '$25',
      description: 'Custom calendar with your photos',
      image: '/images/calendar.jpg',
      useIcon: false
    },
    {
      name: 'Key Ring',
      price: '$10',
      description: 'Custom key ring with your photo',
      image: '/images/ring.jpg',
      useIcon: false
    },
    {
      name: 'Magnet',
      price: '$15',
      description: 'Refrigerator magnet with your image',
      image: '/images/magnet.jpg',
      useIcon: false
    },
    {
      name: 'Photo Mug',
      price: '$20',
      description: 'Heat activated personalized mug',
      image: '/images/mug.jpg',
      useIcon: false
    },
    {
      name: 'Photo Globe',
      price: '$25',
      description: 'Decorative globe with your photo',
      image: '/images/globe.jpg',
      useIcon: false
    },
    {
      name: 'Additional\nRetouched Photo',
      price: '$10',
      description: 'Extra retouched photo',
      image: '/images/menu11.png',
      useIcon: false
    },
    {
      name: 'Digital Original Film',
      price: '$20',
      description: 'High resolution digital files',
      icon: '🎞️',
      useIcon: true
    }
  ];

  return (
    <div
      className="min-h-screen"
      style={{ 
        background: '#0a0a0a'
      }}
    >
      {/* 헤더 */}
      <div className="sticky top-0 z-10 backdrop-blur-xl border-b border-white/5" style={{ background: 'rgba(10, 10, 10, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-3xl font-bold text-center text-white" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
            ADD-ONS
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-8">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {addOns.map((addon, index) => (
            <div
              key={index}
              className={`group cursor-pointer ${addon.useIcon ? 'col-span-3 md:col-span-4 lg:col-span-6' : ''}`}
            >
              <div className={`bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 ${addon.useIcon ? 'border border-orange-500 hover:border-orange-400' : 'border border-white/10 hover:border-white/30'}`}>
                {/* 세로형 이미지 또는 아이콘 */}
                {addon.useIcon ? (
                  <div className="p-6">
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {addon.icon}
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-bold mb-2 text-white leading-tight">{addon.name}</h3>
                        <p className="text-sm text-white/50 leading-tight">{addon.description}</p>
                      </div>
                      <div className="text-2xl font-bold text-white">{addon.price}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* 세로형 이미지 */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {addon.image && (
                        <Image 
                          src={addon.image} 
                          alt={addon.name}
                          fill
                          sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    
                    {/* 정보 */}
                    <div className="p-4 flex flex-col justify-between min-h-[120px]">
                      <div className="text-center">
                        <h3 className="text-sm font-bold mb-2 text-white leading-tight whitespace-pre-line">{addon.name}</h3>
                        <div className="text-xl font-bold text-white mb-2">{addon.price}</div>
                        <p className="text-xs text-white/50 leading-tight">{addon.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddOnsContent;
