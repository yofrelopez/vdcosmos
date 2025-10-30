'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ]

  const whatsappNumbers = [
    { number: '+51994260216', display: '994 260 216' },
    { number: '+51934552506', display: '934 552 506' },
    { number: '+51998136138', display: '998 136 138' },
  ]

  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sección principal */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Columna 1: Empresa */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image
                  src="/images/logos/logo_cosmos.png"
                  alt="V & D COSMOS S.R.L."
                  width={320}
                  height={90}
                  className="h-18 w-auto"
                  priority
                />
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-cosmos-blue font-medium font-heading text-sm">
                  Calidad para tu vida
                </p>
                
                {/* Logo especial "50 Años contigo" */}
                <div className="relative inline-block">
                  {/* Fondo decorativo con efectos */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 via-pink-200 via-blue-200 to-green-200 rounded-2xl blur-sm opacity-30 animate-pulse"></div>
                  
                  {/* Contenedor principal */}
                  <div className="relative bg-white rounded-xl px-4 py-3 shadow-lg border-2 border-transparent bg-gradient-to-r from-yellow-100 via-pink-100 via-blue-100 to-green-100">
                    {/* Número 50 grande */}
                    <div className="flex items-center space-x-2">
                      <span className="text-4xl font-black bg-gradient-to-r from-orange-500 via-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent font-heading">
                        50
                      </span>
                      
                      {/* Decoración estrella */}
                      <div className="text-yellow-400 text-2xl animate-bounce">
                        ⭐
                      </div>
                      
                      {/* Texto "Años contigo" */}
                      <div className="flex flex-col">
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent font-heading leading-tight">
                          Años
                        </span>
                        <span className="text-sm font-semibold text-cosmos-planet font-heading">
                          contigo
                        </span>
                      </div>
                      
                      {/* Decoración corazón */}
                      <div className="text-red-400 text-xl animate-pulse">
                        ❤️
                      </div>
                    </div>
                    
                    {/* Pequeños elementos decorativos */}
                    <div className="absolute top-1 right-2 text-xs text-yellow-500">✨</div>
                    <div className="absolute bottom-1 left-2 text-xs text-blue-400">💎</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna 2: Enlaces */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-4">
                Enlaces
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-cosmos-blue transition-colors duration-200 font-body"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Contacto */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-4">
                Contacto
              </h3>
              
              <div className="space-y-3">
                {/* Dirección */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-cosmos-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-gray-600 font-body text-sm">
                      Jirón Arequipa 230<br />
                      Barranca
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">WhatsApp:</span>
                  </div>
                  {whatsappNumbers.map((wa) => (
                    <div key={wa.number} className="ml-7">
                      <a 
                        href={`https://wa.me/${wa.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-body text-sm"
                      >
                        {wa.display}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna 4: Horarios y Redes */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-4">
                Horarios
              </h3>
              
              {/* Horarios */}
              <div className="flex items-start space-x-3 mb-6">
                <Clock className="w-5 h-5 text-cosmos-planet mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-600 font-body text-sm">
                    Lun - Sáb: 9:00 - 14:00<br />
                    16:00 - 20:00
                  </p>
                </div>
              </div>

              <h4 className="font-heading font-semibold text-gray-900 mb-3">
                Síguenos
              </h4>
              
              <div className="flex space-x-3">
                {/* Facebook */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54zm7.424-8.088v-.569c-.135-.003-.263-.009-.395-.009-.132 0-.26.006-.391.009v.569c0 .107.084.191.191.191h.404c.107 0 .191-.084.191-.191zm-.191-1.425h-.404c-.107 0-.191.084-.191.191v.365c0 .107.084.191.191.191h.404c.107 0 .191-.084.191-.191v-.365c0-.107-.084-.191-.191-.191z"/>
                    <path d="M12 7.378c-2.552 0-4.622 2.069-4.622 4.622S9.448 16.622 12 16.622s4.622-2.069 4.622-4.622S14.552 7.378 12 7.378zm0 7.622c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                  </svg>
                </a>
                
                {/* TikTok */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-black hover:bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-200"></div>

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 font-body text-sm text-center md:text-left">
              © {currentYear} V & D COSMOS S.R.L. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="/privacidad" 
                className="text-gray-500 hover:text-cosmos-blue text-sm transition-colors duration-200"
              >
                Privacidad
              </Link>
              <Link 
                href="/terminos" 
                className="text-gray-500 hover:text-cosmos-blue text-sm transition-colors duration-200"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer