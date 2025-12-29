
export enum CardRarity {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  MYTHIC = 'Mythic Rare'
}

export enum CardColor {
  WHITE = 'White',
  BLUE = 'Blue',
  BLACK = 'Black',
  RED = 'Red',
  GREEN = 'Green',
  MULTICOLOR = 'Multicolor',
  COLORLESS = 'Colorless'
}

export interface MTGCardData {
  name: string;
  manaCost: string;
  typeLine: string;
  rarity: CardRarity;
  rulesText: string;
  flavorText?: string;
  power?: string;
  toughness?: string;
  colorIdentity: CardColor;
  artPrompt: string;
}

export interface CardState {
  data: MTGCardData | null;
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}
