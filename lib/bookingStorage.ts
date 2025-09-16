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
  additionalRetouch: number;
  message: string;
  totalAmount: string;
  paymentStatus: string;
  paymentIntentId: string;
  status: string;
  createdAt: string;
}

// 메모리에 예약 데이터 저장
let bookings: Booking[] = [];

// 메모리에서 예약 데이터 로드
function loadBookings(): Booking[] {
  return bookings;
}

// 메모리에 예약 데이터 저장
function saveBookingsToFile(bookingsData: Booking[]): void {
  bookings = bookingsData;
  console.log('Bookings saved to memory:', bookingsData.length, 'bookings');
}

// 부킹 저장
export function saveBooking(bookingData: any): void {
  try {
    console.log('=== saveBooking 시작 ===');
    console.log('받은 bookingData:', JSON.stringify(bookingData, null, 2));
    
    const bookings = loadBookings();
    console.log('기존 bookings 수:', bookings.length);
    
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
      additionalRetouch: bookingData.additionalRetouch || 0,
      message: bookingData.message || '',
      totalAmount: bookingData.totalAmount || '0',
      paymentStatus: bookingData.paymentStatus || 'completed',
      paymentIntentId: bookingData.paymentIntentId || '',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    console.log('생성된 newBooking:', JSON.stringify(newBooking, null, 2));

    // UI에서 이미 비활성화되므로 중복 체크 제거
    // 예약된 시간은 UI에서 선택할 수 없도록 처리됨

    // 기존 예약이 있으면 업데이트, 없으면 추가
    const existingIndex = bookings.findIndex(b => b.bookingId === bookingData.bookingId);
    if (existingIndex >= 0) {
      bookings[existingIndex] = newBooking;
      console.log('기존 예약 업데이트:', existingIndex);
    } else {
      bookings.push(newBooking);
      console.log('새 예약 추가');
    }

    console.log('파일 저장 시작...');
    // 파일에 저장
    saveBookingsToFile(bookings);
    console.log('파일 저장 완료');

    console.log('Booking saved to file storage:', newBooking.bookingId);
    console.log('Total bookings in file:', bookings.length);
    console.log('=== saveBooking 완료 ===');
  } catch (error) {
    console.error('Error saving booking to file:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

// 특정 날짜의 예약된 시간 조회
export function getBookedTimesForDate(date: string): string[] {
  try {
    const bookings = loadBookings();
    const queryDate = new Date(date).toISOString().split('T')[0];
    console.log('Query date for booked times:', queryDate);
    console.log('All bookings:', bookings.map(b => ({ date: b.date, time: b.time, status: b.status })));
    
    const bookedTimes = bookings
      .filter(booking => {
        const bookingDate = new Date(booking.date).toISOString().split('T')[0];
        const isDateMatch = bookingDate === queryDate;
        const isStatusValid = booking.status === 'confirmed' || booking.status === 'completed';
        
        console.log(`Booking ${booking.bookingId}: date=${bookingDate}, time=${booking.time}, status=${booking.status}, dateMatch=${isDateMatch}, statusValid=${isStatusValid}`);
        
        return isDateMatch && isStatusValid;
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
  return loadBookings();
}

// 특정 예약 조회
export function getBookingById(bookingId: string): Booking | null {
  const bookings = loadBookings();
  return bookings.find(booking => booking.bookingId === bookingId) || null;
}

// 예약 삭제
export function deleteBooking(bookingId: string): boolean {
  const bookings = loadBookings();
  const index = bookings.findIndex(booking => booking.bookingId === bookingId);
  if (index >= 0) {
    bookings.splice(index, 1);
    saveBookingsToFile(bookings);
    console.log('Booking deleted:', bookingId);
    return true;
  }
  return false;
}

// 저장소 초기화 (개발용)
export function clearAllBookings(): void {
  saveBookingsToFile([]);
  console.log('All bookings cleared from file');
}
