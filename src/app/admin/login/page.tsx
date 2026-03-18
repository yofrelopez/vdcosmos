'use client';

import { login } from '@/lib/actions/authActions';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import SubmitButton from '@/components/ui/SubmitButton';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [state, action] = useActionState(login, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">Panel de Control</h1>
          <p className="text-gray-600 font-body">Inicia sesión con tus credenciales de administrador.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form action={action} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-bold text-gray-700 mb-2 font-body"
              >
                Correo Electrónico
              </label>
              <input 
                id="email"
                name="email" 
                type="email" 
                required 
                placeholder="admin@cosmos.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-cosmos-blue/50 transition-all font-body"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-bold text-gray-700 mb-2 font-body"
              >
                Contraseña
              </label>
              <input 
                id="password"
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-cosmos-blue/50 transition-all font-body"
              />
            </div>

            <SubmitButton 
              className="w-full bg-cosmos-blue text-white font-bold py-3 rounded-lg hover:bg-cosmos-blue-dark transition-all shadow-lg hover:shadow-cosmos-blue/20"
              loadingText="Verificando..."
            >
              Entrar al Panel
            </SubmitButton>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-body">
              Acceso restringido solo para personal autorizado de VD COSMOS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
