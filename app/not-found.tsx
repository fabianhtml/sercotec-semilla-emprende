import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página no encontrada</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
