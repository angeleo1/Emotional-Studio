import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Globe, Shield, Loader2, CheckCircle } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { paypalOptions } from '../lib/paypal';

interface PayPalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: any;
  amount: number;
  currency?: string;
  onSuccess?: (orderId: string) => void;
  onError?: (error: string) => void;
}

const PayPalButtonWrapper: React.FC<{
  bookingData: any;
  amount: number;
  currency: string;
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
  onClose: () => void;
}> = ({ bookingData, amount, currency, onSuccess, onError, onClose }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = async (data: any, actions: any) => {
    try {
      console.log('Creating PayPal order with:', { bookingData, amount, currency });
      
      const response = await fetch('/api/paypal/create-order', {
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
        throw new Error(errorData.message || 'Failed to create order');
      }

      const result = await response.json();
      console.log('PayPal order created:', result);
      return result.orderId;
    } catch (error) {
      console.error('PayPal order creation error:', error);
      onError(error instanceof Error ? error.message : 'Failed to create order');
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      setIsProcessing(true);
      console.log('Capturing PayPal order:', data.orderID);
      
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to capture order');
      }

      const result = await response.json();
      console.log('PayPal order captured:', result);
      
      onSuccess(data.orderID);
    } catch (error) {
      console.error('PayPal capture error:', error);
      onError(error instanceof Error ? error.message : 'Failed to capture payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalError = (err: any) => {
    console.error('PayPal button error:', err);
    onError(err.message || 'Payment failed');
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading PayPal...</span>
      </div>
    );
  }

  // PayPal 클라이언트 ID가 설정되지 않은 경우
  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID === 'sb') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            PayPal Configuration Required
          </h3>
          <p className="text-gray-600 mb-4">
            Amount: <span className="font-semibold">${amount.toFixed(2)} {currency}</span>
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-red-800 mb-2">PayPal Not Configured</h4>
          <p className="text-red-600 mb-4">
            Please set up your PayPal environment variables to enable payments.
          </p>
          <div className="bg-white rounded p-4 text-sm">
            <p className="font-mono text-gray-800 mb-2">Add to .env.local:</p>
            <div className="space-y-1">
              <p className="font-mono text-gray-600">NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id</p>
              <p className="font-mono text-gray-600">PAYPAL_CLIENT_SECRET=your_client_secret</p>
              <p className="font-mono text-gray-600">PAYPAL_API_URL=https://api-m.sandbox.paypal.com</p>
            </div>
          </div>
          <div className="mt-4">
            <a 
              href="https://developer.paypal.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get PayPal Credentials
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Complete Your Payment
        </h3>
        <p className="text-gray-600">
          Amount: <span className="font-semibold">${amount.toFixed(2)} {currency}</span>
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Service</span>
          <span className="text-sm text-gray-600">
            {bookingData.shootingType === 'test' ? 'Test Session' : 
             bookingData.shootingType === '1person' ? '1 Person Session' :
             bookingData.shootingType === '2people' ? '2 People Session' :
             bookingData.shootingType === '3people' ? '3 People Session' :
             bookingData.shootingType === '4people' ? '4 People Session' : 'Photography Session'}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Date & Time</span>
          <span className="text-sm text-gray-600">
            {bookingData.date} at {bookingData.time}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Customer</span>
          <span className="text-sm text-gray-600">{bookingData.name}</span>
        </div>
      </div>

      <div className="space-y-4">
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={handlePayPalError}
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            height: 45,
          }}
          disabled={isProcessing}
        />
        
        {isProcessing && (
          <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Processing payment...</span>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-gray-500">
        <p>Secure payment powered by PayPal</p>
        <p>Supports all major credit cards, debit cards, and digital wallets</p>
      </div>
    </div>
  );
};

const PayPalPaymentModal: React.FC<PayPalPaymentModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  amount,
  currency = 'AUD',
  onSuccess,
  onError,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (orderId: string) => {
    console.log('Payment successful:', orderId);
    onSuccess?.(orderId);
    onClose();
  };

  const handleError = (errorMessage: string) => {
    console.error('Payment error:', errorMessage);
    setError(errorMessage);
    onError?.(errorMessage);
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
                <p className="text-sm text-gray-500">Complete your booking</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-5 h-5 text-red-400 mr-2">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <PayPalScriptProvider options={paypalOptions}>
              <PayPalButtonWrapper
                bookingData={bookingData}
                amount={amount}
                currency={currency}
                onSuccess={handleSuccess}
                onError={handleError}
                onClose={handleClose}
              />
            </PayPalScriptProvider>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span>All Cards</span>
              </div>
              <div className="flex items-center space-x-1">
                <Smartphone className="w-4 h-4" />
                <span>Mobile Pay</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PayPalPaymentModal;
