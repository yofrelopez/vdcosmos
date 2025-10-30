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
    id: 'puertas',
    title: 'Puertas de Aluminio',
    description: 'Puertas resistentes y elegantes para interiores y exteriores.',
    image: '/images/productos/puertas/puerta_aluminio.png',
    category: 'Carpintería'
  },
  {
    id: 'mamparas',
    title: 'Mamparas de Baño',
    description: 'Mamparas de vidrio templado para duchas con diseños modernos.',
    image: '/images/productos/mamparas/mampara.jpg',
    category: 'Vidriería'
  },
  {
    id: 'puertas_ducha',
    title: 'Puertas de Ducha',
    description: 'Puertas especializadas para duchas con vidrio de seguridad.',
    image: '/images/productos/puertas_ducha/puertas-de-ducha_5.jpg',
    category: 'Vidriería'
  },
  {
    id: 'espejos',
    title: 'Espejos Decorativos',
    description: 'Espejos con marcos elegantes y diseños personalizados.',
    image: '/images/productos/espejos/espejo.jpg',
    category: 'Decoración'
  },
  {
    id: 'vitrinas',
    title: 'Vitrinas Comerciales',
    description: 'Vitrinas de vidrio para exhibición comercial y decorativa.',
    image: '/images/productos/vitrinas/vitrina.jpg',
    category: 'Comercial'
  },
  {
    id: 'balcones',
    title: 'Barandas de Balcón',
    description: 'Barandas de aluminio y vidrio para balcones y terrazas.',
    image: '/images/productos/balcones/barandas-de-acero-para-balcones.jpg',
    category: 'Estructural'
  },
  {
    id: 'baranda',
    title: 'Barandas Escaleras',
    description: 'Barandas modernas para escaleras interiores y exteriores.',
    image: '/images/productos/baranda/baranda-escalera.jpg',
    category: 'Estructural'
  },
  {
    id: 'cortinas',
    title: 'Cortinas de Cristal',
    description: 'Sistemas de cortinas de cristal para terrazas y espacios abiertos.',
    image: '/images/productos/cortinas/cortina.jpg',
    category: 'Cerramiento'
  },
  {
    id: 'roller',
    title: 'Persianas Roller',
    description: 'Persianas enrollables con control manual y motorizado.',
    image: '/images/productos/roller/roller-duo.jpg',
    category: 'Cerramiento'
  },
  {
    id: 'cuadros',
    title: 'Marcos y Cuadros',
    description: 'Marcos de aluminio y vidrio para obras de arte y fotografías.',
    image: '/images/productos/cuadros/cuadros.jpg',
    category: 'Decoración'
  },
  {
    id: 'melamina',
    title: 'Muebles de Melamina',
    description: 'Muebles funcionales con acabados en melamina de alta calidad.',
    image: '/images/productos/melamina/melamina.jpg',
    category: 'Mobiliario'
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