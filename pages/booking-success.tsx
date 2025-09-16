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
      console.log('=== sendBookingEmails 호출됨 ===');
      console.log('Sending booking emails for:', bookingData);
      
      // 새로운 메일 전송 시스템 사용
      const emailResponse = await fetch('/api/send-booking-emails-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData }),
      });
      
      console.log('Email response status:', emailResponse.status);
      
      if (emailResponse.ok) {
        const result = await emailResponse.json();
        console.log('Booking processed successfully:', result);
      } else {
        const errorData = await emailResponse.json();
        console.error('Failed to process booking:', errorData);
        alert(`예약 처리 중 오류가 발생했습니다: ${errorData.message || 'Unknown error'}`);
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#111111' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#ff6100' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#111111' }}>
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
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5" style={{ color: '#ff6100' }} />
                <div>
                  <p className="text-gray-400 text-sm">Booking ID</p>
                  <p className="text-white font-medium">{sessionData.bookingId}</p>
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
            className="px-8 py-4 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            style={{ background: '#ff6100' }}
            onMouseEnter={(e) => e.target.style.background = '#e55a00'}
            onMouseLeave={(e) => e.target.style.background = '#ff6100'}
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
            <a href="mailto:admin@emotionalstudios.com.au" style={{ color: '#ff6100' }} className="hover:opacity-80">
              admin@emotionalstudios.com.au
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
