import React, { useState, useEffect } from 'react';
import { reservations, blockedSlots } from '../mock/reservations';
import { games, timeSlots } from '../mock/games';
import { getCurrentDate } from '../utils/dateHelpers';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [dailyReservations, setDailyReservations] = useState([]);
  const [dailyBlockedSlots, setDailyBlockedSlots] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      updateAdminData();
    }
  }, [isAuthenticated, selectedDate]);

  const updateAdminData = () => {
    const filteredReservations = reservations.filter(res => res.date === selectedDate);
    setDailyReservations(filteredReservations);
    setDailyBlockedSlots(blockedSlots[selectedDate] || {});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'SUPERVISOR2025') {
      setIsAuthenticated(true);
    } else {
      alert('Clave incorrecta');
    }
  };

  const handleCancelReservation = (reservationId, date, timeSlot, gameIds) => {
    if (window.confirm('¿Estás seguro de cancelar esta reservación?')) {
      // Eliminar la reservación del array
      const index = reservations.findIndex(res => res.id === reservationId);
      if (index > -1) {
        reservations.splice(index, 1);
      }

      // Desbloquear las unidades de juego
      if (blockedSlots[date] && blockedSlots[date][timeSlot]) {
        gameIds.forEach(gameId => {
          blockedSlots[date][timeSlot][gameId] = (blockedSlots[date][timeSlot][gameId] || 1) - 1;
          if (blockedSlots[date][timeSlot][gameId] <= 0) {
            delete blockedSlots[date][timeSlot][gameId];
          }
        });
        // Si no quedan juegos bloqueados para ese slot, eliminar el slot
        if (Object.keys(blockedSlots[date][timeSlot]).length === 0) {
          delete blockedSlots[date][timeSlot];
        }
        // Si no quedan slots bloqueados para esa fecha, eliminar la fecha
        if (Object.keys(blockedSlots[date]).length === 0) {
          delete blockedSlots[date];
        }
      }
      updateAdminData();
      alert('Reservación cancelada y juegos desbloqueados.');
    }
  };

  const getTotalReservationsToday = () => dailyReservations.length;
  const getTotalRevenueToday = () => dailyReservations.reduce((sum, res) => sum + res.price, 0);

  const getGameAvailability = () => {
    const gameStatus = games.map(game => {
      let totalBlockedUnits = 0;
      timeSlots.forEach(slot => {
        totalBlockedUnits += (dailyBlockedSlots[slot]?.[game.id] || 0);
      });
      const remainingUnits = (game.units * timeSlots.length) - totalBlockedUnits;
      return {
        id: game.id,
        name: game.name,
        totalUnits: game.units * timeSlots.length,
        remainingUnits: remainingUnits,
        occupiedUnits: totalBlockedUnits
      };
    });
    return gameStatus;
  };

  const getHourlyAvailability = () => {
    const hourlyData = timeSlots.map(slot => {
      const blockedGamesInSlot = dailyBlockedSlots[slot] || {};
      let totalBlockedUnitsInSlot = 0;
      games.forEach(game => {
        totalBlockedUnitsInSlot += blockedGamesInSlot[game.id] || 0;
      });
      
      const totalPossibleUnitsInSlot = games.reduce((sum, game) => sum + game.units, 0);
      const availableUnitsInSlot = totalPossibleUnitsInSlot - totalBlockedUnitsInSlot;
      const reservationsInSlot = dailyReservations.filter(res => res.timeSlot === slot).length;

      return {
        time: slot,
        available: availableUnitsInSlot,
        occupied: totalBlockedUnitsInSlot,
        total: totalPossibleUnitsInSlot,
        reservations: reservationsInSlot
      };
    });
    return hourlyData;
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Panel de Administración</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Clave de Supervisor
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                placeholder="Ingresa la clave"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  const gameAvailability = getGameAvailability();
  const hourlyAvailability = getHourlyAvailability();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Panel de Administración</h2>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Selector de fecha */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Seleccionar Fecha:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-black/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Navegación del panel */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              currentView === 'dashboard' 
                ? 'bg-green-500 text-black' 
                : 'bg-black/50 text-gray-300 border border-gray-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('reservations')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              currentView === 'reservations' 
                ? 'bg-green-500 text-black' 
                : 'bg-black/50 text-gray-300 border border-gray-600'
            }`}
          >
            Reservaciones
          </button>
        </div>

        {currentView === 'dashboard' && (
          <div className="space-y-6">
            {/* Estadísticas generales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-900/30 border border-green-500 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{getTotalReservationsToday()}</div>
                <div className="text-gray-300">Reservaciones Hoy</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-500 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{games.length}</div>
                <div className="text-gray-300">Tipos de Juegos</div>
              </div>
              <div className="bg-blue-900/30 border border-blue-500 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{timeSlots.length}</div>
                <div className="text-gray-300">Franjas Horarias</div>
              </div>
              <div className="bg-yellow-900/30 border border-yellow-500 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">${getTotalRevenueToday()}</div>
                <div className="text-gray-300">Ingresos Hoy</div>
              </div>
            </div>

            {/* Gráfico de disponibilidad por juego */}
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-white mb-4">Disponibilidad por Juego (Unidades Totales)</h3>
              <div className="space-y-3">
                {gameAvailability.map(game => (
                  <div key={game.id} className="flex items-center">
                    <span className="text-white w-32">{game.name}</span>
                    <div className="flex-grow h-6 bg-gray-700 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-green-500 absolute left-0 top-0 transition-all duration-500" 
                        style={{ width: `${(game.remainingUnits / game.totalUnits) * 100}%` }}
                      ></div>
                      <div 
                        className="h-full bg-rose-500 absolute right-0 top-0 transition-all duration-500" 
                        style={{ width: `${(game.occupiedUnits / game.totalUnits) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 ml-4 text-sm">
                      {game.remainingUnits} disponibles / {game.occupiedUnits} ocupados
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de disponibilidad por hora */}
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-white mb-4">Disponibilidad por Horario (Unidades Totales)</h3>
              <div className="space-y-3">
                {hourlyAvailability.map(slot => (
                  <div key={slot.time} className="flex items-center">
                    <span className="text-white w-20">{slot.time}</span>
                    <div className="flex-grow h-6 bg-gray-700 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-green-500 absolute left-0 top-0 transition-all duration-500" 
                        style={{ width: `${(slot.available / slot.total) * 100}%` }}
                      ></div>
                      <div 
                        className="h-full bg-rose-500 absolute right-0 top-0 transition-all duration-500" 
                        style={{ width: `${(slot.occupied / slot.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 ml-4 text-sm">
                      {slot.available} disponibles / {slot.occupied} ocupados ({slot.reservations} reservas)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'reservations' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Reservaciones para {selectedDate}</h3>
            {dailyReservations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg">No hay reservaciones para esta fecha</div>
              </div>
            ) : (
              <div className="space-y-3">
                {dailyReservations.map((reservation) => (
                  <div key={reservation.id} className="bg-black/30 rounded-xl p-4 flex justify-between items-center">
                    <div className="text-white">
                      <div className="font-bold">{reservation.name}</div>
                      <div className="text-sm text-gray-400">
                        {reservation.timeSlot} - {reservation.games.join(', ')}
                      </div>
                      <div className="text-xs text-gray-500">Código: {reservation.ticketCode}</div>
                    </div>
                    <button
                      onClick={() => handleCancelReservation(reservation.id, reservation.date, reservation.timeSlot, reservation.gameIds)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;