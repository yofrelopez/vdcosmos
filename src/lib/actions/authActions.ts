'use server';

import { cookies } from 'next/headers';
import { encrypt } from '@/lib/auth-utils';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    // Generate signed session
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ id: 'admin', role: 'admin', expires });

    (await cookies()).set('admin_session', session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return { success: true };
  } else {
    return { error: 'Contraseña incorrecta' };
  }
}

export async function logout() {
  (await cookies()).delete('admin_session');
}
