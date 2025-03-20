import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export function GET() {
  // Crear un sitemap XML básico
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sercotec-semilla-emprende.pages.dev/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  // Devolver el sitemap con el tipo de contenido correcto
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
