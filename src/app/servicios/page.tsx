import { Metadata } from 'next'
import ServicesGrid from '@/components/services/ServicesGrid'

export const metadata: Metadata = {
  title: 'Servicios Especializados - VD COSMOS | 12 Categorías Profesionales',
  description: 'Descubre nuestros 12 servicios especializados: ventanas de aluminio, mamparas de baño, puertas, vitrinas, espejos y más. 50+ años de experiencia garantizada.',
  keywords: ['servicios vidriería', 'ventanas aluminio', 'mamparas baño', 'puertas aluminio', 'vitrinas comerciales', 'espejos decorativos', 'barandas', 'cortinas cristal'],
  
  openGraph: {
    title: 'Servicios Especializados - VD COSMOS | 12 Categorías Profesionales',
    description: 'Descubre nuestros 12 servicios especializados: ventanas de aluminio, mamparas de baño, puertas, vitrinas, espejos y más. 50+ años de experiencia.',
    images: [
      {
        url: "https://vdcosmos.vercel.app/images/servicios_hero.png",
        width: 1200,
        height: 630,
        alt: 'Técnico VD COSMOS instalando ventanas - Servicios profesionales de vidriería',
      }
    ],
  },
  
  twitter: {
    title: 'Servicios Especializados - VD COSMOS',
    description: '12 categorías de servicios profesionales en vidriería, aluminio y decoraciones. 50+ años de experiencia.',
    images: ["https://vdcosmos.vercel.app/images/servicios_hero.png"],
  }
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-no-repeat mobile-hero-bg sm:bg-center"
            style={{ backgroundImage: 'url(/images/servicios_hero.png)' }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-cosmos-blue/40 to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-lg ml-0 lg:ml-16 xl:ml-24">
            {/* Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-cosmos-blue/20 shadow-lg">
              <div className="w-2 h-2 bg-cosmos-red rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-cosmos-blue font-heading">
                50+ años de experiencia
              </span>
            </div>

            {/* Main Content */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Servicios
              <span className="block text-cosmos-red">Especializados</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 font-body leading-relaxed mb-8 max-w-sm sm:max-w-md">
              Descubre toda nuestra gama de servicios en vidriería, aluminio y decoraciones. 
              Soluciones completas con la más alta calidad y garantía.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="text-2xl font-heading font-bold text-white">12</div>
                <div className="text-sm text-white/80 font-body">Categorías</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="text-2xl font-heading font-bold text-white">50+</div>
                <div className="text-sm text-white/80 font-body">Años</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="text-2xl font-heading font-bold text-white">100%</div>
                <div className="text-sm text-white/80 font-body">Garantía</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#servicios"
                className="inline-flex items-center justify-center px-8 py-4 bg-cosmos-red text-white font-heading font-semibold rounded-lg hover:bg-cosmos-red-dark transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Ver Todos los Servicios
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="/cotizar"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-heading font-semibold rounded-lg hover:bg-white hover:text-cosmos-blue transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                Cotizar Ahora
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
      </section>

      {/* Services Grid */}
      <div id="servicios">
        <ServicesGrid />
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-cosmos-blue/5 to-cosmos-red/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            ¿Necesitas una cotización personalizada?
          </h2>
          <p className="text-lg text-gray-600 font-body mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para asesorarte en cualquiera de nuestros servicios. 
            Contáctanos y recibe tu cotización sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/cotizar"
              className="inline-flex items-center justify-center px-8 py-4 bg-cosmos-blue text-white font-heading font-semibold rounded-lg hover:bg-cosmos-blue-dark transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Solicitar Cotización
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-cosmos-blue border-2 border-cosmos-blue font-heading font-semibold rounded-lg hover:bg-cosmos-blue hover:text-white transition-all duration-200 shadow-sm hover:shadow-lg"
            >
              Contactar Experto
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}