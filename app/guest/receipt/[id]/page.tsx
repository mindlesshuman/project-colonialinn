import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ExtensionForm from './ExtensionForm'

export default async function GuestReceiptPage({ params }: { params: { id: string } }) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: params.id }
  })

  if (!reservation) {
    notFound()
  }

  const basePrice = reservation.price || 0
  const extPrice = reservation.extensionPrice || 0
  const totalBill = basePrice + extPrice

  const ratePerHour = reservation.roomType === 'Family Room' || reservation.roomType === 'family' ? 100 : 50

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6 md:p-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 relative z-10">Colonial Inn</h1>
          <p className="text-blue-100 font-medium relative z-10">Digital Receipt & Guest Portal</p>
        </div>

        <div className="p-8">
          
          {/* Guest Info */}
          <div className="flex justify-between items-end border-b border-slate-100 pb-6 mb-6">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Guest Name</p>
              <p className="text-xl font-bold text-slate-800">{reservation.firstName} {reservation.lastName}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide">
                {reservation.status}
              </span>
            </div>
          </div>

          {/* Stay Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Check-in</p>
              <p className="font-bold text-slate-700">{reservation.checkInDate}</p>
              <p className="text-slate-500 text-sm">{reservation.checkInTime}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Check-out</p>
              <p className="font-bold text-slate-700">{reservation.checkOutDate}</p>
              <p className="text-rose-500 font-bold text-sm">{reservation.checkOutTime}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Room & Charges</h3>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-600 font-medium">{reservation.roomType} ({reservation.duration} hours)</span>
              <span className="font-bold text-slate-800">₱{basePrice.toLocaleString()}</span>
            </div>
            
            {reservation.extensionHours > 0 && (
              <div className="flex justify-between items-center mb-3 text-orange-600">
                <span className="font-medium">Extended Stay (+{reservation.extensionHours} hours)</span>
                <span className="font-bold">₱{extPrice.toLocaleString()}</span>
              </div>
            )}
            
            <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-800">Total Bill</span>
              <span className="text-2xl font-black text-indigo-700">₱{totalBill.toLocaleString()}</span>
            </div>
          </div>

          {/* Extension Form Client Component */}
          <ExtensionForm 
            reservationId={reservation.id} 
            ratePerHour={ratePerHour} 
          />

        </div>
      </div>
    </div>
  )
}
