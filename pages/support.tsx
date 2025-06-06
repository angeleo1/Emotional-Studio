import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-[1]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/1 (7).mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Overlay */}
      <div className="fixed inset-0 z-[2] bg-black/40" />

      <Navbar />

      <main className="relative z-10 pt-48 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-rock-salt text-[#2c1711] mb-8">Support</h1>
            <p className="text-xl text-[#2c1711] font-medium max-w-2xl mx-auto">
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
                    ? 'text-[#ff6100] border-[#ff6100]'
                    : 'text-[#2c1711] border-transparent hover:text-[#ff6100]'
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
                        ? 'bg-[#ff6100] text-[#fff0c6] shadow-lg'
                        : 'bg-white/50 text-[#2c1711] hover:bg-white/70'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="max-w-3xl mx-auto space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg"
                  >
                    <button
                      onClick={() => handleQuestionClick(faq.question)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="text-[#2c1711] font-medium">{faq.question}</span>
                      <FiChevronDown
                        className={`w-5 h-5 text-[#ff6100] transition-transform duration-300
                          ${openQuestion === faq.question ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openQuestion === faq.question && (
                      <div className="px-6 pb-4">
                        <p className="text-[#2c1711]">{faq.answer}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {activeMainTab === 'event' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-white/50 rounded-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-6 p-4">
                        {/* Thumbnail Image */}
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#ff6100] text-sm font-medium px-2 py-1 bg-[#ff6100]/10 rounded-full">
                              {event.type}
                            </span>
                            <span className="text-emerald-600 text-sm font-medium px-2 py-1 bg-emerald-50 rounded-full">
                              {event.status}
                            </span>
                            {event.isNew && (
                              <span className="text-blue-600 text-sm font-medium px-2 py-1 bg-blue-50 rounded-full">
                                new
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-medium text-[#2c1711] group-hover:text-[#ff6100] transition-colors">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                        ${page === 1
                          ? 'bg-[#ff6100] text-white'
                          : 'text-[#2c1711] hover:bg-[#ff6100]/10'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'notice' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  {notices.map((notice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-white/50 rounded-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-6 p-4">
                        {/* Thumbnail Image */}
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={notice.image}
                            alt={notice.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#ff6100] text-sm font-medium px-2 py-1 bg-[#ff6100]/10 rounded-full">
                              {notice.type}
                            </span>
                            <span className="text-emerald-600 text-sm font-medium px-2 py-1 bg-emerald-50 rounded-full">
                              {notice.date}
                            </span>
                            {notice.isNew && (
                              <span className="text-blue-600 text-sm font-medium px-2 py-1 bg-blue-50 rounded-full">
                                new
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-medium text-[#2c1711] group-hover:text-[#ff6100] transition-colors">
                            {notice.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                        ${page === 1
                          ? 'bg-[#ff6100] text-white'
                          : 'text-[#2c1711] hover:bg-[#ff6100]/10'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Support; 