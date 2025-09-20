import { GoogleGenAI } from '@google/genai';
import { CONSTANTS } from '../config/constants.js';
type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function getGeminiResponse(messages: Message[]): Promise<string> {
  const apiKey = CONSTANTS.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey });
  const modelId = 'gemini-2.5-flash';

  const result = await ai.models.generateContent({
    model: modelId,
    contents: [
      {
        role: 'user',
        parts: [{ text: `${messages[0].content}\n${messages[1].content}` }],
      },
    ],
  });

  const text =
    result.candidates &&
    result.candidates[0] &&
    result.candidates[0].content &&
    result.candidates[0].content.parts &&
    result.candidates[0].content.parts[0] &&
    result.candidates[0].content.parts[0].text
      ? result.candidates[0].content.parts[0].text
      : 'No response.';
  return text;
}
