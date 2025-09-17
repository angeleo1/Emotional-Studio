import React, { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { X, Calendar, Clock, Users, CreditCard, CheckCircle } from 'lucide-react';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import PaymentMethodModal from '../components/PaymentMethodModal';
import { isBookingEnabled } from '../config/booking';
import BookingDisabled from '../components/BookingDisabled';

// Zod 스키마 정의 (데스크탑과 동일)
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

const MobileBooking: NextPage = () => {
  // booking이 비활성화된 경우 비활성화 메시지 표시
  if (!isBookingEnabled()) {
    return (
      <>
        <Head>
          <title>Mobile Booking - Emotional Studio</title>
          <meta name="description" content="Booking service is temporarily unavailable" />
        </Head>
        <BookingDisabled />
      </>
    );
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // React Hook Form 설정 (데스크탑과 동일)
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
      name: '',
      email: '',
      phone: '',
      date: undefined,
      time: '',
      shootingType: '',
      a4print: false,
      a4frame: false,
      digital: false,
      additionalRetouch: 0,
    },
  });

  const watchedValues = watch();

  // 모든 가능한 시간 (데스크탑과 동일)
  const allTimes = [
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  // 선택된 날짜에 따라 예약 가능한 시간 체크 (데스크탑과 동일)
  useEffect(() => {
    if (watchedValues.date) {
      checkAvailability();
    } else {
      setAvailableTimes(allTimes);
    }
  }, [watchedValues.date]);

  const checkAvailability = useCallback(async () => {
    if (!watchedValues.date) return;
    
    console.log('=== 모바일 checkAvailability 호출됨 ===');
    setIsLoadingTimes(true);
    try {
      // 날짜를 올바르게 변환 (시간대 문제 해결)
      const dateString = `${watchedValues.date.getFullYear()}-${String(watchedValues.date.getMonth() + 1).padStart(2, '0')}-${String(watchedValues.date.getDate()).padStart(2, '0')}`;
      console.log('Checking availability for date:', dateString);
      
      // 새로운 availability API 사용
      const response = await fetch(`/api/check-availability-v2?date=${dateString}`);
      console.log('Availability API response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Availability data received:', data);
        console.log('Available times:', data.availableTimes);
        console.log('Booked times:', data.bookedTimes);
        setAvailableTimes(data.availableTimes || allTimes);
        setBookedTimes(data.bookedTimes || []);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch availability:', response.status, errorText);
        setAvailableTimes(allTimes);
        setBookedTimes([]);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailableTimes(allTimes);
    } finally {
      setIsLoadingTimes(false);
    }
  }, [watchedValues.date]);

  // 총 가격 계산 함수 (데스크탑과 동일)
  const calculateTotalPrice = () => {
    let basePrice = 0;
    switch (watchedValues.shootingType) {
      case 'test': basePrice = 1; break;
      case '1person': basePrice = 65; break;
      case '2people': basePrice = 130; break;
      case '3people': basePrice = 195; break;
      case '4people': basePrice = 260; break;
      default: basePrice = 0;
    }

    let additionalCost = 0;
    if (watchedValues.a4print) additionalCost += 10;
    if (watchedValues.a4frame) additionalCost += 15;
    if (watchedValues.digital) additionalCost += 20;
    additionalCost += watchedValues.additionalRetouch * 10;

    return basePrice + additionalCost;
  };

  // 폼 제출 처리 (데스크탑과 동일)
  const onSubmit = async (data: BookingFormData) => {
    console.log('=== 모바일 폼 제출 시작 ===');
    console.log('Form data:', data);
    
    setIsProcessing(true);
    setErrorMessage('');
    
    try {
      // 결제 모달로 이동
      setShowPayment(true);
    } catch (error) {
      console.error('Error in form submission:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 결제 성공 처리
  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // 결제 성공 후 부킹 데이터 저장
      const bookingId = `BK${Date.now()}`;
      const totalAmount = calculateTotalPrice();
      
      // 날짜를 올바르게 변환
      const dateString = watchedValues.date ? 
        `${watchedValues.date.getFullYear()}-${String(watchedValues.date.getMonth() + 1).padStart(2, '0')}-${String(watchedValues.date.getDate()).padStart(2, '0')}` : 
        '';
      
      const bookingData = {
        name: watchedValues.name,
        email: watchedValues.email,
        phone: watchedValues.phone,
        date: dateString,
        time: watchedValues.time,
        shootingType: watchedValues.shootingType,
        a4print: watchedValues.a4print,
        a4frame: watchedValues.a4frame,
        digital: watchedValues.digital,
        additionalRetouch: watchedValues.additionalRetouch,
        bookingId: bookingId,
        totalAmount: totalAmount.toString(),
        paymentStatus: 'completed',
        paymentIntentId: paymentIntent.id
      };
      
      const response = await fetch('/api/send-booking-emails-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setShowPayment(false);
        setIsProcessing(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to save booking. Please try again.');
        setShowPayment(false);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error saving booking after payment:', error);
      setErrorMessage('Payment successful but failed to save booking. Please contact us.');
      setShowPayment(false);
      setIsProcessing(false);
    }
  };

  // 결제 에러 처리
  const handlePaymentError = (message: string) => {
    setErrorMessage(message);
    setIsProcessing(false);
  };

  return (
    <>
      <Head>
        <title>Mobile Booking - Emotional Studio</title>
        <meta name="description" content="Book your photo session with Emotional Studio" />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
        <MobileNavbar />
        
        <div className="pt-20 pb-8 px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-4">Book Your Session</h1>
              <p className="text-gray-300">Capture your precious moments with us</p>
            </motion.div>

            {/* 에러 메시지 */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            {/* 예약 폼 */}
            {!isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* 기본 정보 */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white placeholder-gray-400"
                            placeholder="Your full name"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white placeholder-gray-400"
                            placeholder="your@email.com"
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="tel"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white placeholder-gray-400"
                            placeholder="Your phone number"
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* 예약 세부사항 */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-white mb-4">Session Details</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Number of People *</label>
                      <Controller
                        name="shootingType"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                          >
                            <option value="">Please select</option>
                            <option value="test">Test ($1)</option>
                            <option value="1person">1 Person ($65)</option>
                            <option value="2people">2 People ($130)</option>
                            <option value="3people">3 People ($195)</option>
                            <option value="4people">4 People ($260)</option>
                          </select>
                        )}
                      />
                      {errors.shootingType && (
                        <p className="text-red-400 text-sm mt-1">{errors.shootingType.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            minDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select date"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                          />
                        )}
                      />
                      {errors.date && (
                        <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                      {isLoadingTimes ? (
                        <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-center text-gray-400">
                          Loading available times...
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {allTimes.map((time) => {
                            const isBooked = bookedTimes.includes(time);
                            const isSelected = watchedValues.time === time;
                            const isAvailable = availableTimes.includes(time);
                            
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => {
                                  if (!isBooked && isAvailable) {
                                    setValue('time', time);
                                  }
                                }}
                                disabled={isBooked || !isAvailable}
                                className={`
                                  px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200
                                  ${isBooked 
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                                    : isSelected
                                    ? 'bg-[#FF6100] text-white border-[#FF6100] shadow-md'
                                    : isAvailable
                                    ? 'bg-white/10 text-white border-white/20 hover:bg-[#FF6100] hover:border-[#FF6100] hover:text-white'
                                    : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                  }
                                `}
                              >
                                <div className="flex flex-col items-center">
                                  <span>{time}</span>
                                  {isBooked && (<span className="text-xs text-gray-400">Booked</span>)}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {errors.time && (
                        <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>
                      )}
                    </div>
                  </div>

                  {/* 추가 옵션 */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-white mb-4">Additional Options</h2>
                    
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <Controller
                          name="a4print"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                            />
                          )}
                        />
                        <span className="ml-3 text-gray-300">4x6" Print (+$10)</span>
                      </label>

                      <label className="flex items-center">
                        <Controller
                          name="a4frame"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                            />
                          )}
                        />
                        <span className="ml-3 text-gray-300">4x6" Frame (+$15)</span>
                      </label>

                      <label className="flex items-center">
                        <Controller
                          name="digital"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                            />
                          )}
                        />
                        <span className="ml-3 text-gray-300">Digital Files (+$20)</span>
                      </label>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Additional Retouch ({watchedValues.additionalRetouch} photos) - ${watchedValues.additionalRetouch * 10}
                        </label>
                        <Controller
                          name="additionalRetouch"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="range"
                              min="0"
                              max="5"
                              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 총 가격 */}
                  <div className="bg-[#FF6100]/10 border border-[#FF6100] p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-[#FF6100]">${calculateTotalPrice()}</span>
                    </div>
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    disabled={!isValid || isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-[#FF6100] to-[#FF8A00] text-white font-semibold rounded-lg hover:from-[#E55600] hover:to-[#E57300] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Continue to Payment'}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* 성공 화면 */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-300">We'll send you a confirmation email shortly.</p>
                </div>
                
                <div className="bg-[#FF6100]/10 border border-[#FF6100] p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Booking Details</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><span className="text-gray-400">Name:</span> {watchedValues.name}</p>
                    <p><span className="text-gray-400">Date:</span> {watchedValues.date?.toLocaleDateString()}</p>
                    <p><span className="text-gray-400">Time:</span> {watchedValues.time}</p>
                    <p><span className="text-gray-400">Total:</span> <span className="text-[#FF6100] font-bold">${calculateTotalPrice()}</span></p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    // 폼 리셋
                    window.location.reload();
                  }}
                  className="w-full py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Book Another Session
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <MobileContactButton />

        {/* PaymentMethodModal */}
        <PaymentMethodModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          amount={calculateTotalPrice()}
          currency="aud"
          bookingData={{
            name: watchedValues.name,
            email: watchedValues.email,
            phone: watchedValues.phone,
            date: watchedValues.date ? 
              `${watchedValues.date.getFullYear()}-${String(watchedValues.date.getMonth() + 1).padStart(2, '0')}-${String(watchedValues.date.getDate()).padStart(2, '0')}` : 
              '',
            time: watchedValues.time,
            shootingType: watchedValues.shootingType,
            a4print: watchedValues.a4print,
            a4frame: watchedValues.a4frame,
            digital: watchedValues.digital,
            additionalRetouch: watchedValues.additionalRetouch,
            totalAmount: calculateTotalPrice()
          }}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    </>
  );
};

export default MobileBooking;
