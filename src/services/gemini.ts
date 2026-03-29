/**
 * services/gemini.ts
 * 
 * Vercel Deployment Instructions:
 * 1. Environment Variable Name: VITE_GEMINI_API_KEY
 * 2. Set in: Vercel Dashboard -> Project -> Settings -> Environment Variables
 * 3. Note: Must be prefixed with VITE_ for Vite to expose it to the browser.
 */

import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { logger } from "../utils/logger";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (import.meta.env.DEV) {
  if (API_KEY) {
    logger.info("Gemini API Key detected successfully.");
  } else {
    logger.warn("Gemini API Key (VITE_GEMINI_API_KEY) is missing in the browser environment.");
  }
}

export interface GeminiCandidate {
  content: {
    parts: { text: string }[];
  };
}

export interface GeminiAPIResponse {
  candidates: GeminiCandidate[];
}

export interface ImprovedPromptResult {
  improvedPrompt: string;
  explanation: string;
  alternatives: string[];
}

/**
 * Exponential backoff utility
 */
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchWithRetry(
  fn: () => Promise<GenerateContentResponse>,
  retries = 2,
  delay = 1000
): Promise<GenerateContentResponse> {
  try {
    return await fn();
  } catch (error: any) {
    const status = error?.status || 0;
    // Retry only on 429 (Rate Limit) and 5xx (Server Error)
    if (retries > 0 && (status === 429 || status >= 500)) {
      logger.warn(`Gemini API error ${status}. Retrying in ${delay}ms...`);
      await wait(delay);
      return fetchWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

let currentAbortController: AbortController | null = null;

export const improvePrompt = async (prompt: string): Promise<ImprovedPromptResult> => {
  // Guard: API Key
  if (!API_KEY) {
    throw new Error("API_KEY_MISSING");
  }

  // Guard: Input validation
  const sanitized = prompt.trim();
  if (sanitized.length < 10) {
    throw new Error("PROMPT_TOO_SHORT");
  }
  if (sanitized.length > 4000) {
    throw new Error("PROMPT_TOO_LONG");
  }

  // Abort previous request
  if (currentAbortController) {
    currentAbortController.abort();
  }
  currentAbortController = new AbortController();

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are an expert AI prompt engineer. 
    Analyze the user's input and provide:
    1. A highly optimized version of the prompt.
    2. A brief explanation of the strategic improvements made.
    3. Two shorter alternative versions.
    
    Return strictly valid JSON.
  `;

  const response = await fetchWithRetry(() => 
    ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: sanitized,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedPrompt: { type: Type.STRING },
            explanation: { type: Type.STRING },
            alternatives: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
          },
          required: ["improvedPrompt", "explanation", "alternatives"],
        },
      },
    })
  );

  const text = response.text;
  if (!text) throw new Error("EMPTY_RESPONSE");

  try {
    return JSON.parse(text) as ImprovedPromptResult;
  } catch (e) {
    logger.error("Failed to parse Gemini JSON response", e);
    throw new Error("PARSE_ERROR");
  }
};
