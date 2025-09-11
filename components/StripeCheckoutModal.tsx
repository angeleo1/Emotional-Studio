import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Globe, Shield, Loader2 } from 'lucide-react';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: any;
  amount: number;
  currency?: string;
  onSuccess?: (sessionId: string) => void;
  onError?: (error: string) => void;
}

const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  amount,
  currency = 'aud',
  onSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!bookingData) {
      setError('Booking data is missing');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Creating checkout session with:', { bookingData, amount, currency });
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData,
          amount,
          currency,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        // Stripe Checkout 페이지로 리디렉션
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getPeopleText = (shootingType: string) => {
    const peopleMap: { [key: string]: string } = {
      'test': 'Test Session',
      '1person': '1 Person',
      '2people': '2 People',
      '3people': '3 People',
      '4people': '4 People'
    };
    return peopleMap[shootingType] || shootingType;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Complete Your Booking</h2>
                  <p className="text-sm text-gray-500">Secure payment with Stripe</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Methods Info */}
            <div className="p-6 bg-gray-50 border-b border-gray-200 flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Smartphone className="w-4 h-4" />
                  <span>Apple Pay / Google Pay</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>Global Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>All Major Cards</span>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="p-6 flex-1 overflow-y-auto min-h-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <p className="font-medium text-gray-900">{bookingData.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium text-gray-900">{bookingData.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-medium text-gray-900">{bookingData.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <p className="font-medium text-gray-900">{formatDate(bookingData.date)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Time:</span>
                    <p className="font-medium text-gray-900">{bookingData.time}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Session:</span>
                    <p className="font-medium text-gray-900">{getPeopleText(bookingData.shootingType)}</p>
                  </div>
                </div>

                {/* Additional Options */}
                {(bookingData.colorOption || bookingData.a4print || bookingData.a4frame || 
                  bookingData.digital || bookingData.additionalRetouch > 0) && (
                  <div>
                    <span className="text-gray-500 text-sm">Additional Options:</span>
                    <ul className="mt-1 space-y-1">
                      {bookingData.colorOption && <li className="text-sm text-gray-700">• Color Option (+$10)</li>}
                      {bookingData.a4print && <li className="text-sm text-gray-700">• 4x6" Print (+$10)</li>}
                      {bookingData.a4frame && <li className="text-sm text-gray-700">• 4x6" Frame (+$15)</li>}
                      {bookingData.digital && <li className="text-sm text-gray-700">• Digital Original (+$20)</li>}
                      {bookingData.additionalRetouch > 0 && (
                        <li className="text-sm text-gray-700">
                          • Additional Retouch: {bookingData.additionalRetouch} (+${bookingData.additionalRetouch * 15})
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {bookingData.message && (
                  <div>
                    <span className="text-gray-500 text-sm">Special Requests:</span>
                    <p className="text-sm text-gray-700 mt-1">{bookingData.message}</p>
                  </div>
                )}

                {/* Total Amount */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-orange-600">${amount.toFixed(2)} AUD</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Checkout Button */}
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Payment
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-gray-500 mt-3">
                  You will be redirected to Stripe's secure payment page
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Secure payment protected by SSL and Stripe</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StripeCheckoutModal;
