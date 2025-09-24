import React from 'react';
import { TarotCardType, TarotSpread } from '../types';
import TarotCard from './TarotCard';
import { playSound, SOUNDS } from '../services/soundService';

interface CardSelectionScreenProps {
  deck: TarotCardType[];
  selectedCards: TarotCardType[];
  spread: TarotSpread;
  onCardSelect: (card: TarotCardType) => void;
  onReadingStart: () => void;
}

const CardSelectionScreen: React.FC<CardSelectionScreenProps> = ({ deck, selectedCards, spread, onCardSelect, onReadingStart }) => {
  const cardsToSelect = spread.cards.length;
  const remainingSelections = cardsToSelect - selectedCards.length;

  const handleCardClick = (card: TarotCardType) => {
    const isSelected = selectedCards.some(sc => sc.id === card.id);
    const canSelect = selectedCards.length < cardsToSelect;
    if (!isSelected && canSelect) {
      playSound(SOUNDS.CARD_FLIP);
      onCardSelect(card);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-4 fade-in w-screen h-screen">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-serif text-purple-300 mb-1">Cruza el Velo</h2>
        <p className="text-base text-gray-400">
          {remainingSelections > 0 
            ? `Elige ${remainingSelections} carta${remainingSelections > 1 ? 's' : ''} más para revelar tu historia.`
            : "Tus cartas han sido elegidas. Los espíritus esperan."}
        </p>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 md:gap-6 mb-4 flex-grow w-full max-w-screen-2xl px-2 content-center">
        {deck.map(card => {
          const isSelected = selectedCards.some(sc => sc.id === card.id);
          const canSelect = selectedCards.length < cardsToSelect;
          return (
            <div 
              key={card.id} 
              className={`transition-transform duration-300 ${isSelected ? 'transform -translate-y-4' : (canSelect ? 'hover:-translate-y-2' : '')}`}
              onClick={() => handleCardClick(card)}
            >
              <TarotCard card={card} isFlipped={isSelected} />
            </div>
          );
        })}
      </div>

      <div className="h-20 flex items-center">
        {selectedCards.length === cardsToSelect && (
          <button
            onClick={onReadingStart}
            className="px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-full shadow-lg shadow-purple-500/30 hover:bg-purple-500 transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            Comenzar la Lectura
          </button>
        )}
      </div>
    </div>
  );
};

export default CardSelectionScreen;