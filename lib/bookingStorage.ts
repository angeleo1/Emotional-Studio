// 메모리 기반 부킹 저장소 (배포 환경용)
interface Booking {
  id: string;
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  shootingType: string;
  colorOption: boolean;
  a4print: boolean;
  a4frame: boolean;
  digital: boolean;
  calendar: boolean;
  additionalRetouch: number;
  message: string;
  totalAmount: string;
  paymentStatus: string;
  paymentIntentId: string;
  status: string;
  createdAt: string;
}

// 메모리 저장소
let bookings: Booking[] = [];

// 부킹 저장
export function saveBooking(bookingData: any): void {
  try {
    const newBooking: Booking = {
      id: bookingData.bookingId,
      bookingId: bookingData.bookingId,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      date: bookingData.date,
      time: bookingData.time,
      shootingType: bookingData.shootingType,
      colorOption: bookingData.colorOption || false,
      a4print: bookingData.a4print || false,
      a4frame: bookingData.a4frame || false,
      digital: bookingData.digital || false,
      calendar: bookingData.calendar || false,
      additionalRetouch: bookingData.additionalRetouch || 0,
      message: bookingData.message || '',
      totalAmount: bookingData.totalAmount || '0',
      paymentStatus: bookingData.paymentStatus || 'completed',
      paymentIntentId: bookingData.paymentIntentId || '',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // 기존 예약이 있으면 업데이트, 없으면 추가
    const existingIndex = bookings.findIndex(b => b.bookingId === bookingData.bookingId);
    if (existingIndex >= 0) {
      bookings[existingIndex] = newBooking;
    } else {
      bookings.push(newBooking);
    }

    console.log('Booking saved to memory storage:', newBooking.bookingId);
    console.log('Total bookings in memory:', bookings.length);
  } catch (error) {
    console.error('Error saving booking to memory:', error);
    throw error;
  }
}

// 특정 날짜의 예약된 시간 조회
export function getBookedTimesForDate(date: string): string[] {
  try {
    const queryDate = new Date(date).toISOString().split('T')[0];
    
    const bookedTimes = bookings
      .filter(booking => {
        const bookingDate = new Date(booking.date).toISOString().split('T')[0];
        return bookingDate === queryDate && 
               (booking.status === 'confirmed' || booking.status === 'completed');
      })
      .map(booking => booking.time);

    console.log(`Found ${bookedTimes.length} booked times for ${date}:`, bookedTimes);
    return bookedTimes;
  } catch (error) {
    console.error('Error getting booked times:', error);
    return [];
  }
}

// 모든 예약 조회
export function getAllBookings(): Booking[] {
  return [...bookings];
}

// 특정 예약 조회
export function getBookingById(bookingId: string): Booking | null {
  return bookings.find(booking => booking.bookingId === bookingId) || null;
}

// 예약 삭제
export function deleteBooking(bookingId: string): boolean {
  const index = bookings.findIndex(booking => booking.bookingId === bookingId);
  if (index >= 0) {
    bookings.splice(index, 1);
    console.log('Booking deleted:', bookingId);
    return true;
  }
  return false;
}

// 저장소 초기화 (개발용)
export function clearAllBookings(): void {
  bookings = [];
  console.log('All bookings cleared from memory');
}
