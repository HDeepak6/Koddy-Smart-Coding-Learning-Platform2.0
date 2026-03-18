import { GoogleGenAI } from "@google/genai";

export async function askKoddy(prompt: string, history: { role: string; parts: { text: string }[] }[]) {
  // Check multiple possible locations for the API key
  const apiKey = 
    (import.meta as any).env?.VITE_GEMINI_API_KEY || 
    process.env.GEMINI_API_KEY || 
    (import.meta as any).env?.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("GEMINI_API_KEY is missing in the environment");
    return "I'm missing my API key! Please make sure VITE_GEMINI_API_KEY is set in your Vercel Environment Variables and that you have redeployed the app.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Try primary model
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: "user", parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: "You are Koddy, a smart coding assistant. You help students with coding explanations, debugging, and programming concepts. Be encouraging, professional, and concise. Use markdown for code blocks.",
          temperature: 0.7,
        },
      });

      return response.text || "I couldn't generate a response.";
    } catch (primaryError: any) {
      console.warn("Primary model failed, trying fallback...", primaryError);
      
      // Fallback to pro model if flash fails
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          ...history,
          { role: "user", parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: "You are Koddy, a smart coding assistant.",
          temperature: 0.7,
        },
      });
      
      return fallbackResponse.text || "I couldn't generate a response.";
    }
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    // Provide a bit more context in the error message for debugging
    const errorMessage = error?.message || "Unknown error";
    return `Sorry, I'm having trouble connecting to my brain right now. (Error: ${errorMessage.substring(0, 50)}...)`;
  }
}
