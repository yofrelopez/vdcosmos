'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { authClient } from '@/lib/auth/client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || 'Error al iniciar sesión');
      setIsPending(false);
    } else {
      toast.success('Sesión iniciada correctamente');
      window.location.href = '/admin'; // Hard redirect for a clean state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">Panel de Control</h1>
          <p className="text-gray-600 font-body">Inicia sesión con tus credenciales de administrador.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
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
              <div className="relative">
                <input 
                  id="password"
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-cosmos-blue/50 transition-all font-body pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cosmos-blue transition-colors focus:outline-none p-1"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center bg-cosmos-blue text-white font-bold py-3 rounded-lg hover:bg-cosmos-blue-dark transition-all shadow-lg hover:shadow-cosmos-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </>
              ) : 'Entrar al Panel'}
            </button>
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
