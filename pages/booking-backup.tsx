import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { isBookingEnabled } from '../config/booking';
import BookingDisabled from '../components/BookingDisabled';

// Stripe 초기화
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

// Zod 스키마 정의
const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  date: z.date().min(new Date(), 'Please select a future date'),
  time: z.string().min(1, 'Please select a time'),
  shootingType: z.string().min(1, 'Please select number of people'),
  colorOption: z.boolean().default(false),
  a4print: z.boolean().default(false),
  a4frame: z.boolean().default(false),
  digital: z.boolean().default(false),
  additionalRetouch: z.number().min(0).max(5),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// PaymentForm 컴포넌트
const PaymentForm = ({ formData, onSuccess, onError, isProcessing, setIsProcessing, calculateTotalPrice }: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe or elements not available');
      return;
    }

    setIsProcessing(true);
    console.log('Starting payment process...');

    try {
      const totalAmount = calculateTotalPrice();
      console.log('Total amount:', totalAmount);

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'aud'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      console.log('Payment intent created, client secret received');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        onError(`Payment failed: ${error.message}`);
      } else {
        console.log('Payment successful:', paymentIntent);
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      onError('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* 글래스모피즘 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20"></div>
      
      <div className="relative p-8">
        <h3 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Payment Information
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Card Details
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '18px',
                        color: '#ffffff',
                        '::placeholder': {
                          color: 'rgba(255, 255, 255, 0.6)',
                        },
                      },
                      invalid: {
                        color: '#ff6b6b',
                      },
                    },
                    hidePostalCode: false,
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              isProcessing
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FF6100] to-[#FF8A00] hover:from-[#E55600] hover:to-[#E57300] shadow-lg hover:shadow-xl'
            } text-white`}
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

const Booking: NextPage = () => {
  // booking이 비활성화된 경우 비활성화 메시지 표시
  if (!isBookingEnabled()) {
    return (
      <>
        <Head>
          <title>Booking - Emotional Studio</title>
          <meta name="description" content="Booking service is temporarily unavailable" />
        </Head>
        <BookingDisabled />
      </>
    );
  }

  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // React Hook Form 설정
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      colorOption: false,
      a4print: false,
      a4frame: false,
      digital: false,
      additionalRetouch: 0,
    },
  });

  const watchedValues = watch();

  // 사용 가능한 시간
  const [availableTimes] = useState([
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ]);

  // 총 가격 계산 함수
  const calculateTotalPrice = () => {
    let basePrice = 0;
    switch (watchedValues.shootingType) {
      case '1person': basePrice = 65; break;
      case '2people': basePrice = 130; break;
      case '3people': basePrice = 195; break;
      case '4people': basePrice = 260; break;
      default: basePrice = 0;
    }

    let additionalCost = 0;
    if (watchedValues.colorOption) additionalCost += 10;
    if (watchedValues.a4print) additionalCost += 10;
    if (watchedValues.a4frame) additionalCost += 15;
    if (watchedValues.digital) additionalCost += 20;
    if (watchedValues.additionalRetouch) {
      additionalCost += (watchedValues.additionalRetouch * 15);
    }

    return basePrice + additionalCost;
  };

  // 폼 제출 핸들러
  const onSubmit = (data: BookingFormData) => {
    console.log('Form data:', data);
    setCurrentStep(2);
  };

  // 결제 성공 핸들러
  const handlePaymentSuccess = () => {
    setIsProcessing(false);
    setCurrentStep(3);
    
    // 3초 후 모달 닫기
    setTimeout(() => {
      setIsBookingVisible(false);
      setCurrentStep(1);
    }, 3000);
  };

  // 결제 실패 핸들러
  const handlePaymentError = (message: string) => {
    setIsProcessing(false);
    alert(`Payment failed: ${message}`);
  };

  const handleEnterClick = () => {
    setIsBookingVisible(true);
  };

  const closeBooking = () => {
    setIsBookingVisible(false);
    setCurrentStep(1);
  };

  useEffect(() => {
    if (isBookingVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookingVisible]);

  return (
    <>
      <Head>
        <title>Booking | Emotional Studio</title>
        <meta name="description" content="Book your session at Emotional Studio" />
      </Head>

      <AnimatePresence>
        {isBookingVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeBooking}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 메인 컨테이너 */}
              <div className="relative">
                {/* 그라데이션 배경 */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl"></div>
                
                {/* 글래스모피즘 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20"></div>
                
                {/* 컨텐츠 */}
                <div className="relative p-8">
                  {/* 헤더 */}
                  <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                      Book Your Session
                    </h2>
                    <p className="text-xl text-gray-300">Create unforgettable memories with us</p>
                  </div>

                  {/* 진행 단계 표시 */}
                  <div className="flex items-center justify-center space-x-8 mb-12">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                          currentStep === step 
                            ? 'bg-gradient-to-r from-[#FF6100] to-[#FF8A00] text-white shadow-lg scale-110' 
                            : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`w-20 h-1 mx-4 transition-all duration-300 ${
                            currentStep > step ? 'bg-gradient-to-r from-[#FF6100] to-[#FF8A00]' : 'bg-gray-600'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 단계별 컨텐츠 */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-4xl mx-auto"
                    >
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* 기본 정보 */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
                          <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-lg font-medium text-white mb-3">Name *</label>
                                <Controller
                                  name="name"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-300"
                                      placeholder="Enter your name"
                                    />
                                  )}
                                />
                                {errors.name && (
                                  <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>
                                )}
                              </div>
                              
                              <div>
                                <label className="block text-lg font-medium text-white mb-3">Email *</label>
                                <Controller
                                  name="email"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="email"
                                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-300"
                                      placeholder="Enter your email"
                                    />
                                  )}
                                />
                                {errors.email && (
                                  <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
                                )}
                              </div>
                              
                              <div>
                                <label className="block text-lg font-medium text-white mb-3">Phone *</label>
                                <Controller
                                  name="phone"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="tel"
                                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-300"
                                      placeholder="Enter your phone number"
                                    />
                                  )}
                                />
                                {errors.phone && (
                                  <p className="text-red-400 text-sm mt-2">{errors.phone.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 세션 정보 */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
                          <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Session Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-lg font-medium text-white mb-3">Number of People *</label>
                                <Controller
                                  name="shootingType"
                                  control={control}
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white text-lg transition-all duration-300"
                                    >
                                      <option value="">Please select</option>
                                      <option value="1person">1 Person ($65)</option>
                                      <option value="2people">2 People ($130)</option>
                                      <option value="3people">3 People ($195)</option>
                                      <option value="4people">4 People ($260)</option>
                                    </select>
                                  )}
                                />
                                {errors.shootingType && (
                                  <p className="text-red-400 text-sm mt-2">{errors.shootingType.message}</p>
                                )}
                              </div>
                              
                              <div>
                                <label className="block text-lg font-medium text-white mb-3">Date *</label>
                                <Controller
                                  name="date"
                                  control={control}
                                  render={({ field }) => (
                                    <DatePicker
                                      selected={field.value}
                                      onChange={(date) => field.onChange(date)}
                                      minDate={new Date()}
                                      dateFormat="yyyy-MM-dd"
                                      placeholderText="Select date"
                                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white text-lg transition-all duration-300"
                                    />
                                  )}
                                />
                                {errors.date && (
                                  <p className="text-red-400 text-sm mt-2">{errors.date.message}</p>
                                )}
                              </div>
                              
                              <div>
                                <label className="block text-lg font-medium text-white mb-3">Time *</label>
                                <Controller
                                  name="time"
                                  control={control}
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white text-lg transition-all duration-300"
                                    >
                                      <option value="">Select time</option>
                                      {availableTimes.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                      ))}
                                    </select>
                                  )}
                                />
                                {errors.time && (
                                  <p className="text-red-400 text-sm mt-2">{errors.time.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 추가 옵션 */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl"></div>
                          <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Additional Options</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="flex items-center">
                                  <Controller
                                    name="colorOption"
                                    control={control}
                                    render={({ field }) => (
                                      <input
                                        {...field}
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="w-6 h-6 text-[#FF6100] bg-white/10 border-white/20 rounded-lg focus:ring-[#FF6100] focus:ring-2 transition-all duration-300"
                                      />
                                    )}
                                  />
                                  <label className="ml-4 text-white text-lg">Color Option (+$10)</label>
                                </div>
                                
                                <div className="flex items-center">
                                  <Controller
                                    name="a4print"
                                    control={control}
                                    render={({ field }) => (
                                      <input
                                        {...field}
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="w-6 h-6 text-[#FF6100] bg-white/10 border-white/20 rounded-lg focus:ring-[#FF6100] focus:ring-2 transition-all duration-300"
                                      />
                                    )}
                                  />
                                  <label className="ml-4 text-white text-lg">4x6" Print (+$10)</label>
                                </div>
                                
                                <div className="flex items-center">
                                  <Controller
                                    name="a4frame"
                                    control={control}
                                    render={({ field }) => (
                                      <input
                                        {...field}
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="w-6 h-6 text-[#FF6100] bg-white/10 border-white/20 rounded-lg focus:ring-[#FF6100] focus:ring-2 transition-all duration-300"
                                      />
                                    )}
                                  />
                                  <label className="ml-4 text-white text-lg">4x6" Frame (+$15)</label>
                                </div>
                                
                                <div className="flex items-center">
                                  <Controller
                                    name="digital"
                                    control={control}
                                    render={({ field }) => (
                                      <input
                                        {...field}
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="w-6 h-6 text-[#FF6100] bg-white/10 border-white/20 rounded-lg focus:ring-[#FF6100] focus:ring-2 transition-all duration-300"
                                      />
                                    )}
                                  />
                                  <label className="ml-4 text-white text-lg">Original Digital Film (+$20)</label>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-lg font-medium text-white mb-3">Additional Retouch (+$15 each)</label>
                                  <Controller
                                    name="additionalRetouch"
                                    control={control}
                                    render={({ field }) => (
                                      <select
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white text-lg transition-all duration-300"
                                      >
                                        {[0, 1, 2, 3, 4, 5].map(num => (
                                          <option key={num} value={num}>{num}</option>
                                        ))}
                                      </select>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 메시지 */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
                          <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Additional Requests</h3>
                            <Controller
                              name="message"
                              control={control}
                              render={({ field }) => (
                                <textarea
                                  {...field}
                                  rows={4}
                                  placeholder="Any special requests or comments?"
                                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6100] focus:border-transparent text-white placeholder-gray-400 text-lg resize-none transition-all duration-300"
                                />
                              )}
                            />
                          </div>
                        </div>

                        {/* 총 금액 및 다음 단계 버튼 */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6100]/20 to-[#FF8A00]/20 rounded-3xl blur-xl"></div>
                          <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                            <div className="flex justify-between items-center mb-8">
                              <span className="text-2xl font-bold text-white">Total Amount</span>
                              <span className="text-4xl font-bold bg-gradient-to-r from-[#FF6100] to-[#FF8A00] bg-clip-text text-transparent">
                                ${calculateTotalPrice()}
                              </span>
                            </div>
                            <button
                              type="submit"
                              disabled={!isValid}
                              className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 ${
                                isValid
                                  ? 'bg-gradient-to-r from-[#FF6100] to-[#FF8A00] hover:from-[#E55600] hover:to-[#E57300] shadow-lg hover:shadow-xl'
                                  : 'bg-gray-600 cursor-not-allowed'
                              } text-white`}
                            >
                              Next Step
                            </button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-4xl mx-auto"
                    >
                      {/* 결제 정보 요약 */}
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                          <h3 className="text-3xl font-bold text-white mb-6 text-center">Booking Summary</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200 text-lg">
                            <div className="space-y-3">
                              <p><span className="text-gray-400 font-medium">Name:</span> {watchedValues.name}</p>
                              <p><span className="text-gray-400 font-medium">Email:</span> {watchedValues.email}</p>
                              <p><span className="text-gray-400 font-medium">Phone:</span> {watchedValues.phone}</p>
                            </div>
                            <div className="space-y-3">
                              <p><span className="text-gray-400 font-medium">Date:</span> {watchedValues.date?.toLocaleDateString()}</p>
                              <p><span className="text-gray-400 font-medium">Time:</span> {watchedValues.time}</p>
                              <p><span className="text-gray-400 font-medium">People:</span> {watchedValues.shootingType}</p>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-white/20">
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold text-white">Total Amount</span>
                              <span className="text-3xl font-bold bg-gradient-to-r from-[#FF6100] to-[#FF8A00] bg-clip-text text-transparent">
                                ${calculateTotalPrice()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stripe 결제 폼 */}
                      {stripePromise ? (
                        <Elements stripe={stripePromise}>
                          <PaymentForm
                            formData={watchedValues}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                            isProcessing={isProcessing}
                            setIsProcessing={setIsProcessing}
                            calculateTotalPrice={calculateTotalPrice}
                          />
                        </Elements>
                      ) : (
                        <div className="text-center text-red-400 p-8 bg-red-500/10 rounded-3xl border border-red-500/20">
                          <p className="text-xl">Stripe is not configured. Please check your environment variables.</p>
                        </div>
                      )}

                      {/* 이전 단계로 돌아가기 버튼 */}
                      <div className="flex justify-center mt-8">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-8 py-4 text-white border border-white/30 rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg font-medium"
                        >
                          ← Back to Booking
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center max-w-2xl mx-auto"
                    >
                      {/* 성공 아이콘 */}
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
                          <div className="relative w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* 성공 메시지 */}
                      <div className="space-y-6 mb-8">
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          Payment Successful!
                        </h3>
                        <p className="text-2xl text-white">Your booking has been confirmed.</p>
                        <p className="text-xl text-gray-300">We'll send you a confirmation email shortly.</p>
                      </div>

                      {/* 예약 정보 요약 */}
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6100]/20 to-[#FF8A00]/20 rounded-3xl blur-xl"></div>
                        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                          <h4 className="text-2xl font-bold text-white mb-6">Booking Details</h4>
                          <div className="space-y-3 text-gray-200 text-lg">
                            <p><span className="text-gray-400 font-medium">Name:</span> {watchedValues.name}</p>
                            <p><span className="text-gray-400 font-medium">Date:</span> {watchedValues.date?.toLocaleDateString()}</p>
                            <p><span className="text-gray-400 font-medium">Time:</span> {watchedValues.time}</p>
                            <p><span className="text-gray-400 font-medium">Total:</span> 
                              <span className="text-[#FF6100] font-bold ml-2">${calculateTotalPrice()}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 완료 메시지 */}
                      <div className="text-gray-400 text-lg">
                        <p>This window will close automatically in a few seconds...</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* 닫기 버튼 */}
              <button 
                onClick={closeBooking} 
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Now 버튼 */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={handleEnterClick}
          className="bg-gradient-to-r from-[#FF6100] to-[#FF8A00] hover:from-[#E55600] hover:to-[#E57300] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          Book Now
        </button>
      </div>
    </>
  );
};

export default Booking; 
