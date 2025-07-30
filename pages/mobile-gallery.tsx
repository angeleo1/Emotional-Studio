import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

// 카테고리 리스트
const CATEGORY_LIST = [
  "All",
  "Black & White",
  "Color",
  "Collaboration",
  "Studio",
];

// 이미지 파일들
const FILES = [
  "service5.png", "intro1.png", "booking.png", "leobom_Design_a_simple_minimalist_graphic_for_the_library_PHO_782fa258-1025-42ed-bea8-53a1ce96f579_0.png", "leobom_surreal_scene_of_a_lifelike_human_face_sculpted_entire_45885c7d-4c92-4b21-a440-9410ab1e777a_2.png", "intro2.png", "supporta.png", "leobom_A_photo_of_a_human_where_if_one_survives_themselves_th_45622cc7-2a7b-404f-9ad6-6f3b1d3af619_2.png", "supportb.png", "booking2.png", "leobom_top_view_a_person_lying_peacefully_on_a_donation_bed_I_d3a13cca-3e3e-4059-85e5-38b6549038e5_2.png", "landing.png", "leobom_top_view_a_person_lying_peacefully_on_a_donation_bed_I_d3a13cca-3e3e-4059-85e5-38b6549038e5_3.png", "leobom_develops_a_tube_of_orange_acrylic_paint_realistic_phot_10e5a2a2-4d36-4e1a-b44b-d0296e1ac1ec_2.png", "leobom_Create_an_eye-catching_modern_editorial_full-body_port_b52a2481-a30b-4615-b7f4-72e3966369d1_1.png", "leobom_Create_a_hyper-realistic_three-dimensional_technical_s_a5821456-fb62-450a-bcb7-4bd900a2a1c6_1.png", "leobom_Create_a_hyper-realistic_three-dimensional_technical_s_a5821456-fb62-450a-bcb7-4bd900a2a1c6_3.png", "leobom_Create_a_hyper-realistic_three-dimensional_technical_s_74959602-f2db-469c-ab0f-ca43a3e23bfc_3.png", "leobom_Isometric_minimalist_cozy_workspace_of_a_photographer__583dc11d-a46c-434a-b43c-2b61e6164b32_3.png", "leobom_Isometric_minimalist_cozy_workspace_of_a_photographer__143176b6-4810-4899-864a-7afeede1cf0b_3.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_4bb549d3-5794-4102-9978-a3bf0f88c860_1.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_4bb549d3-5794-4102-9978-a3bf0f88c860_0.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_10a7dcf3-a019-43e3-8d4c-02fdd93705ab_3.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_10a7dcf3-a019-43e3-8d4c-02fdd93705ab_2.png", "leobom_folk_art_photograph_oil_kids_wearing_1920s_fashion_abo_10a7dcf3-a019-43e3-8d4c-02fdd93705ab_0.png", "elixir1.png", "elixir2.png", "elixir3.png", "Service3-2.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_4438a1ae-d112-4bdd-914c-dec8f851433b_0.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_29de6bcf-a100-429b-b711-7ec9dfff1901_2.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_29de6bcf-a100-429b-b711-7ec9dfff1901_1.png", "leobom_Photo_studio_promotional_materials._Trendy._Social_med_29de6bcf-a100-429b-b711-7ec9dfff1901_0.png"
];

// 카테고리별 이미지 분배
const perCat = Math.ceil(FILES.length / 4);
const IMAGES_BW = FILES.slice(0, perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_COLOR = FILES.slice(perCat, 2*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_COLLAB = FILES.slice(2*perCat, 3*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_EST = FILES.slice(3*perCat).map(f => `/images/For Gallery/${f}`);
const IMAGES_ALL = [
  ...IMAGES_BW,
  ...IMAGES_COLOR,
  ...IMAGES_COLLAB,
  ...IMAGES_EST,
];

const CATEGORY_MAP: Record<string, string[]> = {
  All: IMAGES_ALL,
  "Black & White": IMAGES_BW,
  "Color": IMAGES_COLOR,
  "Collaboration": IMAGES_COLLAB,
  "Studio": IMAGES_EST,
};

const MobileGallery: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentImages = CATEGORY_MAP[selectedCategory] || [];

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Head>
        <title>Gallery | Emotional Studio</title>
        <meta name="description" content="Explore our photography gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MobileNavbar />
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-4 flex justify-center items-center border-b border-white/10">
          <h1 
            className="text-2xl font-medium"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Gallery
          </h1>
        </header>

        {/* 카테고리 필터 */}
        <div className="px-4 py-6">
          <div className="flex flex-col gap-3">
            {/* 첫 번째 줄: All, Black & White, Color */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 justify-center">
              {CATEGORY_LIST.slice(0, 3).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-bold transition-all duration-200 border-2 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'border-[#FF6100] text-[#FF6100]'
                      : 'border-white/20 text-white hover:border-white/40'
                  }`}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'CS-Valcon-Drawn-akhr7k',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* 두 번째 줄: Collaboration, Studio */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 justify-center">
              {CATEGORY_LIST.slice(3).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-bold transition-all duration-200 border-2 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'border-[#FF6100] text-[#FF6100]'
                      : 'border-white/20 text-white hover:border-white/40'
                  }`}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'CS-Valcon-Drawn-akhr7k',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 이미지 그리드 */}
        <div className="px-4 pb-20">
          <div className="grid grid-cols-2 gap-3">
            {currentImages.map((imageSrc, index) => (
              <motion.div
                key={imageSrc}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(imageSrc)}
              >
                <Image
                  src={imageSrc}
                  alt={`Gallery image ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 이미지 모달 */}
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] flex items-center justify-center" onClose={closeModal}>
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" onClick={closeModal} />
            <Dialog.Panel as="div" className="relative flex flex-col items-center justify-center w-full h-full mx-4 p-4 z-[9999]" onClick={closeModal}>
              {selectedImage && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedImage}
                    alt="Gallery modal"
                    width={800}
                    height={800}
                    className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl object-contain"
                  />
                </div>
              )}
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      </div>
      <MobileContactButton />
    </>
  );
};

export default MobileGallery; 