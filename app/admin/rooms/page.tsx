import { getAllRooms, checkOutRoom, extendRoomReservation } from '@/app/actions/room-actions'
import { revalidatePath } from 'next/cache'

// Note: In Next.js App Router, Server Components can fetch data directly
export default async function RoomManagementDashboard() {
  const result = await getAllRooms()
  const rooms = result.success && result.rooms ? result.rooms : []

  const standardRooms = rooms.filter(r => r.roomType === 'Standard Room')
  const familyRooms = rooms.filter(r => r.roomType === 'Family Room')

  const availableCount = rooms.filter(r => r.status === 'available').length
  const occupiedCount = rooms.filter(r => r.status === 'occupied').length

  // Inline Server Action for Checkout button inside Server Component
  async function handleCheckOut(formData: FormData) {
    'use server'
    const roomId = formData.get('roomId') as string
    const reservationId = formData.get('reservationId') as string
    
    if (roomId && reservationId) {
      await checkOutRoom(roomId, reservationId)
    }
  }

  // Inline Server Action for Extension
  async function handleExtend(formData: FormData) {
    'use server'
    const reservationId = formData.get('reservationId') as string
    const hours = parseInt(formData.get('hours') as string)
    const roomType = formData.get('roomType') as string

    if (reservationId && hours && roomType) {
      await extendRoomReservation(reservationId, hours, roomType)
    }
  }

  const RoomCard = ({ room }: { room: any }) => {
    const isOccupied = room.status === 'occupied'
    const activeRes = isOccupied && room.reservations?.length > 0 ? room.reservations[0] : null

    // Helper to format dates cleanly
    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return (
      <div className={`relative border rounded-2xl p-5 shadow-sm overflow-hidden transition-all hover:shadow-md ${
        isOccupied ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-2xl font-black ${isOccupied ? 'text-rose-700' : 'text-emerald-700'}`}>
              {room.roomNumber}
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{room.roomType}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isOccupied ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'
          }`}>
            {room.status}
          </span>
        </div>

        {isOccupied && activeRes ? (
          <div className="space-y-3 animate-in fade-in zoom-in-95">
            <div className="bg-white/60 rounded-xl p-3 border border-rose-100">
              <p className="text-xs text-rose-400 uppercase tracking-wider font-bold mb-1">Current Guest</p>
              <p className="font-bold text-slate-800">{activeRes.firstName} {activeRes.lastName}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Checked in at {activeRes.checkInTime}, {formatDate(activeRes.checkInDate)}
              </p>
            </div>
            
            <div className="bg-white/60 rounded-xl p-3 border border-rose-100 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-rose-400 uppercase tracking-wider font-bold mb-1">Check-out</p>
                  <p className="font-bold text-slate-800 text-sm">
                    {activeRes.checkOutTime}, {formatDate(activeRes.checkOutDate)}
                  </p>
                </div>
                <form action={handleCheckOut}>
                  <input type="hidden" name="roomId" value={room.id} />
                  <input type="hidden" name="reservationId" value={activeRes.id} />
                  <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm transition-colors">
                    Check Out
                  </button>
                </form>
              </div>

              {/* Extension form */}
              <form action={handleExtend} className="flex gap-2 items-center border-t border-rose-200 pt-2">
                <input type="hidden" name="reservationId" value={activeRes.id} />
                <input type="hidden" name="roomType" value={room.roomType} />
                <input 
                  type="number" 
                  name="hours" 
                  min="1" 
                  placeholder="Hrs..." 
                  className="w-20 text-xs bg-white border border-rose-200 rounded-lg py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-rose-500" 
                  required 
                />
                <span className="text-xs text-rose-500 font-medium whitespace-nowrap">
                  (₱{room.roomType === 'Standard Room' ? '50' : '100'}/hr)
                </span>
                <button type="submit" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm transition-colors">
                  Extend
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-emerald-300/50 rounded-xl mt-2">
            <span className="text-emerald-600/70 font-medium text-sm">Ready for next guest</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Stats */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-2">Room Management</h1>
            <p className="text-slate-500 font-medium">Live inventory and assignment tracker.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-emerald-50 border border-emerald-100 px-6 py-4 rounded-2xl text-center min-w-[120px]">
              <p className="text-4xl font-black text-emerald-600 mb-1">{availableCount}</p>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Available</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 px-6 py-4 rounded-2xl text-center min-w-[120px]">
              <p className="text-4xl font-black text-rose-600 mb-1">{occupiedCount}</p>
              <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">Occupied</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">Family Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {familyRooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>

        <h2 className="text-xl font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">Standard Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {standardRooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>

      </div>
    </div>
  )
}
