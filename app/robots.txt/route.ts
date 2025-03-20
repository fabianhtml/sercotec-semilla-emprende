import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://sercotec-semilla-emprende.pages.dev/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
