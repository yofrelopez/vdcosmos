import { sql } from '@/lib/db';
import { CatalogItem } from '@/lib/actions/catalogActions';
import EditForm from './EditForm';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string, itemId: string }>;
}

export default async function EditCatalogItemPage({ params }: Props) {
  const { itemId } = await params;
  
  const [item] = await sql<CatalogItem[]>`SELECT * FROM catalog_items WHERE id = ${itemId}`;
  
  if (!item) {
    notFound();
  }

  return <EditForm item={item} />;
}
