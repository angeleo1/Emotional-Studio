export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], newMessage: string): Promise<string> => {

  try {

    const response = await fetch('/api/chat', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify({

        history: history,

        message: newMessage

      }),

    });



    if (!response.ok) {

      throw new Error('Network response was not ok');

    }



    const data = await response.json();

    return data.text || "I apologise, I'm strictly focused on our studio enquiries at the moment.";

  } catch (error) {

    console.error("Chat Service Error:", error);

    throw new Error("Chat response failed");

  }

};
