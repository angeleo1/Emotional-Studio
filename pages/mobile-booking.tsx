import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';
import PaymentMethodModal from '../components/PaymentMethodModal';
import { isBookingEnabled } from '../config/booking';
import BookingDisabled from '../components/BookingDisabled';

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null as Date | null,
    time: '',
    shootingType: '',
    otherGoods: {
      a4print: false,
      a4frame: false,
      digital: false
    },
    additionalRetouch: 0
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  // 사용 가능한 시간
  const allTimes = [
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  // 예약 가능 시간 확인
  const checkAvailability = async () => {
    if (!formData.date) return;
    
    setIsLoadingTimes(true);
    try {
      const dateStr = formData.date.toISOString().split('T')[0];
      const response = await fetch(`/api/check-availability-v2?date=${dateStr}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Availability data received:', data);
        // availableTimes가 없거나 빈 배열이면 allTimes 사용
        const availableTimes = data.availableTimes && data.availableTimes.length > 0 ? data.availableTimes : allTimes;
        setAvailableTimes(availableTimes);
        setBookedTimes(data.bookedTimes || []);
        console.log('Set availableTimes:', availableTimes);
        console.log('Set bookedTimes:', data.bookedTimes || []);
      } else {
        console.error('Failed to check availability');
        setAvailableTimes(allTimes);
        setBookedTimes([]);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailableTimes(allTimes);
      setBookedTimes([]);
    } finally {
      setIsLoadingTimes(false);
    }
  };

  // 총 가격 계산 함수
  const calculateTotalPrice = () => {
    console.log('calculateTotalPrice - formData:', formData);
    let basePrice = 0;
    switch (formData.shootingType) {
      case 'test': basePrice = 1; break;
      case '1person': basePrice = 65; break;
      case '2people': basePrice = 130; break;
      case '3people': basePrice = 195; break;
      case '4people': basePrice = 260; break;
      default: basePrice = 0;
    }

    let additionalCost = 0;
    if (formData.otherGoods.a4print) additionalCost += 10;
    if (formData.otherGoods.a4frame) additionalCost += 15;
    if (formData.otherGoods.digital) additionalCost += 20;
    if (formData.additionalRetouch) {
      additionalCost += (formData.additionalRetouch * 15);
    }

    const total = basePrice + additionalCost;
    console.log('calculateTotalPrice - basePrice:', basePrice, 'additionalCost:', additionalCost, 'total:', total);
    return total;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.shootingType) {
      setErrorMessage('Please select number of people.');
      return;
    }

    // 필수 필드 검증
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!formData.date || !formData.time) {
      setErrorMessage('Please select a date and time.');
      return;
    }

    // 결제 모달로 이동
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // 결제 성공 후 부킹 데이터 저장
      const bookingData = {
        ...formData,
        date: formData.date?.toISOString().split('T')[0]
      };
      
      const response = await fetch('/api/send-booking-emails-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData }),
      });

      if (response.ok) {
        setShowSuccess(true);
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

  const handlePaymentError = (message: string) => {
    setErrorMessage(message);
    setIsProcessing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('otherGoods.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        otherGoods: {
          ...prev.otherGoods,
          [field]: (e.target as HTMLInputElement).checked
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      date,
      time: '' // 날짜가 바뀌면 시간도 초기화
    }));
    
    if (date) {
      checkAvailability();
    } else {
      setAvailableTimes([]);
      setBookedTimes([]);
    }
  };

  return (
    <>
      <Head>
        <title>Mobile Booking - Emotional Studio</title>
        <meta name="description" content="Book your session at Emotional Studio" />
        <style>{`
          .react-datepicker-wrapper {
            width: 100%;
          }
          .react-datepicker__input-container input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #FF6100;
            background-color: rgba(255, 97, 0, 0.1);
            color: white;
            font-size: 16px;
          }
          .react-datepicker__input-container input::placeholder {
            color: #9ca3af;
          }
          .react-datepicker__input-container input:focus {
            outline: none;
            border-color: #FF6100;
            box-shadow: 0 0 0 2px rgba(255, 97, 0, 0.2);
          }
        `}</style>
      </Head>
      <MobileNavbar />
      <div className="min-h-screen bg-[#111] text-white">
        {/* 헤더 */}
        <header className="p-4 flex justify-center items-center border-b border-white/10">
          <h1 
            className="text-2xl font-medium"
            style={{
              fontFamily: 'CS-Valcon-Drawn-akhr7k, CS Valcon Drawn, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Booking
          </h1>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="p-4 pb-20">
          {!showPayment && !showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* 기본 정보 */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">Basic Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FF6100]/10 border border-[#FF6100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FF6100]/10 border border-[#FF6100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FF6100]/10 border border-[#FF6100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                {/* 세션 정보 */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">Session Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of People *</label>
                    <select
                      name="shootingType"
                      value={formData.shootingType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FF6100]/10 border border-[#FF6100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                      required
                    >
                      <option value="">Please select</option>
                      <option value="test">Test ($1)</option>
                      <option value="1person">1 Person ($65)</option>
                      <option value="2people">2 People ($130)</option>
                      <option value="3people">3 People ($195)</option>
                      <option value="4people">4 People ($260)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select date"
                      className="w-full px-4 py-3 bg-[#FF6100]/10 border border-[#FF6100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                    {isLoadingTimes ? (
                      <div className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-center text-gray-400">
                        Loading available times...
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {allTimes.map((time) => {
                          const isBooked = bookedTimes.includes(time);
                          const isSelected = formData.time === time;
                          // availableTimes가 비어있으면 모든 시간을 사용 가능으로 처리
                          const isAvailable = availableTimes.length === 0 || availableTimes.includes(time);
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => { if (!isBooked && isAvailable) setFormData(prev => ({ ...prev, time })); }}
                              disabled={isBooked || !isAvailable}
                              className={`
                                px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200
                                ${isBooked
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-[#FF6100] text-white border-[#FF6100] shadow-md'
                                  : isAvailable
                                  ? 'bg-[#FF6100]/10 text-white border-[#FF6100] hover:bg-[#FF6100] hover:border-[#FF6100] hover:text-white'
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
                  </div>
                </div>

                {/* 추가 옵션 */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">Additional Options</h2>
                  
                  <div className="space-y-3">

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="otherGoods.a4print"
                        checked={formData.otherGoods.a4print}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#FF6100] bg-gray-800 border-gray-600 rounded focus:ring-[#FF6100]"
                      />
                      <span className="ml-3 text-gray-300">4x6" Print (+$10)</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="otherGoods.a4frame"
                        checked={formData.otherGoods.a4frame}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#FF6100] bg-gray-800 border-gray-600 rounded focus:ring-[#FF6100]"
                      />
                      <span className="ml-3 text-gray-300">4x6" Frame (+$15)</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="otherGoods.digital"
                        checked={formData.otherGoods.digital}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#FF6100] bg-gray-800 border-gray-600 rounded focus:ring-[#FF6100]"
                      />
                      <span className="ml-3 text-gray-300">Original Digital Film (+$20)</span>
                    </label>

                  </div>
                  
                  {/* Additional Retouch */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Retouch {formData.additionalRetouch > 0 && `(+$${formData.additionalRetouch * 15})`}
                    </label>
                    <select
                      name="additionalRetouch"
                      value={formData.additionalRetouch}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FF6100]/10 border border-[#FF6100] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6100] text-white"
                    >
                      <option value={0}>No additional retouch</option>
                      <option value={1}>1 additional photo (+$15)</option>
                      <option value={2}>2 additional photos (+$30)</option>
                      <option value={3}>3 additional photos (+$45)</option>
                      <option value={4}>4 additional photos (+$60)</option>
                      <option value={5}>5 additional photos (+$75)</option>
                    </select>
                  </div>
                </div>


                {/* 총 금액 */}
                <div className="bg-[#FF6100]/10 border border-[#FF6100] p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total Amount</span>
                    <span className="text-2xl font-bold text-[#FF6100]">${calculateTotalPrice()}</span>
                  </div>
                </div>

                {/* 에러 메시지 */}
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#FF6100] to-[#FF8A00] text-white font-semibold rounded-lg hover:from-[#E55600] hover:to-[#E57300] transition-all duration-300 transform hover:scale-105"
                >
                  Continue to Payment
                </button>
              </form>
            </motion.div>
          )}

          {/* 성공 화면 */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                <p className="text-gray-300">We'll send you a confirmation email shortly.</p>
              </div>
              
              <div className="bg-[#FF6100]/10 border border-[#FF6100] p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Booking Details</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-gray-400">Name:</span> {formData.name}</p>
                  <p><span className="text-gray-400">Date:</span> {formData.date?.toLocaleDateString()}</p>
                  <p><span className="text-gray-400">Time:</span> {formData.time}</p>
                  <p><span className="text-gray-400">Total:</span> <span className="text-[#FF6100] font-bold">${calculateTotalPrice()}</span></p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSuccess(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: null,
                    time: '',
                    shootingType: '',
                    colorOption: false,
                    otherGoods: {
                      a4print: false,
                      a4frame: false,
                      digital: false,
                      calendar: false
                    },
                    message: ''
                  });
                }}
                className="w-full py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
              >
                Book Another Session
              </button>
            </motion.div>
          )}
        </div>

        {/* PaymentMethodModal */}
        <PaymentMethodModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          amount={calculateTotalPrice()}
          currency="aud"
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />

        {/* 문의하기 버튼 */}
        <MobileContactButton />
      </div>
    </>
  );
};

export default MobileBooking;