"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Evitar problemas de hidratación (render en servidor vs cliente)
  // Usar useEffect con una dependencia vacía para que solo se ejecute una vez
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // No renderizar nada hasta que el componente esté montado para evitar problemas de hidratación
  if (!mounted) {
    // Devolver un placeholder con las mismas dimensiones para evitar saltos en el layout
    return (
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4" />
        <div className="h-6 w-10" />
        <div className="h-4 w-4" />
        <div className="sr-only">Cargando tema</div>
      </div>
    )
  }
  
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Switch 
        id="theme-switch" 
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Label htmlFor="theme-switch" className="sr-only">
        Cambiar tema
      </Label>
    </div>
  )
}
