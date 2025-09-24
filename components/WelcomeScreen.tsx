import React, { useState } from 'react';
import { TarotSpread } from '../types';

interface WelcomeScreenProps {
  spreads: TarotSpread[];
  onStart: (spread: TarotSpread, topic: string) => void;
  onCustomSpreadClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ spreads, onStart, onCustomSpreadClick }) => {
  const [topic, setTopic] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null);

  const handleStartClick = () => {
    if (selectedSpread) {
      onStart(selectedSpread, topic || 'un tema general');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-8 fade-in w-full max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-serif text-purple-300 mb-4 tracking-wider" style={{textShadow: '0 0 10px rgba(192, 132, 252, 0.5)'}}>
        Susurros Cósmicos
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">Elige tu camino. Las cartas esperan para revelar tu historia.</p>
      
      <div className="w-full">
        <h2 className="text-2xl text-purple-200 font-serif mb-6">Elige una tirada</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {spreads.map((spread) => (
            <div
              key={spread.key}
              onClick={() => setSelectedSpread(spread)}
              className={`p-6 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300 cursor-pointer flex flex-col text-left ${selectedSpread?.key === spread.key ? 'bg-purple-600/90 border-purple-300 scale-105 shadow-purple-500/40' : 'bg-purple-900/50 border-purple-400/50 hover:bg-purple-800/70 hover:border-purple-400'}`}
            >
              <h3 className="font-bold text-xl mb-2 font-serif">{spread.name}</h3>
              <p className="text-base text-gray-300 flex-grow">{spread.description}</p>
            </div>
          ))}
            <div
              key="custom-creator"
              onClick={onCustomSpreadClick}
              className="p-6 rounded-lg shadow-lg backdrop-blur-sm border border-dashed border-purple-400/80 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center bg-purple-900/30 hover:bg-purple-800/50 hover:border-purple-400"
            >
              <div className="text-4xl mb-3 text-purple-300">✨</div>
              <h3 className="font-bold text-xl mb-2 font-serif">Crear Tirada</h3>
              <p className="text-base text-gray-300">Diseña tu propia lectura personalizada.</p>
            </div>
        </div>

        {selectedSpread && (
          <div className="fade-in mt-8 flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
            <label htmlFor="topic-input" className="text-lg text-purple-200">¿Sobre qué quieres preguntar?</label>
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej: mi carrera, una amistad, etc."
              className="w-full px-4 py-2 bg-gray-800/70 border border-purple-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleStartClick}
              className="px-8 py-3 mt-2 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transform hover:scale-105 transition-all duration-300"
            >
              Comenzar Lectura
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
