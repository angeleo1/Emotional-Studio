import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const pages = [
  // 1. Provided as Standard
  {
    images: ['/images/dlsus.png'],
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
      <div className="flex flex-col h-full space-y-10 text-white pt-8">
        <div>
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
        <div className="flex-grow" />
        <div className="flex justify-center items-center gap-8">
          {/* Instagram SVG */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper text-white w-12 h-12">
            <div className="base-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer one" style={{ color: '#00ffff' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
            <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
            </div>
          </a>
          {/* Facebook SVG */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper text-white w-12 h-12">
             <div className="base-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
            </div>
            <div className="glitch-layer one" style={{ color: '#00ffff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
            </div>
            <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="48" width="48"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
            </div>
          </a>
          {/* YouTube SVG */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mx-2 svg-glitch-wrapper text-white w-12 h-12">
            <div className="base-icon">
              <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
            </div>
            <div className="glitch-layer one" style={{ color: '#00ffff' }}>
              <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
            </div>
            <div className="glitch-layer two" style={{ color: '#ff00ff' }}>
              <svg viewBox="0 0 256 180" width="48" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
            </div>
          </a>
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
    <div className="relative w-full min-h-screen overflow-hidden" style={{ background: '#111111' }}>
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
                  {/* Left: 이미지 (먹색 배경) */}
                  <div className="w-1/2 h-full flex items-center justify-center" style={{background:'#111111'}}>
                    <div className={`w-full px-8 flex flex-col gap-4 items-center justify-center`}>
                      {/* Provided: 세로로 더 크게 */}
                      {currentPage === 1 && (
                        <div className="relative w-full h-[90vh] max-w-4xl mx-auto flex items-center justify-center">
                          <div className="relative w-full h-full max-w-none flex items-center justify-center m-0 p-0">
                            <Image src={page.images[0]} alt="section image" fill style={{objectFit:'cover'}} />
                          </div>
                        </div>
                      )}
                      {/* Other Goods: 세로 배치 */}
                      {currentPage === 3 && (
                        <div className="h-[90vh] w-full max-w-md overflow-hidden relative">
                          <div className="animate-infinite-slide">
                            {[...page.images, ...page.images].map((img, j) => (
                              <div key={`${j}-${img}`} className="relative w-full h-[40vh] shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center mb-4">
                          <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                        </div>
                      ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Right: 텍스트 (검정 배경) */}
                  <div className={`w-1/2 h-full flex flex-col items-center ${currentPage === 4 ? 'justify-start' : 'justify-center'} px-8`} style={{background:'#111'}}>
                    <div className="text-4xl font-bold uppercase text-white text-center tracking-widest mb-4">{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className={`pt-16 w-full max-w-xl mx-auto ${currentPage === 4 ? 'flex-grow flex flex-col' : ''}`}>{page.text}</div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left: 텍스트 (검정 배경) */}
                  <div className="w-1/2 h-full flex flex-col items-center justify-center px-8" style={{background:'#111'}}>
                    <div className="text-4xl font-bold uppercase text-white text-center tracking-widest mb-4">{page.title}</div>
                    <div className="border-b-2 border-white/30 w-full mx-auto" />
                    <div className="pt-16 w-full max-w-xl mx-auto">{page.text}</div>
                  </div>
                  {/* Right: 이미지 (먹색 배경) */}
                  <div className="w-1/2 h-full flex items-center justify-center" style={{background:'#111111'}}>
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
                        <div className="flex flex-row gap-10 w-full h-full justify-center items-center">
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
              <div className={`flex flex-col gap-4 w-full px-4 pt-8 items-center`} style={{background:'#111111'}}>
                {/* Provided: 세로로 크게 */}
                {currentPage === 1 && (
                  <div className="relative w-full h-64 max-w-md mx-auto flex items-center justify-center">
                    <div className="relative w-full h-full max-w-none flex items-center justify-center m-0 p-0">
                      <Image src={page.images[0]} alt="section image" fill style={{objectFit:'cover'}} />
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
                {(currentPage !== 1 && currentPage !== 2 && currentPage !== 3) && page.images.map((img, j) => (
                  <div key={j} className="relative w-full h-64 max-w-md shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center m-0 p-0">
                    <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                  </div>
                ))}
                {/* Other Goods: Mobile */}
                {currentPage === 3 && (
                   <div className="h-[80vh] w-full max-w-md overflow-hidden relative">
                      <div className="animate-infinite-slide">
                        {[...page.images, ...page.images].map((img, j) => (
                          <div key={`${j}-${img}`} className="relative w-full h-64 shadow-lg rounded-xl overflow-hidden bg-white flex items-center justify-center mb-4">
                            <Image src={img} alt="section image" fill style={{objectFit:'cover'}} className="rounded-xl" />
                          </div>
                        ))}
                      </div>
                    </div>
                )}
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
              <div className="flex flex-col items-center justify-center flex-1 px-4 pb-8" style={{background:'#111'}}>
                <h2 className="text-2xl font-bold uppercase mb-4 text-white text-center tracking-widest">{page.title}</h2>
                <div className="w-full max-w-md mx-auto">{page.text}</div>
              </div>
            </div>
          </div>
        );
      })()}
      <style jsx>{`
        @keyframes infinite-slide {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-infinite-slide {
          display: flex;
          flex-direction: column;
          animation: infinite-slide 30s linear infinite;
        }
      `}</style>
    </div>
  );
} 