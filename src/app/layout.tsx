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
  title: "VD COSMOS - Vidriería & Decoraciones",
  description: "50 años creando espacios únicos. Especialistas en vidrio templado, aluminio, melamina y decoraciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
