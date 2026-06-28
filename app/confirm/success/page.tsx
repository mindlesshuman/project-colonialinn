import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col pt-[140px] pb-20 px-6">
      <div className="max-w-[600px] w-full mx-auto bg-white p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-light text-center">
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-primary leading-[1.1] mb-6">
          Reservation Confirmed
        </h1>
        
        <div className="text-gray text-[0.95rem] md:text-[1.05rem] leading-[1.8] mb-10 max-w-[450px] mx-auto">
          <p>
            Thank you for confirming your reservation. We have sent a final confirmation email with all the details of your stay. We look forward to welcoming you to Colonial Inn.
          </p>
        </div>
        
        <Link 
          href="/" 
          className="btn btn-gold bg-accent text-primary px-10 py-4 font-label text-[0.8rem] uppercase tracking-[0.15em] hover:bg-accent-light transition-colors shadow-lg inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
