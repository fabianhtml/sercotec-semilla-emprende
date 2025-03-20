"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import AlertCircle from "lucide-react/dist/esm/icons/alert-circle"
import HelpCircle from "lucide-react/dist/esm/icons/help-circle"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CostTable() {
  const [values, setValues] = useState<Record<string, string>>({
    asistencia: "",
    capacitacion: "",
    formalizacion: "",
    marketing: "",
    activos: "",
    habilitacion: "",
    capital: "",
  })

  const [details, setDetails] = useState<Record<string, string>>({
    asistencia: "",
    capacitacion: "",
    formalizacion: "",
    marketing: "",
    activos: "",
    habilitacion: "",
    capital: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calcular subtotales y totales
  const subtotalGestion = Object.entries(values)
    .filter(([key]) => ["asistencia", "capacitacion", "formalizacion", "marketing"].includes(key))
    .reduce((sum, [_, value]) => sum + (Number.parseFloat(value.replace(/\./g, "")) || 0), 0)

  const subtotalInversiones = Object.entries(values)
    .filter(([key]) => ["activos", "habilitacion", "capital"].includes(key))
    .reduce((sum, [_, value]) => sum + (Number.parseFloat(value.replace(/\./g, "")) || 0), 0)

  const totalSercotec = subtotalGestion + subtotalInversiones
  const iva = Math.round(totalSercotec * 0.19)
  const aporteEmpresarial = 0 // Este valor podría ser calculado o ingresado por el usuario
  const totalProyecto = totalSercotec + aporteEmpresarial + iva

  // Validación de montos
  useEffect(() => {
    const newErrors: Record<string, string> = {}
    
    // Validar Acciones de Gestión Empresarial
    if (subtotalGestion < 200000 && subtotalGestion > 0) {
      newErrors.gestion = "El monto mínimo para Acciones de Gestión Empresarial debe ser $200.000"
    } else if (subtotalGestion > 500000) {
      newErrors.gestion = "El monto máximo para Acciones de Gestión Empresarial no debe superar $500.000"
    }
    
    // Validar Inversiones
    if (subtotalInversiones < 3000000 && subtotalInversiones > 0) {
      newErrors.inversiones = "El monto mínimo para Inversiones debe ser $3.000.000"
    } else if (subtotalInversiones > 3300000) {
      newErrors.inversiones = "El monto máximo para Inversiones no debe superar $3.300.000"
    }
    
    setErrors(newErrors)
  }, [subtotalGestion, subtotalInversiones])

  const handleValueChange = (key: string, value: string) => {
    // Solo permitir números y puntos
    const numericValue = value.replace(/[^\d]/g, '')
    
    // Formatear con puntos cada 3 dígitos
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    
    setValues((prev) => ({ ...prev, [key]: formattedValue }))
  }

  const handleDetailChange = (key: string, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }))
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-CL", { style: "currency", currency: "CLP" }).replace("CLP", "$")
  }

  return (
    <Card className="glass-card border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Estructura de Costos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50">
                <TableHead className="w-[250px] py-4 text-gray-700 dark:text-gray-300 font-medium">Categoría</TableHead>
                <TableHead className="w-[300px] py-4 text-gray-700 dark:text-gray-300 font-medium">Ítem</TableHead>
                <TableHead className="text-right w-[200px] py-4 text-gray-700 dark:text-gray-300 font-medium">Aporte solicitado a Sercotec</TableHead>
                <TableHead className="w-[250px] py-4 text-gray-700 dark:text-gray-300 font-medium">Detalle del gasto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Acciones de Gestión Empresarial */}
              <TableRow className="bg-gradient-to-r from-blue-50/60 to-transparent dark:from-blue-900/10 dark:to-transparent hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-colors">
                <TableCell rowSpan={4} className="align-middle font-medium bg-blue-100/50 dark:bg-blue-900/20 border-r border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Acciones de Gestión Empresarial
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">Asistencia técnica y asesoría en gestión</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    value={values.asistencia}
                    onChange={(e) => handleValueChange("asistencia", e.target.value)}
                    className="text-right w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="$"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={details.asistencia}
                    onChange={(e) => handleDetailChange("asistencia", e.target.value)}
                    className="w-full min-h-[80px] resize-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="Describa el detalle del gasto..."
                  />
                </TableCell>
              </TableRow>
              
              {/* Keep existing structure but apply same styling improvements to all rows */}
              <TableRow className="bg-gradient-to-r from-blue-50/60 to-transparent dark:from-blue-900/10 dark:to-transparent hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-colors">
                <TableCell className="text-gray-700 dark:text-gray-300">Capacitación</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    value={values.capacitacion}
                    onChange={(e) => handleValueChange("capacitacion", e.target.value)}
                    className="text-right w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="$"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={details.capacitacion}
                    onChange={(e) => handleDetailChange("capacitacion", e.target.value)}
                    className="w-full min-h-[80px] resize-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="Describa el detalle del gasto..."
                  />
                </TableCell>
              </TableRow>
              
              <TableRow className="bg-gradient-to-r from-blue-50/60 to-transparent dark:from-blue-900/10 dark:to-transparent hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-colors">
                <TableCell className="text-gray-700 dark:text-gray-300">Gastos de formalización</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    value={values.formalizacion}
                    onChange={(e) => handleValueChange("formalizacion", e.target.value)}
                    className="text-right w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="$"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={details.formalizacion}
                    onChange={(e) => handleDetailChange("formalizacion", e.target.value)}
                    className="w-full min-h-[80px] resize-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="Describa el detalle del gasto..."
                  />
                </TableCell>
              </TableRow>
              
              <TableRow className="bg-gradient-to-r from-blue-50/60 to-transparent dark:from-blue-900/10 dark:to-transparent hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-colors">
                <TableCell className="text-gray-700 dark:text-gray-300">Acciones de marketing</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    value={values.marketing}
                    onChange={(e) => handleValueChange("marketing", e.target.value)}
                    className="text-right w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="$"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={details.marketing}
                    onChange={(e) => handleDetailChange("marketing", e.target.value)}
                    className="w-full min-h-[80px] resize-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 transition-all"
                    placeholder="Describa el detalle del gasto..."
                  />
                </TableCell>
              </TableRow>

              {/* Subtotal Gestión */}
              <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                <TableCell colSpan={2} className="font-bold text-gray-800 dark:text-gray-200">
                  Subtotal Acciones de Gestión Empresarial
                  <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                    <div className="flex items-center pl-0">
                      <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full mr-1 text-[10px]">Mínimo</span> $200.000 
                      <span className="mx-2">|</span> 
                      <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full mr-1 text-[10px]">Máximo</span> $500.000
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-gray-800 dark:text-gray-200">
                  <div className="animate-pulse-slow">{formatCurrency(subtotalGestion)}</div>
                </TableCell>
                <TableCell>
                  {errors.gestion && (
                    <Alert variant="destructive" className="py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
                        <AlertDescription className="text-xs text-red-600 dark:text-red-400">{errors.gestion}</AlertDescription>
                      </div>
                    </Alert>
                  )}
                </TableCell>
              </TableRow>

              {/* Inversiones */}
              <TableRow className="bg-gradient-to-r from-teal-50/60 to-transparent dark:from-teal-900/10 dark:to-transparent hover:bg-teal-50/80 dark:hover:bg-teal-900/20 transition-colors">
                <TableCell rowSpan={3} className="align-middle font-medium bg-teal-100/50 dark:bg-teal-900/20 border-r border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  Inversiones
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">Activos</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    value={values.activos}
                    onChange={(e) => handleValueChange("activos", e.target.value)}
                    className="text-right w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-teal-500 transition-all"
                    placeholder="$"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={details.activos}
                    onChange={(e) => handleDetailChange("activos", e.target.value)}
                    className="w-full min-h-[80px] resize-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-teal-500 transition-all"
                    placeholder="Describa el detalle del gasto..."
                  />
                </TableCell>
              </TableRow>
              
              <TableRow className="bg-gradient-to-r from-teal-50/60 to-transparent dark:from-teal-900/10 dark:to-transparent hover:bg-teal-50/80 dark:hover:bg-teal-900/20 transition-colors">
                <TableCell className="text-gray-700 dark:text-gray-300">Habilitación de infraestructura</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    value={values.habilitacion}
                    onChange={(e) => handleValueChange("habilitacion", e.target.value)}
                    className="text-right w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-teal-500 transition-all"
                    placeholder="$"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={details.habilitacion}
                    onChange={(e) => handleDetailChange("habilitacion", e.target.value)}
                    className="w-full min-h-[80px] resize-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-teal-500 transition-all"
                    placeholder="Describa el detalle del gasto..."
                  />
                </TableCell>
              </TableRow>
              
              <TableRow className="bg-gradient-to-r from-teal-50/60 to-transparent dark:from-teal-900/10 dark:to-transparent hover:bg-teal-50/80 dark:hover:bg-teal-900/20 transition-colors">
                <TableCell className="text-gray-700 dark:text-gray-300">Capital de trabajo</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="text"
                    value={values.capital}
                    onChange={(e) => handleValueChange("capital", e.target.value)}
                    className="text-right w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-teal-500 transition-all"
                    placeholder="$"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={details.capital}
                    onChange={(e) => handleDetailChange("capital", e.target.value)}
                    className="w-full min-h-[80px] resize-y bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-teal-500 transition-all"
                    placeholder="Describa el detalle del gasto..."
                  />
                </TableCell>
              </TableRow>

              {/* Subtotal Inversiones */}
              <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                <TableCell colSpan={2} className="font-bold text-gray-800 dark:text-gray-200">
                  Subtotal Inversiones
                  <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                    <div className="flex items-center pl-0">
                      <span className="inline-block px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full mr-1 text-[10px]">Mínimo</span> $3.000.000 
                      <span className="mx-2">|</span> 
                      <span className="inline-block px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full mr-1 text-[10px]">Máximo</span> $3.300.000
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-gray-800 dark:text-gray-200">
                  <div className="animate-pulse-slow">{formatCurrency(subtotalInversiones)}</div>
                </TableCell>
                <TableCell>
                  {errors.inversiones && (
                    <Alert variant="destructive" className="py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
                        <AlertDescription className="text-xs text-red-600 dark:text-red-400">{errors.inversiones}</AlertDescription>
                      </div>
                    </Alert>
                  )}
                </TableCell>
              </TableRow>

              {/* Consolidado */}
              <TableRow className="bg-white dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                <TableCell rowSpan={2} className="align-top font-medium text-gray-800 dark:text-gray-200">
                  Consolidado
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">Acciones de Gestión Empresarial</TableCell>
                <TableCell className="text-right text-gray-700 dark:text-gray-300">{formatCurrency(subtotalGestion)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              <TableRow className="bg-white dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                <TableCell className="text-gray-700 dark:text-gray-300">Inversiones</TableCell>
                <TableCell className="text-right text-gray-700 dark:text-gray-300">{formatCurrency(subtotalInversiones)}</TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Total solicitado */}
              <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                <TableCell colSpan={2} className="font-bold text-gray-800 dark:text-gray-200">
                  Total solicitado a Sercotec
                  <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                    <div className="flex items-center pl-0">
                      <span className="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full mr-1 text-[10px]">Monto máximo</span> $3.500.000
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-primary">
                  <div className="animate-pulse-slow">{formatCurrency(totalSercotec)}</div>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Aporte empresarial */}
              <TableRow className="bg-white dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                <TableCell></TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">Aporte empresarial obligatorio</TableCell>
                <TableCell className="text-right text-gray-700 dark:text-gray-300">{formatCurrency(aporteEmpresarial)}</TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* IVA */}
              <TableRow className="bg-white dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                <TableCell></TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">IVA (aproximado)</TableCell>
                <TableCell className="text-right text-gray-700 dark:text-gray-300">{formatCurrency(iva)}</TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Total proyecto */}
              <TableRow className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-800/30 dark:to-blue-900/20">
                <TableCell></TableCell>
                <TableCell className="font-bold text-primary text-lg">Total proyecto</TableCell>
                <TableCell className="text-right font-bold text-primary text-lg">
                  <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm inline-block min-w-[120px]">
                    {formatCurrency(totalProyecto)}
                  </div>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}