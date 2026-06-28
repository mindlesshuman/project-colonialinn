'use client';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="btn btn-gold bg-primary text-white px-6 py-3 font-label text-[0.7rem] uppercase tracking-[0.15em] hover:bg-charcoal transition-colors shadow-lg flex items-center gap-2 hidden md:flex"
    >
      <i className="fa-solid fa-print"></i> Print Logbook
    </button>
  );
}
