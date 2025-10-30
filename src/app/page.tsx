import Hero from '@/components/home/HeroNew'
import ServicesSection from '@/components/home/ServicesSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesSection />
      
      {/* Aquí irán las próximas secciones */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 font-body">
            Próximas secciones: Proyectos Destacados, Por qué elegirnos, Testimonios, etc.
          </p>
        </div>
      </section>
    </div>
  );
}
