"use client"

import React, { useState, useEffect } from "react"
import Clock from "lucide-react/dist/esm/icons/clock"

// Fecha límite fija para el concurso
const DEADLINE = new Date("2025-04-01T23:59:00-03:00")
const DEADLINE_TEXT = "01/04/2025 15:00 hrs"

// Tipo para el tiempo restante
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
}

// Función para calcular el tiempo restante
function getTimeRemaining(): TimeRemaining {
  const now = new Date()
  const difference = DEADLINE.getTime() - now.getTime()
  
  // Si ya pasó la fecha límite, mostrar ceros
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0 }
  }
  
  // Calcular días, horas y minutos
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  
  return { days, hours, minutes }
}

// Componente dinámico que se actualiza cada minuto
export function CountdownTimer() {
  // Estado para almacenar el tiempo restante
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(getTimeRemaining())
  
  // Efecto para actualizar el contador cada minuto
  useEffect(() => {
    // Actualizar inmediatamente
    setTimeRemaining(getTimeRemaining())
    
    // Configurar intervalo para actualizar cada minuto
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining())
    }, 60000) // 60000 ms = 1 minuto
    
    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(intervalId)
  }, [])
  
  // Formatear los números para que siempre tengan dos dígitos
  const formatNumber = (num: number): string => String(num).padStart(2, '0')
  
  return (
    <div className="glass-panel px-4 sm:px-6 py-4 rounded-xl" style={{ minHeight: '100px' }}>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 flex items-center justify-center">
        <Clock className="mr-2 h-4 w-4 text-primary" />
        Cierre de postulaciones: {DEADLINE_TEXT}
      </p>
      
      <div className="flex justify-center items-center space-x-4">
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 w-20 flex items-center justify-center" style={{ height: '40px' }}>
            <span className="text-xl font-bold">{formatNumber(timeRemaining.days)}</span>
          </div>
          <span className="text-xs mt-1">días</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 w-20 flex items-center justify-center" style={{ height: '40px' }}>
            <span className="text-xl font-bold">{formatNumber(timeRemaining.hours)}</span>
          </div>
          <span className="text-xs mt-1">horas</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 w-20 flex items-center justify-center" style={{ height: '40px' }}>
            <span className="text-xl font-bold">{formatNumber(timeRemaining.minutes)}</span>
          </div>
          <span className="text-xs mt-1">minutos</span>
        </div>
      </div>
    </div>
  )
}
