'use client'

import { useState, useEffect, useMemo } from 'react'

/**
 * Opciones para el hook useMarkdownSections
 */
interface UseMarkdownSectionsOptions {
  /** Contenido de markdown a dividir en secciones */
  markdown: string
  /** Número de secciones a mostrar inicialmente */
  initialSectionCount?: number
}

/**
 * Resultado del hook useMarkdownSections
 */
interface UseMarkdownSectionsReturn {
  sections: string[]
  visibleSections: number[]
  loadNextSection: () => void
  hasMoreSections: boolean
}

/**
 * Hook que divide el markdown en secciones basadas en encabezados de nivel 2
 * y proporciona funciones para cargar secciones de forma progresiva
 */
export function useMarkdownSections({
  markdown,
  initialSectionCount = 1, // Por defecto, mostrar solo la primera sección
}: UseMarkdownSectionsOptions): UseMarkdownSectionsReturn {
  // Dividir el markdown en secciones
  const sections = useMemo(() => {
    console.log('Dividiendo markdown en secciones...');
    const result = splitMarkdownIntoSections(markdown);
    console.log(`Se encontraron ${result.length} secciones en total`);
    return result;
  }, [markdown])

  // Estado para controlar qué secciones son visibles
  const [visibleSections, setVisibleSections] = useState<number[]>(() => {
    // Inicialmente mostrar el número de secciones especificado
    console.log(`Mostrando inicialmente ${initialSectionCount} secciones`);
    return Array.from({ length: Math.min(initialSectionCount, sections.length) }, (_, i) => i);
  })

  // Función para cargar la siguiente sección
  const loadNextSection = () => {
    if (visibleSections.length < sections.length) {
      setVisibleSections(prev => [...prev, prev.length])
    }
  }

  // Determinar si hay más secciones para cargar
  const hasMoreSections = visibleSections.length < sections.length

  return {
    sections,
    visibleSections,
    loadNextSection,
    hasMoreSections
  }
}

/**
 * Divide el markdown en secciones basadas en encabezados de nivel 2 (##)
 */
export function splitMarkdownIntoSections(markdown: string): string[] {
  // Si no hay contenido, devolver un array con un string vacío
  if (!markdown || typeof markdown !== 'string') {
    console.warn('No se proporcionó contenido markdown válido');
    return [''];
  }

  // Verificar si hay algún encabezado de nivel 2
  const hasH2Headers = /^## /m.test(markdown);
  
  // Si no hay encabezados de nivel 2, devolvemos todo el contenido como una sola sección
  if (!hasH2Headers) {
    console.log('No se encontraron encabezados de nivel 2, mostrando todo el contenido');
    return [markdown];
  }
  
  // Dividir por encabezados de nivel 2
  const sections = markdown.split(/^## /gm);
  console.log(`Se encontraron ${sections.length} secciones en el markdown`);
  
  // El primer elemento puede no empezar con ##, así que lo manejamos especialmente
  if (sections.length > 0) {
    const firstPart = sections.shift() || '';
    // Si hay secciones, añadimos ## al inicio de cada sección excepto la primera
    const result = [firstPart, ...sections.map(section => `## ${section}`)];
    console.log(`Después de procesar: ${result.length} secciones`);
    return result;
  }
  
  // Si algo falla, devolvemos el contenido completo
  return [markdown];
}
