import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import MobileNavbar from '../components/MobileNavbar';
import Image from 'next/image';
import MobileContactButton from '../components/MobileContactButton';

const services = [
  {
    title: 'Provided as Standard',
    image: '/images/dlsus.png',
    items: [
      {
        icon: '🍸',
        name: 'Elevate your emotions',
        description: 'Relax and immerse yourself in the atmosphere, with our curated elixirs setting the tone for a unique photography experience.'
      },
      {
        icon: '📸',
        name: 'The Photo Session',
        description: 'Enjoy your 20-minute private session, solo or with loved ones, in a space designed for stunning, professional-quality photos.'
      },
      {
        icon: '🖼️',
        name: 'Selection',
        description: 'Choose two favourite shots in our private selection zone. Our team will refine them with meticulous retouching and premium printing, turning your images into visual memories.'
      },
      {
        icon: '🎬',
        name: 'Timelapse Video',
        description: 'Receive a highlight timelapse that beautifully captures the energy and moments of your session.'
      }
    ]
  },
  {
    title: 'Shooting Type',
    images: ['/images/Service2-1.png', '/images/Service2-2.jpg'],
    items: [
      {
        icon: '👤',
        name: 'Solo',
        price: '$55'
      },
      {
        icon: '👥',
        name: 'Couple',
        price: '$98'
      },
      {
        icon: '👤👤👤',
        name: '3-4 People',
        price: '$150'
      },
                                                       {
          icon: '🖼️',
          name: 'Warm | Cool | B/W',
          price: '',
          description: 'Choose your preferred style: Warm tones, Cool tones, or Black & White'
        }
    ]
  },
  {
    title: 'Other Goods',
    images: ['/images/Service3-1.png', '/images/Service3-2.png', '/images/Service3-3.png'],
    items: [
      {
        icon: '📄',
        name: 'A4 Print',
        price: '$10',
        description: 'High quality prints on premium paper'
      },
      {
        icon: '🖼️',
        name: 'Photo Frame',
        price: '$15',
        description: 'Elegant frames to display your memories'
      },
      {
        icon: '📱',
        name: 'Original Digital Films',
        price: '$20',
        description: 'High resolution digital files for uploading SNS or download'
      }
    ]
  },
  {
    title: 'Special',
    images: ['/images/Service-4.png', '/images/Service5.png'],
    items: [
      {
        icon: '💗',
        name: 'Wedding Package',
        description: 'Celebrate Your Love Story with Our Bespoke Wedding Package'
      },
      {
        icon: '👥',
        name: 'Group Package',
        description: 'Making Memories Together: The Ultimate Package for Large Group Celebrations'
      }
    ]
  }
];

const MobileServices: NextPage = () => {
  return (
    <>
      <Head>
        <title>Services | Emotional Studio</title>
        <meta name="description" content="Our photography services and packages" />
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
            Services
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="p-4 pb-20">
          <div className="max-w-md mx-auto space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group relative"
              >
                {/* 글래스모피즘 배경 */}
                <div className={`absolute inset-0 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl ${
                  index % 2 === 0 ? 'bg-white/15' : 'bg-white/8'
                }`}></div>
                
                {/* 컨텐츠 */}
                <div className="relative p-6">
                  {/* 이미지 컨테이너 */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    {service.image ? (
                      // 단일 이미지
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : service.images ? (
                      // 여러 이미지
                      <div className="flex gap-2">
                        {service.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="flex-1">
                            <Image
                              src={img}
                              alt={`${service.title} ${imgIndex + 1}`}
                              width={200}
                              height={200}
                              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {/* 이미지 오버레이 그라데이션 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* 제목 */}
                  <h2 
                    className="text-xl font-bold mb-6 text-center"
                    style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
                  >
                    {service.title}
                  </h2>
                  
                  {/* 서비스 아이템들 */}
                  <div className="space-y-4">
                    {service.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.15) + (itemIndex * 0.1), duration: 0.4 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            {item.description && (
                              <p className="text-sm text-white/70 mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                        {item.price && (
                          <span className="text-lg font-bold text-[#FF6100]">{item.price}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Special 섹션의 추가 정보 */}
                  {service.title === 'Special' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index * 0.15) + 0.5, duration: 0.4 }}
                      className="mt-6 text-center"
                    >
                      <p className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                        Contact us for more details about the packages
                      </p>
                      
                      {/* SNS 아이콘들 */}
                      <div className="flex justify-center gap-6">
                        <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
                          <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                          </div>
                          <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                          </div>
                          <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
                          </div>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
                          <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="100%" width="100%"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                          </div>
                          <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="100%" width="100%"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                          </div>
                          <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="100%" width="100%"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                          </div>
                        </a>
                        <a href="https://www.youtube.com/channel/UCiD4_8JWUt24lkJwYMum8NA" target="_blank" rel="noopener noreferrer" className="svg-glitch-wrapper w-8 h-8" style={{ color: '#FF6100' }}>
                          <div className="base-icon" style={{ color: '#FF6100', fill: '#FF6100' }}>
                            <svg viewBox="0 0 256 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                          </div>
                          <div className="glitch-layer one" style={{ color: '#00ffff' }}>
                            <svg viewBox="0 0 256 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                          </div>
                          <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
                            <svg viewBox="0 0 256 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <MobileContactButton />
    </>
  );
};

export default MobileServices; 