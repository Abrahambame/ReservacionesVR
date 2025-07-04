import React, { useState } from 'react';

const FloatingRobot = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative group">
        {/* Robot principal */}
        <div className="w-24 h-32 bg-gradient-to-b from-gray-800 to-black rounded-2xl border-2 border-yellow-400 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce">
          {/* Cabeza del robot */}
          <div className="w-16 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl mx-auto mt-2 border border-yellow-400 relative">
            {/* Ojos */}
            <div className="flex justify-center space-x-2 pt-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
            </div>
            {/* Antena */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-yellow-400 rounded-full"></div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
          
          {/* Cuerpo */}
          <div className="mt-2 px-2">
            <div className="w-full h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg border border-yellow-400 flex items-center justify-center">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Brazos */}
          <div className="absolute top-16 -left-2 w-6 h-2 bg-gray-700 rounded-full border border-yellow-400"></div>
          <div className="absolute top-16 -right-2 w-6 h-2 bg-gray-700 rounded-full border border-yellow-400"></div>
        </div>
        
        {/* Efectos de luz alrededor */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-green-500 opacity-20 blur-xl animate-pulse"></div>
        
        {/* Jóvenes alrededor (representados como puntos) */}
        <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
        <div className="absolute -top-2 -right-6 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute -bottom-2 -left-6 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
        
        {/* Botón para ocultar */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs hover:bg-red-600 transition-colors"
        >
          ×
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          ¡Asistente VR!
        </div>
      </div>
    </div>
  );
};

export default FloatingRobot;