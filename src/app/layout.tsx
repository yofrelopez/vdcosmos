import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ToastProvider from '@/components/providers/ToastProvider';

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
  title: "Vidriería Cosmos | Ventanas, Mamparas y Aluminio",
  description: "Vidriería Cosmos en Barranca. 50 años de experiencia en instalación de mamparas de baño, ventanas de aluminio, vidrio templado, melamina y cuadros a medida.",
  keywords: ["vidriería cosmos", "mamparas barranca", "ventanas de aluminio", "vidrio templado", "cuadros a medida", "puertas de aluminio", "vidrieria barranca"],
  authors: [{ name: "Vidriería Cosmos" }],
  creator: "Vidriería Cosmos",
  publisher: "Vidriería Cosmos",
  alternates: {
    canonical: "https://vdcosmos.vercel.app",
  },
  
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
    locale: "es_PE",
    url: "https://vdcosmos.vercel.app",
    siteName: "Vidriería Cosmos",
    title: "Vidriería Cosmos | Ventanas, Mamparas y Aluminio",
    description: "Vidriería Cosmos en Barranca. 50 años de experiencia en instalación de mamparas de baño, ventanas de aluminio, vidrio templado, melamina y cuadros a medida.",
    images: [
      {
        url: "https://vdcosmos.vercel.app/images/servicios_hero.png",
        width: 1200,
        height: 630,
        alt: "Vidriería Cosmos - Técnico especialista instalando ventanas de aluminio",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@vidrieriacosmos",
    creator: "@vidrieriacosmos", 
    title: "Vidriería Cosmos | Ventanas, Mamparas y Aluminio",
    description: "Vidriería Cosmos en Barranca. 50 años de experiencia en instalación de mamparas de baño, ventanas de aluminio, vidrio templado, melamina y cuadros a medida.",
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

  // Información de la aplicación
  applicationName: "VD COSMOS",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a237e",
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
    telephone: '+51 994 260 216',
    email: 'vidrieriacosmos@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jirón Arequipa 230',
      addressLocality: 'Barranca',
      addressRegion: 'Lima',
      addressCountry: 'PE'
    },
    openingHours: 'Mo-Sa 09:00-14:00, Mo-Sa 16:00-20:00',
    image: `${baseUrl}/images/servicios_hero.png`,
    logo: `${baseUrl}/images/logos/logo_icon.png`,
    sameAs: [
      'https://facebook.com/vdcosmos',
      'https://instagram.com/vdcosmos'
    ],
    serviceType: ['Vidriería', 'Aluminio', 'Decoraciones', 'Mamparas', 'Ventanas', 'Puertas'],
    areaServed: 'Perú'
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
        
        <meta name="msapplication-TileColor" content="#1a237e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans antialiased`}
      >
        <ToastProvider />
        <Navbar />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
