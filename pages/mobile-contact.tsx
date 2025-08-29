import { NextPage } from 'next';
import Head from 'next/head';
import { FaInstagram, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const MobileContact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Emotional Studio</title>
        <meta name="description" content="Every Photo Tells a Story, Every Elixir Completes It" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
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
            Contact
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="p-4 pb-20">
          <div className="max-w-md mx-auto text-center">
            {/* 메인 타이틀 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-8"
            >
              <h1 
                className="text-6xl sm:text-7xl font-bold mb-4"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
              >
                <span>Every</span> <span className="text-[#FF6100]">Photo</span>
              </h1>
              <h1 
                className="text-6xl sm:text-7xl font-bold mb-4"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
              >
                Tells <span>a</span> Story
              </h1>
              <h1 
                className="text-6xl sm:text-7xl font-bold mb-4"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
              >
                <span>Every</span> <span className="text-[#FF6100]">Elixir</span>
              </h1>
              <h1 
                className="text-6xl sm:text-7xl font-bold mb-6"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
              >
                <span>Completes It</span>.
              </h1>

              
              {/* 가로 선 추가 */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8"></div>
            </motion.div>

            {/* 이메일 연락처 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-12"
            >
              <a
                href="mailto:admin@emotionalstudios.com.au"
                className="text-xl text-[#FF6100] hover:text-white transition-colors duration-300"
                style={{ 
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: '400',
                  letterSpacing: '0.5px',
                  lineHeight: '1.8',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                admin@emotionalstudios.com.au
              </a>
            </motion.div>

            {/* Store Address 섹션 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-12"
            >
              <h2 
                className="text-lg font-bold mb-4"
                style={{ 
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: '400',
                  letterSpacing: '0.5px',
                  lineHeight: '1.8',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Store Address
              </h2>
              <p 
                className="text-lg text-gray-300"
                style={{ 
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: '400',
                  letterSpacing: '0.5px',
                  lineHeight: '1.8',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                2/566 Queensberry Street, West Melbourne, VIC 3051
              </p>
            </motion.div>

            {/* 소셜 미디어 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <h2 
                className="text-lg font-bold mb-6"
                style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
              >
                Follow Us
              </h2>
              <div className="flex justify-center gap-6">
                <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="group">
                  <FaInstagram className="w-8 h-8 text-white group-hover:text-[#FF6100] transition-colors duration-300" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <MobileContactButton />
      </div>
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
    </>
  );
};

export default MobileContact; 