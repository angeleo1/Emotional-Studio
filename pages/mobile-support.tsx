전ㅇimport { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';

const MobileSupport: NextPage = () => {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState<string | null>('faq');
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
      type: 'event',
      title: "Summer Collection Photo Session",
      isNew: false,
      image: "/images/gallery-studio-3.jpg"
    }
  ];

  const notices = [
    {
      date: '2025-01-15',
      title: 'Studio Maintenance Notice',
      content: 'Our studio will be closed for maintenance on January 20th, 2025.'
    },
    {
      date: '2025-01-10',
      title: 'New Equipment Installation',
      content: 'We have upgraded our lighting equipment for better photo quality.'
    },
    {
      date: '2025-01-05',
      title: 'Holiday Schedule Update',
      content: 'Please check our updated holiday schedule for the new year.'
    }
  ];

  const handleQuestionClick = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
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
              <div className="space-y-4">
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
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
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
                  <div className="relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    {event.isNew && (
                      <span className="absolute top-2 right-2 bg-[#FF6100] text-white text-xs px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{event.title}</h3>
                    <span className="text-[#FF6100] text-sm">{event.status}</span>
                  </div>
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
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{notice.title}</h3>
                    <span className="text-gray-400 text-sm">{notice.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{notice.content}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileContactButton />
    </>
  );
};

export default MobileSupport; 