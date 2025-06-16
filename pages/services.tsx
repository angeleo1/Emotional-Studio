import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const pages = [
  // 1. Provided as Standard
  {
    images: ['/images/Service1.png'],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div>
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span>🍸</span>
            <span>Welcome Drink</span>
          </div>
          <p className="text-lg mt-1 mb-4">Choose according to your feelings. A sweet break for those tired of everyday life, spend a special time with Emotion Elixirs</p>
        </div>
        <div>
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span>📸</span>
            <span>Photo Shoot</span>
          </div>
          <p className="text-lg mt-1 mb-4">Create your own photo story in 20 minutes! Make special memories with a variety of props</p>
        </div>
        <div>
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span>🖼️</span>
            <span>Select Photos</span>
          </div>
          <p className="text-lg mt-1 mb-4">Select 2 Photos for 20mins. More than just photos. We add value with professional retouching and printing</p>
        </div>
        <div>
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span>🎬</span>
            <span>Time-lapse Video</span>
          </div>
          <p className="text-lg mt-1 mb-4">Unforgettable behind-the-scenes cuts from the set, take them home as precious souvenirs</p>
        </div>
      </div>
    ),
    title: 'Provided as Standard',
  },
  // 2. Shooting Type
  {
    images: ['/images/Service2-1.png', '/images/Service2-2.jpg'],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2"><span>👤</span><span>Solo</span></div>
          <span className="text-3xl font-bold text-right ml-4">$55</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2"><span>👥</span><span>Couple</span></div>
          <span className="text-3xl font-bold text-right ml-4">$98</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2">
            <span className="relative w-14 h-10 inline-block align-middle ml-[-20px]">
              <span className="absolute left-0 top-0 text-3xl" style={{zIndex:3}}>👤</span>
              <span className="absolute left-4 top-0 text-3xl" style={{zIndex:2, filter:'brightness(0.7)'}}>👤</span>
              <span className="absolute left-8 top-0 text-3xl" style={{zIndex:1}}>👤</span>
            </span>
            <span>3-4 People</span>
          </div>
          <span className="text-3xl font-bold text-right ml-4">$150</span>
        </div>
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2"><span>◑</span><span>Black & White</span></div>
          <span className="text-3xl font-bold text-right ml-4">Standard</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 text-3xl font-bold mb-2"><span>🎨</span><span>Colour</span></div>
          <span className="text-3xl font-bold text-right ml-4">+$10</span>
        </div>
      </div>
    ),
    title: 'Shooting Type',
  },
  // 3. Other Goods
  {
    images: ['/images/Service3-1.png', '/images/Service3-2.png', '/images/Service3-3.png'],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-3xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M6 7V3h12v4"/><path d="M6 17h12v4H6z"/></svg>
              </span>
              <span>A4 Print</span>
            </div>
            <span className="text-3xl font-bold text-right ml-4">$10</span>
          </div>
          <p className="text-lg mt-1 mb-4">High quality prints on premium paper</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-3xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
              </span>
              <span>A4 Frame</span>
            </div>
            <span className="text-3xl font-bold text-right ml-4">$15</span>
          </div>
          <p className="text-lg mt-1 mb-4">Elegant frames in various colors <span style={{marginLeft:'0.5em'}}><span style={{color:'#222', fontSize:'1.5em'}}>●</span> <span style={{color:'#f5e9d6', fontSize:'1.5em'}}>●</span> <span style={{color:'#ff9800', fontSize:'1.5em'}}>●</span> <span style={{color:'#b97a56', fontSize:'1.5em'}}>●</span></span></p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-3xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M6 17v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/></svg>
              </span>
              <span>Original Digital Film</span>
            </div>
            <span className="text-3xl font-bold text-right ml-4">$20</span>
          </div>
          <p className="text-lg mt-1 mb-4">Full resolution digital copies</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-3xl font-bold mb-2">
              <span className="w-8 h-8 inline-block align-middle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
              </span>
              <span>Calendar</span>
            </div>
            <span className="text-3xl font-bold text-right ml-4">$45</span>
          </div>
          <p className="text-lg mt-1 mb-4">Personalized photo calendar</p>
        </div>
      </div>
    ),
    title: 'Other Goods',
  },
  // 4. Special
  {
    images: ['/images/Service-4.png', '/images/Service5.png'],
    text: (
      <div className="space-y-10 text-white pt-8">
        <div>
          <div className="flex items-center gap-3 text-3xl font-bold mb-2"><span style={{fontSize:'1.2em'}}>💗</span><span>Wedding Package</span></div>
          <p className="text-lg mt-1 mb-4">Celebrate Your Love Story with Our Bespoke Wedding Package</p>
        </div>
        <div>
          <div className="flex items-center gap-3 text-3xl font-bold mb-2"><span style={{fontSize:'1.2em'}}>👥</span><span>Group Package</span></div>
          <p className="text-lg mt-1 mb-4">Making Memories Together: The Ultimate Package for Large Group Celebrations</p>
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold mt-1 mb-4">Contact us for more details about the packages</p>
        </div>
      </div>
    ),
    title: 'Special',
  },
];

