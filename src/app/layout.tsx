import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Montserrat - similar al logo COSMOS (bold, moderno, geométrico)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
});

// Open Sans para textos del cuerpo (legible, profesional)
const openSans = Open_Sans({
  variable: "--font-opensans", 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "VD COSMOS - Vidriería & Decoraciones | 50 Años de Experiencia",
  description: "50 años creando espacios únicos. Especialistas en vidrio templado, aluminio, melamina y decoraciones. Servicios profesionales con garantía total.",
  keywords: ["vidriería", "aluminio", "mamparas", "ventanas", "puertas", "decoraciones", "melamina", "vitrinas", "espejos", "COSMOS"],
  authors: [{ name: "VD COSMOS" }],
  creator: "VD COSMOS",
  publisher: "VD COSMOS",
  
  // Favicon
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logos/logo_icon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logos/logo_icon.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: "/favicon.svg",
    apple: "/images/logos/logo_icon.png",
  },

  // Open Graph para redes sociales
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://vdcosmos.vercel.app",
    siteName: "VD COSMOS",
    title: "VD COSMOS - Vidriería & Decoraciones | 50 Años de Experiencia",
    description: "50 años creando espacios únicos. Especialistas en vidrio templado, aluminio, melamina y decoraciones. Servicios profesionales con garantía total.",
    images: [
      {
        url: "https://vdcosmos.vercel.app/images/servicios_hero.png",
        width: 1200,
        height: 630,
        alt: "VD COSMOS - Técnico especialista instalando ventanas de aluminio",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@vdcosmos",
    creator: "@vdcosmos", 
    title: "VD COSMOS - Vidriería & Decoraciones",
    description: "50 años creando espacios únicos. Especialistas en vidrio templado, aluminio y decoraciones.",
    images: ["https://vdcosmos.vercel.app/images/servicios_hero.png"],
  },

  // Metadatos adicionales
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  verification: {
    google: "verificar-con-google-search-console",
  },

  // Configuración de viewport y otros
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  // Información de la aplicación
  applicationName: "VD COSMOS",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = "https://vdcosmos.vercel.app";
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VD COSMOS S.R.L.',
    description: '50 años creando espacios únicos. Especialistas en vidrio templado, aluminio, melamina y decoraciones.',
    url: baseUrl,
    telephone: '+598-XXXXXXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dirección de VD COSMOS',
      addressLocality: 'Montevideo',
      addressCountry: 'Uruguay'
    },
    openingHours: 'Mo-Fr 08:00-18:00, Sa 09:00-13:00',
    image: `${baseUrl}/images/servicios_hero.png`,
    logo: `${baseUrl}/images/logos/logo_icon.png`,
    sameAs: [
      'https://facebook.com/vdcosmos',
      'https://instagram.com/vdcosmos'
    ],
    serviceType: ['Vidriería', 'Aluminio', 'Decoraciones', 'Mamparas', 'Ventanas', 'Puertas'],
    areaServed: 'Uruguay'
  };

  return (
    <html lang="es">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect para optimización */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon adicional para compatibilidad */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logos/logo_icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logos/logo_icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logos/logo_icon.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color para navegadores móviles */}
        <meta name="theme-color" content="#1a237e" />
        <meta name="msapplication-TileColor" content="#1a237e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
