import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentRequestButtonElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface AppleGooglePayModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: any;
  amount: number;
  currency?: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
}

const PaymentForm: React.FC<{
  bookingData: any;
  amount: number;
  currency: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  onClose: () => void;
}> = ({ bookingData, amount, currency, onSuccess, onError, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'AU',
      currency: currency.toLowerCase(),
      total: {
        label: 'Emotional Studio Photography',
        amount: Math.round(amount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setCanMakePayment(true);
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (ev) => {
      try {
        setIsProcessing(true);
        setMessage('Processing payment...');

        // Payment Intent 생성
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to create payment intent: ${errorText}`);
        }

        const { clientSecret } = await response.json();

        if (!clientSecret) {
          throw new Error('No client secret received');
        }

        // PaymentRequest로 결제 확인
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: ev.paymentMethod.id,
        });

        if (error) {
          console.error('Payment error:', error);
          onError(`Payment failed: ${error.message}`);
        } else {
          console.log('Payment successful:', paymentIntent);
          onSuccess(paymentIntent);
        }
      } catch (error) {
        console.error('Payment error:', error);
        onError(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsProcessing(false);
        setMessage('');
      }
    });
  }, [stripe, amount, currency, onSuccess, onError]);

  if (!canMakePayment) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600 mb-4">Apple Pay and Google Pay are not available on this device.</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Pay with Apple Pay or Google Pay
        </h3>
        <p className="text-gray-600">
          Total: ${amount} {currency.toUpperCase()}
        </p>
      </div>

      {isProcessing && (
        <div className="text-center mb-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6100]"></div>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
      )}

      <div className="mb-6">
        <PaymentRequestButtonElement
          options={{
            paymentRequest,
            style: {
              paymentRequestButton: {
                type: 'default',
                theme: 'dark',
                height: '48px',
              },
            },
          }}
        />
      </div>

      <div className="text-center">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          disabled={isProcessing}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const AppleGooglePayModal: React.FC<AppleGooglePayModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  amount,
  currency = 'aud',
  onSuccess,
  onError,
}) => {
  if (!isOpen) return null;

  const handleSuccess = (paymentIntent: any) => {
    onSuccess?.(paymentIntent);
    onClose();
  };

  const handleError = (error: string) => {
    onError?.(error);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Apple Pay / Google Pay</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm
            bookingData={bookingData}
            amount={amount}
            currency={currency}
            onSuccess={handleSuccess}
            onError={handleError}
            onClose={onClose}
          />
        </Elements>
      </div>
    </div>
  );
};

export default AppleGooglePayModal;
