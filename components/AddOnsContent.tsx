import React from 'react';

const AddOnsContent: React.FC = () => {
  const addOns = [
    {
      name: 'EXTRA PRINTS',
      items: [
        {
          name: '4X6" PRINT',
          price: '$5',
          image: '/images/addons/print-4x6.jpg'
        },
        {
          name: '8X10" PRINT',
          price: '$15',
          image: '/images/addons/print-8x10.jpg'
        }
      ]
    },
    {
      name: 'FRAMES',
      items: [
        {
          name: '4X6" FRAME',
          price: '$10',
          image: '/images/addons/frame-4x6.jpg'
        },
        {
          name: '8X10" FRAME',
          price: '$25',
          image: '/images/addons/frame-8x10.jpg'
        }
      ]
    },
    {
      name: 'PHOTO PRODUCTS',
      items: [
        {
          name: 'PHOTO BOOK A',
          price: '$30',
          image: '/images/addons/photobook-a.jpg'
        },
        {
          name: 'PHOTO BOOK B',
          price: '$45',
          image: '/images/addons/photobook-b.jpg'
        },
        {
          name: 'PHOTO MUG',
          price: '$20',
          image: '/images/addons/mug.jpg'
        },
        {
          name: 'PHOTO CALENDAR',
          price: '$25',
          image: '/images/addons/calendar.jpg'
        }
      ]
    },
    {
      name: 'ACCESSORIES',
      items: [
        {
          name: 'KEY RING',
          price: '$8',
          image: '/images/addons/keyring.jpg'
        },
        {
          name: 'MAGNET',
          price: '$5',
          image: '/images/addons/magnet.jpg'
        },
        {
          name: 'PHOTO GLOBE',
          price: '$15',
          image: '/images/addons/globe.jpg'
        }
      ]
    },
    {
      name: 'DIGITAL',
      items: [
        {
          name: 'DIGITAL ORIGINAL FILM',
          price: '$30',
          image: '/images/addons/digital.jpg'
        },
        {
          name: 'EXTRA TIME-LAPSE VIDEO',
          price: '$20',
          image: '/images/addons/timelapse.jpg'
        }
      ]
    },
    {
      name: 'SESSION EXTRAS',
      items: [
        {
          name: 'ADD 30 MINUTES',
          price: '$50',
          image: '/images/addons/extra-time.jpg'
        },
        {
          name: 'ADD PERSON',
          price: '$30',
          image: '/images/addons/extra-person.jpg'
        },
        {
          name: 'ELIXIR EXPERIENCE',
          price: '$25',
          image: '/images/addons/elixir.jpg'
        }
      ]
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

      <div className="w-full px-6 pt-8 pb-8">
        {/* 세로형 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {addOns.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="group"
            >
              {/* 카테고리 컨테이너 */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300">
                {/* 카테고리 제목 */}
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white text-center" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                    {category.name}
                  </h3>
                </div>

                {/* 아이템들 - 세로로 나열 */}
                <div className="space-y-4 p-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      {/* 세로형 이미지 */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="text-white/40 mb-2">
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                              </svg>
                            </div>
                            <div className="text-sm text-white/70 font-medium">{item.name}</div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* 가격 */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-center">
                            <span className="text-xl font-bold text-white">{item.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* 아이템 이름 */}
                      <div className="text-center">
                        <span className="text-xs text-white/90 font-medium leading-tight">{item.name}</span>
                      </div>

                      {/* 아이템 구분선 (마지막 아이템이 아닐 때만) */}
                      {itemIndex < category.items.length - 1 && (
                        <div className="border-t border-white/10 pt-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddOnsContent;

