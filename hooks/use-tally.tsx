import { useState, useEffect } from "react"

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export function useTallyEmbed() {
  const [isTallyLoaded, setIsTallyLoaded] = useState(false);

  useEffect(() => {
    // Función para cargar el script de Tally
    const loadTallyScript = () => {
      if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
        // El script ya está cargado
        if (window.Tally) {
          window.Tally.loadEmbeds();
          setIsTallyLoaded(true);
        }
        return;
      }
      
      // Cargar el script solo cuando sea necesario (lazy loading)
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.defer = true; // Añadimos defer para retrasar la ejecución
      script.onload = () => {
        if (window.Tally) {
          window.Tally.loadEmbeds();
          setIsTallyLoaded(true);
        }
      };
      document.head.appendChild(script);
    };
    
    // Usamos Intersection Observer para cargar Tally solo cuando el contenedor está visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadTallyScript();
          observer.disconnect(); // Desconectamos después de cargar
        }
      });
    }, { threshold: 0.1 });
    
    // Observamos el contenedor del acordeón
    const accordionItem = document.querySelector('[data-state="open"]');
    if (accordionItem) {
      // Si ya está abierto, cargamos inmediatamente
      loadTallyScript();
    } else {
      // Si no está abierto, observamos todos los contenedores potenciales
      document.querySelectorAll('[value="email-capture"]').forEach(container => {
        observer.observe(container);
      });
    }
    
    // También cargamos cuando se expande el acordeón
    const handleAccordionExpand = (event: any) => {
      const accordionItem = event.target.closest('[data-state]');
      if (accordionItem && accordionItem.getAttribute('data-state') === 'open') {
        loadTallyScript();
      }
    };
    
    // Agregar listener para el acordeón
    document.addEventListener('click', handleAccordionExpand);
    
    return () => {
      document.removeEventListener('click', handleAccordionExpand);
      observer.disconnect();
    };
  }, []);

  return { isTallyLoaded };
}
