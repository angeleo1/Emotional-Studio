import { BOOKING_CONFIG } from '../config/booking';

interface SquareBookingIframeProps {
  className?: string;
}

export default function SquareBookingIframe({ className = '' }: SquareBookingIframeProps) {
  const bookingUrl = BOOKING_CONFIG.SQUARE.BOOKING_URL;
  const isConfigured = !bookingUrl.includes('YOUR_SQUARE_BOOKING_URL');

  return (
    <div
      className={`square-booking-iframe-container ${className}`}
      style={{
        position: 'relative',
        zIndex: 1000,
        minHeight: '800px',
        width: '100%'
      }}
    >
      {isConfigured ? (
        <iframe
          src={bookingUrl}
          title="Square Online Booking"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '800px',
            border: 'none',
            overflow: 'hidden'
          }}
          allow="payment"
        />
      ) : (
        <div className="flex items-center justify-center h-full min-h-[400px] bg-gray-100 rounded-lg">
          <div className="text-center p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Square Booking Config Required</h3>
            <p className="text-gray-600 mb-4">
              Please update <code>config/booking.ts</code> with your Square Booking URL.
            </p>
            <a
              href="https://squareup.com/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Go to Square Dashboard
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
