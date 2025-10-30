'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  image: string
  href: string
}

const ServicesSection = () => {
  const services: Service[] = [
    {
      id: 'vidrio-templado',
      title: 'Vidrio Templado & Mamparas',
      description: 'Mamparas de baño, divisiones y paneles de vidrio templado con la máxima seguridad y elegancia para tu hogar.',
      image: '/images/productos/mampara.jpg',
      href: '/servicios/vidrio-templado'
    },
    {
      id: 'ventanas-aluminio',
      title: 'Ventanas de Aluminio',
      description: 'Ventanas y sistemas de apertura en aluminio de alta calidad, diseñadas para eficiencia térmica y durabilidad.',
      image: '/images/productos/ventana.jpg',
      href: '/servicios/ventanas-aluminio'
    },
    {
      id: 'muebles-melamina',
      title: 'Muebles de Melamina',
      description: 'Muebles modulares y personalizados en melamina. Cocinas, closets y soluciones de almacenamiento a medida.',
      image: '/images/productos/melamina.jpg',
      href: '/servicios/muebles-melamina'
    },
    {
      id: 'barandas-escaleras',
      title: 'Barandas & Escaleras',
      description: 'Barandas de acero, vidrio y mixtas para escaleras y balcones. Diseños modernos con máxima seguridad.',
      image: '/images/productos/baranda-escalera.jpg',
      href: '/servicios/barandas-escaleras'
    },
    {
      id: 'espejos-decoraciones',
      title: 'Espejos & Decoraciones',
      description: 'Espejos decorativos, cuadros y elementos de diseño que transforman y amplían tus espacios.',
      image: '/images/productos/espejo.jpg',
      href: '/servicios/espejos-decoraciones'
    },
    {
      id: 'cortinas-persianas',
      title: 'Cortinas & Persianas',
      description: 'Cortinas roller, persianas y sistemas de control solar para privacidad y confort en tu hogar u oficina.',
      image: '/images/productos/cortina.jpg',
      href: '/servicios/cortinas-persianas'
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-3xl mx-auto">
            Con 50 años de experiencia, ofrecemos soluciones integrales en vidriería, aluminio y decoraciones. 
            Cada proyecto refleja nuestra pasión por la calidad y el diseño.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Imagen del servicio */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge con número */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-cosmos-blue text-white rounded-full flex items-center justify-center font-heading font-bold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-cosmos-blue transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 font-body leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="inline-flex items-center text-cosmos-blue font-heading font-medium hover:text-cosmos-blue-dark transition-colors duration-200 group"
                >
                  Ver detalles
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA de contacto */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cosmos-blue/5 to-cosmos-red/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-4">
              ¿Necesitas un servicio personalizado?
            </h3>
            <p className="text-lg text-gray-600 font-body mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para asesorarte y crear la solución perfecta para tu proyecto.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cotizar"
                className="inline-flex items-center justify-center px-8 py-4 bg-cosmos-blue text-white font-heading font-semibold rounded-lg hover:bg-cosmos-blue-dark transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Solicitar Cotización
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-cosmos-blue border-2 border-cosmos-blue font-heading font-semibold rounded-lg hover:bg-cosmos-blue hover:text-white transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                Hablar con un Experto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection