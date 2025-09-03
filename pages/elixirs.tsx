import { NextPage } from 'next';
import Head from 'next/head';
import FloatingBookButton from '../components/common/FloatingBookButton';

const ElixirsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Our Elixirs | Emotional Studio</title>
        <meta name="description" content="Our Elixirs - Coming Soon" />
      </Head>
      
      {/* 임시 메시지 화면 - 나중에 이 부분만 제거하면 기존 내용이 나옵니다 */}
      <div className="min-h-screen bg-[#111] flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight whitespace-nowrap" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
            The adventure begins soon.
          </h1>
        </div>
      </div>
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
      {/* 기존 컴포넌트 - 임시로 주석 처리
      <OurElixirs />
      */}
    </>
  );
};

export default ElixirsPage; 