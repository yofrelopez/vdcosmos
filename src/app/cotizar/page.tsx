import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculadoras y Cotizadores de Precios - Vidriería Cosmos',
  description: 'Calcula online el costo de tus proyectos: peceras a medida, enmarcado de cuadros, vitrinas comerciales y más. Herramientas profesionales de cotización.',
  keywords: ['cotizar vidriería', 'calcular precio pecera', 'cotizar marcos cuadros', 'cotizar vitrina de vidrio', 'calculadora de vidrios', 'despiece de vidrio'],
  
  openGraph: {
    title: 'Calculadoras y Cotizadores de Precios - Vidriería Cosmos',
    description: 'Calcula online el costo de materiales y despiece para peceras, vitrinas y cuadros a medida. Herramientas gratuitas para el público y vidrieros.',
    url: 'https://vdcosmos.vercel.app/cotizar',
    images: [
      {
        url: 'https://vdcosmos.vercel.app/images/servicios_hero.png',
        width: 1200,
        height: 630,
        alt: 'Portal de calculadoras de precios Vidriería Cosmos',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Portal de Cotizaciones - Vidriería Cosmos',
    description: 'Cotizadores online de peceras, vitrinas y cuadros.',
    images: ['https://vdcosmos.vercel.app/images/servicios_hero.png'],
  }
};

const calculators = [
  {
    id: 'peceras',
    title: 'Calculadora de Peceras',
    description: 'Calcula las dimensiones exactas, espesores recomendados, volumen en litros y el costo detallado de materiales para peceras a medida.',
    icon: '🐠',
    color: 'from-blue-500 to-indigo-600',
    isActive: true,
  },
  {
    id: 'cuadros',
    title: 'Calculadora de Cuadros',
    description: 'Cotiza marcos, molduras de madera fina, cartulinas de fondo, vidrios simples o antireflejos y espejos para enmarcado profesional.',
    icon: '🖼️',
    color: 'from-rose-500 to-red-600',
    isActive: true,
  },
  {
    id: 'vitrinas',
    title: 'Calculadora de Vitrinas',
    description: 'Dimensiona y cotiza vitrinas de exhibición estructuradas con perfiles de aluminio, repisas regulables y vidrios de seguridad.',
    icon: '🗄️',
    color: 'from-amber-500 to-orange-600',
    isActive: true,
  },
  {
    id: 'mostradores',
    title: 'Calculadora de Mostradores',
    description: 'Planifica y cotiza mostradores de cristal y madera para locales comerciales, tiendas y exhibición de mercadería.',
    icon: '🏪',
    color: 'from-cyan-500 to-blue-600',
    isActive: false,
  },
  {
    id: 'puertas',
    title: 'Calculadora de Puertas',
    description: 'Calculadora técnica para cotizar puertas batientes o corredizas en vidrio templado y sistemas de carpintería de aluminio.',
    icon: '🚪',
    color: 'from-purple-500 to-pink-600',
    isActive: false,
  },
];

export default function CotizarPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* Hero Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-cosmos-blue">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-no-repeat bg-center opacity-25 mix-blend-overlay"
            style={{ backgroundImage: 'url(/images/servicios_hero.png)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cosmos-blue via-cosmos-blue/85 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-white/80 text-sm font-heading mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white font-medium">Cotizar</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Portal de <span className="text-cosmos-red">Calculadoras</span>
            </h1>
            
            <p className="text-lg text-white/95 font-body leading-relaxed max-w-xl">
              Herramientas interactivas gratuitas para calcular presupuestos de materiales y dimensiones. Diseñado para el público en general, arquitectos y maestros vidrieros.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* Grid de calculadoras */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Selecciona una Herramienta de Cotización
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Ingresa las medidas y configuraciones de tu proyecto para recibir un estimado instantáneo del despiece y costo de materiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => {
            if (calc.isActive) {
              return (
                <Link
                  key={calc.id}
                  href={`/cotizar/${calc.id}`}
                  className="group bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Icono con gradiente */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${calc.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md transition-all duration-300 group-hover:scale-110`}>
                      {calc.icon}
                    </div>
                    
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-cosmos-blue transition-colors">
                      {calc.title}
                    </h3>
                    
                    <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                      {calc.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-cosmos-blue font-heading font-bold text-sm">
                    <span>Iniciar cotizador</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={calc.id}
                className="bg-white/60 rounded-2xl border border-gray-200 p-6 flex flex-col justify-between opacity-65 relative overflow-hidden"
              >
                <div>
                  {/* Icono sin brillo */}
                  <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-gray-200">
                    {calc.icon}
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-gray-500 mb-3">
                    {calc.title}
                  </h3>
                  
                  <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
                    {calc.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-gray-400 font-heading font-bold text-sm">
                  <span>Próximamente disponible</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sección Informativa para el Vidriero */}
        <div className="mt-20 bg-linear-to-r from-cosmos-blue/5 to-cosmos-red/5 rounded-3xl p-8 sm:p-12 border border-gray-150 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-2/3 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cosmos-blue/15 text-cosmos-blue rounded-full font-heading font-bold text-xs">
              <HelpCircle className="w-3.5 h-3.5" />
              ¿Cómo funcionan los precios?
            </div>
            <h3 className="text-2xl font-heading font-bold text-gray-900">
              ¿Eres maestro vidriero o contratista?
            </h3>
            <p className="text-gray-600 font-body text-sm leading-relaxed">
              Los precios de los materiales que figuran en las calculadoras corresponden a los valores vigentes de nuestro taller en Barranca y están diseñados con márgenes para reventa. Si eres instalador recurrente y compras por volumen, puedes registrar tus consultas para aplicar a descuentos corporativos exclusivos en V & D COSMOS S.R.L.
            </p>
          </div>
          <div className="lg:w-1/3 w-full flex justify-center lg:justify-end">
            <Link
              href="/contacto"
              className="px-8 py-4 bg-cosmos-blue hover:bg-cosmos-blue-dark text-white font-heading font-semibold rounded-lg shadow-md transition-all duration-250 w-full text-center sm:w-auto"
            >
              Registrarme como Vidriero
            </Link>
          </div>
        </div>

      </main>

    </div>
  );
}
