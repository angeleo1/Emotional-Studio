import { motion } from 'framer-motion';
import Image from 'next/image';
import Spinner from '@/components/ui/Spinner';
import { useRef, useEffect, useState } from 'react';

interface AboutLoadingScreenProps {
  onFinish: () => void;
}

const AboutLoadingScreen = ({ onFinish }: AboutLoadingScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoHalf, setIsVideoHalf] = useState(false);
  const [isFiveSec, setIsFiveSec] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFiveSec(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVideoHalf && isFiveSec && !finished) {
      setFinished(true);
      onFinish();
    }
  }, [isVideoHalf, isFiveSec, finished, onFinish]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration && video.currentTime / video.duration >= 0.5) {
      setIsVideoHalf(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111]"
    >
      {/* 동영상 대신 이미지 */}
      <div className="relative w-[480px] h-[320px] md:w-[640px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
        <img
          src="/images/alanding.png"
          alt="aboutus loading"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '0.5rem' }}
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