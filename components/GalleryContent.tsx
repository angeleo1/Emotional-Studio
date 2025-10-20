import { useState, useMemo } from 'react';
import Image from 'next/image';
import { sortGalleryImagesByCreationTime, sortAllImagesByCreationTime } from '../utils/gallerySorting';

// 갤러리 이미지 데이터 (실제 폴더의 사진들만 사용)
const galleryImages = {
  'B&W': [
    // 최신 추가된 이미지 (-m.jpeg)
    '/images/Gallery/BW/F9A46B07-1B8B-4263-8705-169532235163-m.jpeg',
    '/images/Gallery/BW/F8C299A7-86CE-4DCC-96A0-74D1922B5FC8-m.jpeg',
    '/images/Gallery/BW/EDEC49E2-7BFE-465D-961C-4511C180694B-m.jpeg',
    '/images/Gallery/BW/E6179105-1ECD-40D9-976F-6908E03624F0-m.jpeg',
    '/images/Gallery/BW/DE85FB2A-E927-462C-B12A-5A6BA4618DE5-m.jpeg',
    '/images/Gallery/BW/DB8C1FBE-425B-45F6-A795-E4A76B448D83-m.jpeg',
    '/images/Gallery/BW/DB630F3A-58A5-4217-941D-D0B33F86BA6F-m.jpeg',
    '/images/Gallery/BW/DA274F4F-0331-477B-9FFD-B0F0CCD14B91-m.jpeg',
    '/images/Gallery/BW/C9667E54-D657-49B8-B3FB-EBC45C100AAF-m.jpeg',
    '/images/Gallery/BW/BD4E432E-5780-40F3-98AA-D15D54467FC7-m.jpeg',
    '/images/Gallery/BW/A3CD1CFC-1C87-4724-A641-BD178F381A09-m.jpeg',
    '/images/Gallery/BW/A239135F-4BF3-49AB-918E-1F3269A144B2-m.jpeg',
    '/images/Gallery/BW/9B076311-CD2B-4165-83A1-2EC574704A47-m.jpeg',
    '/images/Gallery/BW/99021A5C-733D-4D8A-A85E-CACBF464BAF6-m.jpeg',
    '/images/Gallery/BW/960A6676-6D3F-4366-8CA8-8059109053D8-m.jpeg',
    '/images/Gallery/BW/93ADF8B2-7C01-4FB3-9C89-A7480FE6B832-m.jpeg',
    '/images/Gallery/BW/8FEFBB06-C10B-4E93-9162-0923C3007348-m.jpeg',
    '/images/Gallery/BW/86715774-9436-424D-91DC-3E88E4DDF0FA-m.jpeg',
    '/images/Gallery/BW/63A2EA9D-8BD7-4F0B-B21E-D1D8D9BFA2F9-m.jpeg',
    '/images/Gallery/BW/5F90D002-D0B1-4AD3-9790-0C7C7B1559EF-m.jpeg',
    '/images/Gallery/BW/5DCF336D-2259-43C1-B84F-DCEE1E492AD1-m.jpeg',
    '/images/Gallery/BW/5A84EF90-586C-4885-8455-E844CA561D4B-m.jpeg',
    '/images/Gallery/BW/595D014D-1142-45F6-ABE0-958B7CEB5FBA-m.jpeg',
    '/images/Gallery/BW/50AD74D0-7FC9-49B9-AFB4-1A6DEE2B6B50-m.jpeg',
    '/images/Gallery/BW/42A9E208-3D84-49F9-BE78-C6015727B81B-m.jpeg',
    '/images/Gallery/BW/24A80932-B15A-4EAD-9917-9BA680C2EBFC-m.jpeg',
    '/images/Gallery/BW/1ED0FDB2-E84A-4E91-B43B-8CCCE4CBB9C5-m.jpeg',
    '/images/Gallery/BW/1B63E455-377E-412B-87AE-B65EA18A9ED1-m.jpeg',
    '/images/Gallery/BW/0E7DA56A-A6DC-42B8-AEF2-E0192D94DA55-m.jpeg',
    '/images/Gallery/BW/079F71D0-5D5C-4A32-AC1B-D60B4E0DF66A-m.jpeg',
    '/images/Gallery/BW/046CD866-EA70-4DDA-B3B2-43A63F68F672-m.jpeg',
    // 이전 이미지들
    '/images/Gallery/BW/KakaoTalk_20251019_113802790_01.jpg',
    '/images/Gallery/BW/1760852817934-0199fb01-712b-767d-b08b-898d9a1bb8e6.png',
    '/images/Gallery/BW/1760766079275-0199f5d5-d729-7804-9f01-254b3196e44f.png',
    '/images/Gallery/BW/KakaoTalk_20250924_201313123.jpg',
    '/images/Gallery/BW/KakaoTalk_20250924_201313123_01.jpg',
    '/images/Gallery/BW/KakaoTalk_20250924_182818093.jpg',
    '/images/Gallery/BW/KakaoTalk_20250924_182813511.jpg',
    '/images/Gallery/BW/KakaoTalk_20250924_182807334.jpg',
    '/images/Gallery/BW/KakaoTalk_20250924_182458062_01.jpg',
    '/images/Gallery/BW/0921 (5).jpg',
    '/images/Gallery/BW/0921 (4).jpg',
    '/images/Gallery/BW/0921 (3).jpg',
    '/images/Gallery/BW/0921 (2).jpg',
    '/images/Gallery/BW/BW.png',
    '/images/Gallery/BW/BW (7).png',
    '/images/Gallery/BW/BW (6).png',
    '/images/Gallery/BW/BW (5).png',
    '/images/Gallery/BW/BW (4).png',
    '/images/Gallery/BW/BW (3).png',
    '/images/Gallery/BW/BW (2).png',
    '/images/Gallery/BW/BW (1).png',
    '/images/Gallery/BW/022.png',
    '/images/Gallery/BW/021.png',
    '/images/Gallery/BW/020.png',
  ],
  'Cool tone': [
    // 최신 추가된 이미지 (-m.jpeg)
    '/images/Gallery/COOL/FA7AC748-B54B-432B-8DB2-4D54844F5450-m.jpeg',
    '/images/Gallery/COOL/A72B39E8-DB02-48A6-AE13-C3AD0308498F-m.jpeg',
    '/images/Gallery/COOL/A10406AC-880C-4AB4-9501-9AC5FD8580CF-m.jpeg',
    '/images/Gallery/COOL/668FA52D-DA90-4CB0-B065-F9C9AC01E828-m.jpeg',
    '/images/Gallery/COOL/10EF7629-9BB5-419F-BD87-7FFE05D67D6A-m.jpeg',
    '/images/Gallery/COOL/0ACC9AEE-44BB-4FF6-A140-DE84273CA348-m.jpeg',
    // 이전 이미지들
    '/images/Gallery/COOL/GAGA-(2 of 2).jpg',
    '/images/Gallery/COOL/GAGA-(1 of 2).jpg',
    '/images/Gallery/COOL/0921 (6).jpg',
    '/images/Gallery/COOL/0921 (1).jpg',
    '/images/Gallery/COOL/COOL.png',
    '/images/Gallery/COOL/COOL (5).png',
    '/images/Gallery/COOL/COOL (4).png',
    '/images/Gallery/COOL/COOL (3).png',
    '/images/Gallery/COOL/COOL (2).png',
    '/images/Gallery/COOL/019(1).png',
    '/images/Gallery/COOL/018.png',
    '/images/Gallery/COOL/017.png',
  ],
  'Warm tone': [
    // 최신 추가된 이미지 (-m.jpeg)
    '/images/Gallery/WARM/D1D22EAC-75D4-4ADB-BC4F-52EE09A374FB-m.jpeg',
    '/images/Gallery/WARM/78AEF9FE-3891-4EA2-B9E0-F4C6DE0D0817-m.jpeg',
    '/images/Gallery/WARM/5B35732E-D300-481B-964D-7F7CE7628604-m.jpeg',
    '/images/Gallery/WARM/533DE53A-6288-46B5-B554-6F73B4FC3066-m.jpeg',
    '/images/Gallery/WARM/4DD02533-AC78-48B8-86C1-FB2ED311947C-m.jpeg',
    '/images/Gallery/WARM/238AE28A-D9E0-4706-BFC2-316168F9FFA7-m.jpeg',
    // 이전 이미지들
    '/images/Gallery/WARM/KakaoTalk_20251019_113802790_02.jpg',
    '/images/Gallery/WARM/KakaoTalk_20250924_221547590.jpg',
    '/images/Gallery/WARM/KakaoTalk_20250924_221547590_02.jpg',
    '/images/Gallery/WARM/WARM (2).png',
    '/images/Gallery/WARM/WARM.png',
  ],
  'Studio': [
    '/images/Gallery/STUDIO/optimized/Studio (11).webp',
    '/images/Gallery/STUDIO/optimized/Studio (12).webp',
    '/images/Gallery/STUDIO/optimized/Studio (13).webp',
    '/images/Gallery/STUDIO/optimized/Studio (14).webp',
    '/images/Gallery/STUDIO/optimized/Studio (4).webp',
    '/images/Gallery/STUDIO/optimized/Studio (5).webp',
    '/images/Gallery/STUDIO/optimized/Studio (9).webp',
  ],
  'Customer Album': [
    '/images/Gallery/Customer Album/optimized/Studio (1).webp',
    '/images/Gallery/Customer Album/optimized/Studio (2).webp',
    '/images/Gallery/Customer Album/optimized/Studio (3).webp',
    '/images/Gallery/Customer Album/optimized/Studio (6).webp',
    '/images/Gallery/Customer Album/optimized/Studio (7).webp',
    '/images/Gallery/Customer Album/optimized/Studio (8).webp',
    '/images/Gallery/Customer Album/optimized/Studio (10).webp',
    '/images/Gallery/Customer Album/optimized/Studio (15).webp',
    '/images/Gallery/Customer Album/optimized/Studio (16).webp',
  ],
};

