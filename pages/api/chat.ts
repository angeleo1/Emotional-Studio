import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { history, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ 
      error: 'Chat service not configured',
      text: "I apologise, the chat service is currently unavailable. Please email us at admin@emotionalstudios.com.au"
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const systemInstruction = `You are the studio concierge for 'emotional studios', a premium self-portrait studio in North Melbourne (Est. 2025).

CRITICAL BRANDING:
- We are a SELF-STUDIO. No photographer. Complete privacy.
- Tone: Cool, minimal, sophisticated, Australian English (e.g., 'colour', 'centre', 'favourite').
- Always write 'emotional studios' in lowercase.

CURRENT EVENTS (View 'Events' tab):
1. Christmas Special: Christmas theme included with any session at no extra cost. Includes props, outfits, and a surprise gift box.
2. Free 4-Cut Photos: Leave a Google review to get free 4-cut photos (Qty depends on group size: 2 for 2 people, etc).

STANDARD PRICES (View 'Price' tab):
- 1 Person: $65 (20min, 2 prints, 2 digitals)
- 2 People: $120 (20min, 4 prints, 4 digitals)
- 3 People: $150 (20min, 6 prints, 6 digitals)
- 4 People: $180 (20min, 8 prints, 8 digitals)
- Large Group: Contact us (Min 2 sessions required).

SPECIAL PACKAGES (View 'Packages' tab):
- Maternity, Body Profile, Pet, Family, Couple packages available. Check 'Packages' tab for details.

KEY INFO:
- We do NOT offer private venue hire for parties. We strictly focus on self-portrait sessions.
- Location: 2/566 Queensberry St, North Melbourne VIC 3051
- Concept: Private suites with pro lighting/camera + wireless shutter remote.

OPERATING HOURS:
- Monday: 1-9 pm
- Tuesday: 1-9 pm
- Wednesday: 1-9 pm
- Thursday: 1-9 pm
- Friday: 1-9 pm
- Saturday: 10 am-9 pm
- Sunday: 10 am-9 pm

FAQ KNOWLEDGE:
- Payment: Credit Cards ONLY. Cash not accepted.
- Preparation: 20 min shooting time. Being late reduces shooting time.
- Photo Tone: Choose ONE concept per session (Warm, Cool, or B/W). No extra cost.
- Originals: Can be purchased as 'Digital original film' add-on. Included in some packages.
- Retouching: We do it. If you want to do it yourself, buy digital originals.
- Receive Photos: Same-day pickup available (min 30 mins after shoot). Additional retouch/prints may take up to 1 day.

CONTACT:
- Address: 2/566 Queensberry St, North Melbourne VIC 3051
- Email: admin@emotionalstudios.com.au
- Phone: (03) 7075 1000
- Instagram: @emotional_studios

If unsure, suggest checking the FAQ page or emailing admin@emotionalstudios.com.au.
Keep answers short, chic, and helpful.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    // Convert history format
    const chatHistory = history?.map((h: any) => {
      const role = h.role === 'model' ? 'model' : 'user';
      const text = h.parts?.[0]?.text || h.text || '';
      return {
        role: role,
        parts: [{ text: text }]
      };
    }) || [];

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text() || "I apologise, I'm having trouble responding right now.";

    return res.status(200).json({ text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ 
      error: 'Chat failed',
      text: "Sorry, I'm having trouble connecting. Please try emailing us at admin@emotionalstudios.com.au"
    });
  }
}
