// src/components/ReservaForm.jsx
import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function ReservaForm() {
  const [nombre, setNombre] = useState("")
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [mensaje, setMensaje] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Verifica disponibilidad
    const { data: existentes } = await supabase
      .from('reservaciones')
      .select('*')
      .eq('fecha', fecha)
      .eq('hora', hora)

    if (existentes.length > 0) {
      setMensaje("Ese horario ya está reservado. Elige otro.")
      return
    }

    // Inserta la reservación
    const { error } = await supabase.from('reservaciones').insert([{ nombre, fecha, hora }])

    if (error) {
      setMensaje("Ocurrió un error al guardar la reserva.")
    } else {
      setMensaje("¡Reserva confirmada!")
      setNombre("")
      setFecha("")
      setHora("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="date"
        className="border p-2 w-full"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        type="time"
        className="border p-2 w-full"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Reservar</button>
      <p>{mensaje}</p>
    </form>
  )
}
