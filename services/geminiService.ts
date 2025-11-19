import { GoogleGenAI } from "@google/genai";

// Initialize the client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are EcoBot, a friendly and knowledgeable recycling assistant for the EcoCycle app. 
Your goal is to help users recycle correctly, understand their environmental impact, and navigate the EcoCycle app.
- Be encouraging and positive about sustainability.
- If asked about what can be recycled, provide general guidelines but suggest checking local rules.
- You can explain how the app works: users drop off bottles at centers to earn points, which they can redeem for eco-friendly items.
- Keep responses concise and helpful.`;

export const chatWithGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({
        message: message
    });

    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble processing that right now. Let's try again in a moment.";
  }
};