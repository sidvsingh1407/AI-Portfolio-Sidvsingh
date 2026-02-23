
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export interface ImprovedPromptResponse {
  improvedPrompt: string;
  explanation: string;
}

export const improvePrompt = async (userPrompt: string): Promise<ImprovedPromptResponse> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your environment.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `You are an expert AI prompt engineer. Your task is to rewrite a user's prompt to be clearer, more specific, and more effective for the Gemini 1.5 Flash model. Return a JSON object with two keys: "improvedPrompt" and "explanation". Do not wrap the JSON in markdown blocks or add any extra text.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedPrompt: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["improvedPrompt", "explanation"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as ImprovedPromptResponse;
  } catch (error) {
    console.error("Error improving prompt:", error);
    throw error;
  }
};
