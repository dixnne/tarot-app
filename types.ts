export interface TarotCardType {
  id: number;
  name: string; // Spanish name
  englishName: string; // English name for image queries
  emoji: string;
}

export interface TarotSpreadCard {
  position: string;
  description: string;
}

export interface TarotSpread {
  key: string;
  name: string;
  description: string;
  cards: TarotSpreadCard[];
}

export enum GameState {
  Welcome = 'welcome',
  Selecting = 'selecting',
  Reading = 'reading',
  Finished = 'finished',
}

export interface ReadingEntry {
  card: TarotCardType;
  interpretation: string;
}