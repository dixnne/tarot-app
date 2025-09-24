import { TarotSpread } from '../types';

const SPREADS_STORAGE_KEY = 'tarot-custom-spreads';

export const loadCustomSpreads = (): TarotSpread[] => {
  try {
    const storedSpreads = localStorage.getItem(SPREADS_STORAGE_KEY);
    if (storedSpreads) {
      return JSON.parse(storedSpreads);
    }
  } catch (error) {
    console.error("Failed to load custom spreads from localStorage", error);
  }
  return [];
};

export const saveCustomSpreads = (spreads: TarotSpread[]) => {
  try {
    localStorage.setItem(SPREADS_STORAGE_KEY, JSON.stringify(spreads));
  } catch (error) {
    console.error("Failed to save custom spreads to localStorage", error);
  }
};
