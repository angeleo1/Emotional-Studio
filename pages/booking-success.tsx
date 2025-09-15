import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Calendar, Users, DollarSign } from 'lucide-react';

const BookingSuccess = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // Stripe 세션에서 부킹 데이터 가져오기
      fetchSessionData();
    }
  }, [session_id]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`/api/get-session-data?session_id=${session_id}`);
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
        
        // 이메일 전송 (즉시)
        if (data.bookingData) {
          console.log('Sending booking emails immediately...');
          console.log('Booking data:', data.bookingData);
          await sendBookingEmails(data.bookingData);
        } else {
          console.error('No booking data found in session');
        }
      } else {
        console.error('Failed to fetch session data:', response.status);
        // 폴백: 기본 데이터 설정
        const bookingId = `ES${Date.now()}`;
        setSessionData({
          bookingId,
          sessionId: session_id,
          status: 'completed'
        });
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
      // 폴백: 기본 데이터 설정
      const bookingId = `ES${Date.now()}`;
      setSessionData({
        bookingId,
        sessionId: session_id,
        status: 'completed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendBookingEmails = async (bookingData: any) => {
    try {
      console.log('Sending booking emails for:', bookingData);
      
      // 부킹 데이터를 저장하고 이메일도 함께 전송
      const saveResponse = await fetch('/api/save-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (saveResponse.ok) {
        console.log('Booking data saved and emails sent successfully');
      } else {
        console.error('Failed to save booking data:', await saveResponse.text());
        
        // 저장 실패 시 이메일만 전송 시도
        try {
          const emailResponse = await fetch('/api/send-booking-emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingData }),
          });
          
          if (emailResponse.ok) {
            console.log('Emails sent successfully (without saving)');
          } else {
            console.error('Failed to send emails:', await emailResponse.text());
          }
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
        }
      }
    } catch (error) {
      console.error('Error in sendBookingEmails:', error);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border border-white/20 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
            <div className="relative w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          <p className="text-2xl text-white">Your booking has been confirmed</p>
          <p className="text-xl text-gray-300">We'll send you a confirmation email shortly</p>
        </motion.div>

        {/* Booking Details */}
        {sessionData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-gray-400 text-sm">Booking ID</p>
                  <p className="text-white font-medium">{sessionData.bookingId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-gray-400 text-sm">Payment ID</p>
                  <p className="text-white font-medium text-sm">{sessionData.sessionId}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-xl font-semibold text-white">What's Next?</h3>
          <div className="space-y-3 text-gray-300">
            <p>• You'll receive a confirmation email with all the details</p>
            <p>• We'll contact you 24 hours before your session</p>
            <p>• Please arrive 10 minutes early for your session</p>
            <p>• Bring a valid ID for verification</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={handleBackToHome}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 pt-6 border-t border-white/20"
        >
          <p className="text-gray-400 text-sm">
            Questions? Contact us at{' '}
            <a href="mailto:info@emotionalstudio.com" className="text-orange-400 hover:text-orange-300">
              info@emotionalstudio.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
