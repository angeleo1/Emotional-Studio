import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { LiquidGlassHero } from '@/components/ui/LiquidGlass';

const Support: NextPage = () => {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState('faq');
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
      image: "/images/image_fx_ (6)1.jpg"
    },
    {
      status: 'notice',
      type: 'notice',
      title: "New Photography Equipment Introduction",
      date: "2024.02.25",
      isNew: true,
      image: "/images/image_fx_ (7).jpg"
    },
    {
      status: 'notice',
      type: 'notice',
      title: "March Holiday Schedule Announcement",
      date: "2024.02.20",
      isNew: false,
      image: "/images/image_fx_ (8).jpg"
    },
    {
      status: 'notice',
      type: 'notice',
      title: "Studio Renovation Notice",
      date: "2024.02.15",
      isNew: false,
      image: "/images/image_fx_ (8)1.jpg"
    },
    {
      status: 'notice',
      type: 'notice',
      title: "Photography Workshop Registration Open",
      date: "2024.02.10",
      isNew: false,
      image: "/images/44421 (1).jpg"
    },
    {
      status: 'notice',
      type: 'notice',
      title: "Updated Booking System Guide",
      date: "2024.02.05",
      isNew: false,
      image: "/images/44421 (2).jpg"
    },
    {
      status: 'notice',
      type: 'notice',
      title: "New Photo Package Options Available",
      date: "2024.02.01",
      isNew: false,
      image: "/images/44421 (3).jpg"
    }
  ];

  const filteredFaqs = activeFaqTab === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFaqTab);

  const handleQuestionClick = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  useEffect(() => {
    // URL에서 tab 파라미터를 확인하고 해당 탭으로 이동
    const { tab } = router.query;
    if (tab && typeof tab === 'string' && ['faq', 'event', 'notice'].includes(tab)) {
      setActiveMainTab(tab);
    }
  }, [router.query]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="h-screen relative z-10">
        <LiquidGlassHero />
      </section>

      <main className="relative z-10 pt-20 pb-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-rock-salt text-white mb-8">Support</h1>
            <p className="text-xl text-white font-medium max-w-2xl mx-auto">
              Find answers to frequently asked questions about our services
            </p>
          </motion.div>

          {/* Main Tabs */}
          <div className="flex justify-center gap-8 mb-8">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`text-lg font-medium transition-all duration-300 pb-2 border-b-2
                  ${activeMainTab === tab.id
                    ? 'text-orange-500 border-orange-500'
                    : 'text-white border-transparent hover:text-orange-500'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeMainTab === 'faq' && (
            <>
              {/* FAQ Category Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {faqTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFaqTab(tab.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                      ${activeFaqTab === tab.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-white/50 text-white hover:bg-white/70'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="w-full">
                {filteredFaqs.map((faq) => (
                  <div key={faq.question} className="border-b border-white/20">
                    <button
                      onClick={() => handleQuestionClick(faq.question)}
                      className="w-full flex justify-between items-center text-left py-6"
                    >
                      <span className="text-xl font-medium text-white">{faq.question}</span>
                      <FiChevronDown
                        className={`w-6 h-6 text-white transition-transform duration-300 ${
                          openQuestion === faq.question ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openQuestion === faq.question && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pb-6 text-white/80"
                      >
                        {faq.answer}
                  </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeMainTab === 'event' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                    >
                  <div className="overflow-hidden rounded-lg mb-4">
                          <Image
                            src={event.image}
                            alt={event.title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            {event.isNew && (
                    <span className="text-sm font-bold text-orange-500">NEW</span>
                            )}
                    </motion.div>
                  ))}
            </div>
          )}

          {activeMainTab === 'notice' && (
                <div className="space-y-4">
                  {notices.map((notice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg flex items-center justify-between bg-white/5"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white">{notice.title}</h3>
                    <p className="text-sm text-white/60">{notice.date}</p>
                        </div>
                            {notice.isNew && (
                    <span className="text-sm font-bold text-orange-500">NEW</span>
                            )}
                    </motion.div>
                  ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Support; 