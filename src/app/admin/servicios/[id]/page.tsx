import { sql } from '@/lib/db';
import { CatalogItem } from '@/lib/actions/catalogActions';
import CatalogListClient from '@/components/admin/CatalogListClient';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth/server';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServiceAdminPage({ params }: Props) {
  const session = await auth.getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  
  // Verify service exists
  const [service] = await sql<any[]>`SELECT * FROM services WHERE id = ${id}`;
  if (!service) {
    notFound();
  }

  const items = await sql<CatalogItem[]>`
    SELECT * FROM catalog_items 
    WHERE service_id = ${id}
    ORDER BY model_name ASC
  `;

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24 lg:pt-28">
      <div className="max-w-6xl mx-auto">
        <CatalogListClient items={items} serviceId={id} />
      </div>
    </div>
  );
}
