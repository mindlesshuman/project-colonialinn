import prisma from '@/lib/prisma';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import LogoutButton from '@/components/LogoutButton';
import ReservationActions from '@/components/ReservationActions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Optional: Force dynamic rendering to always fetch latest bookings
export const dynamic = 'force-dynamic';

function formatTime12h(time24: string) {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) {
    redirect('/admin/login');
  }

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Simple CSV generation logic for the "Export to CSV" feature
  const headers = ['Date Booked', 'Status', 'First Name', 'Last Name', 'Email', 'Phone', 'Check-In', 'Check-Out', 'Room', 'Guests', 'Message'];
  
  const csvContent = [
    headers.join(','),
    ...reservations.map(r => [
      new Date(r.createdAt).toLocaleString().replace(/,/g, ''),
      r.status,
      r.firstName,
      r.lastName,
      r.email,
      r.phone || 'N/A',
      `${r.checkInDate} ${r.checkInTime}`,
      `${r.checkOutDate} ${r.checkOutTime}`,
      r.roomType,
      r.guests,
      `"${(r.message || 'None').replace(/"/g, '""')}"`
    ].join(','))
  ].join('\\n');

  return (
    <div className="min-h-screen bg-off-white pt-[140px] pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-[2.5rem] font-heading text-primary mb-2">Admin Dashboard</h1>
            <p className="text-gray text-[0.9rem]">Manage your hotel reservations and digital logbook.</p>
          </div>
          
          <div className="flex gap-4">
            {/* Export to CSV Button */}
            <a 
              href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
              download="colonial_inn_logbook.csv"
              className="btn btn-gold bg-accent text-primary px-6 py-3 font-label text-[0.7rem] uppercase tracking-[0.15em] hover:bg-accent-light transition-colors shadow-lg flex items-center gap-2"
            >
              <i className="fa-solid fa-file-csv"></i> Download CSV
            </a>
            
            <PrintButton />
            <LogoutButton />
          </div>
        </div>

        <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-light">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream border-b border-gray-light font-label text-[0.65rem] tracking-[0.15em] uppercase text-gray">
                  <th className="p-5 font-bold">Guest Name</th>
                  <th className="p-5 font-bold">Contact Info</th>
                  <th className="p-5 font-bold">Check-In</th>
                  <th className="p-5 font-bold">Check-Out</th>
                  <th className="p-5 font-bold">Room & Guests</th>
                  <th className="p-5 font-bold">Date Booked</th>
                  <th className="p-5 font-bold">Status & Actions</th>
                </tr>
              </thead>
              <tbody className="text-[0.85rem] text-primary font-body">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-gray italic">No reservations found. Wait for a guest to book!</td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res.id} className="border-b border-gray-light hover:bg-off-white transition-colors">
                      <td className="p-5">
                        <strong className="block font-bold">{res.firstName} {res.lastName}</strong>
                      </td>
                      <td className="p-5">
                        <span className="block">{res.email}</span>
                        <span className="block text-gray text-[0.75rem]">{res.phone || 'No phone'}</span>
                      </td>
                      <td className="p-5">
                        <span className="block text-accent font-bold">{res.checkInDate}</span>
                        <span className="block text-gray font-normal text-[0.75rem]">{formatTime12h(res.checkInTime)}</span>
                      </td>
                      <td className="p-5">
                        <span className="block text-[#c0392b] font-bold">{res.checkOutDate}</span>
                        <span className="block text-gray font-normal text-[0.75rem]">{formatTime12h(res.checkOutTime)}</span>
                      </td>
                      <td className="p-5">
                        <span className="block capitalize font-bold">{res.roomType} Room</span>
                        <span className="block text-gray text-[0.75rem]">{res.guests} Guests</span>
                      </td>
                      <td className="p-5 text-gray text-[0.8rem]">
                        {new Date(res.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5 align-top">
                        <span className={`px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider border ${
                          res.status === 'confirmed' ? 'bg-[#27ae60]/10 text-[#27ae60] border-[#27ae60]/20' :
                          res.status === 'available' ? 'bg-[#f39c12]/10 text-[#f39c12] border-[#f39c12]/20' :
                          res.status === 'cancelled' ? 'bg-[#c0392b]/10 text-[#c0392b] border-[#c0392b]/20' :
                          'bg-cream text-accent border-accent/20'
                        }`}>
                          {res.status === 'confirmed' ? 'Confirmed' : res.status === 'available' ? 'Awaiting Guest' : res.status === 'cancelled' ? 'Unavailable' : res.status}
                        </span>
                        
                        <ReservationActions id={res.id} status={res.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Printable View Styles (Hidden on screen, shown only when printing) */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body * {
              visibility: hidden;
            }
            .max-w-\\[1200px\\] * {
              visibility: visible;
            }
            .btn {
              display: none !important;
            }
            .bg-off-white {
              background: white !important;
            }
          }
        `}} />
      </div>
    </div>
  );
}
