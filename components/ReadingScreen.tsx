import React, { useState, useEffect } from 'react';
import { TarotCardType, ReadingEntry, TarotSpread } from '../types';
import TarotCard from './TarotCard';
import LoadingSpinner from './LoadingSpinner';
import { playSound, SOUNDS } from '../services/soundService';

interface ReadingScreenProps {
  spread: TarotSpread;
  selectedCards: TarotCardType[];
  readings: ReadingEntry[];
  isLoading: boolean;
  error: string | null;
  onRevealNext: () => void;
  onReset: () => void;
}

const ReadingScreen: React.FC<ReadingScreenProps> = ({ spread, selectedCards, readings, isLoading, error, onRevealNext, onReset }) => {
  const [animatedText, setAnimatedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const currentReadingIndex = readings.length;
  const isFinished = currentReadingIndex === spread.cards.length && !isLoading;
  const lastReading = readings[currentReadingIndex - 1];

  useEffect(() => {
    if (lastReading && !isLoading) {
      playSound(SOUNDS.TEXT_APPEAR);
      const fullText = lastReading.interpretation;
      let i = 0;
      setAnimatedText('');
      setIsAnimating(true);
      const intervalId = setInterval(() => {
        setAnimatedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(intervalId);
          setIsAnimating(false);
        }
      }, 25);
      return () => clearInterval(intervalId);
    }
  }, [lastReading, isLoading]);

  const handleNextClick = () => {
    if (isFinished) {
      onReset();
      return;
    }
    
    // Play click sound for "Siguiente", but not for the very first "Revelar Carta"
    if (currentReadingIndex > 0 && currentReadingIndex < spread.cards.length) {
      playSound(SOUNDS.NEXT_CLICK);
    }
    
    onRevealNext();
  };
  
  const renderCardLayout = () => {
    return (
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-8 w-full">
        {selectedCards.map((card, index) => (
          <div key={card.id} className="flex flex-col items-center gap-2">
            <h3 className="text-base text-gray-400 font-semibold">{spread.cards[index].position}</h3>
            <TarotCard card={card} isFlipped={index < currentReadingIndex} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 w-full max-w-6xl mx-auto fade-in h-full justify-around">
      <h2 className="text-3xl md:text-4xl font-serif text-purple-300 mb-4 md:mb-8 text-center">Tu Historia se Revela</h2>
      
      {renderCardLayout()}

      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md rounded-lg p-6 min-h-[250px] flex flex-col justify-between border border-purple-500/30 shadow-2xl shadow-purple-900/50">
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <span role="img" aria-label="Seer">🧙🏻‍♀️</span> La Vidente Dice...
          </h3>
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-400 text-center">{error}</p>}
          {!isLoading && !error && (
            <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap font-serif min-h-[100px]">
              {animatedText.split('**').map((part, index) => 
                index % 2 === 1 ? <strong key={index} className="text-purple-300">{part}</strong> : part
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-4">
          {!error && (
            <button
              onClick={handleNextClick}
              disabled={isLoading || isAnimating}
              className="px-8 py-3 bg-purple-600 text-white font-bold text-base rounded-full shadow-lg shadow-purple-500/30 hover:bg-purple-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isFinished ? "Nueva Lectura" : (currentReadingIndex === 0 ? "Revelar Carta" : "Siguiente ▶")}
            </button>
          )}
           {error && (
             <button
                onClick={onReset}
                className="px-8 py-3 bg-indigo-600 text-white font-bold text-base rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transform hover:scale-105 transition-all duration-300"
              >
                Empezar de Nuevo
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default ReadingScreen;