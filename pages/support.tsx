import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import GlassContainer from '@/components/ui/GlassContainer';

const Support: NextPage = () => {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState<string | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

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
      answer: 'You can make a reservation through our website booking system or by contacting us directly. The process includes selecting your preferred date and time, choosing a photo package, and making a deposit payment.'
    },
    {
      category: 'editing',
      question: 'What is the photo editing process like?',
      answer: 'Our editing process includes color correction, skin retouching, and overall enhancement while maintaining a natural look. We carefully edit each selected photo to ensure the best quality.'
    },
    {
      category: 'photo',
      question: 'Can I request specific editing styles?',
      answer: 'Yes, you can discuss your preferred editing style during the consultation. We offer various styles from natural to artistic edits.'
    },
    {
      category: 'editing',
      question: 'How long does it take to receive the edited photos?',
      answer: 'Typically, it takes 1-2 weeks to receive your edited photos. For rush orders, please contact us to discuss options.'
    },
    {
      category: 'editing',
      question: 'If I want to make changes to the edited photos, what is the process?',
      answer: 'We offer one round of revision for free. Additional revision requests may incur extra charges. Please specify your desired changes clearly.'
    },
    {
      category: 'photo',
      question: 'Do you provide both color and black & white versions of the photos?',
      answer: 'Yes, we can provide both color and black & white versions upon request. Please let us know your preference during the consultation.'
    },
    {
      category: 'editing',
      question: 'Can I get the original unedited photos?',
      answer: `Original unedited photos are available for an additional fee. Please discuss this option with us before your session.`
    },
    {
      category: 'reservation',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, bank transfers, and mobile payments. A deposit is required to secure your booking.'
    },
    {
      category: 'reservation',
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 48 hours before the scheduled session will receive a full refund. Later cancellations may be subject to a cancellation fee.'
    },
    {
      category: 'shooting',
      question: 'What should I prepare before visiting your studio?',
      answer: `We recommend bringing multiple outfits, accessories, and any props you'd like to include. Please arrive 10 minutes early for preparation.`
    }
  ];

  const events = [
    {
      status: 'ongoing',
      type: 'notice',
      title: "SIHYUNHADA 2025 Birthday Event",
      isNew: true,
      image: "/images/gallery-studio-1.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "Pet Day Special Art Poster Event",
      isNew: true,
      image: "/images/gallery-studio-2.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "2025 SIHYUNHADA Regular Event Guide",
      isNew: false,
      image: "/images/gallery-studio-3.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "Bukchon House 1st Anniversary Event",
      isNew: false,
      image: "/images/gallery-event-1.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "Hongdae Space 1st Anniversary Event",
      isNew: false,
      image: "/images/gallery-event-2.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "Student ID Photo Event",
      isNew: false,
      image: "/images/gallery-event-3.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "SIHYUNHADA LA Final Thank You Sale",
      isNew: false,
      image: "/images/gallery-studio-5.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "Premium Package Upgrade Event",
      isNew: false,
      image: "/images/gallery-studio-6.jpg"
    },
    {
      status: 'ongoing',
      type: 'notice',
      title: "Beauty Palace Hair & Makeup Shop Partnership",
      isNew: false,
      image: "/images/gallery-studio-7.jpg"
    }
  ];

  const notices = [
    {
      status: 'new',
      type: 'notice',
      title: "Studio Operating Hours Update",
      date: "2024.03.01",
      isNew: true,
    },
    {
      status: 'notice',
      type: 'notice',
      title: "New Photography Equipment Introduction",
      date: "2024.02.25",
      isNew: true,
    },
    {
      status: 'notice',
      type: 'notice',
      title: "March Holiday Schedule Announcement",
      date: "2024.02.20",
      isNew: false,
    },
    {
      status: 'notice',
      type: 'notice',
      title: "Studio Renovation Notice",
      date: "2024.02.15",
      isNew: false,
    },
    {
      status: 'notice',
      type: 'notice',
      title: "Photography Workshop Registration Open",
      date: "2024.02.10",
      isNew: false,
    },
    {
      status: 'notice',
      type: 'notice',
      title: "Updated Booking System Guide",
      date: "2024.02.05",
      isNew: false,
    },
    {
      status: 'notice',
      type: 'notice',
      title: "New Photo Package Options Available",
      date: "2024.02.01",
      isNew: false,
    }
  ];

  const filteredFaqs = activeFaqTab === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFaqTab);

  const handleQuestionClick = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  useEffect(() => {
    const { tab } = router.query;
    if (tab && typeof tab === 'string' && ['faq', 'event', 'notice'].includes(tab)) {
      setActiveMainTab(tab);
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
        <h1 className="support-title">Supp<span className={"orangeWord"}>o</span>rt</h1>
        <p className="support-description">
              Find answers to frequently asked questions about our services
            </p>
      </div>

      <div className="support-nav-wrapper">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            className={`faq-category-btn${activeMainTab === tab.id ? ' active' : ''}`}
            onClick={() => handleMainTabClick(tab.id)}
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
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredFaqs.map((faq, idx) => (
                  <div key={faq.question} style={{ width: '100%', borderBottom: '1px solid #333', marginBottom: '0.5rem' }}>
                    <div style={{ textAlign: 'left', width: '100%', fontWeight: 700, fontSize: '1.15rem', padding: '1.5rem 2rem', borderRadius: '2rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', background: 'none', color: '#fff', gap: '0.8rem' }}>
                      <span className="faq-orange" style={{ fontSize: '2em', marginRight: '1.2rem', marginLeft: '-1.2rem' }}>?</span>
                      <span>{faq.question}</span>
                    </div>
                    <div style={{ padding: '1rem 2rem', color: '#fff', fontSize: '1rem', background: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                      <span>{faq.answer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeMainTab === 'event' && (
            <div style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {events.map((event) => (
                <div key={event.title} className="support-list-item">
                  {event.title}
                </div>
              ))}
            </div>
          )}

          {activeMainTab === 'notice' && (
            <div style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notices.map((notice) => (
                <div key={notice.title} className="support-list-item">
                  <div>{notice.title}</div>
                  <div style={{fontSize: '0.9rem', color: '#ccc'}}>{notice.date}</div>
                </div>
              ))}
            </div>
          )}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
    </div>
  );
};

export default Support; 