'use server';

import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { catalogItemSchema } from '../schemas/catalogSchema';
import { auth } from '@/lib/auth/server';

export interface CatalogItem {
  id: string;
  service_id: string;
  model_name: string;
  description: string;
  technical_specs: any;
  image_url: string | null;
}

export async function getCatalogItems(serviceId: string) {
  return await sql<CatalogItem[]>`
    SELECT * FROM catalog_items 
    WHERE service_id = ${serviceId}
    ORDER BY model_name ASC
  `;
}

export async function addCatalogItem(prevState: any, formData: FormData) {
  const session = await auth.getSession();
  if (!session) {
    return { success: false, error: 'No autorizado: Debes iniciar sesión' };
  }

  try {
    const rawData = {
      service_id: formData.get('service_id'),
      model_name: formData.get('model_name'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
      technical_specs: formData.get('technical_specs'),
    };

    const validated = catalogItemSchema.safeParse(rawData);

    if (!validated.success) {
      return { 
        success: false, 
        error: validated.error.issues[0].message 
      };
    }

    const { service_id, model_name, description, image_url, technical_specs } = validated.data;
    const parsedSpecs = JSON.parse(technical_specs);

    await (sql as any)`
      INSERT INTO catalog_items (service_id, model_name, description, technical_specs, image_url)
      VALUES (${service_id}, ${model_name}, ${description}, ${parsedSpecs as any}, ${image_url})
    `;

    revalidatePath(`/servicios/${service_id}`);
    revalidatePath(`/admin/servicios/${service_id}`);
    return { success: true, message: 'Modelo añadido correctamente' };
  } catch (error) {
    console.error('Add catalog item error:', error);
    return { success: false, error: 'Error al añadir el modelo' };
  }
}

export async function updateCatalogItem(id: string, prevState: any, formData: FormData) {
  const session = await auth.getSession();
  if (!session) {
    return { success: false, error: 'No autorizado: Debes iniciar sesión' };
  }

  try {
    const rawData = {
      service_id: formData.get('service_id'),
      model_name: formData.get('model_name'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
      technical_specs: formData.get('technical_specs'),
    };

    const validated = catalogItemSchema.safeParse(rawData);

    if (!validated.success) {
      return { 
        success: false, 
        error: validated.error.issues[0].message 
      };
    }

    const { service_id, model_name, description, image_url, technical_specs } = validated.data;
    const parsedSpecs = JSON.parse(technical_specs);

    await (sql as any)`
      UPDATE catalog_items
      SET model_name = ${model_name}, 
          description = ${description}, 
          technical_specs = ${parsedSpecs as any}, 
          image_url = ${image_url}
      WHERE id = ${id}
    `;

    revalidatePath(`/servicios/${service_id}`);
    revalidatePath(`/admin/servicios/${service_id}`);
    return { success: true, message: 'Modelo actualizado correctamente' };
  } catch (error) {
    console.error('Update catalog item error:', error);
    return { success: false, error: 'Error al actualizar el modelo' };
  }
}

export async function deleteCatalogItem(id: string, service_id: string) {
  const session = await auth.getSession();
  if (!session) {
    return { success: false, error: 'No autorizado: Debes iniciar sesión' };
  }

  try {
    await (sql as any)`DELETE FROM catalog_items WHERE id = ${id}`;
    
    revalidatePath(`/servicios/${service_id}`);
    revalidatePath(`/admin/servicios/${service_id}`);
    return { success: true, message: 'Modelo eliminado correctamente' };
  } catch (error) {
    console.error('Delete catalog item error:', error);
    return { success: false, error: 'Error al eliminar el modelo' };
  }
}