// All 탭용 최신순 정렬된 이미지 배열 (실제 폴더의 사진들만 사용)
const allImagesLatestFirst = [
  // 최신 추가된 이미지들
  ...galleryImages['B&W'],
  ...galleryImages['Cool tone'],
  ...galleryImages['Warm tone'],
  // Studio 이미지들
  '/images/Gallery/STUDIO/optimized/Studio (11).webp',
  '/images/Gallery/STUDIO/optimized/Studio (12).webp',
  '/images/Gallery/STUDIO/optimized/Studio (13).webp',
  '/images/Gallery/STUDIO/optimized/Studio (14).webp',
  '/images/Gallery/STUDIO/optimized/Studio (4).webp',
  '/images/Gallery/STUDIO/optimized/Studio (5).webp',
  '/images/Gallery/STUDIO/optimized/Studio (9).webp',
  // Customer Album 이미지들
  '/images/Gallery/Customer Album/optimized/Studio (1).webp',
  '/images/Gallery/Customer Album/optimized/Studio (2).webp',
  '/images/Gallery/Customer Album/optimized/Studio (3).webp',
  '/images/Gallery/Customer Album/optimized/Studio (6).webp',
  '/images/Gallery/Customer Album/optimized/Studio (7).webp',
  '/images/Gallery/Customer Album/optimized/Studio (8).webp',
  '/images/Gallery/Customer Album/optimized/Studio (10).webp',
  '/images/Gallery/Customer Album/optimized/Studio (15).webp',
  '/images/Gallery/Customer Album/optimized/Studio (16).webp',
];

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 정렬된 갤러리 이미지 (생성 시간 순)
  const sortedGalleryImages = useMemo(() => {
    return sortGalleryImagesByCreationTime(galleryImages);
  }, []);

  // 정렬된 All 탭 이미지 (생성 시간 순)
  const sortedAllImages = useMemo(() => {
    return sortAllImagesByCreationTime(allImagesLatestFirst);
  }, []);

  // 현재 선택된 카테고리에 따른 이미지 목록
  const getCurrentImages = () => {
    if (selectedCategory === 'All') {
      return sortedAllImages;
    }
    return sortedGalleryImages[selectedCategory as keyof typeof sortedGalleryImages] || [];
  };

  const currentImages = getCurrentImages();

  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* 헤더 */}
      <header className="py-16 px-8 text-center">
        <h1 
          className="text-6xl md:text-8xl font-bold mb-8"
          style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
        >
          Gallery
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover our collection of professional photography work
        </p>
      </header>

      {/* 카테고리 필터 */}
      <div className="px-8 pb-12">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {['All', 'B&W', 'Cool tone', 'Warm tone', 'Studio', 'Customer Album'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
                selectedCategory === category
                  ? 'border-[#FF6100] text-[#FF6100] bg-[#FF6100]/10'
                  : 'border-white/20 text-white hover:border-white/40 hover:bg-white/5'
              }`}
              style={{
                fontFamily: 'CS-Valcon-Drawn-akhr7k',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 이미지 갤러리 */}
      <div className="px-8 pb-20">
        {currentImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group hover:scale-105 transition-transform duration-300"
                style={{ aspectRatio: '2/3' }}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
            >
              No images found
            </h2>
            <p className="text-xl text-gray-300">
              No images available for this category
            </p>
          </div>
        )}
      </div>

    </div>
  );
} 