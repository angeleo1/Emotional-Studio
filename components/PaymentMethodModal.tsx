import React, { useState, useEffect, useCallback } from 'react';
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

// Stripe 설정 검증 및 초기화 - 하드코딩으로 즉시 해결
const publishableKey = 'pk_live_51S1JBl2zEM74rjqu3JsPy5E0hqcxkGT6yD9GY3ohWfb3QoQ3EGnq3RGb8RkykfRxlkncAWxIxOUPKsopZdwNAaof003bAkdluC';

const stripeConfig = {
  publishableKey,
  isConfigured: true
};

console.log('Stripe config:', stripeConfig);
console.log('Publishable key:', publishableKey);

const stripePromise = loadStripe(publishableKey);

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
  bookingData?: any; // 예약 데이터 추가
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

interface PaymentFormProps {
  amount: number;
  currency: string;
  bookingData?: any; // 예약 데이터 추가
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency,
  bookingData,
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
  const [isElementsReady, setIsElementsReady] = useState(false);

  // Elements 준비 상태 확인 - 모바일 최적화
  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement('payment');
      if (paymentElement) {
        setIsElementsReady(true);
        console.log('Payment element is ready');
      } else {
        console.log('Payment element not found, waiting...');
        setIsElementsReady(false);
      }
    }
  }, [elements]);

  // 모바일에서 Elements 로딩 타임아웃 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isElementsReady) {
        console.log('Elements loading timeout - forcing ready state');
        setIsElementsReady(true);
      }
    }, 10000); // 10초 타임아웃

    return () => clearTimeout(timer);
  }, [isElementsReady]);

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
        setCanMakePayment(!!result);
        if (!result) {
          console.log('Google Pay/Apple Pay not available');
        }
      });

      pr.on('paymentmethod', async (ev) => {
        try {
          setIsProcessing(true);
          setMessage('Processing payment...');

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
            onError(error.message || 'Payment failed');
            ev.complete('fail');
          } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage('Payment successful!');
            onSuccess(paymentIntent);
            ev.complete('success');
            setIsComplete(true);
          } else {
            onError('Payment was not completed');
            ev.complete('fail');
          }
        } catch (error) {
          console.error('PaymentRequest error:', error);
          onError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
          ev.complete('fail');
        } finally {
          setIsProcessing(false);
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

    if (!stripe || !elements || !isElementsReady) {
      console.error('Payment system not ready:', { 
        stripe: !!stripe, 
        elements: !!elements, 
        isElementsReady 
      });
      onError('Payment system not ready. Please wait a moment and try again.');
      return;
    }

    setIsProcessing(true);
    setMessage('Processing payment...');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment error:', error);
        let errorMessage = 'Payment failed. Please try again.';
        
        if (error.type === 'card_error' || error.type === 'validation_error') {
          errorMessage = error.message || 'Please check your card details and try again.';
        } else if (error.type === 'authentication_required') {
          errorMessage = 'Additional authentication required. Please complete the verification.';
        }
        
        setMessage(errorMessage);
        onError(errorMessage);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
        onSuccess(paymentIntent);
        setIsComplete(true);
      } else {
        setMessage('Payment was not completed. Please try again.');
        onError('Payment was not completed');
      }
    } catch (err) {
      console.error('Payment submission error:', err);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setMessage(errorMessage);
      onError(errorMessage);
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
                    type: 'default',
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
        {!isElementsReady ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6100] mb-4"></div>
            <span className="text-gray-600 text-center">Loading payment form...</span>
            <span className="text-gray-400 text-sm text-center mt-2">
              This may take a moment on mobile devices
            </span>
            <button
              onClick={() => setIsElementsReady(true)}
              className="mt-4 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Skip loading (if stuck)
            </button>
          </div>
        ) : (
          <>
            <LinkAuthenticationElement />
            <AddressElement options={{ mode: 'billing' }} />
            <PaymentElement 
              options={{
                layout: 'tabs',
                fields: {
                  billingDetails: 'auto'
                },
                business: {
                  name: 'Emotional Studio'
                }
              }}
            />
          </>
        )}
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
          disabled={!stripe || !elements || !isElementsReady || isProcessing || isComplete}
          className="flex-1 px-4 py-2 bg-[#FF6100] text-white rounded-lg hover:bg-[#e55a00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {!isElementsReady ? 'Loading...' : isProcessing ? 'Processing...' : isComplete ? 'Complete' : `Pay $${amount.toFixed(2)}`}
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

  const createCheckoutSession = useCallback(async () => {
    if (!bookingData) {
      onError('Booking data is required for checkout session');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Creating checkout session with:', { bookingData, amount, currency });
      
      const response = await fetch(`${window.location.origin}/api/create-checkout-session`, {
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

      console.log('Checkout API status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Checkout API Error Response:', errorText);
        let errorMessage = `HTTP ${response.status}`;
        let errorCode = '';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorMessage;
          errorCode = errorData.code || '';
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        // 중복 예약 에러인 경우 특별 처리
        if (response.status === 409 && errorCode === 'TIME_SLOT_UNAVAILABLE') {
          errorMessage = '선택하신 시간이 이미 예약되었습니다. 다른 시간을 선택해주세요.';
        }
        
        throw new Error(errorMessage);
      }
      
      const responseData = await response.json();
      console.log('Checkout API response data:', responseData);

      const { url } = responseData;
      if (!url) {
        throw new Error('No checkout URL received from server');
      }

      console.log('Checkout URL received successfully, redirecting...');
      // Stripe Checkout 페이지로 리디렉션
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      onError(`Payment initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [bookingData, amount, currency, onError]);

  useEffect(() => {
    if (isOpen && bookingData) {
      createCheckoutSession();
    }
  }, [isOpen, bookingData, createCheckoutSession]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#FF6100',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '12px',
      colorBorder: '#e5e7eb',
    },
    rules: {
      '.Input': {
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        padding: '12px 16px',
        fontSize: '16px',
      },
      '.Input:focus': {
        borderColor: '#FF6100',
        boxShadow: '0 0 0 2px rgba(255, 97, 0, 0.1)',
      },
      '.Label': {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '8px',
      },
      '.Tab': {
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
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
        transition: 'all 0.2s ease',
      },
      '.Tabs': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      },
      '.Tab:hover': {
        backgroundColor: '#f9fafb',
        borderColor: '#FF6100',
        transform: 'translateY(-1px)',
      },
      '.Tab--selected': {
        borderColor: '#FF6100',
        backgroundColor: '#fff5f0',
        boxShadow: '0 0 0 2px rgba(255, 97, 0, 0.1)',
      },
      '.TabIcon': {
        width: '24px',
        height: '24px',
      },
      '.TabLabel': {
        fontSize: '14px',
        fontWeight: '500',
      },
      '.PaymentElement': {
        padding: '20px',
        backgroundColor: '#fafafa',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
    loader: 'auto',
    locale: 'en',
    business: {
      name: 'Emotional Studio'
    },
    paymentMethodOrder: ['card', 'link'],
    // 모바일 최적화
    fonts: [{
      cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
    }],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-2xl max-h-[95vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-[#FF6100]" />
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
              {!stripeConfig?.isConfigured ? (
                <div className="text-center py-8">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <p className="text-red-600 text-lg font-bold mb-2">Payment System Not Configured</p>
                  <p className="text-gray-500">Stripe is not properly configured. Please contact support.</p>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                  <span className="text-gray-700 text-lg font-medium mb-2">Initializing payment...</span>
                  <span className="text-gray-500 text-sm text-center">
                    Please wait while we set up your secure payment
                  </span>
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
                  <div className="text-orange-500 text-4xl mb-4">⚠️</div>
                  <p className="text-gray-700 text-lg font-medium mb-2">Unable to initialize payment</p>
                  <p className="text-gray-500 text-sm mb-6">
                    There was an issue setting up the payment form. This might be due to network connectivity.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={createCheckoutSession}
                      className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
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
