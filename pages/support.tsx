import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { FaInstagram, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import GlassContainer from '@/components/ui/GlassContainer';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const Support: NextPage = () => {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState<string | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [openEvent, setOpenEvent] = useState<string | null>(null);
  const [openNotice, setOpenNotice] = useState<string | null>(null);

  const mainTabs = [
    { id: 'faq', label: 'FAQ' },
    { id: 'event', label: 'Events' },
    { id: 'notice', label: 'Notice' }
  ];

  const faqTabs = [
    { id: 'all', label: 'All' },
    { id: 'system', label: 'System Touch' },
    { id: 'photo', label: 'Photo Rules' },
    { id: 'reservation', label: 'Reservation' },
    { id: 'shooting', label: 'Shooting' },
    { id: 'editing', label: 'Editing' }
  ];

  const faqs = [
    {
      category: 'system',
      question: 'How can I make a reservation for a photo session? What is the process?',
      answer: 'You can make a reservation by clicking "Book Now" button. The detailed process and service information are available on our services page for your reference.\n\nIf you have any questions, feel free to DM us! We will reply as soon as possible.'
    },

    {
      category: 'photo',
      question: 'Can I retouch the selected photos by myself?',
      answer: 'Basically, emotional studios will retouch your selected photos. If you want to retouch by yourself, add \'Digital original film\' on your purchase then, you can edit your photos.'
    },
    {
      category: 'editing',
      question: 'How long does it take to receive the edited photos?',
      answer: 'If you want to receive your photos on the same day, pickup is available at least 30 minutes after the shoot. However, if you have additional retouch or print services, it may take up to 1 day depending on the quantity'
    },

    {
      category: 'photo',
      question: 'Do you provide both color and black & white versions of the photos?',
      answer: 'Find your perfect tone! Choose one concept from Warm tone, Cool tone, or Black & White at no extra cost! (One concept per session only) Check out our services page to see the mood of each tone!'
    },
    {
      category: 'editing',
      question: 'Can I get the original unedited photos?',
      answer: 'You can add original digital film as an additional purchase to receive all your shots with basic retouching!'
    },
    {
      category: 'reservation',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards only for all services. For additional goods and services, you can purchase them on-site with credit cards as well. Please note that we operate on a booking-only basis to ensure the best experience for everyone.'
    },

    {
      category: 'shooting',
      question: 'What should I prepare before visiting your studio?',
      answer: `Prepare the tone of the photos you want to take, your most beautiful outfit, and an excited feeling. Since we're booking only and the shooting time is only 20 minutes, being late may result in reduced shooting time.`
    }
  ];

  const events = [
    {
      title: "Grand Opening Event",
      content: "To celebrate our new studio, we're giving you 20% off your photo session. Capture your special moments with us and enjoy this exclusive offer for a limited time.\n\nBook your session today and enter the code: EMOTIONAL",
      images: ["/images/emotional-banana-1758193888425.png", "/images/003.png"]
    },
    {
      title: "Follow & Review Event",
      content: (
        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            <p className="text-lg font-semibold">Get a free frame after your session!</p>
            <div className="space-y-3">
              <p className="font-medium">Here's how:</p>
              <div className="space-y-2">
                <p>• Follow us on Instagram or Red Note</p>
                <p>• Leave a Google review</p>
                <p>• Show us after your session</p>
              </div>
            </div>
            <p className="text-gray-300">That's it! We'll give you a beautiful frame for free. Perfect way to display your favorite photo from the session.</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <a href="https://www.instagram.com/emotional_studios/" target="_blank" rel="noopener noreferrer" className="group">
              <FaInstagram className="w-12 h-12" style={{ color: '#ffffff', fill: '#ffffff' }} />
            </a>
            <a href="https://www.xiaohongshu.com/user/profile/61667cf2000000000201bbb1?exSource=https://www.xiaohongshu.com/explore" target="_blank" rel="noopener noreferrer" className="group">
              <img src="/images/rednote.png" alt="Red Note" className="w-12 h-12 group-hover:opacity-80 transition-opacity duration-300" style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' }} />
            </a>
            <a href="https://g.page/r/CYJFyuFmHjkyEAI/review" target="_blank" rel="noopener noreferrer" className="group">
              <FaGoogle className="w-12 h-12" style={{ color: '#ffffff', fill: '#ffffff' }} />
            </a>
          </div>
        </div>
      ),
      images: ["/images/554579336_2217374262092330_3022836486883862570_n.jpg", "/images/leobom_modern_loyalty_card_design_matte_background_with_subtl_98ad2255-358d-48fa-8b91-d5d4c742017a_1.png"]
    }
  ];

  const notices = [
    {
      title: "Before You Begin",
      content: "Our camera and lighting are pre-calibrated for the best results, so there is no need to adjust them.\n\nFeel free to use a variety of props! Please kindly return them to their original spot once you're done."
    },
    {
      title: "During Your Session",
      content: "This is your own private space, free from a photographer's presence.\n\nThe wired remote is your shutter button. Just press it to take a photo.\n\nYour reflection and recent shots are shown on the screen. Feel free to use it as a reference for your poses!\n\nA sandglass timer on the screen will count down your session time. Relax and enjoy your moment!\n\nPlease handle all props and equipment with care. Intentional damage will result in a damage claim."
    },
    {
      title: "After Your Session",
      content: "Once your session is complete, an iPad will pop up for photo selection.\n\nYou can select 2 of your favourite photos to print, which are included with your session.\n\nIf you'd like to purchase additional prints or products like frames, you can do so on-site.\n\nPhoto printing will begin as soon as you are finished with your selection."
    }
  ];

  const filteredFaqs = activeFaqTab === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFaqTab);

  const handleQuestionClick = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const handleEventClick = (eventTitle: string) => {
    setOpenEvent(openEvent === eventTitle ? null : eventTitle);
  };

  const handleNoticeClick = (noticeTitle: string) => {
    setOpenNotice(openNotice === noticeTitle ? null : noticeTitle);
  };

  useEffect(() => {
    const { tab, event } = router.query;
    if (tab && typeof tab === 'string' && ['faq', 'event', 'notice'].includes(tab)) {
      setActiveMainTab(tab);
    }
    if (event && typeof event === 'string' && event === 'grand-opening') {
      setOpenEvent('Grand Opening Event');
    }
  }, [router.query]);

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(activeMainTab === tabId ? null : tabId);
  };

  return (
    <div className={`glass-page-background${activeMainTab === 'faq' ? ' faq-bg' : ''}${activeMainTab === 'event' ? ' event-bg' : ''}${activeMainTab === 'notice' ? ' notice-bg' : ''} ${activeMainTab ? 'layout-active' : ''}`}>
      <Head>
        <title>Support | Emotional Studio</title>
        <meta name="description" content="Find answers and support for Emotional Studio services" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Borel&display=swap" rel="stylesheet" />
        <svg style={{ display: 'none' }}>
          <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="120" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </Head>
      
      <div className="support-title-wrapper" style={{ marginTop: '2rem' }}>
        <h1 className="support-title" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>Supp<span className={"orangeWord"}>o</span>rt</h1>
        <p className="support-description" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
              Find answers to frequently asked questions about our services
            </p>
      </div>

      <div className="support-nav-wrapper">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            className={`faq-category-btn${activeMainTab === tab.id ? ' active' : ''}`}
            onClick={() => handleMainTabClick(tab.id)}
            style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`support-content-wrapper${activeMainTab ? ' active-section-bg' : ''}`}>
        <AnimatePresence>
          {activeMainTab && (
            <motion.div
              key={activeMainTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}
            >
          {activeMainTab === 'faq' && (
            <>
              <div className="faq-tab-row">
                {faqTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`faq-category-btn${activeFaqTab === tab.id ? ' active' : ''}`}
                    onClick={() => setActiveFaqTab(tab.id)}
                    style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div 
                className="faq-scroll-container"
                style={{ 
                  width: '100%', 
                  maxWidth: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  paddingRight: '1rem'
                }}
              >
                {filteredFaqs.map((faq, idx) => (
                  <div key={faq.question} style={{ width: '100%', marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => handleQuestionClick(faq.question)}
                      className={`faq-category-btn faq-question-btn${openQuestion === faq.question ? ' active' : ''}`}
                      style={{ 
                        textAlign: 'left', 
                        width: '100%', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'
                      }}
                    >
                      <span>{faq.question}</span>
                      <FiChevronDown 
                        style={{
                          transform: openQuestion === faq.question ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {openQuestion === faq.question && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            height: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
                            opacity: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
                          }}
                          style={{ 
                            padding: '1rem 2rem', 
                            color: '#fff', 
                            fontSize: '1rem', 
                            background: 'none', 
                            overflow: 'hidden'
                          }}
                        >
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                              delay: 0.2, 
                              duration: 0.4, 
                              ease: [0.4, 0.0, 0.2, 1] 
                            }}
                          >
                            <p style={{ margin: 0, lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                              {faq.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeMainTab === 'event' && (
            <div style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {events.map((event) => (
                <div key={event.title} style={{ width: '100%', marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => handleEventClick(event.title)}
                    className={`faq-category-btn faq-question-btn${openEvent === event.title ? ' active' : ''}`}
                    style={{ 
                      textAlign: 'left', 
                      width: '100%', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}
                  >
                    <span>{event.title}</span>
                    <FiChevronDown 
                      style={{
                        transform: openEvent === event.title ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {openEvent === event.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          height: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
                          opacity: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
                        }}
                        style={{ 
                          padding: '1rem 2rem', 
                          color: '#fff', 
                          fontSize: '1rem', 
                          background: 'none', 
                          overflow: 'auto',
                          maxHeight: '400px'
                        }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ 
                            delay: 0.2, 
                            duration: 0.4, 
                            ease: [0.4, 0.0, 0.2, 1] 
                          }}
                        >
                          {event.images && event.images.length > 0 && (
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {event.images.map((image, index) => (
                                  <Image
                                    key={index}
                                    src={image}
                                    alt={`${event.title} ${index + 1}`}
                                    width={250}
                                    height={150}
                                    style={{ 
                                      maxWidth: '100%', 
                                      height: 'auto', 
                                      borderRadius: '8px',
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          {event.image && !event.images && (
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'center', 
                              alignItems: 'center',
                              marginBottom: '1rem',
                              width: '100%'
                            }}>
                              <Image
                                src={event.image}
                                alt={event.title}
                                width={300}
                                height={200}
                                style={{ 
                                  maxWidth: '100%', 
                                  height: 'auto', 
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                  display: 'block',
                                  margin: '0 auto'
                                }}
                              />
                            </div>
                          )}
                          <div style={{ margin: 0, lineHeight: '1.6' }}>
                            {typeof event.content === 'string' ? (
                              <p style={{ whiteSpace: 'pre-line' }}>{event.content}</p>
                            ) : (
                              event.content
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {activeMainTab === 'notice' && (
            <div style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notices.map((notice) => (
                <div key={notice.title} style={{ width: '100%', marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => handleNoticeClick(notice.title)}
                    className={`faq-category-btn faq-question-btn${openNotice === notice.title ? ' active' : ''}`}
                    style={{ 
                      textAlign: 'left', 
                      width: '100%', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}
                  >
                    <span>{notice.title}</span>
                    <FiChevronDown 
                      style={{
                        transform: openNotice === notice.title ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {openNotice === notice.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          height: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
                          opacity: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
                        }}
                        style={{ 
                          padding: '1rem 2rem', 
                          color: '#fff', 
                          fontSize: '1rem', 
                          background: 'none', 
                          overflow: 'hidden'
                        }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ 
                            delay: 0.2, 
                            duration: 0.4, 
                            ease: [0.4, 0.0, 0.2, 1] 
                          }}
                        >
                          <p style={{ margin: 0, lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                            {notice.content}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        
        {/* Floating Book Button */}
        <FloatingBookButton />
        
    </div>
  );
};

export default Support;

<style jsx global>{`
  .force-white-icon {
    color: white !important;
    fill: white !important;
  }
  .force-white-icon * {
    color: white !important;
    fill: white !important;
  }
  .force-white-icon svg {
    color: white !important;
    fill: white !important;
  }
`}</style> 