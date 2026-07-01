import { Metadata } from 'next';
import ProjectsClient from '@/components/projects/ProjectsClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portafolio de Proyectos y Trabajos - VD COSMOS',
  description: 'Explora nuestra galería de proyectos reales: mamparas de baño, ventanas de aluminio, barandas de seguridad y muebles de melamina a medida con garantía total.',
  keywords: ['proyectos vidriería', 'trabajos aluminio', 'mamparas instaladas', 'ventanas instaladas', 'espejos a medida', 'portafolio vidriería'],
  
  openGraph: {
    title: 'Portafolio de Proyectos y Trabajos - VD COSMOS',
    description: 'Explora nuestra galería de proyectos reales de vidriería, aluminio y decoraciones. 50+ años creando espacios únicos.',
    url: 'https://vdcosmos.vercel.app/proyectos',
    images: [
      {
        url: 'https://vdcosmos.vercel.app/images/servicios_hero.png',
        width: 1200,
        height: 630,
        alt: 'Portafolio de proyectos de vidriería y aluminio VD COSMOS',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Portafolio de Proyectos - VD COSMOS',
    description: 'Galería de nuestros trabajos reales de vidriería, mamparas y ventanas de aluminio.',
    images: ['https://vdcosmos.vercel.app/images/servicios_hero.png'],
  }
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 bg-cosmos-blue">
          <div 
            className="w-full h-full bg-cover bg-no-repeat bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: 'url(/images/servicios_hero.png)' }}
          ></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cosmos-blue via-cosmos-blue/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-white/80 text-sm font-heading mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white font-medium">Proyectos</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Nuestros <span className="text-cosmos-red">Trabajos</span>
            </h1>
            
            <p className="text-lg text-white/90 font-body leading-relaxed max-w-xl">
              Garantizamos acabados de primer nivel en cada obra. Conoce algunos de nuestros proyectos residenciales, comerciales e industriales en vidriería, aluminio y melamina.
            </p>
          </div>
        </div>

        {/* Decorative divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* Projects interactive gallery */}
      <ProjectsClient />

      {/* Final CTA Section */}
      <section className="py-20 bg-linear-to-r from-cosmos-blue/5 to-cosmos-red/5 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            ¿Quieres un diseño similar para tu espacio?
          </h2>
          <p className="text-lg text-gray-600 font-body mb-8 max-w-2xl mx-auto">
            Cuéntanos sobre tu idea o muestra el proyecto de nuestra galería que te interese. 
            Te asesoramos gratis y te damos un presupuesto sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center px-8 py-4 bg-cosmos-blue text-white font-heading font-semibold rounded-lg hover:bg-cosmos-blue-dark transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Solicitar Presupuesto
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-cosmos-blue border-2 border-cosmos-blue font-heading font-semibold rounded-lg hover:bg-cosmos-blue hover:text-white transition-all duration-200 shadow-sm"
            >
              Hablar con un Asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
