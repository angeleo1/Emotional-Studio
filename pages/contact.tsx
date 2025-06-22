import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import { FaTiktok, FaYoutube, FaFacebookF, FaInstagram, FaArrowRight } from 'react-icons/fa';
import WavyClipPath from '@/components/WavyClipPath';

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Emotional Studio</title>
        <meta name="description" content="Every Photo Tells a Story, Every Elixir Completes It" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400&family=Borel&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.container}>
        <WavyClipPath clipId="wavy-divider" />
        <main className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <h1 className={styles.title}>
              <span>Every</span> Photo Tells <span>a</span> Story,
              <br/>
              <span>Every</span> Elixir <span>Completes It</span>.
            </h1>
            <p className={styles.strapline}>Precious Moments in e.st</p>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.contactInfo}>
              <a href="mailto:info@emotionalstudio.com" className={styles.contactEmail}>
                info@emotionalstudio.com
              </a>
            </div>

            <div className={styles.socialSection}>
              <div className={styles.socialGrid}>
                <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaTiktok />&nbsp;TikTok</a>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaFacebookF />&nbsp;Facebook</a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaInstagram />&nbsp;Instagram</a>
                <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FaYoutube />&nbsp;YouTube</a>
              </div>
            </div>

            <div className={styles.newsletterSection}>
              <h2 className={styles.newsletterTitle}>Collaboration Inquiry</h2>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Your Email Address" className={styles.newsletterInput} />
                <button type="submit" className={styles.submitButton}>
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact; 