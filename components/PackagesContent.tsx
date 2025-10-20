import React from 'react';

const PackagesContent: React.FC = () => {
  const packages = [
    {
      name: 'PET',
      sets: [
        {
          set: 'A',
          price: '$109',
          originalPrice: '$125',
          features: [
            'TWO 4X6" PRINTS',
            'PHOTO BOOK A',
            'MAGNET',
            'TIME-LAPSE VIDEO',
            '4X6" FRAME'
          ],
          image: '/images/p1 (1).jpg',
          addOn: 'ADD PERSON : $30'
        },
        {
          set: 'B',
          price: '$109',
          originalPrice: '$120',
          features: [
            'TWO 4X6" PRINTS',
            'PHOTO MUG',
            'PHOTO GLOBE',
            'TIME-LAPSE VIDEO',
            'KEY RING'
          ],
          image: '/images/p1 (2).jpg',
          addOn: 'ADD PERSON : $30'
        }
      ],
      description: 'Create unforgettable memories with your pet'
    },
    {
      name: 'BODY PROFILE',
      sets: [
        {
          set: 'A',
          price: '$99',
          originalPrice: '$110',
          features: [
            'TWO 4X6" PRINTS',
            '8X10" PRINT',
            'DIGITAL ORIGINAL FILM',
            'TIME-LAPSE VIDEO',
            '8X10" FRAME'
          ],
          image: '/images/Packages/Body Profile/3.png'
        }
      ],
      description: 'Showcase your physique',
      addOn: 'ADD PERSON : $30'
    },
    {
      name: 'MATERNITY',
      sets: [
        {
          set: 'A',
          price: '$109',
          originalPrice: '$120',
          features: [
            'TWO 4X6" PRINTS',
            'PHOTO CALENDAR',
            'PHOTO MUG',
            'TIME-LAPSE VIDEO',
            '4X6" FRAME'
          ],
          image: '/images/Packages/Maternity/1760766079275-0199f5d5-d729-7804-9f01-254b3196e44f.png',
          addOn: 'ADD PERSON : $30'
        },
        {
          set: 'B',
          price: '$499',
          originalPrice: '$499',
          features: [
            '6 SESSIONS PROVIDED',
            'ADD ONE EXTRA PERSON, FREE OF CHARGE',
            'TWO 4X6" PRINTS',
            'PHOTO CALENDAR',
            'PHOTO BOOK B',
            'TIME-LAPSE VIDEO',
            '4X6" FRAME',
            'MINI PHOTO CARDS'
          ],
          image: '/images/Packages/Maternity/b.png'
        }
      ],
      description: 'Record a journey with your baby'
    },
    {
      name: 'COUPLE',
      sets: [
        {
          set: 'A',
          price: '$159',
          originalPrice: '$200',
          features: [
            'TWO 4X6" PRINTS',
            'TWO 4X6" FRAMES',
            'ELIXIR EXPERIENCE',
            'TIME-LAPSE VIDEO',
            'TWO KEY RINGS',
            'DIGITAL ORIGINAL FILM'
          ],
          image: '/images/Packages/Couple/unnamed.jpg'
        }
      ],
      description: 'Perfect for couples',
      addOn: '*FOR 2 PEOPLE ONLY'
    },
    {
      name: 'FAMILY',
      sets: [
        {
          set: 'A',
          price: '$279',
          originalPrice: '$335',
          features: [
            '4X6" PRINT PER PERSON',
            '8X10" PRINT',
            'PHOTO CALENDAR',
            'PHOTO BOOK B',
            'TIME-LAPSE VIDEO',
            '8X10" FRAME',
            'MAGNET',
            'DIGITAL ORIGINAL FILM'
          ],
          image: '/images/Packages/Family/1.jpg'
        }
      ],
      description: 'Capture precious family moments',
      addOn: (
        <>
          *MINIMUM 3 PEOPLE
          <br />
          <br />
          ADD PERSON : $30
          <br />
          ADD 30MINS&nbsp;&nbsp;: $50
        </>
      )
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
            PACKAGES
          </h1>
        </div>
      </div>

      <div className="w-full px-6 pt-8 pb-8">
        {/* 세로형 그리드 - 전체 너비 활용 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {packages.map((pkg, pkgIndex) => (
            <div
              key={pkgIndex}
              className="group"
            >
              {/* 패키지 컨테이너 */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300">
                {/* 패키지 제목 */}
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white text-center" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-white/60 text-center mt-1">{pkg.description}</p>
                </div>

                {/* 세트들 - 세로로 나열 */}
                <div className="space-y-4 p-4">
                  {pkg.sets.map((set, setIndex) => (
                    <div key={setIndex} className="space-y-3">
                      {/* 세로형 이미지 */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                        <img 
                          src={set.image} 
                          alt={`${pkg.name} ${set.set}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* 세트 표시 및 가격 */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="flex items-center justify-between">
                            {/* A, B 표시는 여러 세트가 있을 때만 */}
                            {pkg.sets.length > 1 && (
                              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                                {set.set}
                              </span>
                            )}
                            <div className={`text-right ${pkg.sets.length === 1 ? 'ml-auto' : ''}`}>
                              {set.originalPrice !== set.price && (
                                <span className="text-sm text-white/50 line-through block">{set.originalPrice}</span>
                              )}
                              <span className="text-xl font-bold text-white">{set.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 세트 정보 */}
                      <div>
                      {/* 특별 노트 */}
                      {set.specialNote && (
                        <div className="text-white mb-3 leading-relaxed bg-white/5 rounded-lg p-2 font-medium">
                          {set.specialNote}
                        </div>
                      )}

                        {/* 포함 사항 */}
                        <div className="space-y-2 mb-3">
                          {set.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0 mt-1.5"></div>
                              <span className="text-xs text-white/70 leading-tight">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 세트별 추가 옵션 */}
                      {set.addOn && (
                        <div className="text-center pt-3 border-t border-white/10 mt-3">
                          <div className="text-sm text-white leading-tight font-medium">
                            {set.addOn}
                          </div>
                        </div>
                      )}

                      {/* 세트 구분선 (마지막 세트가 아닐 때만) */}
                      {setIndex < pkg.sets.length - 1 && (
                        <div className="border-t border-white/10 pt-4"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 패키지 전체 추가 옵션 */}
                {pkg.addOn && (
                  <div className="p-4 pt-0">
                    <div className="text-center pt-3 border-t border-white/10">
                      <div className="text-sm text-white leading-tight font-medium">
                        {pkg.addOn}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesContent;
