import * as XLSX from 'xlsx';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  shootingType: string;
  colorOption?: boolean;
  otherGoods?: any;
  message?: string;
  status: string;
  createdAt: string;
}

export const generateExcelBuffer = (bookings: Booking[]) => {
  try {
    // 요일별로 예약 분류
    const bookingsByDay: { [key: string]: Booking[] } = {
      'Monday': [],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': [],
      'Sunday': []
    };

    // 각 예약을 요일별로 분류
    bookings.forEach(booking => {
      const date = new Date(booking.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      if (bookingsByDay[dayName]) {
        // 같은 요일에 같은 시간이 있으면 최신으로 교체
        const existingIndex = bookingsByDay[dayName].findIndex(
          existing => existing.time === booking.time
        );
        
        if (existingIndex !== -1) {
          // 최신 예약으로 교체 (createdAt 기준)
          const existing = bookingsByDay[dayName][existingIndex];
          if (new Date(booking.createdAt) > new Date(existing.createdAt)) {
            bookingsByDay[dayName][existingIndex] = booking;
          }
        } else {
          // 새로운 시간이면 추가
          bookingsByDay[dayName].push(booking);
        }
      }
    });

    // 시간순으로 정렬
    Object.keys(bookingsByDay).forEach(day => {
      bookingsByDay[day].sort((a, b) => a.time.localeCompare(b.time));
    });

    // 워크북 생성
    const workbook = XLSX.utils.book_new();

    // 각 요일별로 워크시트 생성
    Object.keys(bookingsByDay).forEach(day => {
      if (bookingsByDay[day].length > 0) {
        // 엑셀용 데이터 준비
        const excelData = bookingsByDay[day].map(booking => ({
          'ID': booking.id,
          'Name': booking.name,
          'Email': booking.email,
          'Phone': booking.phone,
          'Date': booking.date,
          'Time': booking.time,
          'Shooting Type': booking.shootingType,
          'Color Option': booking.colorOption ? 'Yes' : 'No',
          'A4 Print': booking.otherGoods?.a4print ? 'Yes' : 'No',
          'A4 Frame': booking.otherGoods?.a4frame ? 'Yes' : 'No',
          'Digital Film': booking.otherGoods?.digital ? 'Yes' : 'No',
          'Calendar': booking.otherGoods?.calendar ? 'Yes' : 'No',
          'Message': booking.message || '',
          'Status': booking.status,
          'Created At': new Date(booking.createdAt).toLocaleString()
        }));

        // 워크시트 생성
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // 컬럼 너비 설정
        const columnWidths = [
          { wch: 15 }, // ID
          { wch: 20 }, // Name
          { wch: 25 }, // Email
          { wch: 15 }, // Phone
          { wch: 12 }, // Date
          { wch: 10 }, // Time
          { wch: 15 }, // Shooting Type
          { wch: 12 }, // Color Option
          { wch: 10 }, // A4 Print
          { wch: 10 }, // A4 Frame
          { wch: 12 }, // Digital Film
          { wch: 10 }, // Calendar
          { wch: 30 }, // Message
          { wch: 10 }, // Status
          { wch: 20 }  // Created At
        ];
        worksheet['!cols'] = columnWidths;

        // 워크시트를 워크북에 추가
        XLSX.utils.book_append_sheet(workbook, worksheet, day);
      }
    });

    // 엑셀 파일을 버퍼로 변환
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    console.log('✅ Excel file generated successfully');
    return excelBuffer;

  } catch (error) {
    console.error('❌ Error generating Excel file:', error);
    throw error;
  }
}; 