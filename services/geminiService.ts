
import { GoogleGenAI, Type } from "@google/genai";
import { MTGCardData, CardRarity, CardColor } from "../types";

export const generateMTGCard = async (theme: string): Promise<{ data: MTGCardData, imageUrl: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 1. Generate Card Mechanics & Text
  const textResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a unique, balanced Magic: The Gathering card based on the theme: "${theme}". 
    The rules text should follow official MTG phrasing standards. 
    Ensure the color identity matches the card's mechanics.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          manaCost: { type: Type.STRING, description: "e.g., {2}{W}{U}" },
          typeLine: { type: Type.STRING, description: "e.g., Legendary Creature — Human Wizard" },
          rarity: { 
            type: Type.STRING, 
            enum: [CardRarity.COMMON, CardRarity.UNCOMMON, CardRarity.RARE, CardRarity.MYTHIC] 
          },
          rulesText: { type: Type.STRING },
          flavorText: { type: Type.STRING },
          power: { type: Type.STRING, description: "Optional for creatures" },
          toughness: { type: Type.STRING, description: "Optional for creatures" },
          colorIdentity: { 
            type: Type.STRING, 
            enum: [CardColor.WHITE, CardColor.BLUE, CardColor.BLACK, CardColor.RED, CardColor.GREEN, CardColor.MULTICOLOR, CardColor.COLORLESS] 
          },
          artPrompt: { type: Type.STRING, description: "A highly detailed visual description for image generation." }
        },
        required: ["name", "manaCost", "typeLine", "rarity", "rulesText", "colorIdentity", "artPrompt"]
      }
    }
  });

  const cardData: MTGCardData = JSON.parse(textResponse.text);

  // 2. Generate Card Art using Imagen
  const imageResponse = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: `Magic the Gathering card art style, professional digital painting, high fantasy: ${cardData.artPrompt}`,
    config: {
      numberOfImages: 1,
      aspectRatio: '1:1',
      outputMimeType: 'image/jpeg'
    }
  });

  const base64Image = imageResponse.generatedImages[0].image.imageBytes;
  const imageUrl = `data:image/jpeg;base64,${base64Image}`;

  return { data: cardData, imageUrl };
};
