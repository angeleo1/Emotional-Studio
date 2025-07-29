import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function MobilePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Emotional Studios - Mobile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-6">
          <h1 
            className="text-3xl font-medium text-center"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k',
              letterSpacing: '0.08em',
            }}
          >
            emotional studios
          </h1>
          <p className="text-center text-sm mt-2 opacity-80">since Oct.2025</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-xl mb-4">Branded UI Experiment</h2>
            <p className="text-lg mb-2">Feel the Vibe</p>
            <p className="text-2xl font-bold text-[#FF6100]">e.st</p>
          </div>

          {/* 네비게이션 버튼들 */}
          <div className="space-y-4">
            <button
              onClick={() => router.push('/pose-guide')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              Pose Guide
            </button>
            
            <button
              onClick={() => router.push('/elixirs')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              Our Elixirs
            </button>
            
            <button
              onClick={() => router.push('/gallery-landing')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              emotional Moments
            </button>

            {/* 추가 메뉴 버튼들 */}
            <button
              onClick={() => router.push('/about')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              About Us
            </button>

            <button
              onClick={() => router.push('/services')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              Services
            </button>

            <button
              onClick={() => router.push('/booking')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              Booking
            </button>

            <button
              onClick={() => router.push('/contact')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              Contact
            </button>

            <button
              onClick={() => router.push('/support')}
              className="w-full py-4 border-2 border-white text-white rounded-full font-bold transition-colors hover:bg-white hover:text-black"
            >
              Support
            </button>
          </div>
        </main>

        {/* 푸터 */}
        <footer className="p-6 text-center text-sm opacity-60">
          <p>Private Self-Studio in Melbourne</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://www.instagram.com/emotional_studios/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF6100] transition-colors text-2xl"
            >
              📸
            </a>
            <a
              href="#"
              className="text-white hover:text-[#FF6100] transition-colors text-2xl"
            >
              📘
            </a>
            <a
              href="https://www.youtube.com/@emotional_studios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF6100] transition-colors text-2xl"
            >
              📺
            </a>
          </div>
        </footer>
      </div>
    </>
  );
} 