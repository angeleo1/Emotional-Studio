import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// 이미지 프리로딩을 위한 컴포넌트
const PreloadImages = ({ images }: { images: string[] }) => {
  useEffect(() => {
    images.forEach(src => {
      const imgElement = document.createElement('img');
      imgElement.src = src;
    });
  }, [images]);
  return null;
};

export default function GalleryLanding() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [showImages, setShowImages] = useState(true);

  // 이미지 배열을 메모이제이션
  const firstSetImages = useMemo(() => [
    '/images/0f9f9c7f-0182-46a8-856b-23fe948d7c5c.jpg',
    '/images/93604fc7-7652-49aa-be76-15898c012176.jpg',
    '/images/19f91264-41e6-454a-a4cb-007a97003550.jpg',
    '/images/b53d49fc-f701-4806-8060-d37768c5b328.jpg',
    '/images/374a1414-94ed-47a0-94d3-9d56780fd243.jpg',
    '/images/IMG_0179.jpg',
    '/images/IMG_0241.jpg'
  ], []);

  const secondSetImages = useMemo(() => [
    '/images/b92e53e6-436a-471c-b077-7cac4113e46e.jpg',
    '/images/bad178c7-1de1-4fa3-9576-5fa0ca04b9db.jpg',
    '/images/e2cb65ef-30e1-427e-8f22-48e660ea8e4f.jpg',
    '/images/919adfeb-b341-4006-8f21-576a1871f48e.jpg',
    '/images/19f91264-41e6-454a-a4cb-007a97003550.jpg',
    '/images/IMG_0241.jpg',
    '/images/IMG_0190.jpg'
  ], []);

  // 모든 이미지 URL을 하나의 배열로 결합
  const allImages = useMemo(() => [...firstSetImages, ...secondSetImages], [firstSetImages, secondSetImages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/gallery');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    // 3초 후에 이미지를 숨기고 텍스트 표시
    const timer = setTimeout(() => {
      setShowImages(false);
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    router.push('/gallery');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 이미지 프리로딩 */}
      <PreloadImages images={allImages} />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/241421124.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={75}
        />
      </div>

      {/* First set of images - Top diagonal */}
      <div className={`absolute inset-0 flex -rotate-12 scale-125 translate-y-[15%] transition-all duration-[3000ms] ease-in-out z-10 ${showImages ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-2 animate-slide-left">
          {[...firstSetImages, ...firstSetImages].map((src, index) => (
            <div key={index} className="relative w-[250px] h-[350px] flex-shrink-0">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second set of images - Bottom diagonal */}
      <div className={`absolute inset-0 flex -rotate-12 scale-125 translate-y-[55%] transition-all duration-[3000ms] ease-in-out z-10 ${showImages ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-2 animate-slide-right">
          {[...secondSetImages, ...secondSetImages].map((src, index) => (
            <div key={index} className="relative w-[250px] h-[350px] flex-shrink-0">
              <Image
                src={src}
                alt={`Gallery image ${index + 6}`}
                fill
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 transition-all duration-[3000ms] ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          Precious memories in emotional studio
        </h1>
        <button
          onClick={handleEnter}
          className={`mt-8 px-12 py-4 bg-transparent border-2 border-white text-white text-xl tracking-wider hover:bg-white hover:text-black transition-all duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        >
          ENTER GALLERY
        </button>

        {/* Copyright notice */}
        <div className={`absolute bottom-8 left-0 right-0 text-center text-white/70 text-sm px-4 space-y-2 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <p>All images on this site are copyrighted by Recorders Inc.</p>
          <p>Unauthorized use, reproduction, or distribution of these images is strictly prohibited.</p>
          <p>Images are only uploaded with the consent of the individuals regarding their portrait rights.</p>
          <p>Records without consent will not be uploaded.</p>
        </div>
      </div>
    </div>
  );
} 