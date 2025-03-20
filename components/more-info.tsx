import React from "react"
import { ExternalLink, HelpCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function MoreInfo() {
  return (
    <>
      <Alert className="mb-6 border-gray-200 bg-gray-50 dark:bg-gray-800/20">
        <div className="ml-2">
          <AlertDescription className="[&_p]:leading-relaxed text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Esta herramienta ayuda a visualizar y preparar tu postulación al programa Capital Semilla Emprende de Sercotec. <strong className="font-semibold">Debes realizar la postulación en</strong>{" "}
              <a 
                href="https://www.sercotec.cl/capital-semilla-emprende-region-de-los-rios-2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline inline-flex items-center text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                sercotec.cl <ExternalLink className="h-3 w-3 ml-1" />
              </a>. Este material no reemplaza la lectura de las bases oficiales del concurso.
          </AlertDescription>
        </div>
      </Alert>
      
      <Alert className="mb-6 border-gray-200 bg-gray-50 dark:bg-gray-800/20">
        <div className="ml-2">
          <AlertDescription className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="mb-1">
              Para mantener el formato, recomendamos copiar y pegar el formulario en "Google Docs" usando el botón derecho y seleccionando 
              <strong className="font-semibold"> "Pegar como Markdown"</strong>. Esto requiere un navegador basado en Chrome y la extensión de Google Docs Offline:
            </div>
            <div className="mt-2">
              <a 
                href="https://chromewebstore.google.com/detail/google-docs-offline/ghbmnnjooekpmoecnnnilnnbdlolhkhi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline inline-flex items-center text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Instalar extensión Google Docs Offline <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 p-0">
                      <HelpCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <span className="sr-only">Ayuda</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Una vez instalada la extensión, al hacer clic derecho en Google Docs aparecerá la opción "Pegar como Markdown".</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </AlertDescription>
        </div>
      </Alert>
    </>
  )
}
