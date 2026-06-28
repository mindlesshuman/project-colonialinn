'use client';

import { logout } from '@/app/actions/auth';

export default function LogoutButton({ role = 'admin' }: { role?: 'admin' | 'manager' }) {
  return (
    <button 
      onClick={() => logout(role)}
      className="btn btn-gold bg-transparent border border-accent text-accent px-6 py-3 font-label text-[0.7rem] uppercase tracking-[0.15em] hover:bg-accent hover:text-primary transition-colors shadow-none flex items-center gap-2"
    >
      <i className="fa-solid fa-sign-out-alt"></i> Logout
    </button>
  );
}
