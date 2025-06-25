import { motion } from 'framer-motion';
import Image from 'next/image';
import Spinner from '@/components/ui/Spinner';

const AboutLoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111]"
    >
      {/* 이미지 */}
      <div className="relative w-64 h-80 md:w-80 md:h-96 mb-8">
        <Image
          src="/images/aboutus0.png"
          alt="Loading image for About Us page"
          fill
          priority
          loading="eager"
          style={{ objectFit: 'cover', filter: 'grayscale(1) brightness(100)' }}
          className="rounded-lg aboutus-orange-overlay"
        />
      </div>
      {/* 메인 인트로와 동일한 스피너, 색상만 흰색 + drop-shadow */}
      <Spinner size={64} color="#fff" className="aboutus-spinner-shadow" style={{ display: 'block' }} />
      <style jsx>{`
        .aboutus-spinner-shadow {
          filter: drop-shadow(0 0 8px #000) drop-shadow(0 0 2px #000);
        }
        .aboutus-orange-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 77, 0, 0.45);
          mix-blend-mode: multiply;
          border-radius: 0.5rem;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default AboutLoadingScreen; 