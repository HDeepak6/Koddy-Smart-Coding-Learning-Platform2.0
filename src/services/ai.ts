export async function askKoddy(prompt: string, history: { role: string; parts: { text: string }[] }[]) {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, history })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get AI response');
    }

    const data = await response.json();
    return data.message;
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return `Sorry, I'm having trouble connecting to my brain right now. (${error.message})`;
  }
}
