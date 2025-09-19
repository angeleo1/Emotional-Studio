export const generateBookingEmail = (bookingData: any) => {
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const calculateTotalPrice = () => {
    let basePrice = 0;
    switch (bookingData.shootingType) {
      case 'solo':
        basePrice = 55;
        break;
      case 'couple':
        basePrice = 98;
        break;
      case 'triple':
        basePrice = 150;
        break;
      case 'more':
        basePrice = 150;
        break;
      default:
        basePrice = 0;
    }

    let additionalCost = 0;
    if (bookingData.colorOption) additionalCost += 10;
    if (bookingData.otherGoods?.a4print) additionalCost += 10;
    if (bookingData.otherGoods?.a4frame) additionalCost += 15;
    if (bookingData.otherGoods?.digital) additionalCost += 20;
    if (bookingData.otherGoods?.calendar) additionalCost += 45;

    return basePrice + additionalCost;
  };

  const shootingTypeText = {
    'solo': 'Solo',
    'couple': 'Couple',
    'triple': 'Triple',
    'more': 'More (Contact)'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking - emotional studios</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ff6100; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #ff6100; border-bottom: 2px solid #ff6100; padding-bottom: 5px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .label { font-weight: bold; }
        .value { color: #666; }
        .total { font-size: 18px; font-weight: bold; color: #ff6100; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New Booking Received!</h1>
          <p>emotional studios</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>📅 Session Details</h3>
            <div class="info-row">
              <span class="label">Date:</span>
              <span class="value">${new Date(bookingData.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value">${formatTime(bookingData.time)}</span>
            </div>
            <div class="info-row">
              <span class="label">Shooting Type:</span>
              <span class="value">${shootingTypeText[bookingData.shootingType as keyof typeof shootingTypeText]}</span>
            </div>
          </div>

          <div class="section">
            <h3>👤 Customer Information</h3>
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${bookingData.name}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${bookingData.email}</span>
            </div>
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">${bookingData.phone}</span>
            </div>
          </div>

          <div class="section">
            <h3>🛍️ Additional Options</h3>
            <div class="info-row">
              <span class="label">Color Option:</span>
              <span class="value">${bookingData.colorOption ? 'Yes (+$10)' : 'No'}</span>
            </div>
            <div class="info-row">
              <span class="label">A4 Print:</span>
              <span class="value">${bookingData.otherGoods?.a4print ? 'Yes (+$10)' : 'No'}</span>
            </div>
            <div class="info-row">
              <span class="label">A4 Frame:</span>
              <span class="value">${bookingData.otherGoods?.a4frame ? 'Yes (+$15)' : 'No'}</span>
            </div>
            <div class="info-row">
              <span class="label">Digital Film:</span>
              <span class="value">${bookingData.otherGoods?.digital ? 'Yes (+$20)' : 'No'}</span>
            </div>
            <div class="info-row">
              <span class="label">Calendar:</span>
              <span class="value">${bookingData.otherGoods?.calendar ? 'Yes (+$45)' : 'No'}</span>
            </div>
          </div>

          ${bookingData.message ? `
          <div class="section">
            <h3>💬 Special Requests</h3>
            <p>${bookingData.message}</p>
          </div>
          ` : ''}

          <div class="section">
            <h3>💰 Total Price</h3>
            <div class="total">
              $${calculateTotalPrice()}
            </div>
          </div>
        </div>

        <div class="footer">
          <p>This booking was received at ${new Date().toLocaleString()}</p>
          <p>emotional studios - capture your true essence</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateCustomerConfirmationEmail = (bookingData: any) => {
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation - emotional studios</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ff6100; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #ff6100; border-bottom: 2px solid #ff6100; padding-bottom: 5px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .label { font-weight: bold; }
        .value { color: #666; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .notice { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .notice h4 { color: #856404; margin-top: 0; }
        .notice p { color: #856404; margin-bottom: 0; }
        .logo { text-align: center; margin: 20px 0; }
        .logo img { max-width: 200px; height: auto; }
        .contact-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .contact-info h4 { color: #ff6100; margin-top: 0; }
        .contact-info p { margin: 5px 0; }
        .instagram { color: #e4405f; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Booking Confirmed!</h1>
          <p>Thank you for choosing emotional studios</p>
        </div>
        
        <div class="content">
          <div class="logo">
            <img src="https://emotionalstudios.com.au/images/finallogo.png" alt="emotional studios logo" />
          </div>

          <div class="section">
            <h3>📅 Your Session Details</h3>
            <div class="info-row">
              <span class="label">Date:</span>
              <span class="value">${new Date(bookingData.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value">${formatTime(bookingData.time)}</span>
            </div>
          </div>

          <div class="section">
            <h3>📍 Studio Location</h3>
            <p>2/566 Queensberry Street, North Melbourne, VIC 3051</p>
          </div>

          <div class="section">
            <h3>📞 Contact Information</h3>
            <p>If you need to make any changes to your booking, please contact us:</p>
            <div class="contact-info">
              <h4>📧 Email</h4>
              <p><strong>admin@emotionalstudios.com.au</strong></p>
              <h4>📷 Instagram</h4>
              <p class="instagram"><strong>@emotional_studios</strong></p>
              <p>You can also send us a direct message on Instagram!</p>
            </div>
          </div>

          <div class="section">
            <h3>✨ What to Expect</h3>
            <p>We look forward to capturing your precious moments! Please arrive 10 minutes before your scheduled time.</p>
          </div>

          <div class="notice">
            <h4>📧 Important Notice</h4>
            <p><strong>This is an automated confirmation email and cannot be replied to directly.</strong></p>
            <p>If you need to make any changes to your booking or have questions, please contact us through the methods listed above.</p>
          </div>
        </div>

        <div class="footer">
          <p>emotional studios - capture your true essence</p>
        </div>
      </div>
    </body>
    </html>
  `;
}; 