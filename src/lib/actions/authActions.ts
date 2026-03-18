'use server';

import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

import { revalidatePath } from 'next/cache';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await auth.signIn.email({
    email,
    password,
  });

  if (error) {
    return { error: error.message || 'Error al iniciar sesión' };
  }

  redirect('/admin');
}

export async function logout() {
  await auth.signOut();
  revalidatePath('/admin');
  redirect('/admin/login');
}


