# Sercotec Semilla Emprende

Esta herramienta ayuda a visualizar y preparar tu postulación al programa Capital Semilla Emprende de Sercotec. Debes realizar la postulación en [sercotec.cl](https://sercotec.cl). Este material no reemplaza la lectura de las bases oficiales del concurso.

## Características

- **Tema Claro por Defecto**: Configurado para usar el tema claro como predeterminado.
- **Uso de Markdown**: Implementación de contenido Markdown.
- **Componentes UI Optimizados**: Conjunto de componentes UI personalizados y optimizados.
- **Carga Progresiva**: Estrategia de carga secuencial para mejorar el rendimiento.
- **Cloudflare**: Creado para desplegarse en Cloudflare Pages como sitio estático.

Permite cargar el contenido que quieres mostrar en [markdown/content.tsx](markdown/content.tsx).

## Tecnologías Principales

- Next.js 15.2.3
- React 19
- TailwindCSS 3.4.17
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
```

## Estructura del Proyecto

- `/app`: Rutas y páginas de la aplicación
- `/components`: Componentes reutilizables
- `/hooks`: Hooks personalizados
- `/lib`: Utilidades y funciones auxiliares
- `/markdown`: Contenido en formato Markdown
- `/public`: Archivos estáticos
- `/types`: Definiciones de tipos TypeScript
