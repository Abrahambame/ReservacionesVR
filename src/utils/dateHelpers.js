export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const isValidReservationDay = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDay();
  return day !== 1; // Lunes = 1, cerrado los lunes
};