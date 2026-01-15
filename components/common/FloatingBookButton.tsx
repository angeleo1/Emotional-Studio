import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import BookingModal from '../BookingModal';
import { isBookingEnabled } from '../../config/booking';

interface FloatingBookButtonProps {
  onClick?: () => void;
}

export default function FloatingBookButton({ onClick }: FloatingBookButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');
  const bookingEnabled = isBookingEnabled();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  // 예약이 비활성화되어 있으면 버튼을 렌더링하지 않음
  if (!bookingEnabled) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <button
              onClick={handleClick}
              className="group flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label="Book Now"
            >
              <Calendar className="w-6 h-6 group-hover:animate-pulse" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out font-medium">
                Book Now
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
