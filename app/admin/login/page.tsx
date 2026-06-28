'use client';

import { useState } from 'react';
import { login } from '@/app/actions/auth';
import ScrollReveal from '@/components/ScrollReveal';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await login(formData, 'admin');

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col justify-center items-center px-6 pt-[120px] pb-12">
      <ScrollReveal className="w-full max-w-[400px]">
        <div className="bg-white p-10 shadow-[0_8px_60px_rgba(0,0,0,0.07)] border border-gray-light text-center">
          <i className="fa-solid fa-lock text-[2rem] text-accent mb-6"></i>
          <h1 className="text-[1.8rem] font-heading text-primary mb-2">Admin Access</h1>
          <p className="text-gray text-[0.85rem] mb-8">Please enter the master password to view the digital logbook.</p>

          {error && (
            <div className="bg-red-100 text-[#c0392b] p-3 mb-6 font-label text-[0.7rem] uppercase tracking-wider font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-left">
            <div className="form-group mb-6">
              <label htmlFor="password" className="block font-label text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gray mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-[14px_16px] border border-gray-light rounded-none font-body text-[0.9rem] text-primary bg-off-white outline-none transition-colors focus:border-accent"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-gold w-full justify-center disabled:opacity-70"
            >
              <span>{isSubmitting ? "Authenticating..." : "Login"}</span>
            </button>
          </form>
        </div>
      </ScrollReveal>
    </div>
  );
}
