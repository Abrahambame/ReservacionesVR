import React from 'react';

const VRHeader = () => {
  return (
    <header className="relative bg-gradient-to-r from-purple-900 via-black to-green-900 text-white py-8 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Efectos de luz animados */}
      <div className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-purple-400 to-transparent opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-green-400 to-transparent opacity-40 animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            MUSEO EL REHILETE
          </h1>
          <div className="mt-2 text-2xl font-light tracking-wider text-green-300">
            SALA DE REALIDAD VIRTUAL
          </div>
        </div>
        
        <div className="flex justify-center items-center space-x-8 mt-6">
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full"></div>
          <div className="text-sm uppercase tracking-widest text-gray-300">
            Experiencia del Futuro
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default VRHeader;