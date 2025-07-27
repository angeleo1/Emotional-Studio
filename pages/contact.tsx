import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import { FaTiktok, FaYoutube, FaFacebookF, FaInstagram, FaArrowRight } from 'react-icons/fa';
import WavyClipPath from '@/components/WavyClipPath';
import { motion } from 'framer-motion';
import SmoothCurvedLine from '@/components/ui/SmoothCurvedLine';
import ContactPopup from '@/components/ContactPopup';
import { useState } from 'react';

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
              style={{ marginBottom: 0 }}
            >
              <span>Every</span> <span className={styles.orangeWord}>Photo</span> Tells <span>a</span> Story
            </motion.h1>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ marginTop: 0, fontWeight: 700 }}
            >
              <span>Every</span> <span className={styles.orangeWord}>Elixir</span> <span>Completes It</span>.
            </motion.h1>
            <motion.p
              className={styles.strapline}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Precious Moments in e.st
            </motion.p>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.contactInfo}>
              <motion.a
                href="mailto:admin@emotionalstudios.com.au"
                className={styles.contactEmail}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
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
                <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}><FaTiktok className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" /></a>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}><FaFacebookF className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" /></a>
                <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}><FaInstagram className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" /></a>
                <a href="https://www.youtube.com/channel/UCiD4_8JWUt24lkJwYMum8NA" target="_blank" rel="noopener noreferrer" className={styles.socialLink + ' group'}><FaYoutube className="w-7 h-7 text-white group-hover:text-[#ff6100] transition-colors duration-300" /></a>
              </motion.div>
            </div>

            <div className={styles.newsletterSection}>
              <motion.h2
                className={styles.newsletterTitle}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                Collaboration Inquiry
              </motion.h2>
              <motion.form
                className={styles.newsletterForm}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsContactPopupOpen(true);
                }}
              >
                <input type="email" placeholder="Your Email Address" className={styles.newsletterInput} />
                <button type="submit" className={styles.submitButton}>
                  <FaArrowRight />
                </button>
              </motion.form>
            </div>
          </div>
        </main>
      </div>

      {/* ContactPopup 컴포넌트 추가 */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
    </>
  );
};

export default Contact; 