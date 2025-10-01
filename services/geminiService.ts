import { GoogleGenAI, Type } from "@google/genai";
import type { RoutineType, GoalCategory } from '../types';

const MODEL_NAME = 'gemini-2.5-flash';

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateContentWithRetries = async <T,>(prompt: string, responseSchema: any): Promise<T | null> => {
    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            },
        });

        const jsonString = response.text.trim();
        // Additional check for empty or invalid JSON response
        if (!jsonString) {
            console.error("Gemini API returned an empty response.");
            return null;
        }
        return JSON.parse(jsonString) as T;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return null;
    }
};


export const getRoutineSuggestions = async (routineType: RoutineType): Promise<string[]> => {
    const prompt = `Generate a list of 5 healthy and mindful tasks for a ${routineType} routine. The tasks should be short and actionable.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            tasks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
            },
        },
        required: ['tasks'],
    };
    const result = await generateContentWithRetries<{ tasks: string[] }>(prompt, schema);
    return result?.tasks ?? [];
};

export const getGoalSuggestions = async (category: GoalCategory): Promise<string[]> => {
    const prompt = `Generate a list of 3 inspiring, health and mindfulness goals for a ${category.toLowerCase()} timeframe. The goals should be actionable.`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            goals: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
            },
        },
        required: ['goals'],
    };
    const result = await generateContentWithRetries<{ goals: string[] }>(prompt, schema);
    return result?.goals ?? [];
};

export const getJournalPrompt = async (): Promise<string> => {
    const prompt = `Generate a single, insightful journal prompt for self-reflection and mindfulness. The prompt should be a question.`;
     const schema = {
        type: Type.OBJECT,
        properties: {
            prompt: {
                type: Type.STRING,
            },
        },
        required: ['prompt'],
    };
    const result = await generateContentWithRetries<{ prompt: string }>(prompt, schema);
    return result?.prompt ?? "What is one thing you are grateful for today?";
};
