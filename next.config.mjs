// Importar el analizador de bundle
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desactivar StrictMode para reducir renderizados dobles
  reactStrictMode: false,
  
  // Configuración para compilación estática
  output: 'export',
  distDir: 'out',
  
  // Optimizaciones de imágenes
  images: {
    unoptimized: true,
    disableStaticImages: true, // Desactivar procesamiento de imágenes estáticas
  },
  
  // Optimizaciones generales
  compress: true,
  poweredByHeader: false,
  
  // Reducir la cantidad de trabajo de Webpack y optimizar el bundle final
  webpack: (config, { dev, isServer }) => {
    // Reducir recompilaciones innecesarias en desarrollo
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        // Ignorar archivos que causan recompilaciones frecuentes
        ignored: ['**/node_modules/**', '**/.git/**', '**/out/**'],
        // Aumentar la agregación para reducir recompilaciones
        aggregateTimeout: 500,
        // Reducir la frecuencia de verificación de cambios
        poll: false,
      };
    } 
    // Optimizaciones para producción
    else {
      // Mejorar tree-shaking
      config.optimization.usedExports = true;
      
      // Configuración de división de código más simple pero efectiva
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 10,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Configuración experimental optimizada
  experimental: {
    // Optimizar importaciones de paquetes
    optimizePackageImports: [
      '@radix-ui/react-icons', 
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },
  
  // Optimización de módulos dinámica
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  
  // Sin source maps para reducir tamaño
  productionBrowserSourceMaps: false,
};

// Exportar la configuración con el analizador de bundle
export default withBundleAnalyzer(nextConfig);
