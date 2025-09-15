import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from '@stripe/stripe-js';
import { X, Calendar, Clock, Users, CreditCard, CheckCircle } from 'lucide-react';

// Zod 스키마 정의
const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  date: z.date().min(new Date(), 'Please select a future date'),
  time: z.string().min(1, 'Please select a time'),
  shootingType: z.string().min(1, 'Please select number of people'),
  colorOption: z.boolean(),
  a4print: z.boolean(),
  a4frame: z.boolean(),
  digital: z.boolean(),
  additionalRetouch: z.number().min(0).max(5),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      date: undefined,
      time: '',
      shootingType: '',
      colorOption: false,
      a4print: false,
      a4frame: false,
      digital: false,
      additionalRetouch: 0,
      message: '',
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
       case 'test': basePrice = 1; break;
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

  // Stripe Checkout으로 결제 처리
  const handlePayment = async () => {
    if (!isValid) {
      console.log('Form is not valid');
      return;
    }

    setIsProcessing(true);

    try {
      const bookingData = {
        name: watchedValues.name,
        email: watchedValues.email,
        phone: watchedValues.phone,
        date: watchedValues.date?.toISOString().split('T')[0],
        time: watchedValues.time,
        shootingType: watchedValues.shootingType,
        colorOption: watchedValues.colorOption,
        a4print: watchedValues.a4print,
        a4frame: watchedValues.a4frame,
        digital: watchedValues.digital,
        additionalRetouch: watchedValues.additionalRetouch,
        message: watchedValues.message || '',
      };

      console.log('Creating checkout session with:', { bookingData, amount: calculateTotalPrice() });

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData,
          amount: calculateTotalPrice(),
          currency: 'aud',
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
      console.error('Payment error:', error);
      alert(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 폼 제출 핸들러
  const onSubmit = (data: BookingFormData) => {
    console.log('Form data:', data);
    setCurrentStep(2);
  };

  // 모달 닫기
  const closeBooking = () => {
    setCurrentStep(1);
    setIsSuccess(false);
    onClose();
  };

  // 성공 후 폼 리셋
  const resetForm = () => {
    setCurrentStep(1);
    setIsSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
              <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Book Your Session</h2>
                <p className="text-gray-500">Create unforgettable memories with us</p>
                      </div>
                    </div>
            <button
              onClick={closeBooking}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
                </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
                {currentStep === 1 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                               <Controller
                                 name="name"
                                 control={control}
                                 render={({ field }) => (
                                   <input
                                     {...field}
                                     type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Your full name"
                                   />
                                 )}
                               />
                               {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                               )}
                             </div>
                             
                             <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                               <Controller
                                 name="email"
                                 control={control}
                                 render={({ field }) => (
                                   <input
                                     {...field}
                                     type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="your@email.com"
                                   />
                                 )}
                               />
                               {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                               )}
                             </div>
                             
                             <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                               <Controller
                                 name="phone"
                                 control={control}
                                 render={({ field }) => (
                                   <input
                                     {...field}
                                     type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Your phone number"
                                   />
                                 )}
                               />
                               {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                               )}
                </div>
                             
                             <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                               <Controller
                                 name="date"
                                 control={control}
                                 render={({ field }) => (
                                   <DatePicker
                                     selected={field.value}
                          onChange={field.onChange}
                                     minDate={new Date()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                     placeholderText="Select date"
                                   />
                                 )}
                               />
                               {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                               )}
                </div>
                             
                             <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                               <Controller
                                 name="time"
                                 control={control}
                                 render={({ field }) => (
                        <select 
                                     {...field}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                   >
                                     <option value="">Select time</option>
                                     {availableTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                                     ))}
                        </select>
                                 )}
                               />
                               {errors.time && (
                      <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of People *
                    </label>
                    <Controller
                      name="shootingType"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Select people</option>
                          <option value="test">Test Session - $1</option>
                          <option value="1person">1 Person - $65</option>
                          <option value="2people">2 People - $130</option>
                          <option value="3people">3 People - $195</option>
                          <option value="4people">4 People - $260</option>
                        </select>
                      )}
                    />
                    {errors.shootingType && (
                      <p className="mt-1 text-sm text-red-600">{errors.shootingType.message}</p>
                    )}
                           </div>
                         </div>

                {/* Additional Options */}
                             <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Additional Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <Controller
                                   name="colorOption"
                                   control={control}
                                   render={({ field }) => (
                        <label className="flex items-center space-x-3 cursor-pointer">
                                     <input
                                       type="checkbox"
                                       checked={field.value}
                            onChange={field.onChange}
                            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                     />
                          <span className="text-gray-700">Color Option (+$10)</span>
                        </label>
                                   )}
                                 />
                               
                                 <Controller
                                   name="a4print"
                                   control={control}
                                   render={({ field }) => (
                        <label className="flex items-center space-x-3 cursor-pointer">
                                     <input
                                       type="checkbox"
                                       checked={field.value}
                            onChange={field.onChange}
                            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                     />
                          <span className="text-gray-700">4x6" Print (+$10)</span>
                        </label>
                                   )}
                                 />
                               
                                 <Controller
                                   name="a4frame"
                                   control={control}
                                   render={({ field }) => (
                        <label className="flex items-center space-x-3 cursor-pointer">
                                     <input
                                       type="checkbox"
                                       checked={field.value}
                            onChange={field.onChange}
                            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                     />
                          <span className="text-gray-700">4x6" Frame (+$15)</span>
                        </label>
                                   )}
                                 />
                               
                                 <Controller
                                   name="digital"
                                   control={control}
                                   render={({ field }) => (
                        <label className="flex items-center space-x-3 cursor-pointer">
                                     <input
                                       type="checkbox"
                                       checked={field.value}
                            onChange={field.onChange}
                            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                     />
                          <span className="text-gray-700">Digital Original (+$20)</span>
                        </label>
                                   )}
                                 />
                  </div>
                             
                               <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Retouch (${watchedValues.additionalRetouch * 15})
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
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      )}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>0</span>
                      <span>5</span>
                </div>
              </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                           <Controller
                             name="message"
                             control={control}
                             render={({ field }) => (
                               <textarea
                                 {...field}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Any special requests or notes..."
                               />
                             )}
                           />
                  </div>
                         </div>

                {/* Total Price */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${calculateTotalPrice()}.00 AUD
                             </span>
                           </div>
                </div>

                {/* Submit Button */}
                           <button
                             type="submit"
                             disabled={!isValid}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  Continue to Payment
                           </button>
                    </form>
                )}

                {currentStep === 2 && (
              <div className="space-y-6">
                {/* Booking Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <p className="font-medium text-gray-900">{watchedValues.name}</p>
                           </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium text-gray-900">{watchedValues.email}</p>
                           </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium text-gray-900">{watchedValues.phone}</p>
                      </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="font-medium text-gray-900">
                        {watchedValues.date?.toLocaleDateString('en-AU', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        </p>
                      </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <p className="font-medium text-gray-900">{watchedValues.time}</p>
                      </div>
                    <div>
                      <span className="text-gray-500">Session:</span>
                      <p className="font-medium text-gray-900">
                        {watchedValues.shootingType === 'test' ? 'Test Session' :
                         watchedValues.shootingType === '1person' ? '1 Person' :
                         watchedValues.shootingType === '2people' ? '2 People' :
                         watchedValues.shootingType === '3people' ? '3 People' :
                         watchedValues.shootingType === '4people' ? '4 People' :
                         watchedValues.shootingType}
                           </p>
                    </div>
                  </div>

                  {/* Additional Options */}
                  {(watchedValues.colorOption || watchedValues.a4print || watchedValues.a4frame || 
                    watchedValues.digital || watchedValues.additionalRetouch > 0) && (
                    <div className="mt-4">
                      <span className="text-gray-500 text-sm">Additional Options:</span>
                      <ul className="mt-1 space-y-1">
                        {watchedValues.colorOption && <li className="text-sm text-gray-700">• Color Option (+$10)</li>}
                        {watchedValues.a4print && <li className="text-sm text-gray-700">• 4x6" Print (+$10)</li>}
                        {watchedValues.a4frame && <li className="text-sm text-gray-700">• 4x6" Frame (+$15)</li>}
                        {watchedValues.digital && <li className="text-sm text-gray-700">• Digital Original (+$20)</li>}
                        {watchedValues.additionalRetouch > 0 && (
                          <li className="text-sm text-gray-700">
                            • Additional Retouch: {watchedValues.additionalRetouch} (+${watchedValues.additionalRetouch * 15})
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {watchedValues.message && (
                    <div className="mt-4">
                      <span className="text-gray-500 text-sm">Special Requests:</span>
                      <p className="text-sm text-gray-700 mt-1">{watchedValues.message}</p>
                      </div>
                  )}

                  {/* Total Amount */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-orange-600">
                        ${calculateTotalPrice()}.00 AUD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay with Stripe - ${calculateTotalPrice()}.00 AUD
                    </>
                  )}
                </button>

                {/* Back Button */}
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  ← Back to Details
                </button>
              </div>
            )}
          </div>
            </motion.div>
          </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;