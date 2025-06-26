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

export default function CollaborationGallery() {
  return (
    <section className="relative overflow-hidden bg-[#111]">
      <div className="relative z-10 w-full">
        <div className="overflow-hidden w-full h-12 sm:h-14 md:h-16 lg:h-20">
          <div className="flex items-center h-full whitespace-nowrap animate-slideRight">
            {Array(20).fill("e.st Collaboration").map((text, index) => (
              <Link 
                href="/gallery-landing" 
                key={index} 
                className="ml-4 sm:ml-8 first:ml-0 flex-none cursor-pointer hover:opacity-80 transition-opacity elixir-section"
                data-hover
              >
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dm-serif leading-tight ${[3, 8, 13, 18].includes(index) ? 'text-white' : 'text-[#191919]'}`}>
                  {text}
                </h2>
              </Link>
            ))}
          </div>
        </div>
        {/* Gallery */}
        <div className="relative overflow-hidden -mx-[10%] sm:-mx-[20%]">
          <div className="flex animate-slideRight">
            {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={index}
                className="flex-none w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] relative mx-1 sm:mx-2 group"
              >
                <CloudinaryImage
                  src={image}
                  alt={`Collaboration image ${index + 1}`}
                  width={400}
                  height={500}
                  className={`object-cover transition-all duration-[2000ms] group-hover:scale-[1.02]`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="h-12 sm:h-14 md:h-16 lg:h-20" />
      </div>
    </section>
  );
} 