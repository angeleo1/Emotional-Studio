import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Places API key not configured' });
  }

  // Emotional Studios Place ID
  const placeId = 'ChIJY9raGLBd1moRgkXK4WYeOTI';

  try {
    // Step 1: Place Details API로 리뷰 가져오기
    const detailsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
    );

    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch place details');
    }

    const data = await detailsResponse.json();
    
    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Failed to fetch reviews');
    }

    res.status(200).json({
      success: true,
      data: data.result
    });
    
  } catch (error) {
    console.error('Google Reviews API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch reviews' 
    });
  }
}
