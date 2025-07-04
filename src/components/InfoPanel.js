import React, { useState } from 'react';
import { restrictions } from '../mock/games';

const InfoPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 rounded-2xl overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
        >
          <h2 className="text-2xl font-bold text-white">Información General</h2>
          <svg 
            className={`w-6 h-6 text-green-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="px-6 pb-6 space-y-6">
            {/* Horarios y precios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
                  <span className="mr-2">🎢</span> Horarios de Operación
                </h3>
                <p className="text-white">Martes a Domingo</p>
                <p className="text-white">10:00 a.m. a 6:00 p.m.</p>
                <p className="text-red-400 text-sm mt-2">*Cerrado los lunes</p>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
                  <span className="mr-2">💰</span> Precios
                </h3>
                <p className="text-white text-xl font-bold">$50.00 MXN</p>
                <p className="text-gray-300 text-sm">Acceso a sala + 2 juegos</p>
                <p className="text-gray-400 text-xs mt-1">Solo en taquilla</p>
              </div>
            </div>

            {/* Especificaciones técnicas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">⏳</div>
                <h4 className="text-green-400 font-bold">Duración</h4>
                <p className="text-white">5 min por experiencia</p>
                <p className="text-gray-400 text-sm">15 min máximo</p>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">👪</div>
                <h4 className="text-green-400 font-bold">Capacidad</h4>
                <p className="text-white">10 personas por función</p>
                <p className="text-gray-400 text-sm">Máximo 17 total</p>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">👧</div>
                <h4 className="text-green-400 font-bold">Edad Mínima</h4>
                <p className="text-white">10 años</p>
                <p className="text-gray-400 text-sm">Con acompañante</p>
              </div>
            </div>

            {/* Restricciones físicas */}
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
                <span className="mr-2">📏</span> Restricciones Físicas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white"><span className="text-green-400">Estatura:</span> 1.20m - 1.80m</p>
                  <p className="text-white"><span className="text-green-400">Peso:</span> 25kg - 100kg</p>
                </div>
                <div>
                  <p className="text-white"><span className="text-green-400">Acompañamiento:</span> Obligatorio para menores</p>
                </div>
              </div>
            </div>

            {/* Restricciones médicas */}
            <div className="bg-red-900/20 border border-red-500 rounded-xl p-4">
              <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center">
                <span className="mr-2">❌</span> Restricciones de Ingreso
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {restrictions.map((restriction, index) => (
                  <div key={index} className="flex items-center text-white">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    {restriction}
                  </div>
                ))}
              </div>
              <p className="text-red-300 text-sm mt-3">
                No ingresar con alimentos, bebidas o mochilas. Guardarropa disponible bajo responsabilidad del usuario.
              </p>
            </div>

            {/* Información de contacto */}
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
                <span className="mr-2">📩</span> Contacto
              </h3>
              <div className="space-y-2 text-white">
                <p><span className="text-gray-400">Email:</span> rehilete@hidalgo.gob.mx</p>
                <p><span className="text-gray-400">Teléfono:</span> 771 711 2044 / 4728 / 4722</p>
                <p className="text-yellow-400 text-sm mt-2">
                  Se aceptan pagos en efectivo, tarjeta de crédito y débito
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;