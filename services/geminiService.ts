/**
 * Client-side function to call the chat API
 * The actual Gemini API call happens on the server
 */
export const generateChatResponse = async (
  history: {role: string, parts: {text: string}[]}[], 
  newMessage: string
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        message: newMessage,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Chat API error:', data.error);
      return data.text || "Sorry, I'm having trouble connecting. Please try emailing us instead.";
    }

    return data.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, I'm having trouble connecting. Please try emailing us instead.";
  }
};
