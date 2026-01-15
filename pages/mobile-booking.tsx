import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout/Layout';
import SquareBookingIframe from '../components/SquareBookingIframe';
import { isBookingEnabled, BOOKING_CONFIG } from '../config/booking';

export default function MobileBooking() {
  const { t, i18n } = useTranslation('common');
  const bookingEnabled = isBookingEnabled();

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-0">
          {bookingEnabled ? (
            <div className="w-full min-h-[calc(100vh-80px)]">
              <SquareBookingIframe />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {i18n.language === 'ko' ? '예약 시스템 점검 중' : 'Booking System Maintenance'}
              </h2>
              <p className="text-gray-600">
                {BOOKING_CONFIG.DISABLED_MESSAGE[i18n.language as keyof typeof BOOKING_CONFIG.DISABLED_MESSAGE] || BOOKING_CONFIG.DISABLED_MESSAGE.en}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ko', ['common'])),
    },
  };
};
