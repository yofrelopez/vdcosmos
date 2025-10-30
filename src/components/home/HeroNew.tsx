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
}

const Hero = ({
  title,
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
  imageAlt = "Proyectos de vidriería y aluminio COSMOS"
}: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo a pantalla completa */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Partículas cosmos sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/6 w-2 h-2 bg-white opacity-30 rounded-full"
          style={{
            animation: 'twinkle 6s ease-in-out infinite',
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white opacity-20 rounded-full"
          style={{
            animation: 'twinkle 4s ease-in-out infinite',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white opacity-15 rounded-full"
          style={{
            animation: 'twinkle 8s ease-in-out infinite',
            animationDelay: '4s'
          }}
        ></div>
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Título principal */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              Visualiza tu <span className="text-cosmos-blue" style={{ 
                backgroundColor: 'rgba(255,255,255,0.9)', 
                padding: '0 0.3em', 
                borderRadius: '4px',
                backdropFilter: 'blur(4px)'
              }}>proyecto</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 font-heading font-medium drop-shadow-md">
              {subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* CTA Primario */}
            <Link
              href={primaryCTA.href}
              className="group inline-flex items-center justify-center px-8 py-4 bg-cosmos-red/80 backdrop-blur-sm text-white font-heading font-semibold rounded-lg hover:bg-cosmos-red transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* CTA Secundario */}
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-heading font-semibold rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>

          {/* Badge de experiencia */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cosmos-red rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/90 font-heading">
                50 años de experiencia
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-white/70 font-body">Descubre más</span>
            <ChevronDown className="w-6 h-6 text-white/70" />
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