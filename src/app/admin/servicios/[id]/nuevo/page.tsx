'use client';

import Link from 'next/link';
import { addCatalogItem } from '@/lib/actions/catalogActions';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import SubmitButton from '@/components/ui/SubmitButton';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { catalogItemSchema, CatalogItemInput } from '@/lib/schemas/catalogSchema';

export default function NewCatalogItemPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CatalogItemInput>({
    resolver: zodResolver(catalogItemSchema),
    defaultValues: {
      service_id: id,
      technical_specs: '{\n  "material": "Aluminio",\n  "vidrio": "Templado"\n}',
      image_url: '',
    },
  });

  const [state, action] = useActionState(addCatalogItem, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push(`/admin/servicios/${id}`);
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, id, router]);

  const onSubmit = async (data: CatalogItemInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || '');
    });
    action(formData);
  };

  const serviceTitle = id?.charAt(0).toUpperCase() + id?.slice(1).replace('_', ' ');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <Link href={`/admin/servicios/${id}`} className="text-cosmos-blue hover:underline text-sm font-medium mb-2 inline-block">
            ← Volver a {serviceTitle}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Añadir Nuevo Modelo para {serviceTitle}</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <input type="hidden" {...register('service_id')} />

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Modelo</label>
            <input 
              {...register('model_name')}
              type="text" 
              placeholder="Ej: Puerta Serie 25"
              className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-cosmos-blue/50 transition-all ${
                errors.model_name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.model_name && (
              <p className="text-red-500 text-xs mt-1 font-bold">{errors.model_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
            <textarea 
              {...register('description')}
              rows={3}
              placeholder="Breve descripción del producto..."
              className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-cosmos-blue/50 transition-all ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 font-bold">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Imagen del Modelo</label>
            <CloudinaryUpload 
              name="image_url" 
              folder={`vd-cosmos/servicios/${id}`}
              onUploadSuccess={(url) => setValue('image_url', url)}
            />
            {errors.image_url && (
              <p className="text-red-500 text-xs mt-1 font-bold">{errors.image_url.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">Sube una imagen o arrástrala aquí.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Ficha Técnica (JSON)</label>
            <textarea 
              {...register('technical_specs')}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border outline-none font-mono text-sm focus:ring-2 focus:ring-cosmos-blue/50 transition-all ${
                errors.technical_specs ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.technical_specs && (
              <p className="text-red-500 text-xs mt-1 font-bold">{errors.technical_specs.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">Formato JSON para especificaciones adicionales.</p>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-cosmos-blue text-white font-bold py-3 rounded-lg hover:bg-cosmos-blue-dark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Modelo'}
            </button>
            <Link 
              href={`/admin/servicios/${id}`}
              className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
