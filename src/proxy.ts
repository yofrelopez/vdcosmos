import { auth } from '@/lib/auth/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth.middleware({
  loginUrl: '/admin/login',
});

export const config = {
  matcher: ['/admin/:path*'],
};
