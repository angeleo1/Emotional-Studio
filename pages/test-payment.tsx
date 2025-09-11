import { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentMethodModal from '../components/PaymentMethodModal';

const TestPaymentPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [testAmount, setTestAmount] = useState(1);

  const handlePaymentSuccess = (paymentIntent: any) => {
    console.log('Payment successful:', paymentIntent);
    alert(`Payment successful! Payment ID: ${paymentIntent.id}`);
    setShowPaymentModal(false);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Payment Test
        </h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Test Amount (AUD)
            </label>
            <input
              type="number"
              value={testAmount}
              onChange={(e) => setTestAmount(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              min="1"
              step="0.01"
            />
          </div>
          
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            Test Payment (${testAmount})
          </button>
          
          <div className="text-center text-gray-300 text-sm">
            <p>This is a test page for payment integration.</p>
            <p>Use test card: 4242 4242 4242 4242</p>
          </div>
        </div>
      </motion.div>

      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={testAmount}
        currency="aud"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
};

export default TestPaymentPage;
