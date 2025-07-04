export const games = [
  {
    id: 1,
    name: "VR Egg 360 (1)",
    description: "Experiencia inmersiva de 360 grados que te transporta a mundos virtuales increíbles. Siente la adrenalina mientras exploras paisajes fantásticos y vives aventuras únicas en una cápsula de última generación.",
    image: "/api/placeholder/400/300",
    minHeight: 1.50,
    maxHeight: 1.80,
    maxWeight: 90,
    capacity: 1,
    units: 1, // 1 juego disponible para reservar
    duration: 5
  },
  {
    id: 2,
    name: "VR Egg 360 (2)",
    description: "Segunda unidad de nuestra experiencia más popular. Sumérgete en realidades alternativas con tecnología de punta que estimula todos tus sentidos y te hace vivir aventuras imposibles.",
    image: "/api/placeholder/400/300",
    minHeight: 1.50,
    maxHeight: 1.80,
    maxWeight: 90,
    capacity: 1,
    units: 2, // 2 juegos disponibles para reservar
    duration: 5
  },
  {
    id: 3,
    name: "HyperMoto VR (1)",
    description: "Conduce motocicletas futuristas a velocidades imposibles. Siente cada curva, cada salto y cada momento de adrenalina pura en circuitos que desafían las leyes de la física.",
    image: "/api/placeholder/400/300",
    minHeight: 1.50,
    maxHeight: 1.80,
    maxWeight: 90,
    capacity: 1,
    units: 1, // 1 juego para reservar
    duration: 5
  },
  {
    id: 4,
    name: "HyperMoto VR (2)",
    description: "Segunda unidad de carreras extremas. Compite en mundos virtuales donde la velocidad no tiene límites y cada carrera es una nueva aventura llena de obstáculos y desafíos únicos.",
    image: "/api/placeholder/400/300",
    minHeight: 1.50,
    maxHeight: 1.80,
    maxWeight: 90,
    capacity: 1,
    units: 1, // 1 juego para reservar
    duration: 5
  },
  {
    id: 5,
    name: "AR Racing",
    description: "Carreras de realidad aumentada para hasta 6 personas. Compite con tus amigos en circuitos que mezclan el mundo real con elementos virtuales espectaculares.",
    image: "/api/placeholder/400/300",
    minHeight: 1.50,
    maxHeight: 1.80,
    maxWeight: 100,
    capacity: 6,
    units: 6, // 6 juegos para reservar
    duration: 5
  },
  {
    id: 6,
    name: "Cybertruck VR",
    description: "Maneja el vehículo del futuro en paisajes post-apocalípticos. Una experiencia grupal donde la supervivencia y la estrategia son clave para completar misiones épicas.",
    image: "/api/placeholder/400/300",
    minHeight: 1.20,
    maxHeight: 1.80,
    maxWeight: 100,
    capacity: 6,
    units: 6, // 6 juegos para reservar
    duration: 5
  },
  {
    id: 7,
    name: "VR Slide",
    description: "Deslízate por toboganes virtuales que desafían la gravedad. Una experiencia única que combina la emoción de los parques acuáticos con la magia de la realidad virtual.",
    image: "/api/placeholder/400/300",
    minHeight: 1.50,
    maxHeight: 1.80,
    maxWeight: 90,
    capacity: 1,
    units: 1, // 1 juego para reservar
    duration: 5
  }
];

export const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

export const restrictions = [
  "Marcapasos",
  "Hipertensión",
  "Epilepsia",
  "Embarazo",
  "Lesiones físicas",
  "Estado inconveniente"
];