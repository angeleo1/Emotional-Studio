// Mobile support page
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import FloatingBookButton from '@/components/common/FloatingBookButton';

const MobileSupport: NextPage = () => {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState<string | null>('faq');
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
      answer: 'You can make a reservation by visiting our booking page. The detailed process and service information are available on our services page for your reference.\n\nIf you have any questions, feel free to DM us! We will reply as soon as possible.'
    },

    {
      category: 'photo',
      question: 'Can I request specific editing styles?',
      answer: 'Yes, you can discuss your preferred editing style during the consultation. We offer various styles from natural to artistic edits. You can also select additional retouch options during booking or purchase them when you visit our studio!'
    },
    {
      category: 'editing',
      question: 'How long does it take to receive the edited photos?',
      answer: 'If you want to receive your photos on the same day, you can pick them up after waiting about 30 minutes after the shoot. However, if you have additional retouch or print services, it may take up to 1 day depending on the quantity.'
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
      title: "Sample1",
      content: "Sample content for event 1"
    },
    {
      title: "Sample2",
      content: "Sample content for event 2"
    },
    {
      title: "Sample3",
      content: "Sample content for event 3"
    }
  ];

  const notices = [
    {
      title: "Sample1",
      content: "Sample content for notice 1"
    },
    {
      title: "Sample2",
      content: "Sample content for notice 2"
    },
    {
      title: "Sample3",
      content: "Sample content for notice 3"
    }
  ];

  const handleQuestionClick = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const handleEventClick = (eventTitle: string) => {
    setOpenEvent(openEvent === eventTitle ? null : eventTitle);
  };

  const handleNoticeClick = (noticeTitle: string) => {
    setOpenNotice(openNotice === noticeTitle ? null : noticeTitle);
  };

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId);
  };

  const filteredFaqs = activeFaqTab === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFaqTab);

  return (
    <>
      <Head>
        <title>Support | Emotional Studio</title>
        <meta name="description" content="Get help and support from Emotional Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            Support
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="p-4 pb-20">
          {/* 메인 탭 */}
          <div className="flex gap-3 mb-6 justify-center">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleMainTabClick(tab.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-200 border-2 ${
                  activeMainTab === tab.id
                    ? 'border-[#FF6100] text-[#FF6100]'
                    : 'border-white/20 text-white hover:border-white/40'
                }`}
                style={{
                  fontSize: '1rem',
                  fontFamily: 'CS-Valcon-Drawn-akhr7k',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* FAQ 섹션 */}
          {activeMainTab === 'faq' && (
            <div>
              {/* FAQ 서브 탭 */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {faqTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFaqTab(tab.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      activeFaqTab === tab.id
                        ? 'border-[#FF6100] text-[#FF6100]'
                        : 'border-white/20 text-white hover:border-white/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* FAQ 리스트 */}
              <div 
                className="faq-scroll-container space-y-4" 
                style={{
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  paddingRight: '0.5rem'
                }}
              >
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => handleQuestionClick(faq.question)}
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-white/10 transition-colors"
                    >
                      <span className="text-sm font-medium">{faq.question}</span>
                      <FiChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          openQuestion === faq.question ? 'rotate-180' : ''
                        }`}
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
                          className="px-4 pb-4 overflow-hidden"
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
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Events 섹션 */}
          {activeMainTab === 'event' && (
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => handleEventClick(event.title)}
                    className={`w-full text-left p-4 transition-all duration-200 ${
                      openEvent === event.title ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{event.title}</h3>
                      <FiChevronDown 
                        className={`transition-transform duration-300 ${
                          openEvent === event.title ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
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
                        className="px-4 pb-4 overflow-hidden"
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
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {event.content}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* Notice 섹션 */}
          {activeMainTab === 'notice' && (
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => handleNoticeClick(notice.title)}
                    className={`w-full text-left p-4 transition-all duration-200 ${
                      openNotice === notice.title ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{notice.title}</h3>
                      <FiChevronDown 
                        className={`transition-transform duration-300 ${
                          openNotice === notice.title ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
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
                        className="px-4 pb-4 overflow-hidden"
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
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {notice.content}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileContactButton />
      
      {/* Floating Book Button */}
      <FloatingBookButton />
      
    </>
  );
};

export default MobileSupport; 
