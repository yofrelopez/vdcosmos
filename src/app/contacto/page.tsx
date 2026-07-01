import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageCircle, Mail } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto y Ubicación en Barranca - VD COSMOS',
  description: 'Contáctanos en V & D COSMOS S.R.L. en Jirón Arequipa 230, Barranca. Escríbenos por WhatsApp o envíanos tu consulta mediante el formulario de contacto.',
  keywords: ['contacto vidriería cosmos', 'dirección cosmos barranca', 'whatsapp cosmos', 'horarios cosmos', 'presupuesto vidriería barranca'],
  
  openGraph: {
    title: 'Contacto y Ubicación en Barranca - VD COSMOS',
    description: 'Encuéntranos en Jirón Arequipa 230, Barranca. Chatea con soporte por WhatsApp o solicita asesoría mediante el formulario en línea.',
    url: 'https://vdcosmos.vercel.app/contacto',
    images: [
      {
        url: 'https://vdcosmos.vercel.app/images/servicios_hero.png',
        width: 1200,
        height: 630,
        alt: 'Información de contacto de VD COSMOS en Barranca',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto - VD COSMOS',
    description: 'Comunícate con nuestro equipo en Barranca por WhatsApp o formulario.',
    images: ['https://vdcosmos.vercel.app/images/servicios_hero.png'],
  }
};

export default function ContactPage() {
  const whatsappNumbers = [
    { number: '+51994260216', display: '994 260 216', name: 'Atención 1' },
    { number: '+51934552506', display: '934 552 506', name: 'Atención 2' },
    { number: '+51998136138', display: '998 136 138', name: 'Atención 3' },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Header */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-cosmos-blue">
        {/* Background Decorative Image & Overlay */}
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
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-white/80 text-sm font-heading mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white font-medium">Contacto</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Ponte en <span className="text-cosmos-red">Contacto</span>
            </h1>
            
            <p className="text-lg text-white/95 font-body leading-relaxed max-w-xl">
              Estamos aquí para resolver tus dudas, asesorarte en tus proyectos y entregarte el presupuesto más competitivo de la región.
            </p>
          </div>
        </div>

        {/* Decorative divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* Contact Section & Form */}
      <section className="py-20 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Información de contacto */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  Información Comercial
                </h2>
                <p className="text-gray-600 font-body text-sm leading-relaxed">
                  Visítanos en nuestro local histórico o escríbenos a cualquiera de nuestras líneas oficiales de WhatsApp para atención inmediata.
                </p>
              </div>

              {/* Lista de Detalles */}
              <div className="space-y-6">
                
                {/* Dirección */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cosmos-blue/10 rounded-xl flex items-center justify-center text-cosmos-blue shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-gray-900 text-sm mb-1">Nuestra Ubicación</h4>
                    <p className="text-gray-600 font-body text-sm leading-relaxed">
                      Jirón Arequipa 230, Barranca, Perú
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-gray-900 text-sm mb-2">Canales de WhatsApp</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {whatsappNumbers.map((wa) => (
                        <a
                          key={wa.number}
                          href={`https://wa.me/${wa.number.replace('+', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white hover:border-green-300 hover:bg-green-50/20 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-xs font-semibold text-gray-700 font-heading">{wa.name}:</span>
                            <span className="text-xs text-gray-600 font-body">{wa.display}</span>
                          </div>
                          <span className="text-[10px] font-heading font-bold text-green-600 uppercase tracking-wider group-hover:underline">
                            Chatear
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cosmos-red/10 rounded-xl flex items-center justify-center text-cosmos-red shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-gray-900 text-sm mb-1">Horarios de Atención</h4>
                    <p className="text-gray-600 font-body text-sm leading-relaxed">
                      Lunes a Sábado:<br />
                      9:00 AM - 2:00 PM y 4:00 PM - 8:00 PM
                    </p>
                  </div>
                </div>

                {/* Correo Electrónico (Protección antispam) */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cosmos-blue/10 rounded-xl flex items-center justify-center text-cosmos-blue shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-gray-900 text-sm mb-1">Correo Electrónico</h4>
                    <p className="text-gray-600 font-body text-sm leading-relaxed">
                      Para evitar spam, no publicamos el correo en texto. Escríbenos usando el formulario a tu derecha y te responderemos desde nuestro correo corporativo.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Sección Mapa de Google Maps */}
      <section className="relative w-full h-[450px] border-t border-gray-200">
        <iframe
          src="https://maps.google.com/maps?q=Vidrieria Cosmos Barranca&t=&z=17&ie=UTF8&iwloc=B&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Ubicación de V & D COSMOS S.R.L. en Google Maps"
          className="opacity-95 hover:opacity-100 transition-opacity duration-300"
        ></iframe>
      </section>

    </div>
  );
}
