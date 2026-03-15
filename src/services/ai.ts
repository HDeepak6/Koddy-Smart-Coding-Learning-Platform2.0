import OpenAI from "openai";

export async function askKoddy(prompt: string, history: { role: string; parts: { text: string }[] }[]) {
  try {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      console.error("NVIDIA_API_KEY is missing");
      return "I'm sorry, my NVIDIA API key is not configured yet. Please check the environment settings.";
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });

    // Convert Gemini-style history to OpenAI-style messages
    const messages = history.map(h => ({
      role: h.role === 'model' ? 'assistant' : 'user' as 'assistant' | 'user' | 'system',
      content: h.parts[0].text
    }));

    // Add system instruction
    messages.unshift({
      role: "system",
      content: "You are Koddy, a smart coding assistant. You help students with coding explanations, debugging, and programming concepts. Be encouraging, professional, and concise. Use markdown for code blocks."
    });

    // Add current prompt
    messages.push({
      role: "user",
      content: prompt
    });

    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-405b-instruct", // High-quality NVIDIA model
      messages: messages,
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "I couldn't generate a response.";
  } catch (error: any) {
    console.error("NVIDIA AI Error:", error);
    if (error.status === 401) {
      return "It seems my NVIDIA API key is invalid. Please ensure a valid NVIDIA API key is set in the environment.";
    }
    return "Sorry, I'm having trouble connecting to my NVIDIA brain right now. Please try again later!";
  }
}
