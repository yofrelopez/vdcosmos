import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

const authMiddleware = auth.middleware({
  loginUrl: '/admin/login',
});

export default function proxy(request: NextRequest) {
  // Ignorar peticiones de Server Actions (se validan internamente)
  if (request.headers.has('Next-Action')) {
    return NextResponse.next();
  }

  // No proteger la página de login para evitar bucles de redirección
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Ignorar rutas de API de autenticación explícitamente en el proxy
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  return authMiddleware(request);
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'], // Añadido api/auth para control total
};
