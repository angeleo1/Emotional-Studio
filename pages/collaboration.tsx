import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingBookButton from '@/components/common/FloatingBookButton';
import { ChromeGrid } from '@/components/ui/chrome-grid';
import styles from '@/styles/glitch.module.css';

const sections = [
  {
    title: 'Shop1',
    effect: 'neon',
  },
  {
    title: 'Shop2',
    effect: 'liquid',
  },
  {
    title: 'Shop3',
    effect: 'typewriter',
  },
];

const Collaboration: NextPage = () => {
  const [is3DReady, setIs3DReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 데스크탑에서만 3D 그리드 표시 (1025px 이상, iPad Pro는 모바일로 처리)
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Head>
        <title>Collaboration | Emotional Studio</title>
        <meta name="description" content="Explore our collaboration projects and creative partnerships" />
      </Head>
      
      {/* 3D Grid Section - Desktop Only */}
      {!isMobile && (
        <section className="relative h-screen w-full">
          <ChromeGrid onReady={() => setIs3DReady(true)} />
        </section>
      )}

      {/* Gallery Sections */}
      <div className="bg-[#111]">
        {sections.map((section, idx) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="py-20"
          >
            {/* Section Title - Full Width */}
            <div className="w-full">
              {section.effect === 'neon' && (
                <div className={`${styles.shop1Container} w-full`}>
                  <h2 className={`${styles.shop1} text-5xl md:text-7xl font-bold`}>
                    {section.title}
                  </h2>
                </div>
              )}
              {section.effect === 'liquid' && (
                <div className={`${styles.shop2Container} w-full`}>
                  <h2 className={`${styles.shop2} text-5xl md:text-7xl font-bold`}>
                    {section.title}
                  </h2>
                </div>
              )}
              {section.effect === 'typewriter' && (
                <div className={`${styles.shop3Container} w-full`}>
                  <h2 className={`${styles.shop3} text-5xl md:text-7xl font-bold`}>
                    {section.title}
                  </h2>
                </div>
              )}
            </div>
          </motion.section>
        ))}
      </div>
      
      {/* Floating Book Button */}
      <FloatingBookButton />
    </>
  );
};

export default Collaboration; 