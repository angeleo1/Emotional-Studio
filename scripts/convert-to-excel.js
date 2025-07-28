const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// JSON 파일 읽기
const jsonPath = path.join(__dirname, '../data/bookings.json');

// 엑셀 파일명 생성 (날짜_시간 형식)
const now = new Date();
const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
const excelFileName = `bookings_${dateStr}_${timeStr}.xlsx`;
const excelPath = path.join(__dirname, '../data', excelFileName);

try {
  if (fs.existsSync(jsonPath)) {
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // 엑셀용 데이터 준비
    const excelData = jsonData.bookings.map(booking => ({
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

    // 워크북 생성
    const workbook = XLSX.utils.book_new();
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');

    // 엑셀 파일 저장
    XLSX.writeFile(workbook, excelPath);

    console.log('✅ Excel file created successfully:', excelFileName);
    console.log(`📊 Converted ${excelData.length} bookings to Excel format`);
    console.log(`📁 File saved as: ${excelPath}`);
  } else {
    console.log('❌ JSON file not found:', jsonPath);
  }
} catch (error) {
  console.error('❌ Error converting to Excel:', error);
} 