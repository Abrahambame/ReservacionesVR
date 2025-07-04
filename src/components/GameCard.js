import React from 'react';

const GameCard = ({ game, isSelected, onSelect, disabled }) => {
  return (
    <div 
      className={`relative bg-gradient-to-br from-gray-900 to-black border-2 rounded-2xl p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isSelected 
          ? 'border-green-400 shadow-lg shadow-green-400/50' 
          : disabled 
            ? 'border-rose-600 opacity-50 cursor-not-allowed shadow-lg shadow-rose-600/30' // Rosa neón para bloqueado/deshabilitado
            : 'border-purple-500 hover:border-green-400 hover:shadow-lg hover:shadow-purple-500/30'
      }`}
      onClick={() => !disabled && onSelect(game)}
    >
      {/* Efecto de cristal */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        {/* Imagen del juego */}
        <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-green-600 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          <img 
            src={game.image} 
            alt={game.name}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full items-center justify-center text-white text-lg font-bold">
            {game.name}
          </div>
        </div>
        
        {/* Información del juego */}
        <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{game.description}</p>
        
        {/* Especificaciones técnicas */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>Estatura:</span>
            <span className="text-green-400">{game.minHeight}m - {game.maxHeight}m</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Peso máx:</span>
            <span className="text-green-400">{game.maxWeight}kg</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Capacidad:</span>
            <span className="text-green-400">{game.capacity} persona{game.capacity > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Duración:</span>
            <span className="text-green-400">{game.duration} min</span>
          </div>
        </div>
        
        {/* Indicador de selección */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Indicador de no disponible */}
        {disabled && (
          <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center">
            <span className="text-rose-400 font-bold">NO DISPONIBLE</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;