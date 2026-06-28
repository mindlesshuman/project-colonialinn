import { confirmReservationFromCustomer } from '@/app/actions/customer';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function ConfirmReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    redirect('/');
  }

  // Check current status
  const reservation = await prisma.reservation.findUnique({
    where: { id: id as string },
  });

  if (!reservation) {
    return (
      <div className="min-h-screen bg-off-white flex flex-col pt-[140px] pb-20 px-6">
        <div className="max-w-[600px] w-full mx-auto bg-white p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-light text-center">
          <h1 className="text-[2rem] font-heading text-primary leading-[1.1] mb-6">Reservation Not Found</h1>
          <Link href="/" className="btn btn-gold bg-accent text-primary px-10 py-4 font-label text-[0.8rem] uppercase tracking-[0.15em]">Return to Home</Link>
        </div>
      </div>
    );
  }

  if (reservation.status === 'confirmed') {
    return (
      <div className="min-h-screen bg-off-white flex flex-col pt-[140px] pb-20 px-6">
        <div className="max-w-[600px] w-full mx-auto bg-white p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-light text-center">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-primary leading-[1.1] mb-6">Already Confirmed</h1>
          <p className="text-gray text-[0.95rem] md:text-[1.05rem] leading-[1.8] mb-10 max-w-[450px] mx-auto">
            Your reservation has already been confirmed. We look forward to your stay!
          </p>
          <Link href="/" className="btn btn-gold bg-accent text-primary px-10 py-4 font-label text-[0.8rem] uppercase tracking-[0.15em]">Return to Home</Link>
        </div>
      </div>
    );
  }

  const confirmAction = async () => {
    'use server';
    await confirmReservationFromCustomer(id as string);
    redirect('/confirm/success');
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col pt-[140px] pb-20 px-6">
      <div className="max-w-[600px] w-full mx-auto bg-white p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-light text-center">
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-primary leading-[1.1] mb-6">
          Finalize Your Booking
        </h1>
        
        <div className="text-gray text-[0.95rem] md:text-[1.05rem] leading-[1.8] mb-10 max-w-[450px] mx-auto">
          <p>
            Please click the button below to confirm your reservation for your <strong>{reservation.roomType}</strong> room.
          </p>
        </div>
        
        <form action={confirmAction}>
          <button 
            type="submit"
            className="btn btn-gold bg-accent text-primary px-10 py-4 font-label text-[0.8rem] uppercase tracking-[0.15em] hover:bg-accent-light transition-colors shadow-lg inline-block w-full"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
