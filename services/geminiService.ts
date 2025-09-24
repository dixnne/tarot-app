import { GoogleGenAI } from "@google/genai";
import { TarotCardType, ReadingEntry, TarotSpread } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getCardInterpretation = async (
  card: TarotCardType,
  readingHistory: ReadingEntry[],
  topic: string,
  spread: TarotSpread,
): Promise<string> => {
  const currentPositionIndex = readingHistory.length;
  const currentPosition = spread.cards[currentPositionIndex].position;

  const storySoFar = readingHistory
    .map((entry, index) => `La carta de '${spread.cards[index].position}' fue ${entry.card.name}, y su mensaje fue: "${entry.interpretation}"`)
    .join('\n');

  let prompt = `Eres 'La Vidente', una tarotista moderna con la energía de una hermana mayor cool y sabia. Tu tono es místico pero súper directo, empático y sin rodeos. Das el consejo que se necesita escuchar, no el que se quiere oír. Usas un lenguaje claro y actual. Estás haciendo una lectura de tarot sobre '${topic}' usando la tirada '${spread.name}'.

Tu tarea es interpretar la carta actual. Sigue estas reglas estrictamente:
1.  **Interpretación Concisa:** Escribe un párrafo de máximo 4-5 frases. Ve al grano, conectando la carta con su posición en la tirada, la historia y el tema.
2.  **Ejemplos Relatables:** Después de la interpretación, añade una sección titulada "**En tu vida:**". Aquí, da 1 o 2 ejemplos concretos y actuales que resuenen con temas de autodescubrimiento, decisiones académicas o profesionales, relaciones, amistades o manejar nuevas responsabilidades. Haz que el consultante pueda verse reflejado en situaciones reales.
3.  **Formato:** No añadas saludos ni despedidas, solo la interpretación y la sección "En tu vida:".
`;

  if (storySoFar) {
    prompt += `\nLa historia hasta ahora:\n${storySoFar}\n\nLa carta actual para **${currentPosition}** es **${card.name}**. Continúa la narrativa con esta nueva información.`;
  } else {
    prompt += `\nLa lectura comienza. La primera carta, representando **${currentPosition}**, es **${card.name}**. Revela su significado inicial para el consultante.`;
  }

   if (readingHistory.length === spread.cards.length - 1) {
    prompt += `\nEsta es la carta final. Concluye la historia y ofrece una guía clara y accionable para el futuro.`;
   }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.8,
          topP: 0.95,
          topK: 64,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "El cosmos guarda silencio... Ocurrió un error al intentar contactar a los espíritus. Por favor, inténtalo de nuevo.";
  }
};