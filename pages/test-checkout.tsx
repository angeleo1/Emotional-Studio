import { useState } from 'react';
import { motion } from 'framer-motion';
import StripeCheckoutModal from '../components/StripeCheckoutModal';

const TestCheckoutPage = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [testAmount, setTestAmount] = useState(1);

  const testBookingData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '0412345678',
    date: '2024-02-15',
    time: '14:00',
    shootingType: '1person',
    colorOption: true,
    a4print: false,
    a4frame: true,
    digital: true,
    additionalRetouch: 2,
    message: 'Test booking for Stripe Checkout integration'
  };

  const handleCheckoutSuccess = (sessionId: string) => {
    console.log('Checkout successful:', sessionId);
    alert(`Checkout successful! Session ID: ${sessionId}`);
    setShowCheckoutModal(false);
  };

  const handleCheckoutError = (error: string) => {
    console.error('Checkout error:', error);
    alert(`Checkout failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Stripe Checkout Test
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
            onClick={() => setShowCheckoutModal(true)}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            Test Stripe Checkout (${testAmount})
          </button>
          
          <div className="text-center text-gray-300 text-sm space-y-2">
            <p>This will redirect to Stripe's secure checkout page</p>
            <p>Test card: 4242 4242 4242 4242</p>
            <p>Apple Pay / Google Pay will be available if supported</p>
          </div>
        </div>
      </motion.div>

      <StripeCheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        bookingData={testBookingData}
        amount={testAmount}
        currency="aud"
        onSuccess={handleCheckoutSuccess}
        onError={handleCheckoutError}
      />
    </div>
  );
};

export default TestCheckoutPage;