export default function Services() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const animTime = 1000;
  const scrolling = useRef(false);

  const navigateUp = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const navigateDown = () => {
    if (currentPage < numOfPages) setCurrentPage(p => p + 1);
  };

  const handleWheel = (e: WheelEvent) => {
    if (scrolling.current) return;
    scrolling.current = true;
    e.deltaY > 0 ? navigateDown() : navigateUp();
    setTimeout(() => (scrolling.current = false), animTime);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (scrolling.current) return;
    if (e.key === 'ArrowUp') {
      scrolling.current = true;
      navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    } else if (e.key === 'ArrowDown') {
      scrolling.current = true;
      navigateDown();
      setTimeout(() => (scrolling.current = false), animTime);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  return (
    <div className="relative overflow-hidden h-screen bg-black">
      {(() => {
        const page = pages[currentPage - 1];
        return (
          <div key={currentPage} className="absolute inset-0">
            {/* PC: 좌/우 반반, 교차 배치 */}
            <div className="hidden md:flex w-full h-full">
              {/* Provided(1), Other Goods(3): 이미지 왼쪽, 텍스트 오른쪽 */}
              {/* Shooting Type(2), Special(4): 텍스트 왼쪽, 이미지 오른쪽 */}
              {([1, 3].includes(currentPage)) ? (
                <>
                  {/* Left: 이미지 (흰 배경) */}
                  <div className="w-1/2 h-full flex items-center justify-center bg-white">
                    <div className={`w-full px-8 flex flex-col gap-4 items-center justify-center`}>
                      {/* Provided: 세로로 더 크게 */}
                      {currentPage === 1 && (
                        <div className="relative w-full h-[90vh] max-w-4xl mx-auto flex items-center justify-center">
                          <div className="relative w-full h-full max-w-none shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                            <Image src={page.images[0]} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                          </div>
                        </div>
                      )}
                      {/* Other Goods: 세로 배치 */}
                      {currentPage === 3 && page.images.map((img, j) => (
                        <div key={j} className="relative w-full h-[40vh] max-w-md shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                          <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right: 텍스트 (검정 배경) */}
                  <div className="w-1/2 h-full flex flex-col items-center justify-center px-8 bg-black">
                    <div className="text-4xl font-bold uppercase text-white text-center tracking-widest mb-4">{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className="pt-16 w-full max-w-xl mx-auto">{page.text}</div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left: 텍스트 (검정 배경) */}
                  <div className="w-1/2 h-full flex flex-col items-center justify-center px-8 bg-black">
                    <div className="text-4xl font-bold uppercase text-white text-center tracking-widest mb-4">{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className="pt-16 w-full max-w-xl mx-auto">{page.text}</div>
                  </div>
                  {/* Right: 이미지 (흰 배경) */}
                  <div className="w-1/2 h-full flex items-center justify-center bg-white">
                    <div className={`w-full px-8 flex ${currentPage === 2 ? 'flex-row gap-10 items-center justify-center' : 'flex-col gap-4 items-center justify-center'}`}>
                      {/* Shooting Type: 가로로 2장, 큼직하게 예쁘게 */}
                      {currentPage === 2 && (
                        <div className="flex flex-row gap-10 w-full justify-center items-center">
                          {page.images.map((img, j) => (
                            <div key={j} className="relative w-full h-[70vh] max-w-2xl shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                              <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Special: 가로로 2장, 큼직하게 예쁘게 */}
                      {currentPage === 4 && (
                        <div className="flex flex-row gap-10 w-full justify-center items-center">
                          <div className="relative w-[70%] h-[70vh] max-w-4xl shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                            <Image src={page.images[0]} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                          </div>
                          <div className="relative w-full h-[70vh] max-w-2xl shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                            <Image src={page.images[1]} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* 모바일: 한 컬럼 */}
            <div className="md:hidden flex flex-col w-full h-full">
              {/* 이미지: 흰 배경 */}
              <div className={`flex flex-col gap-4 w-full px-4 pt-8 items-center bg-white`}>
                {/* Provided: 세로로 크게 */}
                {currentPage === 1 && (
                  <div className="relative w-full h-64 max-w-md mx-auto flex items-center justify-center">
                    <div className="relative w-full h-full max-w-none shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                      <Image src={page.images[0]} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                    </div>
                  </div>
                )}
                {/* Shooting Type: 한 장씩 세로로, 큼직하게 예쁘게 */}
                {currentPage === 2 && (
                  <div className="flex flex-col gap-6 w-full justify-center items-center">
                    {page.images.map((img, j) => (
                      <div key={j} className="relative w-full h-64 max-w-md shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                        <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                      </div>
                    ))}
                  </div>
                )}
                {/* Other Goods, Special: 기존대로(세로 배치) */}
                {(currentPage !== 1 && currentPage !== 2) && page.images.map((img, j) => (
                  <div key={j} className="relative w-full h-64 max-w-md shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                    <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                  </div>
                ))}
                {/* Special: 가로로 2장, 큼직하게 예쁘게 (모바일) */}
                {currentPage === 4 && (
                  <div className="flex flex-col gap-6 w-full justify-center items-center">
                    {page.images.map((img, j) => (
                      <div key={j} className="relative w-full h-64 max-w-md shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                        <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* 텍스트: 검정 배경 */}
              <div className="flex flex-col items-center justify-center flex-1 px-4 pb-8 bg-black">
                <h2 className="text-2xl font-bold uppercase mb-4 text-white text-center tracking-widest">{page.title}</h2>
                <div className="w-full max-w-md mx-auto">{page.text}</div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
} 