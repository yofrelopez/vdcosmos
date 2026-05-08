'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth/client';
import { LayoutDashboard, LogOut, Package, ExternalLink, Settings, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { servicesConfig as services } from '@/config/services';
import { 
  Grid, 
  ShowerHead, 
  DoorClosed, 
  Gem, 
  Sparkles, 
  GripHorizontal, 
  Layers, 
  Home, 
  Archive, 
  Table, 
  Shield, 
  Sunrise, 
  Leaf, 
  Wrench 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grid,
  ShowerHead,
  DoorClosed,
  Gem,
  Sparkles,
  GripHorizontal,
  Layers,
  Home,
  Archive,
  Table,
  Shield,
  Sunrise,
  Leaf,
  Wrench,
  Settings
};

export default function AdminDashboard() {
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 lg:pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-cosmos-blue/10 p-3 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-cosmos-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-heading">Panel Administrativo</h1>
              <p className="text-gray-500 font-body">Gestiona el catálogo de productos y servicios de VD COSMOS.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-600 hover:text-cosmos-blue flex items-center gap-2 transition-colors font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Sitio
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all font-bold border border-red-100"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Dashboard Stats / Info (Optional context) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 text-gray-900 font-bold mb-2">
              <Package className="w-5 h-5 text-cosmos-blue" /> Catálogo
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500">Categorías de servicios</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 text-gray-900 font-bold mb-2">
              <LayoutDashboard className="w-5 h-5 text-emerald-500" /> Estado
            </div>
            <p className="text-lg font-bold text-emerald-600 flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              En línea
            </p>
            <p className="text-sm text-gray-500">Base de datos de Neon activa</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 text-gray-900 font-bold mb-2">
              <Settings className="w-5 h-5 text-amber-500" /> Configuración
            </div>
            <p className="text-lg font-bold text-gray-700">Cloudinary</p>
            <p className="text-sm text-gray-500">Media API conectada</p>
          </div>
        </div>

        {/* Services Grid */}
        <h2 className="text-xl font-bold text-gray-900 mb-6 px-2">Selecciona una categoría para gestionar:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link 
              key={service.id}
              href={`/admin/servicios/${service.id}`}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-cosmos-blue transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform text-cosmos-blue">
                {(() => {
                  const Icon = iconMap[service.icon];
                  return Icon ? <Icon className="w-8 h-8" /> : <Package className="w-8 h-8" />;
                })()}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">{service.id.replace('_', ' ')}</p>
              <div className="mt-auto pt-4 border-t border-gray-50 w-full text-cosmos-blue font-bold text-sm hidden group-hover:block animate-in fade-in slide-in-from-bottom-2 duration-300">
                Gestionar Catálogo →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
