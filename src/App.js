import React, { useState } from 'react';
import VRHeader from './components/VRHeader';
import ReservationForm from './components/ReservationForm';
import InfoPanel from './components/InfoPanel';
import AdminPanel from './components/AdminPanel';
import FloatingRobot from './components/FloatingRobot';
import SoundControl from './components/SoundControl';
import ReservaForm from "./components/ReservaForm"

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ReservaForm />
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="space-y-8">
            <ReservationForm />
            <InfoPanel />
          </div>
        );
      case 'admin':
        return <AdminPanel />;
      default:
        return (
          <div className="space-y-8">
            <ReservationForm />
            <InfoPanel />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-green-900">
      {/* Efectos de fondo animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <VRHeader />
        
        {/* Navegación */}
        <nav className="max-w-7xl mx-auto p-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentView === 'home'
                  ? 'bg-gradient-to-r from-purple-500 to-green-500 text-white'
                  : 'bg-black/30 text-gray-300 border border-gray-600 hover:border-purple-400'
              }`}
            >
              Reservaciones
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentView === 'admin'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-black/30 text-gray-300 border border-gray-600 hover:border-red-400'
              }`}
            >
              Administración
            </button>
          </div>
        </nav>

        {/* Vista actual */}
        <main className="pb-20">
          {renderCurrentView()}
        </main>

        {/* Footer */}
        <footer className="bg-black/50 border-t border-gray-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="text-gray-400 mb-4">
              <p>© 2024 Museo El Rehilete - Sala de Realidad Virtual</p>
              <p className="text-sm">Gobierno del Estado de Hidalgo</p>
            </div>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>rehilete@hidalgo.gob.mx</span>
              <span>771 711 2044 / 4728 / 4722</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Componentes flotantes */}
      <FloatingRobot />
      <SoundControl />
    </div>
  );
}

export default App;

// DONE