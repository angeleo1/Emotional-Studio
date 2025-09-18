import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import MobileNavbar from '../components/MobileNavbar';
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

const MobileCollaboration: NextPage = () => {

  return (
    <>
      <Head>
        <title>Collaboration | Emotional Studio</title>
        <meta name="description" content="Explore our collaboration projects at Emotional Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MobileNavbar />
      <div className="min-h-screen bg-[#111] text-white relative" style={{ zIndex: 1 }}>
        {/* 헤더 */}
        <header className="pt-20 p-4 flex justify-center items-center border-b border-white/10">
          <h1 
            className="text-2xl font-medium"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Collaboration
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="pb-20">
          {sections.map((section, idx) => (
            <div key={section.title}>
              <section className="py-20">
                {/* Section Title - Full Width */}
                <div className="w-full">
                  {section.effect === 'neon' && (
                    <div className={`${styles.shop1Container} w-full`}>
                      <h2 className={`${styles.shop1} text-3xl font-bold`}>
                        {section.title}
                      </h2>
                    </div>
                  )}
                  {section.effect === 'liquid' && (
                    <div className={`${styles.shop2Container} w-full`}>
                      <h2 className={`${styles.shop2} text-3xl font-bold`}>
                        {section.title}
                      </h2>
                    </div>
                  )}
                  {section.effect === 'typewriter' && (
                    <div className={`${styles.shop3Container} w-full`}>
                      <h2 className={`${styles.shop3} text-3xl font-bold`}>
                        {section.title}
                      </h2>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default MobileCollaboration; 