import React, { useState, useEffect } from "react"
import Clipboard from "lucide-react/dist/esm/icons/clipboard"
import Check from "lucide-react/dist/esm/icons/check"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CostTable } from "@/components/cost-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMarkdownSections } from "@/hooks/use-markdown-sections"

// Importamos el componente lightweight-markdown para mejor rendimiento
const DynamicLightweightMarkdown = dynamic(
  () => import('@/components/lightweight-markdown').then((mod) => mod.LightweightMarkdown),
  {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 dark:bg-gray-800 rounded"></div>,
    ssr: false
  }
)

interface ContentTabsProps {
  markdown: string;
}

export function ContentTabs({ markdown }: ContentTabsProps) {
  const [copied, setCopied] = useState(false);
  const { 
    sections: markdownSections, 
    visibleSections, 
    loadNextSection, 
    hasMoreSections 
  } = useMarkdownSections({ 
    markdown,
    initialSectionCount: 2 // Cargamos las primeras 2 secciones inicialmente
  });

  useEffect(() => {
    // Verificar que hay secciones cargadas
    console.log(`Secciones cargadas: ${markdownSections.length}, Secciones visibles: ${visibleSections.length}`);
    if (markdownSections.length > 0) {
      const firstSection = markdownSections[0];
      console.log(`Primera sección (primeros 50 chars): ${firstSection.substring(0, 50)}...`);
    }
  }, [markdownSections, visibleSections]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Función para cargar más secciones cuando el usuario hace scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;

    // Si el usuario ha llegado al 80% del contenido visible, cargamos la siguiente sección
    if (scrollPosition > scrollHeight * 0.8 && hasMoreSections) {
      loadNextSection();
    }
  };

  return (
    <Tabs defaultValue="markdown" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="markdown">Formulario</TabsTrigger>
        <TabsTrigger value="table">Presupuesto</TabsTrigger>
      </TabsList>

      <TabsContent value="markdown">
        <Card className="relative border shadow-md">
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 z-10 items-center gap-1"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Clipboard className="h-4 w-4" />
                <span>Copiar</span>
              </>
            )}
          </Button>

          <CardContent className="pt-16 max-h-[80vh] overflow-y-auto" onScroll={handleScroll}>
            <div className="prose prose-slate dark:prose-invert max-w-none markdown-custom">
              {/* Solo renderizamos las secciones que son visibles */}
              {visibleSections.map((sectionIndex) => (
                <section key={sectionIndex}>
                  {sectionIndex < markdownSections.length && (
                    <DynamicLightweightMarkdown>
                      {markdownSections[sectionIndex]}
                    </DynamicLightweightMarkdown>
                  )}
                </section>
              ))}
              
              {/* Indicador de carga para más contenido */}
              {hasMoreSections && (
                <div className="text-center py-4">
                  <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-800 rounded w-48 mx-auto mb-2"></div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Desplácese para cargar más contenido...</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="table">
        <div className="md:hidden p-3 mb-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Recomendamos ver la tabla de presupuesto desde un computador para mejor visualización.
          </p>
        </div>
        <CostTable />
      </TabsContent>
    </Tabs>
  )
}
