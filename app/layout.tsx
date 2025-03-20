import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig, generateMetadata } from './metadata'

// Optimizar la carga de fuentes
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export const metadata: Metadata = generateMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Preconectar a dominios de terceros para mejorar el rendimiento */}
        <link rel="preconnect" href="https://tally.so" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tally.so" />
        
        {/* Precargar el script de Tally para mejorar el rendimiento */}
        <link 
          rel="preload" 
          href="https://tally.so/widgets/embed.js" 
          as="script" 
          fetchPriority="low"
          crossOrigin="anonymous" 
        />
        
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"
        />
        
        {/* Cargar fuentes de forma no bloqueante */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Fuente Inter incrustada para evitar bloqueo de renderizado */
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* Estilos críticos para el LCP */
          body {
            margin: 0;
            padding: 0;
            font-family: Inter, system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            background-color: white;
            color: #1a1a1a;
          }
          .dark body {
            background-color: #020817;
            color: #f8f9fa;
          }
          .container {
            width: 100%;
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            padding: 2rem 1rem;
          }
          .alert {
            position: relative;
            width: 100%;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            padding: 1rem;
            margin-bottom: 1.5rem;
            background-color: #f9fafb;
          }
          .dark .alert {
            background-color: rgba(31, 41, 55, 0.2);
            border-color: #374151;
          }
          .alert-description {
            font-size: 0.875rem;
            line-height: 1.5;
            color: #4b5563;
          }
          .dark .alert-description {
            color: #d1d5db;
          }
          h1 {
            font-size: 1.875rem;
            font-weight: 700;
            text-align: center;
            margin-top: 0;
            margin-bottom: 2rem;
          }
        `}} />
        
        {/* Script para evitar parpadeo durante la carga del tema - Siempre usar tema claro */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Establecer tema claro por defecto siempre
                  document.documentElement.classList.remove('dark');
                  // Solo aplicar tema oscuro si está explícitamente guardado como 'dark'
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    // Asegurar que el tema esté establecido como 'light' en localStorage
                    localStorage.setItem('theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        
        {/* Meta tags de seguridad */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://tally.so; frame-src 'self' https://tally.so;" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}