'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const MANAGER_PASSWORD = process.env.MANAGER_PASSWORD || 'manager123';

export async function login(formData: FormData, role: 'admin' | 'manager') {
  const password = formData.get('password');
  
  const expectedPassword = role === 'manager' ? MANAGER_PASSWORD : ADMIN_PASSWORD;
  const cookieName = role === 'manager' ? 'manager_session' : 'admin_session';
  const redirectPath = role === 'manager' ? '/manager' : '/admin';
  
  if (password === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  } else {
    return { success: false, error: 'Invalid password' };
  }

  // Redirect to respective dashboard on success
  redirect(redirectPath);
}

export async function logout(role: 'admin' | 'manager') {
  const cookieStore = await cookies();
  const cookieName = role === 'manager' ? 'manager_session' : 'admin_session';
  cookieStore.delete(cookieName);
  
  redirect(role === 'manager' ? '/manager/login' : '/admin/login');
}
