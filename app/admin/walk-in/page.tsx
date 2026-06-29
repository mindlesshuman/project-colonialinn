'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { createWalkInSession, getWalkInSession, completeWalkInReservation } from '@/app/actions/walkin-actions'

export default function WalkInDashboard() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessionData, setSessionData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [qrUrl, setQrUrl] = useState('')

  // Form states for front desk completion
  const [checkInDate, setCheckInDate] = useState('')
  const [checkInTime, setCheckInTime] = useState('14:00')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [checkOutTime, setCheckOutTime] = useState('12:00')
  const [roomType, setRoomType] = useState('Standard Room')
  const [guests, setGuests] = useState('1')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Initialize Session
  const initSession = async () => {
    setIsLoading(true)
    const res = await createWalkInSession()
    if (res.success && res.sessionId) {
      setSessionId(res.sessionId)
      // We assume the app is hosted on standard port or vercel URL, using window.location.origin
      const url = `${window.location.origin}/walk-in/guest?session=${res.sessionId}`
      setQrUrl(url)
    }
    setIsLoading(false)
    setSessionData(null)
    setSuccessMsg('')
  }

  useEffect(() => {
    initSession()
  }, [])

  // Poll Session Status
  useEffect(() => {
    if (!sessionId) return
    const interval = setInterval(async () => {
      const res = await getWalkInSession(sessionId)
      if (res.success && res.session) {
        setSessionData(res.session)
        if (res.session.status === 'filled' || res.session.status === 'completed') {
          clearInterval(interval)
        }
      }
    }, 3000) // poll every 3 seconds

    return () => clearInterval(interval)
  }, [sessionId])

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sessionId) return
    setIsSubmitting(true)
    const res = await completeWalkInReservation(sessionId, {
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      roomType,
      guests: parseInt(guests),
    })

    if (res.success) {
      setSuccessMsg('Reservation successfully confirmed!')
      setTimeout(() => {
        initSession() // reset for next guest
      }, 3000)
    } else {
      alert(res.error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex p-6 md:p-12 items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Column: QR Code */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 hover:bg-white/10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
            Walk-in Guest Kiosk
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Please ask the guest to scan this QR code with their mobile device to securely input their personal details.
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-inner mb-8 transform transition-transform hover:scale-105 duration-300">
            {qrUrl ? (
              <QRCodeSVG value={qrUrl} size={250} level="H" includeMargin={false} />
            ) : (
              <div className="w-[250px] h-[250px] bg-slate-200 animate-pulse rounded-xl flex items-center justify-center">
                <span className="text-slate-500">Generating...</span>
              </div>
            )}
          </div>

          <button 
            onClick={initSession}
            disabled={isLoading}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-medium transition-colors"
          >
            {isLoading ? 'Resetting...' : 'Generate New QR Code'}
          </button>
        </div>

        {/* Right Column: Guest Data & Completion Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col">
          {sessionData?.status === 'waiting' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <h3 className="text-xl font-medium text-slate-300">Waiting for guest input...</h3>
              <p className="text-slate-500 text-sm">The dashboard will automatically update once the guest submits their information.</p>
            </div>
          )}

          {sessionData?.status === 'filled' && !successMsg && (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 pb-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Guest Details Received
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">First Name</span>
                    <p className="text-lg font-medium text-white">{sessionData.firstName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Last Name</span>
                    <p className="text-lg font-medium text-white">{sessionData.lastName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Email</span>
                    <p className="text-lg font-medium text-white">{sessionData.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Phone</span>
                    <p className="text-lg font-medium text-white">{sessionData.phone}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleComplete} className="space-y-4 flex-1 flex flex-col">
                <h3 className="text-lg font-medium text-slate-200 mb-2">Front Desk: Complete Booking</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Check-in Date</label>
                    <input type="date" required value={checkInDate} onChange={e=>setCheckInDate(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Check-out Date</label>
                    <input type="date" required value={checkOutDate} onChange={e=>setCheckOutDate(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Room Type</label>
                  <select value={roomType} onChange={e=>setRoomType(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option className="bg-slate-800" value="Standard Room">Standard Room</option>
                    <option className="bg-slate-800" value="Deluxe Room">Deluxe Room</option>
                    <option className="bg-slate-800" value="Suite">Suite</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Number of Guests</label>
                  <input type="number" min="1" required value={guests} onChange={e=>setGuests(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-auto w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Walk-in & Collect Payment'}
                </button>
              </form>
            </div>
          )}

          {successMsg && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-white">{successMsg}</h2>
              <p className="text-slate-400">Resetting dashboard for next guest...</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
