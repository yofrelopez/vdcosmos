import { sql } from '@/lib/db';
import { CatalogItem } from '@/lib/actions/catalogActions';
import EditForm from './EditForm';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth/server';

interface Props {
  params: Promise<{ id: string, itemId: string }>;
}

export default async function EditCatalogItemPage({ params }: Props) {
  const session = await auth.getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { itemId } = await params;
  
  const [item] = await sql<CatalogItem[]>`SELECT * FROM catalog_items WHERE id = ${itemId}`;
  
  if (!item) {
    notFound();
  }

  return <EditForm item={item} />;
}
