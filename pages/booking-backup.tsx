import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout/Layout';
import SquareBookingIframe from '../components/SquareBookingIframe';
import { isBookingEnabled, BOOKING_CONFIG } from '../config/booking';

export default function BookingBackup() {
  const { t, i18n } = useTranslation('common');
  const bookingEnabled = isBookingEnabled();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              {t('booking.title', 'Book Your Session')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('booking.subtitle', 'Choose the perfect time for your emotional profile session.')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 max-w-5xl mx-auto">
            {bookingEnabled ? (
              <SquareBookingIframe />
            ) : (
              <div className="text-center py-20">
                <div className="mb-6">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {i18n.language === 'ko' ? '예약 시스템 점검 중' : 'Booking System Maintenance'}
                </h2>
                <p className="text-gray-600 max-w-lg mx-auto">
                  {BOOKING_CONFIG.DISABLED_MESSAGE[i18n.language as keyof typeof BOOKING_CONFIG.DISABLED_MESSAGE] || BOOKING_CONFIG.DISABLED_MESSAGE.en}
                </p>
              </div>
            )}
          </div>
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
