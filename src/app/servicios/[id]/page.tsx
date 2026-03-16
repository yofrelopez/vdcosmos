import { notFound } from 'next/navigation';
import CatalogItemClient from '@/components/services/CatalogItemClient';
import { sql } from '@/lib/db';
import Link from 'next/link';

interface CatalogItem {
  id: string;
  model_name: string;
  description: string;
  technical_specs: Record<string, string>;
  image_url: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [service] = await sql<Service[]>`SELECT * FROM services WHERE id = ${id}`;
  
  if (!service) return { title: 'Servicio no encontrado' };

  return {
    title: `${service.name} - Catálogo Especializado | VD COSMOS`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: serviceId } = await params;

  // Fetch service details and its catalog items
  const [service] = await sql<Service[]>`SELECT * FROM services WHERE id = ${serviceId}`;
  
  if (!service) {
    notFound();
  }

  const catalogItems = await sql<CatalogItem[]>`
    SELECT * FROM catalog_items 
    WHERE service_id = ${serviceId}
    ORDER BY model_name ASC
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="bg-cosmos-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/servicios"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Servicios
          </Link>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">{service.name}</h1>
          <p className="text-xl text-white/90 max-w-3xl font-body">{service.description}</p>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
            Catálogo de Modelos y Especificaciones
          </h2>

          {catalogItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {catalogItems.map((item) => (
                <CatalogItemClient key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-body">Próximamente estaremos añadiendo modelos a este servicio.</p>
              <Link href="/contacto" className="text-cosmos-red font-heading font-semibold mt-4 inline-block hover:underline">
                Consultar modelos personalizados
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">¿Interesado en alguno de estos modelos?</h2>
          <p className="text-gray-400 mb-8 font-body">Solicita una cotización gratuita y nuestro equipo te asesorará con las mejores opciones para tu proyecto.</p>
          <Link 
            href={`/cotizar?servicio=${serviceId}`}
            className="inline-flex items-center px-8 py-4 bg-cosmos-red text-white font-heading font-semibold rounded-lg hover:bg-cosmos-red-dark transition-all shadow-lg hover:shadow-cosmos-red/20"
          >
            Solicitar Cotización
          </Link>
        </div>
      </section>
    </div>
  );
}
