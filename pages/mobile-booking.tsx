import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from '@stripe/stripe-js';
import { X, Calendar, Clock, Users, CreditCard, CheckCircle } from 'lucide-react';
import MobileNavbar from '../components/layout/MobileNavbar';

// Zod 스키마 정의
const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  date: z.date().min(new Date(), 'Please select a future date'),
  time: z.string().min(1, 'Please select a time'),
  shootingType: z.string().min(1, 'Please select number of people'),
  a4print: z.boolean(),
  a4frame: z.boolean(),
  digital: z.boolean(),
  additionalRetouch: z.number().min(0).max(5),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const MobileBookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  // React Hook Form 설정
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
      time: '',
      shootingType: '',
      a4print: false,
      a4frame: false,
      digital: false,
      additionalRetouch: 0,
    },
  });

  const watchedDate = watch('date');
  const watchedTime = watch('time');
  const watchedShootingType = watch('shootingType');

  // 사용 가능한 시간 목록
  const allTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  // 날짜가 변경될 때마다 예약 가능한 시간을 가져오기
  useEffect(() => {
    if (watchedDate) {
      fetchAvailableTimes(watchedDate);
    }
  }, [watchedDate]);

  // 예약 가능한 시간 가져오기
  const fetchAvailableTimes = useCallback(async (date: Date) => {
    setIsLoadingTimes(true);
    try {
      const dateString = date.toISOString().split('T')[0];
      const response = await fetch(`/api/check-availability-v2?date=${dateString}`);
      const data = await response.json();
      
      if (response.ok) {
        setAvailableTimes(data.availableTimes || []);
        setBookedTimes(data.bookedTimes || []);
      } else {
        console.error('Failed to fetch available times:', data.error);
        setAvailableTimes(allTimes);
        setBookedTimes([]);
      }
    } catch (error) {
      console.error('Error fetching available times:', error);
      setAvailableTimes(allTimes);
      setBookedTimes([]);
    } finally {
      setIsLoadingTimes(false);
    }
  }, [allTimes]);

  // 결제 처리
  const handlePayment = async (data: BookingFormData) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          date: data.date.toISOString().split('T')[0],
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: result.sessionId,
          });

          if (error) {
            console.error('Stripe error:', error);
            alert('Payment failed. Please try again.');
          }
        }
      } else {
        console.error('Booking failed:', result.error);
        alert(result.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 폼 제출 처리
  const onSubmit = (data: BookingFormData) => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePayment(data);
    }
  };

  // 이전 단계로
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 성공 후 폼 리셋
  const resetForm = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    // 폼 리셋은 React Hook Form의 reset 메서드를 사용
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <MobileNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <h1 className="text-2xl font-bold text-center">Book Your Session</h1>
              <p className="text-center text-purple-100 mt-2">Capture your precious moments</p>
            </div>

            {/* 진행 표시기 */}
            <div className="flex justify-center py-4 bg-gray-50">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step <= currentStep
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-8 h-1 mx-2 ${
                        step < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* 폼 내용 */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your full name"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your phone number"
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Session Details</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Select Date *
                      </label>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            minDate={new Date()}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                          />
                        )}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Select Time *
                      </label>
                      <Controller
                        name="time"
                        control={control}
                        render={({ field }) => (
                          <>
                            {isLoadingTimes ? (
                              <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                                <p className="text-gray-500 mt-2">Loading available times...</p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-4 gap-2">
                                {allTimes.map((time) => {
                                  const isBooked = bookedTimes.includes(time);
                                  const isSelected = field.value === time;
                                  const isAvailable = availableTimes.includes(time);
                                  
                                  return (
                                    <button
                                      key={time}
                                      type="button"
                                      onClick={() => {
                                        if (!isBooked && isAvailable) {
                                          field.onChange(time);
                                        }
                                      }}
                                      disabled={isBooked || !isAvailable}
                                      className={`p-2 text-sm rounded-md border transition-colors ${
                                        isSelected
                                          ? 'bg-purple-600 text-white border-purple-600'
                                          : isBooked
                                          ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                                          : isAvailable
                                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-300'
                                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                      }`}
                                    >
                                      <div className="flex flex-col items-center">
                                        <span>{time}</span>
                                        {isBooked && (
                                          <span className="text-xs text-gray-400">Booked</span>
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )}
                      />
                      {errors.time && (
                        <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Users className="inline w-4 h-4 mr-1" />
                        Number of People *
                      </label>
                      <Controller
                        name="shootingType"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select number of people</option>
                            <option value="1">1 person</option>
                            <option value="2">2 people</option>
                            <option value="3">3 people</option>
                            <option value="4">4 people</option>
                            <option value="5">5+ people</option>
                          </select>
                        )}
                      />
                      {errors.shootingType && (
                        <p className="text-red-500 text-sm mt-1">{errors.shootingType.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Services</h2>
                    
                    <div className="space-y-3">
                      <Controller
                        name="a4print"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">A4 Print (+$20)</span>
                          </label>
                        )}
                      />
                      
                      <Controller
                        name="a4frame"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">A4 Frame (+$30)</span>
                          </label>
                        )}
                      />
                      
                      <Controller
                        name="digital"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Digital Files (+$50)</span>
                          </label>
                        )}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Retouching (0-5 photos)
                      </label>
                      <Controller
                        name="additionalRetouch"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            min="0"
                            max="5"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        )}
                      />
                      {errors.additionalRetouch && (
                        <p className="text-red-500 text-sm mt-1">{errors.additionalRetouch.message}</p>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Session Summary</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Date:</strong> {watchedDate?.toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {watchedTime}</p>
                        <p><strong>People:</strong> {watchedShootingType} person(s)</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 버튼들 */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={!isValid || isProcessing}
                  className={`ml-auto px-6 py-2 rounded-md text-white font-medium transition-colors ${
                    isValid && !isProcessing
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : currentStep < 3 ? (
                    'Next'
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Continue to Payment
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBookingPage;