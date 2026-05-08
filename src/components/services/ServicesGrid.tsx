'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ServiceItem {
  id: string
  title: string
  description: string
  image: string
  category: string
}

const services: ServiceItem[] = [
  {
    id: 'ventanas',
    title: 'Ventanas de Aluminio',
    description: 'Ventanas modernas con excelente aislamiento térmico y acústico.',
    image: '/images/productos/ventanas/ventana.jpg',
    category: 'Carpintería'
  },
  {
    id: 'mamparas_bano',
    title: 'Mamparas',
    description: 'Mamparas de vidrio templado y aluminio con diseños modernos.',
    image: '/images/productos/mamparas/mampara.jpg',
    category: 'Vidriería'
  },
  {
    id: 'puertas',
    title: 'Puertas de Aluminio',
    description: 'Puertas resistentes y elegantes para interiores y exteriores.',
    image: '/images/productos/puertas/puerta_aluminio.png',
    category: 'Carpintería'
  },
  {
    id: 'puertas_templado',
    title: 'Puertas Templado',
    description: 'Puertas de vidrio templado de alta seguridad y elegancia.',
    image: '/images/placeholder-service.svg',
    category: 'Vidriería'
  },
  {
    id: 'vitrinas',
    title: 'Vitrinas Comerciales',
    description: 'Vitrinas de vidrio para exhibición comercial y decorativa.',
    image: '/images/productos/vitrinas/vitrina.jpg',
    category: 'Comercial'
  },
  {
    id: 'espejos',
    title: 'Espejos Decorativos',
    description: 'Espejos con marcos elegantes y diseños personalizados.',
    image: '/images/productos/espejos/espejo.jpg',
    category: 'Decoración'
  },
  {
    id: 'barandas',
    title: 'Barandas',
    description: 'Barandas modernas para escaleras y balcones.',
    image: '/images/productos/baranda/baranda-escalera.jpg',
    category: 'Estructural'
  },
  {
    id: 'cortinas_cristal',
    title: 'Cortinas de Cristal',
    description: 'Sistemas de cortinas de cristal para terrazas y espacios abiertos.',
    image: '/images/productos/cortinas/cortina.jpg',
    category: 'Cerramiento'
  },
  {
    id: 'techos',
    title: 'Techos',
    description: 'Techos sol y sombra, fijos y corredizos.',
    image: '/images/placeholder-service.svg',
    category: 'Cerramiento'
  },
  {
    id: 'muebles_aluminio',
    title: 'Muebles de Aluminio',
    description: 'Muebles duraderos y modernos fabricados en aluminio.',
    image: '/images/placeholder-service.svg',
    category: 'Mobiliario'
  },
  {
    id: 'melamina',
    title: 'Muebles de Melamina',
    description: 'Muebles funcionales con acabados en melamina de alta calidad.',
    image: '/images/productos/melamina/melamina.jpg',
    category: 'Mobiliario'
  },
  {
    id: 'rejas_aluminio',
    title: 'Rejas de Aluminio',
    description: 'Rejas de seguridad con perfiles de aluminio de alta resistencia.',
    image: '/images/placeholder-service.svg',
    category: 'Estructural'
  },
  {
    id: 'balcones',
    title: 'Balcones',
    description: 'Cerramientos y estructuras para balcones.',
    image: '/images/productos/balcones/barandas-de-acero-para-balcones.jpg',
    category: 'Estructural'
  },
  {
    id: 'pergolas',
    title: 'Pérgolas',
    description: 'Pérgolas de aluminio para terrazas y jardines.',
    image: '/images/placeholder-service.svg',
    category: 'Estructural'
  },
  {
    id: 'accesorios',
    title: 'Accesorios',
    description: 'Accesorios y repuestos para todo tipo de sistemas.',
    image: '/images/placeholder-service.svg',
    category: 'Accesorios'
  },
  {
    id: 'servicios_tecnicos',
    title: 'Servicio Técnico',
    description: 'Mantenimiento y reparación especializada.',
    image: '/images/placeholder-service.svg',
    category: 'Servicios'
  }
]

const categories = [
  'Todas',
  'Carpintería',
  'Vidriería',
  'Decoración',
  'Comercial',
  'Estructural',
  'Cerramiento',
  'Mobiliario'
]

export default function ServicesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Categorías de Servicios
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full font-heading font-medium transition-all duration-200 ${
                  category === 'Todas'
                    ? 'bg-cosmos-blue text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-cosmos-blue/10 hover:text-cosmos-blue'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-cosmos-blue/20"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-service.svg';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-heading font-medium text-cosmos-blue rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2 group-hover:text-cosmos-blue transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 font-body leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/servicios/${service.id}`}
                    className="flex-1 text-center px-3 py-2 bg-cosmos-blue text-white text-sm font-heading font-medium rounded-lg hover:bg-cosmos-blue-dark transition-colors duration-200"
                  >
                    Ver Detalles
                  </Link>
                  <Link
                    href={`/cotizar?servicio=${service.id}`}
                    className="flex-1 text-center px-3 py-2 bg-white border border-cosmos-blue text-cosmos-blue text-sm font-heading font-medium rounded-lg hover:bg-cosmos-blue hover:text-white transition-all duration-200"
                  >
                    Cotizar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-linear-to-r from-cosmos-blue/5 to-cosmos-red/5 rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-600 font-body mb-6 max-w-2xl mx-auto">
              Trabajamos con proyectos personalizados. Cuéntanos tu idea y nuestros especialistas 
              te ayudarán a hacerla realidad con la mejor calidad y garantía.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-6 py-3 bg-cosmos-red text-white font-heading font-semibold rounded-lg hover:bg-cosmos-red-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Consulta Personalizada
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}