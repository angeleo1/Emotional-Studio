import { NextPage } from 'next';
import Head from 'next/head';
import { isBookingEnabled } from '../config/booking';
import BookingDisabled from '../components/BookingDisabled';
import SimplyBookIframe from '../components/SimplyBookIframe';

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

  return (
    <>
      <Head>
        <title>Booking | Emotional Studio</title>
        <meta name="description" content="Book your session at Emotional Studio" />
      </Head>

      {/* SimplyBook 위젯 - iframe 모드로 표시 */}
      <SimplyBookIframe />
    </>
  );
};

export default Booking; 