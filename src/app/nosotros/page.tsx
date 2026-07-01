import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, Users, MapPin, Award, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nuestra Historia y Trayectoria de 50 Años - VD COSMOS',
  description: 'Conoce los orígenes de Vidriería Cosmos en 1976 en Barranca de la mano de Doña Elizabeth Sifuentes y su hijo Roberto López. 50 años de experiencia, calidad y evolución familiar.',
  keywords: ['historia vidriería cosmos', 'elizabeth sifuentes', 'roberto lopez', 'vidrieria barranca', 'fundacion cosmos', 'vidrieria 1976'],
  
  openGraph: {
    title: 'Nuestra Historia y Trayectoria de 50 Años - VD COSMOS',
    description: 'De taller familiar en 1976 a referentes en vidriería y acabados en Barranca. La historia de Elizabeth Sifuentes y Roberto López.',
    url: 'https://vdcosmos.vercel.app/nosotros',
    images: [
      {
        url: 'https://vdcosmos.vercel.app/images/nosotros/nosotros.png',
        width: 1200,
        height: 630,
        alt: 'Fundadores e inicios de Vidriería Cosmos en 1976',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestra Historia - VD COSMOS',
    description: 'Conoce cómo fundamos Vidriería Cosmos hace 50 años en Barranca.',
    images: ['https://vdcosmos.vercel.app/images/nosotros/nosotros.png'],
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Header */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-cosmos-blue">
        {/* Background Decorative Gradient & Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-no-repeat bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: 'url(/images/nosotros/fachada.png)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cosmos-blue via-cosmos-blue/80 to-transparent"></div>
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
              <span className="text-white font-medium">Nosotros</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Nuestra <span className="text-cosmos-red">Historia</span>
            </h1>
            
            <p className="text-lg text-white/95 font-body leading-relaxed max-w-xl">
              50 años de tradición familiar, compromiso y evolución constante para transformar espacios con la mejor calidad en vidrio, aluminio y decoraciones.
            </p>
          </div>
        </div>

        {/* Decorative divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* Orígenes 1976 Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Imagen Sepia/Histórica */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                {/* Marco decorativo vintage */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cosmos-blue/10 to-cosmos-red/10 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-gray-150">
                  <div className="relative h-96 w-full rounded-lg overflow-hidden bg-amber-50">
                    <Image
                      src="/images/nosotros/nosotros.png"
                      alt="Fundadora Elizabeth Sifuentes, su hijo Roberto López y los primeros trabajadores en 1976"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                  </div>
                  {/* Leyenda de la foto vintage */}
                  <div className="mt-4 text-center border-t border-dashed border-gray-200 pt-3">
                    <p className="text-sm font-heading font-semibold text-cosmos-blue">
                      Fundación de Vidriería Cosmos (1976)
                    </p>
                    <p className="text-xs text-gray-500 font-body mt-1">
                      Elizabeth Sifuentes, Roberto López y primeros operarios frente al local.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto de Orígenes */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-cosmos-blue/5 rounded-full px-4 py-1.5 border border-cosmos-blue/10">
                <Star className="w-4 h-4 text-cosmos-red animate-pulse" />
                <span className="text-xs font-bold text-cosmos-blue font-heading uppercase tracking-wider">
                  El Origen • 1976
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight">
                Donde nace la precisión y el compromiso familiar
              </h2>
              
              <div className="text-gray-600 font-body leading-relaxed space-y-4 text-base">
                <p>
                  En 1976, en una Barranca que crecía con el pulso y esfuerzo de su gente, nació un sueño familiar. Doña <strong>Elizabeth Sifuentes</strong>, una mujer de gran empuje y profunda vocación de servicio, decidió fundar <em>Vidriería Cosmos</em> en una esquina que se convertiría en tradición: el <strong>Jirón Arequipa 230</strong>.
                </p>
                <p>
                  Acompañada desde el primer día por su hijo <strong>Roberto López</strong> —quien desde muy joven aprendió el valor de la disciplina, el esfuerzo y el trato honesto con los clientes— y un pequeño pero comprometido equipo de operarios, comenzaron la labor. En aquellos inicios, los vidrios se cortaban enteramente a mano con cortadores de diamante, y cada entrega se realizaba con un orgullo y esmero inigualables.
                </p>
                <p>
                  Aquel pequeño taller se ganó rápidamente la confianza de los vecinos de Barranca gracias a su puntualidad y a la calidad garantizada de sus trabajos. Fue allí donde se cimentaron los valores que guían nuestra empresa hasta el día de hoy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Evolución y Presente Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Texto de Evolución */}
            <div className="lg:col-span-7 lg:order-2 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-cosmos-red/5 rounded-full px-4 py-1.5 border border-cosmos-red/10">
                <Award className="w-4 h-4 text-cosmos-red" />
                <span className="text-xs font-bold text-cosmos-red font-heading uppercase tracking-wider">
                  La Evolución • El Presente
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 leading-tight">
                De un taller local a V & D COSMOS S.R.L.
              </h2>
              
              <div className="text-gray-600 font-body leading-relaxed space-y-4 text-base">
                <p>
                  El paso de las décadas trajo nuevos retos, nuevos materiales y tecnologías. Bajo el liderazgo constante de la familia, nos adaptamos a las tendencias globales de la construcción e interiores, expandiéndonos hacia la carpintería de aluminio, estructuras de vidrio templado de alta seguridad y el diseño de muebles modulares en melamina.
                </p>
                <p>
                  Hoy, 50 años después, nos hemos consolidado bajo la razón social de <strong>V & D COSMOS S.R.L.</strong> Nuestra fachada actual en el mismo Jirón Arequipa es el reflejo de esta modernización: un espacio diseñado para inspirar a nuestros clientes a visualizar sus proyectos terminados.
                </p>
                <p>
                  Aunque hemos crecido en capacidad e infraestructura, la esencia sembrada por Doña Elizabeth y Roberto permanece intacta: cada mampara, ventana, mueble o decoración que sale de nuestro taller lleva impreso el sello de garantía total y la atención dedicada de una gran familia al servicio de la tuya.
                </p>
              </div>
            </div>

            {/* Imagen Fachada Actual */}
            <div className="lg:col-span-5 lg:order-1 flex justify-center">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-cosmos-blue/10 to-cosmos-red/10 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-gray-150">
                  <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src="/images/nosotros/fachada.png"
                      alt="Fachada moderna actual de V & D COSMOS S.R.L. en Jirón Arequipa 230, Barranca"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  {/* Leyenda de la foto moderna */}
                  <div className="mt-4 text-center border-t border-dashed border-gray-200 pt-3">
                    <p className="text-sm font-heading font-semibold text-cosmos-blue">
                      Nuestro Local Hoy en Día
                    </p>
                    <p className="text-xs text-gray-500 font-body mt-1">
                      Fachada moderna en el mismo rincón histórico de Barranca.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Nuestros Valores Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Nuestros Pilares Fundacionales
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              El secreto de permanecer 50 años en la preferencia de nuestros clientes radica en los principios que Doña Elizabeth nos heredó.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Valor 1: Tradición familiar */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cosmos-blue/10 rounded-xl flex items-center justify-center text-cosmos-blue mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">
                Espíritu Familiar
              </h3>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                Nacimos como un esfuerzo conjunto de madre e hijo. Tratamos a cada cliente con la honestidad y cercanía que daríamos a nuestra propia familia.
              </p>
            </div>

            {/* Valor 2: Calidad garantizada */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cosmos-red/10 rounded-xl flex items-center justify-center text-cosmos-red mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">
                Garantía Total
              </h3>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                Cada instalación es realizada por profesionales altamente calificados, utilizando materiales de primera categoría y procesos de máxima precisión.
              </p>
            </div>

            {/* Valor 3: Experiencia y evolución */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cosmos-blue/10 rounded-xl flex items-center justify-center text-cosmos-blue mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">
                50 Años de Experiencia
              </h3>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                Medio siglo perfeccionando técnicas de corte, templado, armado y diseño nos da el conocimiento para resolver cualquier reto arquitectónico.
              </p>
            </div>

            {/* Valor 4: Compromiso local */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cosmos-red/10 rounded-xl flex items-center justify-center text-cosmos-red mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">
                Orgullo de Barranca
              </h3>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                Permanecer en la misma dirección histórica nos vincula a la historia local. Trabajamos con pasión para embellecer los hogares y negocios de nuestra ciudad.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-gray-400 mb-8 font-body max-w-xl mx-auto">
            Déjanos ayudarte a plasmar tu idea con la garantía, precisión y el cariño familiar de siempre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center px-8 py-4 bg-cosmos-red text-white font-heading font-semibold rounded-lg hover:bg-cosmos-red-dark transition-all duration-200 shadow-lg"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 font-heading font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
