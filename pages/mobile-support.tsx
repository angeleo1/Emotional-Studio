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
      title: "Grand Opening Event",
      content: "Celebrate Our Grand Opening!\n\nTo celebrate our new beginning, we're giving you a month of amazing perks! From October 1st to October 31st, take advantage of these exclusive offers.\n\nFollow & Print: Follow our official Instagram or Xiaohongshu page and get a free print of one of your photos!\n\nReview & Frame: After your photo shoot, leave a quick review on Google and we'll give you a free framed photo.\n\nShare & Earn: Share your favorite photos from your session on social media and receive a special bonus reward!",
      images: ["/images/emotional-banana-1758193888425.png", "/images/Galllery/STUDIO/studiosample.png"]
    },
    {
      title: "Business Card Event",
      content: "Got Our Card? Get a Free Frame!\n\nDid you receive one of our special business cards? Don't lose it! That card is your ticket to a free gift. Just present the card when you book your photo shoot with us, and we'll give you a beautiful black frame with your favorite photo as a token of our appreciation.",
      images: ["/images/Black frame.png", "/images/emotional-banana-1758194237727.png"]
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
      content: "Once your session is complete, an iPad will pop up for photo selection.\n\nYou can select 2 of your favorite photos to print, which are included with your session.\n\nIf you'd like to purchase additional prints or products like frames, you can do so on-site.\n\nPhoto printing will begin as soon as you are finished with your selection."
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
                        className="px-4 pb-4 overflow-auto max-h-80"
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
                            <div className="text-center mb-4">
                              <div className="flex gap-2 justify-center flex-wrap">
                                {event.images.map((image, index) => (
                                  <Image
                                    key={index}
                                    src={image}
                                    alt={`${event.title} ${index + 1}`}
                                    width={200}
                                    height={120}
                                    className="max-w-full h-auto rounded-lg shadow-lg"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          {event.image && !event.images && (
                            <div className="flex justify-center items-center mb-4 w-full">
                              <Image
                                src={event.image}
                                alt={event.title}
                                width={250}
                                height={150}
                                className="max-w-full h-auto rounded-lg shadow-lg mx-auto block"
                              />
                            </div>
                          )}
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
