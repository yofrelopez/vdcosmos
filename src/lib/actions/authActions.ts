'use server';

import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

import { revalidatePath } from 'next/cache';

export async function logout() {
  await auth.signOut();
  revalidatePath('/admin');
  redirect('/admin/login');
}


