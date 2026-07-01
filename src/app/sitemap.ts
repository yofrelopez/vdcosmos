import { MetadataRoute } from 'next';
import { sql } from '@/lib/db';

interface Service {
  id: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vdcosmos.vercel.app';

  // Obtener la lista de servicios desde la base de datos Neon para sitemap dinámico
  let services: Service[] = [];
  try {
    services = await sql<Service[]>`SELECT id FROM services`;
  } catch (error) {
    console.error('Error fetching services for sitemap:', error);
  }

  // Generar URLs para cada servicio
  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/servicios/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Retornar todas las URLs estáticas y dinámicas del sitio
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...serviceUrls,
  ];
}
