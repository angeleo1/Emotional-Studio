import nodemailer from 'nodemailer';

// Gmail SMTP 설정
console.log('Initializing email service...');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT_SET');
console.log('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? 'SET' : 'NOT_SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Gmail 주소
    pass: process.env.EMAIL_APP_PASSWORD, // Gmail 앱 비밀번호
  },
});

// SMTP 연결 테스트
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP connection verified successfully');
  }
});

// 고객 확인 메일 생성
export function generateCustomerConfirmationEmail(bookingData: any) {
  const { name, email, phone, date, time, shootingType, totalAmount, bookingId } = bookingData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>예약 확인 - Emotional Studio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .total { font-size: 18px; font-weight: bold; color: #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 예약이 확인되었습니다!</h1>
          <p>Emotional Studio에서의 특별한 순간을 기대해 주세요</p>
        </div>
        
        <div class="content">
          <h2>안녕하세요, ${name}님!</h2>
          <p>예약이 성공적으로 완료되었습니다. 아래 세부 정보를 확인해 주세요.</p>
          
          <div class="booking-details">
            <h3>📅 예약 정보</h3>
            <div class="detail-row">
              <span class="detail-label">예약 번호:</span>
              <span class="detail-value">#${bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">날짜:</span>
              <span class="detail-value">${new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">시간:</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">촬영 유형:</span>
              <span class="detail-value">${getShootingTypeText(shootingType)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">총 금액:</span>
              <span class="detail-value total">$${totalAmount}</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h3>📞 연락처 정보</h3>
            <div class="detail-row">
              <span class="detail-label">이메일:</span>
              <span class="detail-value">${email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">전화번호:</span>
              <span class="detail-value">${phone}</span>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="https://emotionalstudios.com.au" class="button">웹사이트 방문하기</a>
          </div>
          
          <div class="footer">
            <p>문의사항이 있으시면 언제든지 연락해 주세요.</p>
            <p>📧 admin@emotionalstudios.com.au | 📱 +61 3 7075 1000</p>
            <p>Emotional Studio | Melbourne, Australia</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// 관리자 알림 메일 생성
export function generateAdminNotificationEmail(bookingData: any) {
  const { name, email, phone, date, time, shootingType, totalAmount, bookingId, message } = bookingData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>새로운 예약 - Emotional Studio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .total { font-size: 18px; font-weight: bold; color: #ff6b6b; }
        .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 새로운 예약이 도착했습니다!</h1>
          <p>예약 번호: #${bookingId}</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            <h3>⚠️ 즉시 확인 필요</h3>
            <p>새로운 예약이 접수되었습니다. 고객과의 일정을 확인하고 준비해 주세요.</p>
          </div>
          
          <div class="booking-details">
            <h3>👤 고객 정보</h3>
            <div class="detail-row">
              <span class="detail-label">이름:</span>
              <span class="detail-value">${name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">이메일:</span>
              <span class="detail-value">${email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">전화번호:</span>
              <span class="detail-value">${phone}</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h3>📅 예약 세부사항</h3>
            <div class="detail-row">
              <span class="detail-label">예약 번호:</span>
              <span class="detail-value">#${bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">날짜:</span>
              <span class="detail-value">${new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">시간:</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">촬영 유형:</span>
              <span class="detail-value">${getShootingTypeText(shootingType)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">총 금액:</span>
              <span class="detail-value total">$${totalAmount}</span>
            </div>
          </div>
          
          ${message ? `
          <div class="booking-details">
            <h3>💬 고객 메시지</h3>
            <p>${message}</p>
          </div>
          ` : ''}
          
          <div class="booking-details">
            <h3>📋 추가 옵션</h3>
            ${bookingData.colorOption ? '<p>✅ 컬러 옵션</p>' : ''}
            ${bookingData.a4print ? '<p>✅ A4 프린트</p>' : ''}
            ${bookingData.a4frame ? '<p>✅ A4 프레임</p>' : ''}
            ${bookingData.digital ? '<p>✅ 디지털 파일</p>' : ''}
            ${bookingData.additionalRetouch ? `<p>✅ 추가 리터치: ${bookingData.additionalRetouch}장</p>` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p><strong>예약 시간: ${new Date().toLocaleString('ko-KR')}</strong></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// 촬영 유형 텍스트 변환
function getShootingTypeText(type: string): string {
  const typeMap: { [key: string]: string } = {
    'test': '테스트 촬영',
    '1person': '1인 촬영',
    '2people': '2인 촬영',
    '3people': '3인 촬영',
    '4people': '4인 촬영',
    'more': '5인 이상',
    'solo': '솔로 촬영',
    'couple': '커플 촬영',
    'triple': '3인 촬영'
  };
  return typeMap[type] || type;
}

// 고객에게 확인 메일 전송
export async function sendCustomerConfirmationEmail(bookingData: any): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"Emotional Studio" <${process.env.EMAIL_USER}>`,
      to: bookingData.email,
      subject: `✅ 예약 확인 #${bookingData.bookingId} - ${new Date(bookingData.date).toLocaleDateString('ko-KR')}`,
      html: generateCustomerConfirmationEmail(bookingData)
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Customer confirmation email sent:', result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send customer confirmation email:', error);
    return false;
  }
}

// 관리자에게 알림 메일 전송
export async function sendAdminNotificationEmail(bookingData: any): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"Emotional Studio" <${process.env.EMAIL_USER}>`,
      to: 'admin@emotionalstudios.com.au',
      subject: `🎉 새로운 예약 #${bookingData.bookingId} - ${bookingData.name}`,
      html: generateAdminNotificationEmail(bookingData)
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return false;
  }
}

// 두 메일 모두 전송
export async function sendBookingEmails(bookingData: any): Promise<{ customer: boolean; admin: boolean }> {
  console.log('Sending booking emails for:', bookingData.bookingId);
  
  const [customerResult, adminResult] = await Promise.allSettled([
    sendCustomerConfirmationEmail(bookingData),
    sendAdminNotificationEmail(bookingData)
  ]);

  const customerSuccess = customerResult.status === 'fulfilled' && customerResult.value;
  const adminSuccess = adminResult.status === 'fulfilled' && adminResult.value;

  console.log('Email sending results:', { customer: customerSuccess, admin: adminSuccess });
  
  return {
    customer: customerSuccess,
    admin: adminSuccess
  };
}
