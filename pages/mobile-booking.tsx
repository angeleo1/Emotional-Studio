import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import MobileNavbar from '../components/MobileNavbar';
import MobileContactButton from '../components/MobileContactButton';

// Stripe 초기화
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// 결제 폼 컴포넌트
const PaymentForm = ({ formData, onSuccess, onError, isProcessing, setIsProcessing }: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shootingType: formData.shootingType,
          colorOption: formData.colorOption,
          otherGoods: formData.otherGoods,
          formData: formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        onError(`Payment failed: ${error.message}`);
      } else {
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
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <button 
          type="submit" 
          className={`w-full py-3 px-4 bg-[#FF6100] text-white rounded-lg font-medium transition-colors ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e55600]'
          }`}
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const MobileBooking: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null as Date | null,
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

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  
  // 문의하기 모달 상태
  const [contactMode, setContactMode] = useState<'chat' | 'email'>('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' });

  // 날짜가 변경될 때마다 사용 가능한 시간 확인
  useEffect(() => {
    if (formData.date) {
      checkAvailability();
    } else {
      setAvailableTimes([]);
      setBookedTimes([]);
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [formData.date]);

  const checkAvailability = async () => {
    if (!formData.date) return;

    setIsLoadingTimes(true);
    try {
      const dateString = formData.date.toISOString().split('T')[0];
      const response = await fetch(`/api/check-availability?date=${dateString}`);
      
      if (response.ok) {
        const data = await response.json();
        setAvailableTimes(data.availableTimes);
        setBookedTimes(data.bookedTimes);
        
        if (formData.time && !data.availableTimes.includes(formData.time)) {
          setFormData(prev => ({ ...prev, time: '' }));
        }
      } else {
        console.error('Failed to check availability');
        setAvailableTimes([]);
        setBookedTimes([]);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailableTimes([]);
      setBookedTimes([]);
    } finally {
      setIsLoadingTimes(false);
    }
  };

  const calculateTotalPrice = () => {
    let basePrice = 0;
    switch (formData.shootingType) {
      case '1person':
        basePrice = 65;
        break;
      case '2people':
        basePrice = 130;
        break;
      case '3people':
        basePrice = 195;
        break;
      case '4people':
        basePrice = 260;
        break;
      case 'more':
        basePrice = 0;
        break;
      default:
        basePrice = 0;
    }

    let additionalCost = 0;
    if (formData.colorOption) additionalCost += 15;
    if (formData.otherGoods.a4print) additionalCost += 20;
    if (formData.otherGoods.a4frame) additionalCost += 30;
    if (formData.otherGoods.digital) additionalCost += 25;
    if (formData.otherGoods.calendar) additionalCost += 35;

    return basePrice + additionalCost;
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

    // 예약 저장
    try {
      const dateString = formData.date.toISOString().split('T')[0];
      const response = await fetch('/api/save-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: dateString
        }),
      });

      if (response.ok) {
        setShowPayment(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to save booking. Please try again.');
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      setErrorMessage('Failed to save booking. Please try again.');
    }
  };

  const handlePaymentSuccess = () => {
    setShowSuccess(true);
    setShowPayment(false);
    setIsProcessing(false);
    
    // 폼 데이터 초기화
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
    setAvailableTimes([]);
    setBookedTimes([]);
  };

  const handlePaymentError = (message: string) => {
    setErrorMessage(message);
    setIsProcessing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, date, time: '' }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      otherGoods: {
        ...prev.otherGoods,
        [name]: checked
      }
    }));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getAllTimes = () => {
    const times: string[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  return (
    <>
      <Head>
        <title>Booking | Emotional Studio</title>
        <meta name="description" content="Book your photography session at Emotional Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style jsx global>{`
          .svg-glitch-wrapper {
            position: relative;
            display: inline-block;
          }
          
          .svg-glitch-wrapper .base-icon,
          .svg-glitch-wrapper .glitch-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          
          .svg-glitch-wrapper .glitch-layer {
            opacity: 0;
            animation: glitch 2s infinite;
          }
          
          .svg-glitch-wrapper .glitch-layer.one {
            animation-delay: 0s;
          }
          
          .svg-glitch-wrapper .glitch-layer.two {
            animation-delay: 0.1s;
          }
          
          @keyframes glitch {
            0%, 100% { opacity: 0; transform: translate(0); }
            10% { opacity: 0.8; transform: translate(-2px, 2px); }
            20% { opacity: 0; transform: translate(0); }
            30% { opacity: 0.8; transform: translate(2px, -2px); }
            40% { opacity: 0; transform: translate(0); }
            50% { opacity: 0.8; transform: translate(-2px, -2px); }
            60% { opacity: 0; transform: translate(0); }
            70% { opacity: 0.8; transform: translate(2px, 2px); }
            80% { opacity: 0; transform: translate(0); }
            90% { opacity: 0.8; transform: translate(-2px, 0); }
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
                  <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                    Contact Information
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6100]"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6100]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6100]"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                {/* 날짜 및 시간 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                    Date & Time
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      dateFormat="MMMM dd, yyyy"
                      placeholderText="Select date"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6100]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time *</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#FF6100]"
                      required
                      disabled={!formData.date || isLoadingTimes}
                    >
                      <option value="">Select time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                    {isLoadingTimes && (
                      <p className="text-sm text-gray-400 mt-1">Loading available times...</p>
                    )}
                  </div>
                </div>

                {/* 촬영 타입 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                    NUMBER OF PEOPLE
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '1person', label: '1', price: '$65' },
                      { value: '2people', label: '2', price: '$130' },
                      { value: '3people', label: '3', price: '$195' },
                      { value: '4people', label: '4', price: '$260' },
                      { value: 'more', label: 'or More (Contact)', price: '' }
                    ].map(option => (
                      <label key={option.value} className="relative">
                        <input
                          type="radio"
                          name="shootingType"
                          value={option.value}
                          checked={formData.shootingType === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.shootingType === option.value
                            ? 'border-[#FF6100] bg-[#FF6100]/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 추가 옵션 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                    Additional Options
                  </h2>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="colorOption"
                      checked={formData.colorOption}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                    />
                    <span>Color Option (+$15)</span>
                  </label>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="a4print"
                        checked={formData.otherGoods.a4print}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                      />
                      <span>A4 Print (+$20)</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="a4frame"
                        checked={formData.otherGoods.a4frame}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                      />
                      <span>A4 Frame (+$30)</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="digital"
                        checked={formData.otherGoods.digital}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                      />
                      <span>Digital Files (+$25)</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="calendar"
                        checked={formData.otherGoods.calendar}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-[#FF6100] bg-white/10 border-white/20 rounded focus:ring-[#FF6100]"
                      />
                      <span>Calendar (+$35)</span>
                    </label>
                  </div>
                </div>

                {/* 메시지 */}
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6100]"
                    placeholder="Any special requests or notes..."
                  />
                </div>

                {/* 총 가격 */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-2xl font-bold text-[#FF6100]">
                      ${calculateTotalPrice()}
                    </span>
                  </div>
                </div>

                {/* 에러 메시지 */}
                {errorMessage && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300">
                    {errorMessage}
                  </div>
                )}

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-transparent border border-[#FF6100] text-[#FF6100] rounded-lg font-medium hover:bg-[#FF6100] hover:text-white transition-colors"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </motion.div>
          )}

          {/* 결제 화면 */}
          {showPayment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                  Payment
                </h2>
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total:</span>
                    <span className="text-2xl font-bold text-[#FF6100]">
                      ${calculateTotalPrice()}
                    </span>
                  </div>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <PaymentForm
                  formData={formData}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </Elements>

              <button
                onClick={() => setShowPayment(false)}
                className="w-full mt-4 py-3 px-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Back to Form
              </button>
            </motion.div>
          )}

          {/* 성공 화면 */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'CS-Valcon-Drawn-akhr7k' }}>
                  Booking Confirmed!
                </h2>
                <p className="text-gray-300 mb-4">
                  Thank you for your booking. We'll send you a confirmation email shortly.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-3 px-4 bg-[#FF6100] text-white rounded-lg font-medium hover:bg-[#e55600] transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 우하단 문의하기 아이콘 */}
      <MobileContactButton />
    </>
  );
};

export default MobileBooking; 