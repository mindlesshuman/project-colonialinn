'use client';

import { useState } from 'react';
import { login } from '@/app/actions/auth';
import ScrollReveal from '@/components/ScrollReveal';

export default function ManagerLogin() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await login(formData, 'manager');

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center px-6 pt-[120px] pb-12">
      <ScrollReveal className="w-full max-w-[400px]">
        <div className="bg-[#241A15] p-10 shadow-2xl border border-white/10 text-center rounded-sm">
          <i className="fa-solid fa-briefcase text-[2rem] text-accent mb-6"></i>
          <h1 className="text-[1.8rem] font-heading text-white mb-2">Managerial Portal</h1>
          <p className="text-gray text-[0.85rem] mb-8">Executive access for performance tracking and administration.</p>

          {error && (
            <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 mb-6 font-label text-[0.7rem] uppercase tracking-wider font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-left">
            <div className="form-group mb-6">
              <label htmlFor="password" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Manager Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-[14px_16px] border border-white/20 rounded-none font-body text-[0.9rem] text-white bg-primary outline-none transition-colors focus:border-accent"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-gold w-full justify-center disabled:opacity-70 bg-accent text-primary hover:bg-white"
            >
              <span>{isSubmitting ? "Authenticating..." : "Access Portal"}</span>
            </button>
          </form>
        </div>
      </ScrollReveal>
    </div>
  );
}
