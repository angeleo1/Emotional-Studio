import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import { FaInstagram, FaArrowRight } from 'react-icons/fa';
import WavyClipPath from '@/components/WavyClipPath';
import { motion } from 'framer-motion';
import SmoothCurvedLine from '@/components/ui/SmoothCurvedLine';
import ContactPopup from '@/components/ContactPopup';
import { useState } from 'react';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const Contact: NextPage = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

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
            </div>

            <div className={styles.socialSection}>
              <motion.div
                className={styles.socialGrid}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}><FaInstagram className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" /></a>
                <a href="https://www.facebook.com/profile.php?id=61580301939061" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}>
                  <svg className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
                  marginTop: '1.5rem',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                2/566 Queensberry Street, North Melbourne, VIC 3051
              </motion.div>
            </div>
          </div>
        </main>
      </div>

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