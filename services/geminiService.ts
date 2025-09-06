
import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, Festivity } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateNicaraguanFolktale = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Escribe un relato corto basado en una leyenda popular de Nicaragua, como La Mocuana, El Cadejo, o La Carretanagua. El tono debe ser misterioso pero apto para jóvenes y familias. Finaliza con una pequeña moraleja o reflexión sobre la cultura nicaragüense.",
    });
    return response.text;
  } catch (error) {
    console.error("Error generating folktale:", error);
    return "No se pudo generar el relato. Por favor, intenta de nuevo más tarde.";
  }
};

export const generateFestivities = async (): Promise<Festivity[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Genera una lista de 4 festividades importantes de Nicaragua. Para cada una, proporciona su nombre, una fecha o mes aproximado, y una breve descripción.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING, description: "Nombre de la festividad" },
                            date: { type: Type.STRING, description: "Fecha o mes de la celebración" },
                            description: { type: Type.STRING, description: "Breve descripción de la festividad" }
                        }
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating festivities:", error);
        return [];
    }
};

export const generateQuizQuestions = async (): Promise<QuizQuestion[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Genera 5 preguntas de opción múltiple sobre la cultura, geografía y tradiciones de Nicaragua. Cada pregunta debe tener 4 opciones, y una de ellas debe ser la correcta. Asegúrate de que la opción correcta esté incluida en el campo 'answer'.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "La pregunta a realizar." },
                            options: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "Un arreglo de 4 posibles respuestas."
                            },
                            answer: { type: Type.STRING, description: "La respuesta correcta, que debe coincidir con una de las opciones." }
                        }
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating quiz questions:", error);
        return [];
    }
};

export const generateMapInfo = async (department: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Describe brevemente la riqueza cultural del departamento de ${department} en Nicaragua. Menciona un dato curioso, una comida típica o una tradición importante de la zona. El texto debe ser conciso y educativo.`,
        });
        return response.text;
    } catch (error) {
        console.error(`Error generating info for ${department}:`, error);
        return `No se pudo cargar la información para ${department}.`;
    }
};
