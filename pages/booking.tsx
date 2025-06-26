import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/booking.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Booking: NextPage = () => {
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null as Date | null,
    time: '',
    shootingType: '',
    colorOption: false,
    otherGoods: {
      a4print: false,
      a4frame: false,
      digital: false,
      calendar: false
    },
    message: ''
  });

  useEffect(() => {
    if (isBookingVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isBookingVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'colorOption') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({
        ...prev,
        otherGoods: { ...prev.otherGoods, [name]: checked }
      }));
    }
  };


  const handleEnterClick = () => {
    setIsBookingVisible(true);
  };

  const textContent = [
    { type: 'line', text: "This is more than just a studio;" },
    { type: 'line', text: [
      { text: "it's a sanctuary where " },
      { text: "artistry", isOrange: true },
      { text: " meets " },
      { text: "comfort", isOrange: true },
      { text: "." }
    ]},
    { type: 'line', text: "Every corner is designed to inspire your creativity" },
    { type: 'line', text: [
      { text: "and capture your most " },
      { text: "authentic moments", isOrange: true },
      { text: "." }
    ]},
    { type: 'line', text: "Begin your own story here." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Head>
        <title>Booking | Emotional Studio</title>
        <meta name="description" content="Book a session with Emotional Studio for a unique photographic experience." />
      </Head>
      <AnimatePresence mode="wait">
        {!isBookingVisible ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className={`${styles.mainContainer} ${styles.noScroll}`}>
              <div className={styles.gridContainer}>
                <motion.div 
                  className={styles.mainTitle} 
                  id="creativity-text"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {textContent.map((line, lineIndex) => (
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + lineIndex * 0.25,
                        duration: 0.7,
                        ease: 'easeOut',
                      }}
                      style={{ overflow: 'hidden' }}
                    >
                      <motion.p>
                        {Array.isArray(line.text) ? (
                          line.text.map((segment, segmentIndex) => (
                            <span key={segmentIndex} className={segment.isOrange ? styles.orangeText : ''}>
                              {segment.text}
                            </span>
                          ))
                        ) : (
                          line.text
                        )}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
                <div className={styles.imageContainer} style={{ background: '#111' }}>
                  <Image
                    src="/images/landing.png"
                    alt="Studio concept image"
                    width={800}
                    height={800}
                    className={styles.mainImage}
                    priority
                  />
                  <button className={styles.clickButton} onClick={handleEnterClick}>
                    Click
                  </button>
                </div>
              </div>

              <footer className={styles.footer}>
                <div className={styles.coordinates}>Emotional Studio</div>
                <div className={styles.mysteriousMessage}>Capture Your True Essence</div>
              </footer>
              </div>
          </motion.div>
        ) : (
          <motion.div
            key="booking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.mainContainer}>
                <section ref={bookingFormRef} className={styles.bookingSection}>
                  <div className={styles.bookingGrid}>
                    <h2 className={styles.bookingTitle}>
                      Book Your Sessio<span className={styles.skewedN}>n</span>
                    </h2>
                    
                    <div className={styles.formColumn}>
                      <h3 className={styles.formSectionTitle}>I. Session Details</h3>
                      <div className={styles.formControl}>
                        <label htmlFor="shootingType">Shooting Type</label>
                        <select id="shootingType" name="shootingType" value={formData.shootingType} onChange={handleChange} required>
                          <option value="" disabled>Select...</option>
                            <option value="solo">Solo : $55</option>
                            <option value="couple">Couple : $98</option>
                            <option value="triple">Triple : $150</option>
                          <option value="more">or More (Contact)</option>
                          </select>
                </div>
                      <div className={styles.formControl}>
                        <label htmlFor="date">Preferred Date</label>
                        <DatePicker selected={formData.date} onChange={handleDateChange} dateFormat="MMMM d, yyyy" minDate={new Date()} placeholderText="Select a date" required />
                </div>
                       <div className={styles.formControl}>
                        <label htmlFor="time">Preferred Time</label>
                        <select id="time" name="time" value={formData.time} onChange={handleChange} required>
                          <option value="" disabled>Select...</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>
                        <div className={styles.formControl}>
                          <div className={styles.snsContainer}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.snsIconWrapper}>
                              <div className={styles.baseIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg>
              </div>
                              <div className={`${styles.glitchLayer} ${styles.glitchLayer1}`}><svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg></div>
                              <div className={`${styles.glitchLayer} ${styles.glitchLayer2}`}><svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 256 256"><path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"/></svg></div>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.snsIconWrapper}>
                              <div className={styles.baseIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="54" width="54"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg>
                  </div>
                              <div className={`${styles.glitchLayer} ${styles.glitchLayer1}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="54" width="54"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg></div>
                              <div className={`${styles.glitchLayer} ${styles.glitchLayer2}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="54" width="54"><circle cx="18" cy="18" r="18" fill="currentColor"/><path fill="black" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"/></svg></div>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.snsIconWrapper}>
                              <div className={styles.baseIcon}>
                                <svg viewBox="0 0 256 180" width="54" height="54" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
                  </div>
                              <div className={`${styles.glitchLayer} ${styles.glitchLayer1}`}><svg viewBox="0 0 256 180" width="54" height="54" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg></div>
                              <div className={`${styles.glitchLayer} ${styles.glitchLayer2}`}><svg viewBox="0 0 256 180" width="54" height="54" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><rect width="256" height="180" rx="36" fill="currentColor"/><path fill="black" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg></div>
                            </a>
                  </div>
                </div>
              </div>

                    <div className={styles.formColumn}>
                      <h3 className={styles.formSectionTitle}>II. Your Information</h3>
                      <div className={styles.formControl}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className={styles.formControl}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className={styles.formControl}>
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                      </div>
                      <div className={styles.submitContainer}>
                        <button type="submit" className={styles.submitButton}>
                          Submit
                        </button>
                      </div>
                    </div>

                    <div className={styles.formColumn}>
                      <h3 className={styles.formSectionTitle}>III. Options & Goods</h3>
                      <div className={styles.formCheckboxGroup}>
                        <div className={styles.checkboxControl}>
                          <input id="colorOption" name="colorOption" type="checkbox" checked={formData.colorOption} onChange={handleCheckboxChange} />
                          <label htmlFor="colorOption">Colour Option (+$10)</label>
                          </div>
                        <div className={styles.checkboxControl}>
                          <input id="a4print" name="a4print" type="checkbox" checked={formData.otherGoods.a4print} onChange={handleCheckboxChange} />
                          <label htmlFor="a4print">A4 Print ($10)</label>
                          </div>
                        <div className={styles.checkboxControl}>
                          <input id="a4frame" name="a4frame" type="checkbox" checked={formData.otherGoods.a4frame} onChange={handleCheckboxChange} />
                          <label htmlFor="a4frame">A4 Frame ($15)</label>
                          </div>
                        <div className={styles.checkboxControl}>
                          <input id="digital" name="digital" type="checkbox" checked={formData.otherGoods.digital} onChange={handleCheckboxChange} />
                          <label htmlFor="digital">Original Digital Film ($20)</label>
                          </div>
                        <div className={styles.checkboxControl}>
                          <input id="calendar" name="calendar" type="checkbox" checked={formData.otherGoods.calendar} onChange={handleCheckboxChange} />
                          <label htmlFor="calendar">Calendar ($45)</label>
                        </div>
                      </div>
                       <h3 className={`${styles.formSectionTitle} ${styles.marginTop}`}>IV. Additional Information</h3>
                       <div className={styles.formControl}>
                        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Any special requests or comments?" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Booking; 