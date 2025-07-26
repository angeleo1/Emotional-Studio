export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title = 'Hello', body = 'Hello, world!' } = req.body;

    const response = await fetch(
      'https://43c63552-1e0a-4648-a932-db267a634a77.pushnotifications.pusher.com/publish_api/v1/instances/43c63552-1e0a-4648-a932-db267a634a77/publishes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PUSHER_BEAMS_INSTANCE_KEY || 'YOUR_BEAMS_INSTANCE_KEY'}`
        },
        body: JSON.stringify({
          interests: ['hello'],
          web: {
            notification: {
              title: title,
              body: body
            }
          }
        })
      }
    );

    if (response.ok) {
      const result = await response.json();
      return res.status(200).json({ 
        message: 'Push notification sent successfully!',
        result 
      });
    } else {
      const error = await response.text();
      console.error('Push notification error:', error);
      return res.status(response.status).json({ 
        message: 'Failed to send push notification',
        error 
      });
    }
  } catch (error) {
    console.error('Push notification error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
} 