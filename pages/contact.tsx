import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import { FaInstagram, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import WavyClipPath from '@/components/WavyClipPath';
import { motion } from 'framer-motion';
import SmoothCurvedLine from '@/components/ui/SmoothCurvedLine';
import ContactPopup from '@/components/ContactPopup';
import { useState } from 'react';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const Contact: NextPage = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const scrollToMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
        <Head>
        <title>Contact | Emotional Studio</title>
        <meta name="description" content="Every Photo Tells a Story, Every Elixir Completes It" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400&family=Borel&display=swap" rel="stylesheet" />
        </Head>
      <SmoothCurvedLine />
      <div className={styles.container}>
        {/* <CurvedColumns /> 삭제 */}
        <main className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ marginBottom: 0, fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
            >
              <span>Every</span> <span className={styles.orangeWord}>Photo</span> Tells <span>a</span> Story
            </motion.h1>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ marginTop: 0, fontWeight: 700, fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
            >
              <span>Every</span> <span className={styles.orangeWord}>Elixir</span> <span>Completes It</span>.
            </motion.h1>

          </div>

          <div className={styles.rightColumn}>
            <div className={styles.contactInfo}>
              <motion.a
                href="mailto:admin@emotionalstudios.com.au"
                className={styles.contactEmail}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '400', 
                  lineHeight: '1.8',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                admin@emotionalstudios.com.au
              </motion.a>
              <motion.div
                className={styles.newsletterTitle}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '400', 
                  lineHeight: '1.8',
                  marginTop: '0.5rem',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Ph. 03 7075 1000
              </motion.div>
            </div>

            <div className={styles.socialSection}>
              <motion.div
                className={styles.socialGrid}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}><FaInstagram className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" /></a>
                <a href="https://www.facebook.com/profile.php?id=61580301939061" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}>
                  <svg className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.xiaohongshu.com/user/profile/61667cf2000000000201bbb1?exSource=https://www.xiaohongshu.com/explore" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}>
                  <img src="/images/rednote.png" alt="Red Note" className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' }} />
                </a>
                <a href="https://www.tiktok.com/@emotional_studios" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}>
                  <svg className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </motion.div>
            </div>

            <div className={styles.newsletterSection}>
              <motion.h2
                className={styles.newsletterTitle}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '400', 
                  lineHeight: '1.8',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Store Address
              </motion.h2>
              <motion.div
                className={styles.newsletterTitle}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '400', 
                  lineHeight: '1.8',
                  marginTop: '0rem',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                2/566 Queensberry Street, North Melbourne, VIC 3051
              </motion.div>
              <motion.button
                onClick={scrollToMap}
                className={styles.viewMapButton}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.6 }}
              >
                <span>View Google Map</span>
                <FaChevronDown className={styles.arrowIcon} />
              </motion.button>
            </div>
          </div>
        </main>
      </div>

      {/* Google Map Section */}
      <motion.div
        id="map-section"
        className={styles.mapSection}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}
      >
        <div className={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=2/566+Queensberry+St,North+Melbourne+VIC+3051&zoom=18"
            width="100%" 
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            title="Emotional Studio Location"
          />
        </div>
      </motion.div>

      {/* ContactPopup 컴포넌트 추가 */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
    </>
  );
};

export default Contact; 