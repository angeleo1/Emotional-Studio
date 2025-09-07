import { motion } from 'framer-motion';
import { BOOKING_CONFIG } from '../config/booking';
import { useRouter } from 'next/router';

interface BookingDisabledProps {
  className?: string;
}

const BookingDisabled: React.FC<BookingDisabledProps> = ({ className = '' }) => {
  const router = useRouter();
  const locale = 'en'; // Always use English

  const message = BOOKING_CONFIG.DISABLED_MESSAGE[locale as keyof typeof BOOKING_CONFIG.DISABLED_MESSAGE] || 
                  BOOKING_CONFIG.DISABLED_MESSAGE.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center justify-center min-h-[50vh] p-8 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-8"
      >
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-orange-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}
      >
        Booking Service Temporarily Unavailable
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed"
      >
        {message}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={() => router.push('/contact')}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 font-medium"
        >
          Contact Us
        </button>
        
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BookingDisabled;
