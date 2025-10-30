'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Detectar scroll para efectos glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Función para determinar si un link está activo
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const navigationItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ]

  return (
    <>
      {/* Partículas cosmos sutiles de fondo */}
      <div className="fixed top-0 left-0 w-full h-20 pointer-events-none overflow-hidden z-40">
        <div 
          className="absolute top-6 left-1/4 w-1 h-1 bg-cosmos-blue opacity-20 rounded-full"
          style={{
            animation: 'twinkle 4s ease-in-out infinite',
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="absolute top-4 right-1/3 w-0.5 h-0.5 bg-cosmos-planet opacity-25 rounded-full"
          style={{
            animation: 'twinkle 3s ease-in-out infinite',
            animationDelay: '1.5s'
          }}
        ></div>
        <div 
          className="absolute top-8 left-2/3 w-0.5 h-0.5 bg-cosmos-red opacity-15 rounded-full"
          style={{
            animation: 'twinkle 5s ease-in-out infinite',
            animationDelay: '2.5s'
          }}
        ></div>
      </div>

      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-white/85 backdrop-blur-xl shadow-xl border-b border-cosmos-gray-100' 
          : 'bg-white/95'
        }
      `}>
        {/* Gradiente sutil de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cosmos-blue/3 via-transparent to-cosmos-planet/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo con hover clásico sutil */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logos/logo_3.png"
                alt="COSMOS Vidriería & Decoraciones"
                width={160}
                height={45}
                className="h-7 lg:h-8 w-auto transition-transform duration-200 ease-out group-hover:scale-105"
                priority
              />
            </Link>

            {/* Navegación Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = isActiveLink(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      relative group px-4 py-2 font-heading font-medium transition-all duration-300
                      ${isActive 
                        ? 'text-cosmos-blue' 
                        : 'text-cosmos-gray-700 hover:text-cosmos-blue'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )
              })}
              
              {/* CTA Button más sutil */}
              <Link
                href="/cotizar"
                className="
                  px-5 py-2 bg-cosmos-blue text-white font-heading font-medium rounded-md
                  hover:bg-cosmos-blue-light
                  transition-colors duration-200
                  shadow-sm hover:shadow-md
                  text-sm
                "
              >
                Cotizar Proyecto
              </Link>
            </div>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-cosmos-gray-700 hover:text-cosmos-blue hover:bg-cosmos-gray-50 transition-colors duration-200"
              aria-label="Menú de navegación"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Menú móvil con glassmorphism */}
          <div className={`
            lg:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <div className="py-4 space-y-1 border-t border-cosmos-gray-100 bg-white/90 backdrop-blur-sm rounded-b-lg">
              {navigationItems.map((item) => {
                const isActive = isActiveLink(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      block px-4 py-3 rounded-lg font-heading font-medium transition-all duration-200 hover:translate-x-2 hover:bg-cosmos-gray-50
                      ${isActive 
                        ? 'text-cosmos-blue' 
                        : 'text-cosmos-gray-700 hover:text-cosmos-blue'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )
              })}
              
              {/* CTA móvil */}
              <div className="px-4 pt-4">
                <Link
                  href="/cotizar"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    block px-5 py-2.5 bg-cosmos-blue text-white font-heading font-medium rounded-md text-center
                    hover:bg-cosmos-blue-light
                    transition-colors duration-200
                    shadow-sm text-sm
                  "
                >
                  Cotizar Proyecto
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Horizonte cosmos - línea degradada sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmos-blue/20 via-cosmos-planet/15 to-transparent"></div>
      </nav>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}

export default Navbar