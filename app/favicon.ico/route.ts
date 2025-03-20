import { NextResponse } from 'next/server';

// Configuración para exportación estática
export const dynamic = 'force-static';
export const revalidate = false;

// Redirección al favicon en carpeta pública
export function GET(): Response {
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/icons/favicon.ico',
      'Content-Type': 'text/plain',
    },
  });
}
