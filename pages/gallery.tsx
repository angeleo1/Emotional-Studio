import { NextPage } from 'next';
import Head from 'next/head';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const Gallery: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gallery | Emotional Studio</title>
        <meta name="description" content="Gallery - Coming Soon" />
      </Head>
      
      {/* 임시 메시지 화면 - 나중에 이 부분만 제거하면 기존 내용이 나옵니다 */}
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight whitespace-nowrap" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
            The adventure begins soon.
          </h1>
        </div>
      </div>
      
      {/* Floating Book Button */}
      <FloatingBookButton />
    </>
  );
};

export default Gallery; 