"use client"

import { useState, lazy, Suspense, useEffect } from "react"
import { markdownContent } from "@/markdown/content"
import { ThemeSwitch } from "@/components/theme-switch"
import { CountdownTimer } from "@/components/countdown-timer"
import { MoreInfo } from "@/components/more-info"

// Prefetch function to preload components after initial render
const prefetchComponent = (path: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = `/_next/static/chunks/${path}.js`;
  link.as = 'script';
  document.head.appendChild(link);
}

// Lazy load components with explicit chunk names for better debugging
const EmailCapture = lazy(() => {
  return import(/* webpackChunkName: "email-capture" */ "@/components/email-capture")
    .then(mod => ({ default: mod.EmailCapture }))
});

const ContentTabs = lazy(() => {
  return import(/* webpackChunkName: "content-tabs" */ "@/components/content-tabs")
    .then(mod => ({ default: mod.ContentTabs }))
});

export default function MarkdownViewer() {
  const [markdown, setMarkdown] = useState<string>(markdownContent);
  const [isEmailCaptureVisible, setIsEmailCaptureVisible] = useState(false);
  const [isContentTabsVisible, setIsContentTabsVisible] = useState(false);

  // Preload components after initial render based on viewport visibility
  useEffect(() => {
    // First load core components that will be visible
    setTimeout(() => {
      setIsEmailCaptureVisible(true);
      
      // After EmailCapture is loaded, prepare to load ContentTabs
      setTimeout(() => {
        setIsContentTabsVisible(true);
      }, 1000); // Delay loading ContentTabs component
    }, 200);

    // Preload content-tabs.js chunk after 2 seconds
    const preloadTimer = setTimeout(() => {
      prefetchComponent('content-tabs');
      prefetchComponent('lightweight-markdown');
    }, 2000);

    return () => clearTimeout(preloadTimer);
  }, []);
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Prioritize LCP element - Movido debajo del countdown */}
      
      <div className="flex flex-col mb-8">
        <div className="flex justify-end mb-4 mt-2">
          <ThemeSwitch />
        </div>
        
        {/* Título principal (h1) */}
        <h1 className="text-3xl font-bold text-center mb-8">Capital Semilla Emprende Región de Los Ríos 2025</h1>
        
        {/* Contador estático */}
        <div className="mb-8">
          <CountdownTimer />
        </div>
        
        {/* Información adicional - Movidas debajo del countdown */}
        <MoreInfo />
      </div>

      {/* Acordeón para captura de emails - Cargado de forma secuencial */}
      <Suspense fallback={<div className="h-20 flex items-center justify-center">Cargando formulario...</div>}>
        {isEmailCaptureVisible ? <EmailCapture /> : null}
      </Suspense>

      {/* Tabs de contenido principal - Cargado de forma secuencial después del EmailCapture */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando contenido...</div>}>
        {isContentTabsVisible ? <ContentTabs markdown={markdown} /> : null}
      </Suspense>
    </div>
  )
}
