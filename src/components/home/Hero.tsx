'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  image?: string
  imageAlt?: string
  features?: string[]
}

const Hero = ({
  title = "Visualiza tu proyecto",
  subtitle = "Diseñamos tus ideas con el mejor acabado",
  description = "Transforma tu hogar con acabados de primera calidad. Con 50 años perfeccionando cada detalle, creamos espacios que reflejan tu estilo de vida y elevan tu bienestar diario.",
  primaryCTA = {
    text: "Solicita tu cotización",
    href: "/cotizar"
  },
  secondaryCTA = {
    text: "Ver proyectos", 
    href: "/proyectos"
  },
  image = "/images/home/hero.png",
  imageAlt = "Proyectos de vidriería y aluminio COSMOS",
  features = []
}: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Partículas cosmos sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/6 w-2 h-2 bg-cosmos-blue opacity-20 rounded-full"
          style={{
            animation: 'twinkle 6s ease-in-out infinite',
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-cosmos-planet opacity-15 rounded-full"
          style={{
            animation: 'twinkle 4s ease-in-out infinite',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cosmos-red opacity-10 rounded-full"
          style={{
            animation: 'twinkle 8s ease-in-out infinite',
            animationDelay: '4s'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          
          {/* Contenido de texto - 2 columnas de 5 */}
          <div className={`lg:col-span-2 space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Título principal */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-cosmos-blue leading-tight">
                {title}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-700 font-heading font-medium">
                {subtitle}
              </p>
            </div>

            {/* Descripción marketing */}
            <p className="text-base text-gray-600 font-body leading-relaxed">
              Transforma tu hogar con acabados de primera calidad. Con 50 años perfeccionando cada detalle, 
              creamos espacios que reflejan tu estilo de vida y elevan tu bienestar diario.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* CTA Primario */}
              <Link
                href={primaryCTA.href}
                className="group inline-flex items-center justify-center px-6 py-3 bg-cosmos-blue text-white font-heading font-semibold rounded-lg hover:bg-cosmos-blue-dark transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              {/* CTA Secundario */}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-cosmos-red border-2 border-cosmos-red font-heading font-semibold rounded-lg hover:bg-cosmos-red hover:text-white transition-all duration-200 shadow-sm hover:shadow-lg"
                >
                  {secondaryCTA.text}
                </Link>
              )}
            
            </div>
          </div>

          {/* Imagen - 3 columnas de 5 */}
          <div className={`lg:col-span-3 relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              {/* Imagen principal sin efectos */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-500 font-body">Descubre más</span>
            <ChevronDown className="w-6 h-6 text-cosmos-blue" />
          </div>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
      `}</style>
    </section>
  )
}

export default Hero