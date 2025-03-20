'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Definimos la interfaz para props de ReactMarkdown
interface ReactMarkdownComponentProps {
  children: string
  className?: string
  [key: string]: any // Para cualquier otra prop que pueda aceptar ReactMarkdown
}

// Carga dinámica de React-Markdown básico sin plugins adicionales
const LightMarkdown = dynamic(
  () => import('react-markdown').then((mod) => {
    const ReactMarkdown = mod.default
    // No importamos plugins de remark o rehype
    return (props: ReactMarkdownComponentProps) => <ReactMarkdown {...props} />
  }),
  {
    loading: () => <div className="animate-pulse h-8 bg-gray-100 dark:bg-gray-800 rounded mb-2"></div>,
    ssr: false
  }
)

interface LightweightMarkdownProps {
  children: string
  className?: string
}

// Componente de Markdown ligero que se puede utilizar en toda la aplicación
export function LightweightMarkdown({ children, className }: LightweightMarkdownProps) {
  return (
    <div className={className || "prose prose-slate dark:prose-invert max-w-none"}>
      <LightMarkdown>{children}</LightMarkdown>
    </div>
  )
}
