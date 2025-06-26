import React from 'react';
import Link from 'next/link';
import CloudinaryImage from '../common/CloudinaryImage';

const galleryImages = [
  'v1/jimmy-fermin-bqe0J0b26RQ-unsplash_tpyzo4',
  'v1/aiony-haust-3TLl_97HNJo-unsplash_vda4od',
  'v1/leon-elldot-f6HbVnGtNnY-unsplash_vt63we',
  'v1/olena-bohovyk-XttWKETqCCQ-unsplash_wryqhq',
  'v1/jessica-felicio-QS9ZX5UnS14-unsplash_fdjyaf',
  'v1/ivana-cajina-dnL6ZIpht2s-unsplash_o1zsv1',
  'v1/blake-carpenter-9ooMr_r7BlY-unsplash_u04ne2',
  'v1/prince-akachi-4Yv84VgQkRM-unsplash_mczh7g',
  'v1/IMG_0190_z0su9m',
  'v1/IMG_0241_zxbg10'
];

export default function EmotionalMoments({ colorizedImages }: { colorizedImages: { [key: number]: boolean } }) {
  return (
    <section className="relative overflow-hidden bg-[#111]">
      <div className="relative z-10 w-full">
        <div className="overflow-hidden w-full h-12 sm:h-14 md:h-16 lg:h-20">
          <div className="flex items-center h-full whitespace-nowrap animate-slideLeft">
            {Array(20).fill("emotional moments").map((text, index) => (
              <Link 
                href="/gallery-landing" 
                key={index} 
                className="ml-4 sm:ml-8 first:ml-0 flex-none cursor-pointer hover:opacity-80 transition-opacity moment-section"
                data-hover
              >
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dm-serif leading-tight ${[3, 8, 13, 18].includes(index) ? 'text-white' : 'text-[#FF4D00]'}`}>
                  {text}
                </h2>
              </Link>
            ))}
          </div>
        </div>
        {/* Gallery */}
        <div className="relative overflow-hidden -mx-[10%] sm:-mx-[20%]">
          <div className="flex animate-slideLeft">
            {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={index}
                className="flex-none w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] relative mx-1 sm:mx-2 group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#ff6100]/3 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <CloudinaryImage
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={500}
                  className={`object-cover transition-all duration-[2000ms] group-hover:scale-[1.02] ${colorizedImages[index] ? 'grayscale-0' : 'grayscale'} group-hover:grayscale-0`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 border border-[#ff6100]/5 group-hover:border-[#ff6100]/20 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#ff6100]/5" />
                <div className="absolute -bottom-4 inset-x-4 h-12 bg-[#1a1a1a]/5 blur-xl rounded-full transform scale-x-[0.85] opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
        <div className="h-12 sm:h-14 md:h-16 lg:h-20" />
      </div>
    </section>
  );
} 