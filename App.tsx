import React, { useState, useEffect, useCallback } from 'react';
import { TarotCardType, GameState, ReadingEntry, TarotSpread } from './types';
import { MAJOR_ARCANA } from './constants/tarotDeck';
import { getCardInterpretation } from './services/geminiService';
import WelcomeScreen from './components/WelcomeScreen';
import CardSelectionScreen from './components/CardSelectionScreen';
import ReadingScreen from './components/ReadingScreen';
import { playSound, SOUNDS } from './services/soundService';

// Fisher-Yates shuffle algorithm
const shuffleDeck = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Welcome);
  const [deck, setDeck] = useState<TarotCardType[]>([]);
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null);
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [readings, setReadings] = useState<ReadingEntry[]>([]);
  const [readingTopic, setReadingTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDeck(shuffleDeck(MAJOR_ARCANA));
  }, []);

  const handleStart = (spread: TarotSpread, topic: string) => {
    playSound(SOUNDS.TRANSITION);
    setSelectedSpread(spread);
    setReadingTopic(topic);
    setGameState(GameState.Selecting);
  };

  const handleCardSelect = (card: TarotCardType) => {
    if (selectedSpread && selectedCards.length < selectedSpread.cards.length) {
      setSelectedCards(prev => [...prev, card]);
    }
  };

  const handleReadingStart = () => {
    if (selectedSpread && selectedCards.length === selectedSpread.cards.length) {
      playSound(SOUNDS.TRANSITION);
      setGameState(GameState.Reading);
    }
  };

  const handleRevealNext = useCallback(async () => {
    if (isLoading || !selectedSpread || readings.length >= selectedCards.length) return;

    setIsLoading(true);
    setError(null);

    const nextCardToRead = selectedCards[readings.length];
    try {
      const interpretation = await getCardInterpretation(nextCardToRead, readings, readingTopic, selectedSpread);
      setReadings(prev => [...prev, { card: nextCardToRead, interpretation }]);
    } catch (e) {
      setError("No se pudo obtener la interpretación de los espíritus.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, readings, selectedCards, readingTopic, selectedSpread]);

  const handleReset = () => {
    playSound(SOUNDS.TRANSITION);
    setGameState(GameState.Welcome);
    setDeck(shuffleDeck(MAJOR_ARCANA));
    setSelectedSpread(null);
    setSelectedCards([]);
    setReadings([]);
    setReadingTopic('');
    setIsLoading(false);
    setError(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.Welcome:
        return <WelcomeScreen onStart={handleStart} />;
      case GameState.Selecting:
        if (!selectedSpread) return <WelcomeScreen onStart={handleStart} />;
        return (
          <CardSelectionScreen
            deck={deck}
            spread={selectedSpread}
            selectedCards={selectedCards}
            onCardSelect={handleCardSelect}
            onReadingStart={handleReadingStart}
          />
        );
      case GameState.Reading:
         if (!selectedSpread) return <WelcomeScreen onStart={handleStart} />;
        return (
          <ReadingScreen
            spread={selectedSpread}
            selectedCards={selectedCards}
            readings={readings}
            isLoading={isLoading}
            error={error}
            onRevealNext={handleRevealNext}
            onReset={handleReset}
          />
        );
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 bg-fixed flex items-center justify-center transition-all duration-500 overflow-hidden"
    >
      <main className="w-full h-full flex flex-col items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;