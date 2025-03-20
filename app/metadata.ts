import { Metadata } from 'next';

// Configuración de la URL base del sitio
const BASE_URL = 'https://sercotec.reshape.so';

// Configuración de SEO y Open Graph
export const siteConfig = {
  name: "Capital Semilla Emprende",
  description: "Copia el formulario y prepara tu postulación al Capital Semilla Emprende Región de Los Ríos 2025 de Sercotec",
  url: BASE_URL,
  ogImage: `${BASE_URL}/images/og.png`,
  links: {
    sercotec: "https://www.sercotec.cl/capital-semilla-emprende-region-de-los-rios-2025",
    linkedin: "https://www.linkedin.com/in/fabianhtml/",
  },
  creator: "@fabianhtml",
  keywords: [
    "Sercotec",
    "Capital Semilla",
    "Emprendimiento",
    "Los Ríos",
    "Postulación",
    "2025",
    "Formulario",
    "Proyecto",
    "Financiamiento",
    "Chile",
  ],
};

// Función para generar los metadatos de la página
export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: "Reshape",
        url: siteConfig.links.linkedin,
      },
    ],
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      locale: "es_CL",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        }
      ],
      creator: siteConfig.creator,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: "/icons/favicon.ico",
      shortcut: "/icons/favicon.ico",
      apple: "/icons/favicon.ico",
    },
    alternates: {
      canonical: "/",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
    verification: {
      // Añade aquí tu código de verificación de Google cuando lo tengas
      // google: "tu-código-de-verificación-de-google",
    },
  };
}
