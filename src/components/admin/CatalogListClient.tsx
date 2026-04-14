'use client';

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { deleteCatalogItem, CatalogItem } from '@/lib/actions/catalogActions';
import { toast } from 'sonner';
import { useState } from 'react';
import { Trash2, Edit, ExternalLink, Package, Plus } from 'lucide-react';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function CatalogListClient({ items, serviceId }: { items: CatalogItem[], serviceId: string }) {
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  
  const serviceTitle = serviceId.charAt(0).toUpperCase() + serviceId.slice(1).replace('_', ' ');

  const handleDelete = async () => {
    if (!isDeletingId) return;

    const result = await deleteCatalogItem(isDeletingId, serviceId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.error);
    }
    setIsDeletingId(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-cosmos-blue transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administrar: {serviceTitle}</h1>
            <p className="text-sm text-gray-500">Gestiona los modelos y especificaciones de este servicio.</p>
          </div>
        </div>
        <Link 
          href={`/admin/servicios/${serviceId}/nuevo`}
          className="bg-cosmos-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-cosmos-blue-dark transition-colors shadow-md flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Modelo
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-gray-400 w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No hay modelos registrados</h2>
          <p className="text-gray-500 mb-6">Empieza por añadir el primer modelo para este servicio.</p>
          <Link 
            href={`/admin/servicios/${serviceId}/nuevo`}
            className="inline-flex items-center text-cosmos-blue font-bold hover:underline"
          >
            Añadir mi primer modelo →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex gap-6 items-center hover:border-gray-300 transition-colors">
              <div className="w-24 h-24 relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                {item.image_url ? (
                  <CldImage
                    src={item.image_url}
                    alt={item.model_name}
                    fill
                    crop="thumb"
                    className="object-cover"
                  />
                ) : (
                  <img
                    src="/images/placeholder-service.svg"
                    alt={item.model_name}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg truncate">{item.model_name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    ID: {item.id.slice(0, 8)}...
                  </span>
                  <Link 
                    href={`/servicios/${serviceId}`} 
                    target="_blank"
                    className="text-xs text-cosmos-blue flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" /> Ver en web
                  </Link>
                </div>
              </div>

              <div className="flex gap-2">
                <Link 
                  href={`/admin/servicios/${serviceId}/editar/${item.id}`}
                  className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => setIsDeletingId(item.id)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal 
        isOpen={!!isDeletingId}
        onClose={() => setIsDeletingId(null)}
        onConfirm={handleDelete}
        title="¿Eliminar este modelo?"
        message="Esta acción no se puede deshacer. El modelo será borrado permanentemente de la base de datos."
        confirmText="Sí, eliminar"
        cancelText="No, cancelar"
      />
    </>
  );
}
