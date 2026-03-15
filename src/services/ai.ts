import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askKoddy(prompt: string, history: { role: string; parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are Koddy, a smart coding assistant. You help students with coding explanations, debugging, and programming concepts. Be encouraging, professional, and concise. Use markdown for code blocks.",
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
      },
    });

    return response.text || "I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later!";
  }
}
