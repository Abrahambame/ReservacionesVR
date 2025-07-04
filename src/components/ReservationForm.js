import React, { useState, useEffect } from 'react';
import { games, timeSlots } from '../mock/games';
import { reservations, blockedSlots } from '../mock/reservations';
import { generateTicketCode, generatePDF } from '../utils/ticketGenerator';
import { getCurrentDate, formatDate, isValidReservationDay } from '../utils/dateHelpers';
import GameCard from './GameCard';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    selectedGames: [],
    timeSlot: '',
    date: getCurrentDate()
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [availableGames, setAvailableGames] = useState([]);

  useEffect(() => {
    updateAvailability();
  }, [formData.date, formData.timeSlot]);

  const updateAvailability = () => {
    const currentBlockedSlotsForDate = blockedSlots[formData.date] || {};
    
    // Actualizar disponibilidad de horarios
    const newAvailableTimeSlots = timeSlots.map(slot => {
      const blockedGamesInSlot = currentBlockedSlotsForDate[slot] || {};
      let totalBlockedUnits = 0;
      games.forEach(game => {
        totalBlockedUnits += blockedGamesInSlot[game.id] || 0;
      });
      const isSlotFullyBlocked = totalBlockedUnits >= games.reduce((sum, game) => sum + game.units, 0);
      return {
        time: slot,
        isBlocked: isSlotFullyBlocked
      };
    });
    setAvailableTimeSlots(newAvailableTimeSlots);

    // Actualizar disponibilidad de juegos
    const selectedTimeSlotBlockedGames = currentBlockedSlotsForDate[formData.timeSlot] || {};
    const newAvailableGames = games.map(game => {
      const blockedUnits = selectedTimeSlotBlockedGames[game.id] || 0;
      const remainingUnits = game.units - blockedUnits;
      return {
        ...game,
        remainingUnits: remainingUnits,
        isBlocked: remainingUnits <= 0
      };
    });
    setAvailableGames(newAvailableGames);
  };

  const handleGameSelect = (game) => {
    if (game.isBlocked) return;

    const isAlreadySelected = formData.selectedGames.find(g => g.id === game.id);

    if (isAlreadySelected) {
      setFormData({
        ...formData,
        selectedGames: formData.selectedGames.filter(g => g.id !== game.id)
      });
    } else if (formData.selectedGames.length < 2) {
      setFormData({
        ...formData,
        selectedGames: [...formData.selectedGames, game]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || formData.selectedGames.length === 0 || !formData.timeSlot) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (!isValidReservationDay(formData.date)) {
      alert('Las reservaciones no están disponibles los lunes.');
      return;
    }

    // Verificar disponibilidad final antes de reservar
    const currentBlockedGamesForSlot = blockedSlots[formData.date]?.[formData.timeSlot] || {};
    let canReserve = true;
    formData.selectedGames.forEach(selectedGame => {
      const gameData = games.find(g => g.id === selectedGame.id);
      const currentlyBlocked = currentBlockedGamesForSlot[selectedGame.id] || 0;
      if (gameData.units - currentlyBlocked <= 0) {
        canReserve = false;
      }
    });

    if (!canReserve) {
      alert('Alguno de los juegos seleccionados ya no está disponible para este horario. Por favor, revisa la disponibilidad.');
      updateAvailability();
      return;
    }

    const ticketCode = generateTicketCode();
    const reservation = {
      id: reservations.length + 1,
      ...formData,
      ticketCode,
      games: formData.selectedGames.map(g => g.name),
      gameIds: formData.selectedGames.map(g => g.id),
      price: 50
    };

    // Guardar la reservación
    reservations.push(reservation);

    // Bloquear las unidades de juego seleccionadas
    if (!blockedSlots[formData.date]) {
      blockedSlots[formData.date] = {};
    }
    if (!blockedSlots[formData.date][formData.timeSlot]) {
      blockedSlots[formData.date][formData.timeSlot] = {};
    }
    formData.selectedGames.forEach(game => {
      blockedSlots[formData.date][formData.timeSlot][game.id] = (blockedSlots[formData.date][formData.timeSlot][game.id] || 0) + 1;
    });

    setGeneratedTicket(reservation);
    setShowSuccess(true);
    updateAvailability();
  };

  const downloadTicket = () => {
    if (generatedTicket) {
      generatePDF(generatedTicket);
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-green-900 to-black border-2 border-green-400 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">¡Reservación Exitosa!</h2>
          <p className="text-gray-300 mb-6">Tu boleto ha sido generado correctamente</p>
          
          <div className="bg-black/50 rounded-xl p-6 mb-6 text-left">
            <h3 className="text-xl font-bold text-green-400 mb-4">Detalles de tu reservación:</h3>
            <div className="space-y-2 text-white">
              <p><span className="text-gray-400">Nombre:</span> {generatedTicket?.name}</p>
              <p><span className="text-gray-400">Código:</span> <span className="text-green-400 font-mono">{generatedTicket?.ticketCode}</span></p>
              <p><span className="text-gray-400">Fecha:</span> {formatDate(generatedTicket?.date)}</p>
              <p><span className="text-gray-400">Horario:</span> {generatedTicket?.timeSlot}</p>
              <p><span className="text-gray-400">Juegos:</span> {generatedTicket?.games.join(', ')}</p>
              <p><span className="text-gray-400">Precio:</span> <span className="text-green-400 font-bold">$50.00 MXN</span></p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadTicket}
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Descargar Boleto
            </button>
            <button
              onClick={() => {
                setShowSuccess(false);
                setFormData({
                  name: '',
                  selectedGames: [],
                  timeSlot: '',
                  date: getCurrentDate()
                });
                setGeneratedTicket(null);
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Nueva Reservación
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información personal */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Información Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Fecha de Visita
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                min={getCurrentDate()}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>
        </div>

        {/* Selección de horario */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Selecciona tu Horario</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {availableTimeSlots.map((slot) => (
              <button
                key={slot.time}
                type="button"
                onClick={() => setFormData({...formData, timeSlot: slot.time})}
                disabled={slot.isBlocked}
                className={`py-3 px-4 rounded-xl font-medium transition-all ${
                  slot.isBlocked
                    ? 'bg-rose-900/50 text-rose-300 cursor-not-allowed opacity-70'
                    : formData.timeSlot === slot.time
                      ? 'bg-green-500 text-black'
                      : 'bg-black/50 text-white border border-gray-600 hover:border-green-400'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Selección de juegos */}
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Selecciona tus Juegos</h2>
          <p className="text-gray-400 mb-6">Máximo 2 juegos por sesión ({formData.selectedGames.length}/2)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isSelected={formData.selectedGames.find(g => g.id === game.id)}
                onSelect={handleGameSelect}
                disabled={game.isBlocked || (formData.selectedGames.length >= 2 && !formData.selectedGames.find(g => g.id === game.id))}
              />
            ))}
          </div>
        </div>

        {/* Botón de reservar */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Reservar Ahora - $50.00 MXN
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;