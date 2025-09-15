import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const BookingCancel = () => {
  const router = useRouter();

  const handleBackToBooking = () => {
    router.back();
  };

  const handleTryAgain = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#111' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border border-white/20 text-center"
      >
        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
            <div className="relative w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <XCircle className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Cancel Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Payment Cancelled
          </h1>
          <p className="text-2xl text-white">Your booking was not completed</p>
          <p className="text-xl text-gray-300">No charges have been made to your account</p>
        </motion.div>

        {/* Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">What happened?</h2>
          <div className="space-y-3 text-gray-300 text-left">
            <p>• You cancelled the payment process</p>
            <p>• Your session time slot is still available</p>
            <p>• No booking has been created</p>
            <p>• You can try again anytime</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleBackToBooking}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Booking
          </button>
          <button
            onClick={handleTryAgain}
            className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 pt-6 border-t border-white/20"
        >
          <p className="text-gray-400 text-sm">
            Need help? Contact us at{' '}
            <a href="mailto:info@emotionalstudio.com" className="text-orange-400 hover:text-orange-300">
              info@emotionalstudio.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingCancel;
