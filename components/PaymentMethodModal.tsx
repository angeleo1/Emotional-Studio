import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
  AddressElement,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Globe, Shield } from 'lucide-react';

// Stripe public key - 환경변수 확인
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
console.log('Stripe public key:', stripePublishableKey ? 'Loaded' : 'Not loaded');
console.log('Stripe key value:', stripePublishableKey);

if (!stripePublishableKey) {
  console.error('STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

interface PaymentFormProps {
  amount: number;
  currency: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency,
  onSuccess,
  onError,
  onClose,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  // PaymentRequest 초기화
  useEffect(() => {
    if (!stripe) {
      console.log('Stripe not loaded yet');
      return;
    }

    try {
      const pr = stripe.paymentRequest({
        country: 'AU',
        currency: currency.toLowerCase(),
        total: {
          label: 'Total',
          amount: Math.round(amount * 100), // 센트 단위로 변환
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        console.log('PaymentRequest canMakePayment result:', result);
        console.log('Browser info:', {
          userAgent: navigator.userAgent,
          isChrome: /Chrome/.test(navigator.userAgent),
          isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
          isHTTPS: location.protocol === 'https:',
          isLocalhost: location.hostname === 'localhost'
        });
        setCanMakePayment(!!result);
        if (!result) {
          console.log('Google Pay/Apple Pay not available. Reasons:', result);
          console.log('PaymentRequest object:', pr);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        try {
          // Payment Intent 생성
          const response = await fetch(`${window.location.origin}/api/create-payment-intent`, {
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
            throw new Error('Failed to create payment intent');
          }

          const { clientSecret } = await response.json();

          // PaymentRequest로 결제 확인
          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: ev.paymentMethod.id,
          });

          if (error) {
            onError(error.message || 'Payment failed');
            ev.complete('fail');
          } else {
            onSuccess({ id: ev.paymentMethod.id });
            ev.complete('success');
          }
        } catch (error) {
          console.error('PaymentRequest error:', error);
          onError('Payment failed. Please try again.');
          ev.complete('fail');
        }
      });

      setPaymentRequest(pr);
    } catch (error) {
      console.error('Error initializing PaymentRequest:', error);
      onError('Failed to initialize payment system. Please try again.');
    }
  }, [stripe, amount, currency, onSuccess, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message || 'An unexpected error occurred.');
        } else {
          setMessage('An unexpected error occurred.');
        }
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded!');
        onSuccess(paymentIntent);
        setIsComplete(true);
      }
    } catch (err) {
      setMessage('An unexpected error occurred.');
      onError('Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Google Pay / Apple Pay 버튼 */}
      {canMakePayment && paymentRequest && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Payment
          </label>
          <div className="border border-gray-300 rounded-lg p-4">
            <PaymentRequestButtonElement
              options={{
                paymentRequest,
                style: {
                  paymentRequestButton: {
                    theme: 'light',
                    height: '48px',
                  },
                },
              }}
            />
          </div>
          <div className="text-center mt-3">
            <span className="text-gray-500 text-sm">or pay with card below</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <LinkAuthenticationElement />
        <AddressElement options={{ mode: 'billing' }} />
        <PaymentElement 
          options={{
            layout: 'tabs',
            fields: {
              billingDetails: 'auto'
            },
            paymentMethodOrder: ['card', 'link'],
            business: {
              name: 'Emotional Studio'
            }
          }}
        />
      </div>

      {message && (
        <div className={`p-3 rounded-md ${
          message.includes('succeeded') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          disabled={isProcessing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || isProcessing || isComplete}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Processing...' : isComplete ? 'Complete' : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose,
  amount,
  currency = 'aud',
  onSuccess,
  onError,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !clientSecret) {
      createPaymentIntent();
    }
  }, [isOpen, clientSecret]);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    try {
      console.log('Creating payment intent with:', { amount, currency });
      
      const response = await fetch(`${window.location.origin}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      });

      console.log('Payment API status:', response.status);
      console.log('Payment API ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Payment API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Payment API response data:', responseData);

      const { clientSecret } = responseData;
      if (!clientSecret) {
        throw new Error('No client secret received from server');
      }

      console.log('Client secret received successfully');
      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      onError(`Payment initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#3b82f6',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Tab': {
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '8px',
        marginRight: '8px',
        minHeight: '60px',
        minWidth: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
        flex: '1',
      },
      '.Tabs': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      },
      '.Tab:hover': {
        backgroundColor: '#f9fafb',
        borderColor: '#3b82f6',
      },
      '.Tab--selected': {
        borderColor: '#3b82f6',
        backgroundColor: '#eff6ff',
        boxShadow: '0 0 0 2px #3b82f6',
      },
      '.TabIcon': {
        width: '24px',
        height: '24px',
      },
      '.TabLabel': {
        fontSize: '14px',
        fontWeight: '500',
      },
      // Apple Pay and Google Pay specific styling
      '.Tab[data-testid="apple-pay"]': {
        backgroundColor: '#000',
        color: '#fff',
        borderColor: '#000',
      },
      '.Tab[data-testid="google-pay"]': {
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#dadce0',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
    loader: 'auto',
    locale: 'en',
    business: {
      name: 'e.st Photography'
    }
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
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Select Payment Method</h2>
                  <p className="text-sm text-gray-500">Safe and Fast Payment</p>
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
                  <span>Mobile Payment</span>
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
                  <span>Card Payment</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-6 flex-1 overflow-y-auto min-h-0">
              {!stripePublishableKey ? (
                <div className="text-center py-8">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <p className="text-red-600 text-lg font-bold mb-2">Payment System Not Configured</p>
                  <p className="text-gray-500">Stripe is not properly configured. Please contact support.</p>
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Initializing payment...</span>
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <PaymentForm
                    amount={amount}
                    currency={currency}
                    onSuccess={onSuccess}
                    onError={onError}
                    onClose={onClose}
                  />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Unable to initialize payment.</p>
                  <button
                    onClick={createPaymentIntent}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Secure payment protected by SSL</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentMethodModal;
