# Sercotec Semilla Emprende

Aplicación web desarrollada con Next.js 15.2.3 para el programa Semilla Emprende de Sercotec.

## Características

- **Tema Claro por Defecto**: Configurado para usar el tema claro como predeterminado.
- **Uso de Markdown**: Implementación de contenido Markdown.
- **Componentes UI Optimizados**: Conjunto de componentes UI personalizados y optimizados.
- **Carga Progresiva**: Estrategia de carga secuencial para mejorar el rendimiento.

## Tecnologías Principales

- Next.js 15.2.3
- React 19
- TailwindCSS
- next-themes
- React Markdown

## Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Desplegar en Cloudflare Pages
pnpm deploy


## Estructura del Proyecto

- `/app`: Rutas y páginas de la aplicación
- `/components`: Componentes reutilizables
- `/hooks`: Hooks personalizados
- `/lib`: Utilidades y funciones auxiliares
- `/markdown`: Contenido en formato Markdown
- `/public`: Archivos estáticos
- `/types`: Definiciones de tipos TypeScript