"use client"

import React, { useState, useRef, useEffect } from "react"
import Mail from "lucide-react/dist/esm/icons/mail"
import Script from "next/script"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Definir la interfaz para el objeto Tally global
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export function EmailCapture() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isTallyLoaded, setIsTallyLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasLoadedRef = useRef(false);

  // Función para cargar el formulario Tally de manera optimizada
  const loadTallyForm = () => {
    if (window.Tally && !hasLoadedRef.current) {
      // Usar setTimeout en lugar de requestIdleCallback para mayor compatibilidad
      setTimeout(() => {
        window.Tally?.loadEmbeds();
        hasLoadedRef.current = true;
        setIsTallyLoaded(true);
      }, 100);
    }
  };

  // Efecto para manejar el estado del acordeón
  // Usar una única dependencia para reducir recompilaciones
  useEffect(() => {
    if (isAccordionOpen && scriptLoaded) {
      loadTallyForm();
    } else if (!isAccordionOpen) {
      // Resetear el estado cuando se cierra el acordeón
      hasLoadedRef.current = false;
      setIsTallyLoaded(false);
    }
  }, [isAccordionOpen, scriptLoaded]);

  return (
    <div className="mb-8">
      {/* Cargar el script de Tally solo cuando sea necesario */}
      {isAccordionOpen && !scriptLoaded && (
        <Script
          id="tally-js"
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"
          onReady={() => {
            setScriptLoaded(true);
          }}
          onError={(e) => {
            console.error('Error al cargar el script de Tally:', e);
            setIsTallyLoaded(false);
          }}
        />
      )}

      <Accordion 
        type="single" 
        collapsible 
        className="bg-white dark:bg-gray-900/50 rounded-lg shadow overflow-hidden border-0"
        onValueChange={(value) => {
          const isOpen = value === "email-capture";
          setIsAccordionOpen(isOpen);
          
          // Si el acordeón se cierra, resetear el estado de carga
          if (!isOpen) {
            setIsTallyLoaded(false);
          }
        }}
      >
        <AccordionItem value="email-capture" className="border-0">
          <AccordionTrigger className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center text-left">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              <div>
                <h3 className="font-medium">¿Te gustaría recibir apoyo para tu postulación?</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Si hay interés, crearé un asistente IA para ayudarte a desarrollar tu proyecto y postulación.</p>
              <div className="rounded-md overflow-hidden bg-white dark:bg-transparent min-h-[100px] iframe-container">
                {!isTallyLoaded && (
                  <div className="flex justify-center items-center h-20 text-sm text-gray-500 dark:text-gray-400">
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary mr-2"></div>
                    Cargando formulario...
                  </div>
                )}
                
                <iframe 
                  ref={iframeRef}
                  data-tally-src="https://tally.so/embed/wvKZVQ?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                  width="100%" 
                  height="379" 
                  frameBorder="0" 
                  title="sercotec"
                  loading="lazy"
                  style={{ opacity: isTallyLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
                  aria-hidden={!isTallyLoaded}
                ></iframe>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 text-left mt-2">
                Al registrarte, recibirás actualizaciones (no spam) y podrás desuscribirte en cualquier momento.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-left mt-2">
                Si tienes dudas, escríbeme por <a href="https://www.linkedin.com/in/fabianhtml/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
