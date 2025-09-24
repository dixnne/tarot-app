import React from 'react';
import { TarotCardType } from '../types';

interface TarotCardProps {
  card?: TarotCardType;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, isFlipped, onClick, className }) => {
  return (
    <div
      className={`relative w-32 h-52 sm:w-36 sm:h-60 perspective-1000 ${className || ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role="button"
      aria-pressed={isFlipped}
      aria-label={card ? `Card: ${card.name}` : 'Card back'}
    >
      <div
        className="relative w-full h-full card-flipper"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front of Card (Visible when flipped) */}
        <div className="absolute w-full h-full card-front">
          <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-400/50 bg-gradient-to-br from-indigo-900 via-purple-800 to-black flex flex-col items-center justify-center p-2 text-center">
            {card && (
              <>
                <div className="text-5xl sm:text-6xl mb-2" role="img" aria-label={card.name}>{card.emoji}</div>
                <h3 className="font-serif text-white text-sm sm:text-base font-bold tracking-wider">{card.name}</h3>
              </>
            )}
          </div>
        </div>
        
        {/* Back of Card (Visible initially) */}
        <div className="absolute w-full h-full card-back">
          <div className="w-full h-full rounded-xl shadow-2xl bg-gradient-to-br from-indigo-800 to-purple-900 border-2 border-purple-400/50 flex items-center justify-center p-4">
            <div className="w-20 h-20 border-2 border-yellow-400/70 rounded-full flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
               </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;