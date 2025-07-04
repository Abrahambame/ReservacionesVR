export const generateTicketCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let code = '';
  for (let i = 0; i < 2; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 6; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return code;
};

export const generatePDF = (reservation) => {
  const { name, games, timeSlot, date, ticketCode } = reservation;
  
  const pdfContent = `
    MUSEO EL REHILETE - SALA DE REALIDAD VIRTUAL
    
    Boleto de Acceso
    
    Nombre: ${name}
    Código: ${ticketCode}
    Fecha: ${date}
    Horario: ${timeSlot}
    Juegos Seleccionados: ${games.join(', ')}
    Precio: $50.00 MXN
    
    Restricciones:
    - Edad mínima: 10 años
    - Estatura: 1.20m - 1.80m
    - Peso: 25kg - 100kg
    - Menores deben ir acompañados
    
    Contacto: rehilete@hidalgo.gob.mx
    Tel: 771 711 2044 / 4728 / 4722
  `;
  
  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `boleto-${ticketCode}.txt`;
  link.click();
  
  URL.revokeObjectURL(url);
};