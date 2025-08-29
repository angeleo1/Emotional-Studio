import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bookingData = req.body;
    console.log('Saving booking:', bookingData);

    // 여기서 실제로는 데이터베이스에 저장하거나 이메일을 보내는 등의 작업을 수행
    // 현재는 성공 응답만 반환
    res.status(200).json({ 
      message: 'Booking saved successfully',
      bookingId: Date.now().toString()
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking' });
  }
} 