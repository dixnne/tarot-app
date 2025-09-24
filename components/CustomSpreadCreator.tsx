import React, { useState } from 'react';
import { TarotSpread } from '../types';

interface CustomSpreadCreatorProps {
  onSave: (spread: Omit<TarotSpread, 'key'>) => void;
  onClose: () => void;
}

const CustomSpreadCreator: React.FC<CustomSpreadCreatorProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [positions, setPositions] = useState<string[]>(['']);

  const handlePositionChange = (index: number, value: string) => {
    const newPositions = [...positions];
    newPositions[index] = value;
    setPositions(newPositions);
  };

  const addPosition = () => {
    if (positions.length < 10) { // Limit to 10 cards for UI reasons
        setPositions([...positions, '']);
    }
  };

  const removePosition = (index: number) => {
    if (positions.length > 1) {
        const newPositions = positions.filter((_, i) => i !== index);
        setPositions(newPositions);
    }
  };

  const handleSave = () => {
    if (name.trim() && positions.every(p => p.trim())) {
      const spreadToSave = {
        name: name.trim(),
        description: description.trim() || 'Una tirada personalizada.',
        cards: positions.map(p => ({ position: p.trim(), description: `Significado para ${p.trim()}` })),
      };
      onSave(spreadToSave);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4 fade-in">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-900/50 w-full max-w-lg p-6 sm:p-8 text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-serif text-purple-300 mb-6 text-center">Crea tu Propia Tirada</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="spread-name" className="block text-sm font-bold text-purple-200 mb-1">Nombre de la Tirada</label>
            <input
              id="spread-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Claridad Matutina"
              className="w-full px-3 py-2 bg-gray-800/70 border border-purple-400 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label htmlFor="spread-description" className="block text-sm font-bold text-purple-200 mb-1">Descripción (Opcional)</label>
            <textarea
              id="spread-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="¿Para qué sirve esta tirada?"
              className="w-full px-3 py-2 bg-gray-800/70 border border-purple-400 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold text-purple-200 mb-2">Posiciones de las Cartas ({positions.length}/10)</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {positions.map((position, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-400 font-mono">{index + 1}.</span>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => handlePositionChange(index, e.target.value)}
                    placeholder={`Posición #${index + 1}`}
                    className="flex-grow px-3 py-2 bg-gray-800/70 border border-purple-400 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button 
                    onClick={() => removePosition(index)} 
                    disabled={positions.length <= 1}
                    className="text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Eliminar posición"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            {positions.length < 10 && (
                <button onClick={addPosition} className="text-sm text-purple-300 hover:text-purple-200 mt-2">+ Añadir Posición</button>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 bg-gray-700/50 text-white font-bold rounded-full hover:bg-gray-600/50 transition-colors">Cancelar</button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || positions.some(p => !p.trim())}
            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            Guardar Tirada
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomSpreadCreator;
